import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Skeleton,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ChatInterface from "../ChatInterface/ChatInterface";
import Dashboard from "../Dashboard/Dashboard";
import Transactions from "../Transactions/Transactions";
import { api } from "../../services/api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tracker-tabpanel-${index}`}
      aria-labelledby={`tracker-tab-${index}`}
      style={{ height: '100%', display: value === index ? 'flex' : 'none', flexDirection: 'column' }}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const TrackerView: React.FC = () => {
  const { trackerId } = useParams<{ trackerId: string }>();
  const navigate = useNavigate();
  const [tracker, setTracker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (trackerId) {
      loadTracker();
    }
  }, [trackerId]);

  const loadTracker = async () => {
    setLoading(true);
    try {
      const data = await api.getTracker(trackerId!);
      setTracker(data);
    } catch (error) {
      console.error("Error loading tracker:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return currency;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 3 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
      </Container>
    );
  }

  if (!tracker) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Tracker not found
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Fixed Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          px: 3,
          py: 2,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            component="button"
            onClick={() => navigate("/trackers")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: "0.875rem",
              padding: 0,
              "&:hover": { opacity: 0.8 },
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Back to Trackers
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0 }}>
            {tracker.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Chip 
              label={tracker.type} 
              size="small"
              sx={{ 
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 600
              }} 
            />
            <Chip 
              label={getCurrencySymbol(tracker.currency)} 
              size="small"
              sx={{ 
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 600
              }} 
            />
          </Box>
          {tracker.description && (
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.875rem" }}>
              {tracker.description}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Fixed Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "white", position: 'sticky', top: 'auto', zIndex: 9 }}>
        <Container maxWidth="xl">
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab icon={<ChatIcon />} label="Chat" iconPosition="start" />
            <Tab icon={<DashboardIcon />} label="Dashboard" iconPosition="start" />
            <Tab icon={<ReceiptLongIcon />} label="Transactions" iconPosition="start" />
          </Tabs>
        </Container>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TabPanel value={tabValue} index={0}>
          <ChatInterface trackerId={trackerId} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Dashboard trackerId={trackerId} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Transactions trackerId={trackerId} />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default TrackerView;
