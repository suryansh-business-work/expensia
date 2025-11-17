import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email?: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  profilePhoto?: string;
  accountType: 'personal' | 'business';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    profilePhoto: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ['personal', 'business'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ phone: 1 });
userSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', userSchema);
