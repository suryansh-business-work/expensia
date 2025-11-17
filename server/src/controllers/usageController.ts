import { Request, Response } from 'express';
import MessageModel from '../models/Message';
import TrackerModel from '../models/Tracker';
import { encode } from 'gpt-tokenizer';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    phone: string;
  };
}

// Get overall usage statistics for the user
export const getOverallUsage = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('[Usage] Getting overall usage for userId:', userId);

    // Convert userId string to ObjectId for MongoDB query
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Get total messages and tokens
    const stats = await MessageModel.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          totalMessages: { $sum: 1 },
          totalTokens: { $sum: '$tokenCount' },
          userMessages: {
            $sum: { $cond: [{ $eq: ['$role', 'user'] }, 1, 0] }
          },
          aiMessages: {
            $sum: { $cond: [{ $eq: ['$role', 'assistant'] }, 1, 0] }
          },
        }
      }
    ]);

    console.log('[Usage] Stats aggregation result:', stats);

    const usage = stats.length > 0 ? stats[0] : {
      totalMessages: 0,
      totalTokens: 0,
      userMessages: 0,
      aiMessages: 0,
    };

    // Get usage by tracker
    const trackerUsage = await MessageModel.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: '$trackerId',
          messageCount: { $sum: 1 },
          tokenCount: { $sum: '$tokenCount' },
          userMessages: {
            $sum: { $cond: [{ $eq: ['$role', 'user'] }, 1, 0] }
          },
          aiMessages: {
            $sum: { $cond: [{ $eq: ['$role', 'assistant'] }, 1, 0] }
          },
        }
      },
      { $sort: { messageCount: -1 } }
    ]);

    console.log('[Usage] Tracker usage aggregation result:', trackerUsage);

    // Get tracker details
    const trackerIds = trackerUsage.map(t => t._id);
    const trackers = await TrackerModel.find({ 
      _id: { $in: trackerIds },
      userId: userObjectId
    });

    const trackerMap = new Map(trackers.map(t => [(t._id as any).toString(), t]));

    const enrichedTrackerUsage = trackerUsage.map(usage => {
      const tracker = trackerMap.get(usage._id);
      return {
        trackerId: usage._id,
        trackerName: tracker?.name || 'Unknown',
        trackerType: tracker?.type || 'personal',
        messageCount: usage.messageCount,
        tokenCount: usage.tokenCount,
        userMessages: usage.userMessages,
        aiMessages: usage.aiMessages,
      };
    });

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await MessageModel.aggregate([
      {
        $match: {
          userId: userObjectId,
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          messageCount: { $sum: 1 },
          tokenCount: { $sum: '$tokenCount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log('[Usage] Recent activity result:', recentActivity);

    res.json({
      overall: {
        totalMessages: usage.totalMessages,
        totalTokens: usage.totalTokens,
        userMessages: usage.userMessages,
        aiMessages: usage.aiMessages,
      },
      byTracker: enrichedTrackerUsage,
      recentActivity: recentActivity.map(day => ({
        date: day._id,
        messageCount: day.messageCount,
        tokenCount: day.tokenCount,
      })),
    });
  } catch (error) {
    console.error('Error fetching usage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get usage for a specific tracker
export const getTrackerUsage = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { trackerId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!trackerId || trackerId === 'undefined' || trackerId === 'null') {
      return res.status(400).json({ error: 'Invalid tracker ID' });
    }

    console.log('[Usage] Getting tracker usage - userId:', userId, 'trackerId:', trackerId);

    // Convert userId string to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Verify tracker belongs to user
    const tracker = await TrackerModel.findOne({ 
      _id: trackerId, 
      userId: userObjectId
    });

    if (!tracker) {
      return res.status(404).json({ error: 'Tracker not found' });
    }

    // Get tracker statistics
    const stats = await MessageModel.aggregate([
      {
        $match: {
          userId: userObjectId,
          trackerId: trackerId
        }
      },
      {
        $group: {
          _id: null,
          totalMessages: { $sum: 1 },
          totalTokens: { $sum: '$tokenCount' },
          userMessages: {
            $sum: { $cond: [{ $eq: ['$role', 'user'] }, 1, 0] }
          },
          aiMessages: {
            $sum: { $cond: [{ $eq: ['$role', 'assistant'] }, 1, 0] }
          },
        }
      }
    ]);

    console.log('[Usage] Tracker stats result:', stats);

    const usage = stats.length > 0 ? stats[0] : {
      totalMessages: 0,
      totalTokens: 0,
      userMessages: 0,
      aiMessages: 0,
    };

    // Get daily breakdown for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyUsage = await MessageModel.aggregate([
      {
        $match: {
          userId: userObjectId,
          trackerId: trackerId,
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          messageCount: { $sum: 1 },
          tokenCount: { $sum: '$tokenCount' }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    // Get recent messages for logs (last 100 messages)
    const messages = await MessageModel.find({
      userId: userObjectId,
      trackerId: trackerId
    })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('role content tokenCount timestamp')
      .lean();

    console.log('[Usage] Found', messages.length, 'messages for tracker');

    res.json({
      trackerId,
      trackerName: tracker.name,
      trackerType: tracker.type,
      totalMessages: usage.totalMessages,
      totalTokens: usage.totalTokens,
      userMessages: usage.userMessages,
      aiMessages: usage.aiMessages,
      dailyUsage: dailyUsage.map(day => ({
        date: day._id,
        messageCount: day.messageCount,
        tokenCount: day.tokenCount,
      })),
      messages: messages,
    });
  } catch (error) {
    console.error('Error fetching tracker usage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Log a new message (called internally when chat messages are sent)
export const logMessage = async (
  userId: string,
  trackerId: string,
  role: 'user' | 'assistant',
  content: string
) => {
  try {
    console.log(`[Usage Tracking] Logging message - userId: ${userId}, trackerId: ${trackerId}, role: ${role}`);
    
    // Use gpt-tokenizer for accurate token count
    const tokens = encode(content);
    const tokenCount = tokens.length;

    // Convert userId string to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const message = new MessageModel({
      userId: userObjectId,
      trackerId,
      role,
      content,
      tokenCount,
      timestamp: new Date(),
    });

    await message.save();
    console.log(`[Usage Tracking] Message saved successfully - ID: ${message._id}, tokenCount: ${tokenCount}`);
    return message;
  } catch (error) {
    console.error('[Usage Tracking] Error logging message:', error);
    throw error;
  }
};
