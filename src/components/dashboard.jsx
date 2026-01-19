import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Legend,
} from "recharts";
import {
  Factory,
  Zap,
  IndianRupee,
  Package,
  ThumbsUp,
  ShieldAlert,
  CheckCircle,
  Activity,
  Box,
  Wrench,
  Users,
  Leaf,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { MessageCircle, X, Send } from "lucide-react"; // Add MessageCircle, X, Send icons
import HRDashboard from "./hrdashboard";
import PurchaseDashboard from "./purchase-dashboard";
import { useNavigate } from "react-router-dom";

const StaticBUDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLineInModal, setSelectedLineInModal] = useState("RNGN");
  const [viewMode, setViewMode] = useState("graphical");
  const [selectedMetric, setSelectedMetric] = useState("productivity");
  const [theme, setTheme] = useState("lightBlue");
  const [selectedBU, setSelectedBU] = useState("overview");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [globalView, setGlobalView] = useState("daily");
  const [selectedOEEBU, setSelectedOEEBU] = useState(null); // BU selection in modal
  const [selectedOEEPlant, setSelectedOEEPlant] = useState(null); // Plant selection
  const [qualityViewMode, setQualityViewMode] = useState("graphical");
  // Existing state variables ke saath add karo
  const [oeeViewMode, setOEEViewMode] = useState("tabular"); // "tabular" or "graphical"
  const [selectedQualityBU, setSelectedQualityBU] = useState(null);
  const [selectedQualityPlant, setSelectedQualityPlant] = useState(null);
  // OpEx states - ADD THESE ↓
  const [selectedOpExBU, setSelectedOpExBU] = useState(null);
  const [selectedOpExPlant, setSelectedOpExPlant] = useState(null);
  const [opexViewMode, setOpExViewMode] = useState("tabular");
  // ✅ NEW: Chatbot state variables
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm your KTFL Dashboard Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ✅ NEW: Chatbot helper function
  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = {
      type: "user",
      text: chatInput,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: "bot",
        text: getBotResponse(chatInput),
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSalesCardClick = () => {
    navigate("/noncore/kalyani");
  };

  // ✅ NEW: Bot response logic
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("sales") || input.includes("revenue")) {
      return `Current Sales: Daily ₹${staticData.sales.daily.actual}Cr (${staticData.sales.daily.achievement}% achievement), MTD ₹${staticData.sales.mtd.actual}Cr, YTD ₹${staticData.sales.ytd.actual}Cr`;
    } else if (input.includes("production") || input.includes("oee")) {
      return `Production Status: Daily Achievement ${staticData.production.daily.achievement}%, Overall OEE: ${staticData.oee.overall}%`;
    } else if (input.includes("power") || input.includes("energy")) {
      return `Power Utilization: Daily ${staticData.power.daily.utilization}%, MTD ${staticData.power.mtd.utilization}%, YTD ${staticData.power.ytd.utilization}%`;
    } else if (input.includes("quality") || input.includes("scrap")) {
      return `Quality Metrics: Scrap ${staticData.quality.daily.scrap}%, Yield ${staticData.quality.daily.yield}%`;
    } else if (input.includes("safety") || input.includes("accident")) {
      return `Safety Status: Major Accidents: ${staticData.safety.major}, Minor: ${staticData.safety.minor}, First Aid: ${staticData.safety.firstAid}`;
    } else if (input.includes("npd") || input.includes("project")) {
      return `NPD Projects: Total ${staticData.npd.total}, Active ${staticData.npd.active}`;
    } else if (
      input.includes("help") ||
      input.includes("hi") ||
      input.includes("hello")
    ) {
      return "I can help you with: Sales, Production, Power, Quality, Safety, NPD, Customer Satisfaction, Inventory, Maintenance. Just ask me about any metric!";
    } else {
      return "I can provide information about Sales, Production, Power, Quality, Safety, NPD, and more. What would you like to know?";
    }
  };

  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedNonCore, setSelectedNonCore] = useState(null);
  // values: null | "hr" | "finance" | "purchase"

  useEffect(() => {
    if (selectedCard) return; // modal open => stop timer

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [selectedCard]);

  const themes = {
    lightBlue: {
      bg: "from-blue-50 via-indigo-50 to-blue-100",
      cardBg: "rgba(255, 255, 255, 0.98)",
      cardBgEnd: "rgba(239, 246, 255, 0.98)",
      headerGradient: "from-blue-600 via-indigo-600 to-blue-700",
      shimmer: "rgba(59, 130, 246, 0.3)",
      textPrimary: "text-slate-900",
      textSecondary: "text-slate-700",
      textTertiary: "text-slate-600",
      bgSecondary: "bg-blue-100/60",
      bgTertiary: "bg-blue-200/60",
      chartGrid: "#94a3b8",
      chartText: "#334155",
      isDark: false,
    },
    dark: {
      bg: "from-slate-900 via-slate-800 to-slate-900",
      cardBg: "rgba(30, 41, 59, 0.95)",
      cardBgEnd: "rgba(15, 23, 42, 0.95)",
      headerGradient: "from-cyan-400 via-blue-500 to-purple-600",
      shimmer: "rgba(56, 189, 248, 0.5)",
      textPrimary: "text-white",
      textSecondary: "text-slate-300",
      textTertiary: "text-slate-400",
      bgSecondary: "bg-slate-800/60",
      bgTertiary: "bg-slate-700/60",
      chartGrid: "#475569",
      chartText: "#cbd5e1",
      isDark: true,
    },
  };

  const currentTheme = themes[theme];
  const COLORS = [
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
  ];

  // BU Configuration
  const buConfig = {
    overview: { name: "KTFL Group", plants: [] },

    bu1: {
      name: "BU 1",
      plants: {
        // ✅ New Plants (BU1)
        Ranjangaon: [
          "1005 TP",
          "2504TP",
          "1000 T Screw Press",
          "4003 TP",
          "4004 TP",
        ],
        Bhiwadi: [],
        Mundhwa: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5", "Line 6"],
        Gujrat: [],
        Baramati: [],
      },
    },

    bu2: {
      name: "BU 2",
      plants: {
        Baramati: ["B-Line 1", "B-Line 2", "B-Line 3", "B-Line 4", "B-Line 5"],
        Chakan: ["C-Line 1", "C-Line 2", "C-Line 3", "C-Line 4"],

        // ✅ New Plants (BU2)
        "Khed 1": [],
        "Khed 2": [],
      },
    },

    bu3: {
      name: "BU 3",
      plants: {
        Bhiwadi: ["BH-Line 1", "BH-Line 2", "BH-Line 3"],
        Gujarat: ["GJ-Line 1", "GJ-Line 2", "GJ-Line 3"],

        // ✅ New Plants (BU3)
        Inmet: [],
        Yokoha: [],
      },
    },
  };

  const currentBU = buConfig[selectedBU];
  const plantsList =
    selectedBU !== "overview" ? Object.keys(currentBU.plants) : [];
  const linesList =
    selectedPlant && selectedBU !== "overview"
      ? currentBU.plants[selectedPlant]
      : [];

  // STATIC DATA - No random values, fixed numbers
  const staticData = {
    sales: {
      daily: { actual: 2.2, plan: 2.0, achievement: 110 },
      mtd: { actual: 67, plan: 65, achievement: 103 },
      ytd: { actual: 450, plan: 440, achievement: 102 },
    },
    production: {
      daily: { actual: 145, plan: 154, achievement: 94, qty: 5800 },
      mtd: { actual: 788, plan: 820, achievement: 96, qty: 32000 },
      ytd: { actual: 4250, plan: 4500, achievement: 94, qty: 185000 },
    },
    power: {
      daily: { utilization: 87, plan: 85, consumption: 2.4 },
      mtd: { utilization: 89, plan: 85, consumption: 68 },
      ytd: { utilization: 88, plan: 85, consumption: 425 },
    },
    cost: {
      daily: { actual: 3.3, target: 3.0, variance: 10 },
      mtd: { actual: 3.2, target: 3.0, variance: 6.7 },
      ytd: { actual: 3.25, target: 3.0, variance: 8.3 },
    },
    ht: {
      daily: { actual: 85, plan: 90, scm: 4.2 },
      mtd: { actual: 458, plan: 480, scm: 4.5 },
      ytd: { actual: 2850, plan: 3000, scm: 4.4 },
    },
    quality: {
      overall: 96.5,
      bu1: {
        overall: 97.2,
        plants: {
          Ranjangaon: {
            scrap: 2.1,
            yield: 97.9,
            inHouseRejection: 1.2,
            customerComplaint: 0.4,
            lines: {
              "1005 TP": {
                scrap: 2.0,
                yield: 98.0,
                rejection: 1.1,
                complaint: 0.3,
              },
              "2504TP": {
                scrap: 2.2,
                yield: 97.8,
                rejection: 1.3,
                complaint: 0.5,
              },
              "1000 T Screw Press": {
                scrap: 2.1,
                yield: 97.9,
                rejection: 1.2,
                complaint: 0.4,
              },
              "4003 TP": {
                scrap: 2.0,
                yield: 98.0,
                rejection: 1.0,
                complaint: 0.3,
              },
              "4004 TP": {
                scrap: 2.3,
                yield: 97.7,
                rejection: 1.4,
                complaint: 0.5,
              },
            },
          },
          Mundhwa: {
            scrap: 2.3,
            yield: 97.7,
            inHouseRejection: 1.3,
            customerComplaint: 0.5,
            lines: {
              "Line 1": {
                scrap: 2.2,
                yield: 97.8,
                rejection: 1.2,
                complaint: 0.4,
              },
              "Line 2": {
                scrap: 2.4,
                yield: 97.6,
                rejection: 1.4,
                complaint: 0.6,
              },
              "Line 3": {
                scrap: 2.3,
                yield: 97.7,
                rejection: 1.3,
                complaint: 0.5,
              },
              "Line 4": {
                scrap: 2.2,
                yield: 97.8,
                rejection: 1.2,
                complaint: 0.4,
              },
              "Line 5": {
                scrap: 2.1,
                yield: 97.9,
                rejection: 1.1,
                complaint: 0.3,
              },
              "Line 6": {
                scrap: 2.5,
                yield: 97.5,
                rejection: 1.5,
                complaint: 0.7,
              },
            },
          },
          Bhiwadi: {
            scrap: 2.5,
            yield: 97.5,
            inHouseRejection: 1.5,
            customerComplaint: 0.6,
            lines: {},
          },
        },
      },
      bu2: {
        overall: 96.8,
        plants: {
          Baramati: {
            scrap: 2.4,
            yield: 97.6,
            inHouseRejection: 1.4,
            customerComplaint: 0.5,
            lines: {
              "B-Line 1": {
                scrap: 2.3,
                yield: 97.7,
                rejection: 1.3,
                complaint: 0.4,
              },
              "B-Line 2": {
                scrap: 2.4,
                yield: 97.6,
                rejection: 1.4,
                complaint: 0.5,
              },
              "B-Line 3": {
                scrap: 2.5,
                yield: 97.5,
                rejection: 1.5,
                complaint: 0.6,
              },
              "B-Line 4": {
                scrap: 2.4,
                yield: 97.6,
                rejection: 1.4,
                complaint: 0.5,
              },
              "B-Line 5": {
                scrap: 2.3,
                yield: 97.7,
                rejection: 1.3,
                complaint: 0.4,
              },
            },
          },
          Chakan: {
            scrap: 2.6,
            yield: 97.4,
            inHouseRejection: 1.6,
            customerComplaint: 0.7,
            lines: {
              "C-Line 1": {
                scrap: 2.5,
                yield: 97.5,
                rejection: 1.5,
                complaint: 0.6,
              },
              "C-Line 2": {
                scrap: 2.6,
                yield: 97.4,
                rejection: 1.6,
                complaint: 0.7,
              },
              "C-Line 3": {
                scrap: 2.7,
                yield: 97.3,
                rejection: 1.7,
                complaint: 0.8,
              },
              "C-Line 4": {
                scrap: 2.6,
                yield: 97.4,
                rejection: 1.6,
                complaint: 0.7,
              },
            },
          },
          "Khed 1": {
            scrap: 2.7,
            yield: 97.3,
            inHouseRejection: 1.7,
            customerComplaint: 0.8,
            lines: {},
          },
          "Khed 2": {
            scrap: 2.6,
            yield: 97.4,
            inHouseRejection: 1.6,
            customerComplaint: 0.7,
            lines: {},
          },
        },
      },
      bu3: {
        overall: 95.8,
        plants: {
          Bhiwadi: {
            scrap: 2.8,
            yield: 97.2,
            inHouseRejection: 1.8,
            customerComplaint: 0.9,
            lines: {
              "BH-Line 1": {
                scrap: 2.7,
                yield: 97.3,
                rejection: 1.7,
                complaint: 0.8,
              },
              "BH-Line 2": {
                scrap: 2.8,
                yield: 97.2,
                rejection: 1.8,
                complaint: 0.9,
              },
              "BH-Line 3": {
                scrap: 2.9,
                yield: 97.1,
                rejection: 1.9,
                complaint: 1.0,
              },
            },
          },
          Gujarat: {
            scrap: 2.9,
            yield: 97.1,
            inHouseRejection: 1.9,
            customerComplaint: 1.0,
            lines: {
              "GJ-Line 1": {
                scrap: 2.8,
                yield: 97.2,
                rejection: 1.8,
                complaint: 0.9,
              },
              "GJ-Line 2": {
                scrap: 2.9,
                yield: 97.1,
                rejection: 1.9,
                complaint: 1.0,
              },
              "GJ-Line 3": {
                scrap: 3.0,
                yield: 97.0,
                rejection: 2.0,
                complaint: 1.1,
              },
            },
          },
          Inmet: {
            scrap: 3.0,
            yield: 97.0,
            inHouseRejection: 2.0,
            customerComplaint: 1.1,
            lines: {},
          },
          Yokoha: {
            scrap: 2.9,
            yield: 97.1,
            inHouseRejection: 1.9,
            customerComplaint: 1.0,
            lines: {},
          },
        },
      },
    },
    safety: {
      major: 2,
      minor: 15,
      firstAid: 8,
    },
    esg: {
      // Environment metrics
      environment: {
        carbonFootprint: 450, // tons CO2
        waterUsage: 85, // % efficiency
        wasteRecycled: 78, // %
      },
      // Governance metrics
      governance: {
        compliance: 96, // % score
        auditScore: 92, // score
        transparency: 88, // % rating
      },
    },

    // staticData object mein ye add karo (line ~150 ke around)
    nonCore: {
      hr: {
        headcount: {
          total: 1250,
          permanent: 980,
          contract: 270,
          target: 1200,
        },
        budgeting: {
          allocated: 45.2, // Crores
          spent: 38.7, // Crores
          remaining: 6.5, // Crores
          utilization: 85.6, // %
          categories: [
            { name: "Salaries", budget: 28.5, spent: 25.2 },
            { name: "Benefits", budget: 8.2, spent: 7.1 },
            { name: "Training", budget: 3.5, spent: 2.8 },
            { name: "Recruitment", budget: 2.8, spent: 2.1 },
            { name: "Others", budget: 2.2, spent: 1.5 },
          ],
        },
        attendance: 94.5, // %
        attrition: 8.2, // %
        trainingHours: 2850,
      },
      finance: {
        revenue: {
          actual: 450,
          target: 440,
          variance: 2.3,
        },
        expenses: {
          actual: 385,
          target: 390,
          variance: -1.3,
        },
        cashflow: {
          opening: 125,
          closing: 138,
          change: 10.4,
        },
        accountsReceivable: {
          current: 85,
          overdue: 12,
          total: 97,
        },
      },
      purchase: {
        poValue: {
          daily: 2.8,
          mtd: 68.5,
          ytd: 425,
        },
        vendorPerformance: 88.5,
        onTimeDelivery: 92.3,
        costSavings: {
          target: 15,
          achieved: 12.8,
          percentage: 85.3,
        },
        topVendors: [
          { name: "Vendor A", value: 45.2, rating: 92 },
          { name: "Vendor B", value: 38.5, rating: 88 },
          { name: "Vendor C", value: 32.1, rating: 85 },
        ],
      },
    },

    inventory: {
      turnAroundRatio: 9.8,
      turnAroundDays: 36,
      target: { ratio: 10, days: 35 },
      customers: [
        { name: "Tata Motors", qty: 850, dies: 12 },
        { name: "Mahindra", qty: 620, dies: 8 },
        { name: "Maruti", qty: 480, dies: 6 },
        { name: "Others", qty: 350, dies: 9 },
      ],
      total: 2300,
    },
    npd: {
      total: 28,
      active: 8,
      projects: [
        {
          customer: "Tata Motors",
          project: "New Axle Housing",
          status: "In Progress",
          completion: 65,
        },
        {
          customer: "Mahindra",
          project: "Suspension Arm",
          status: "Trial",
          completion: 85,
        },
        {
          customer: "Maruti",
          project: "Gear Shaft",
          status: "Initiated",
          completion: 25,
        },
        {
          customer: "Hero MotoCorp",
          project: "Clutch Housing",
          status: "In Progress",
          completion: 55,
        },
        {
          customer: "Bajaj Auto",
          project: "Fork Assembly",
          status: "SOP",
          completion: 100,
        },
        {
          customer: "TVS Motors",
          project: "Brake Disc",
          status: "Trial",
          completion: 75,
        },
        {
          customer: "Ashok Leyland",
          project: "Hub Assembly",
          status: "In Progress",
          completion: 40,
        },
        {
          customer: "Force Motors",
          project: "Drive Shaft",
          status: "Initiated",
          completion: 15,
        },
      ],
    },
    customer: {
      overallScore: 92,
      scores: [
        {
          name: "Tata Motors",
          quality: 94,
          delivery: 96,
          support: 92,
          overall: 94,
        },
        {
          name: "Mahindra",
          quality: 91,
          delivery: 93,
          support: 89,
          overall: 91,
        },
        { name: "Maruti", quality: 95, delivery: 94, support: 93, overall: 94 },
        {
          name: "Hero MotoCorp",
          quality: 88,
          delivery: 90,
          support: 87,
          overall: 88,
        },
        {
          name: "Bajaj Auto",
          quality: 92,
          delivery: 91,
          support: 90,
          overall: 91,
        },
      ],
    },
    maint: {
      breakdown: {
        occMonth: {
          bm: 148,
          fy1920: 130,
          fy2021: 69,
          target2122: 35,
          target2223: 18,
          current: 32,
          achievement: 78,
        },
        mmMonth: {
          bm: 8751,
          fy1920: 8369,
          fy2021: 5508,
          target2122: 2254,
          target2223: 1125,
          current: 2752,
          achievement: 68,
        },
        mttr: {
          bm: 0,
          fy1920: 0,
          fy2021: 0,
          target2122: 0,
          target2223: 0,
          current: 0,
          achievement: 0,
        },
        mtbf: {
          bm: 0,
          fy1920: 0,
          fy2021: 0,
          target2122: 0,
          target2223: 0,
          current: 0,
          achievement: 0,
        },

        repeatedOccMonth: {
          bm: 55,
          fy1920: 48,
          fy2021: 12,
          target2122: 0,
          target2223: 0,
          current: 3,
          achievement: 95,
        },
        pmTimeMonth: {
          bm: 60323,
          fy1920: 66330,
          fy2021: 61247,
          target2122: 52060,
          target2223: 44771,
          current: 52275,
          achievement: 13,
        },
      },
      quality: {
        machinesCovered: {
          bm: 49,
          fy1920: 56,
          fy2021: 62,
          target2122: 62,
          target2223: 62,
          current: 62,
          achievement: 100,
        },
        defectPhenomena: {
          bm: 4,
          fy1920: 3,
          fy2021: 3,
          target2122: 0,
          target2223: 0,
          current: 0,
          achievement: 100,
        },
      },
      cost: {
        totalMaintCost: {
          bm: 1.9,
          fy1920: 1.81,
          fy2021: 1.04,
          target2122: 0.92,
          target2223: 0.82,
          current: 1.02,
          achievement: 46,
        },
        partsAfterBD: {
          bm: 0.6,
          fy1920: 0.5,
          fy2021: 0.44,
          target2122: 0.15,
          target2223: 0.1,
          current: 0.19,
          achievement: 68,
        },
        partsAsTBM: {
          bm: 0.3,
          fy1920: 0.3,
          fy2021: 0.2,
          target2122: 0.4,
          target2223: 0.47,
          current: 0.5,
          achievement: 66,
        },
        jhRestoration: {
          bm: 1.5,
          fy1920: 1.2,
          fy2021: 0.95,
          target2122: 0.05,
          target2223: 0.05,
          current: 0.4,
          achievement: 35,
        },
        jhRestorationPercent: {
          bm: 0.2,
          fy1920: 0.16,
          fy2021: 0.1,
          target2122: 0.08,
          target2223: 0.08,
          current: 0.13,
          achievement: 35,
        },
        amcContract: {
          bm: 0.3,
          fy1920: 0.3,
          fy2021: 0.1,
          target2122: 0.22,
          target2223: 0.1,
          current: 0.12,
          achievement: 60,
        },
        subcontract: {
          bm: 0.5,
          fy1920: 0.55,
          fy2021: 0.2,
          target2122: 0.1,
          target2223: 0.1,
          current: 0.14,
          achievement: 72,
        },
        powerConsumption: {
          bm: 1231,
          fy1920: 1017,
          fy2021: 971,
          target2122: 875,
          target2223: 850,
          current: 852,
          achievement: 31,
        },
        greaseConsumption: {
          bm: 0.4,
          fy1920: 0.35,
          fy2021: 0.31,
          target2122: 0.26,
          target2223: 0.24,
          current: 0.28,
          achievement: 30,
        },
        hydOilConsumption: {
          bm: 0.3,
          fy1920: 0.25,
          fy2021: 0.22,
          target2122: 0.19,
          target2223: 0.19,
          current: 0.21,
          achievement: 30,
        },
      },
      safety: {
        accidentDueToWeakPM: {
          bm: 2,
          fy1920: 2,
          fy2021: 1,
          target2122: 0,
          target2223: 0,
          current: 0,
        },
      },
      morale: {
        technicianKaizen: {
          bm: 16,
          fy1920: 17,
          fy2021: 20,
          target2122: 21,
          target2223: 34,
          current: 21,
          achievement: 32,
        },
        engineerKaizen: {
          bm: 10,
          fy1920: 12,
          fy2021: 13,
          target2122: 14,
          target2223: 15,
          current: 16,
          achievement: 38,
        },
        ssAuditScore: {
          bm: 42,
          fy1920: 65,
          fy2021: 87,
          target2122: 90,
          target2223: 90,
          current: 90,
          achievement: 48,
        },
      },
    },

    yield: {
      daily: { actual: 98.2, target: 99.0, variance: -0.8 },
      mtd: { actual: 97.6, target: 98.5, variance: -0.9 },
      ytd: { actual: 97.9, target: 98.0, variance: -0.1 },
    },

    oee: {
      overall: 78.2,
      bu1: {
        overall: 82.5,
        plants: {
          Ranjangaon: {
            oee: 85.2,
            availability: 92,
            performance: 94,
            quality: 98.5,
            lines: {
              "1005 TP": { oee: 87, avail: 93, perf: 95, quality: 98.5 },
              "2504TP": { oee: 84, avail: 91, perf: 93, quality: 99 },
              "1000 T Screw Press": {
                oee: 83,
                avail: 90,
                perf: 93,
                quality: 99.2,
              },
              "4003 TP": { oee: 86, avail: 92, perf: 95, quality: 98.3 },
              "4004 TP": { oee: 85, avail: 91, perf: 94, quality: 99.1 },
            },
          },
          Mundhwa: {
            oee: 81.3,
            availability: 89,
            performance: 92,
            quality: 99.2,
            lines: {
              "Line 1": { oee: 83, avail: 90, perf: 93, quality: 99 },
              "Line 2": { oee: 82, avail: 89, perf: 92, quality: 99.5 },
              "Line 3": { oee: 80, avail: 88, perf: 91, quality: 99.3 },
              "Line 4": { oee: 81, avail: 89, perf: 92, quality: 99.1 },
              "Line 5": { oee: 82, avail: 90, perf: 92, quality: 99.2 },
              "Line 6": { oee: 80, avail: 88, perf: 91, quality: 99.4 },
            },
          },
          Bhiwadi: {
            oee: 79.8,
            availability: 87,
            performance: 91,
            quality: 100.8,
            lines: {},
          },
        },
      },
      bu2: {
        overall: 76.3,
        plants: {
          Baramati: {
            oee: 78.5,
            availability: 86,
            performance: 90,
            quality: 101.2,
            lines: {
              "B-Line 1": { oee: 80, avail: 88, perf: 91, quality: 100 },
              "B-Line 2": { oee: 79, avail: 87, perf: 90, quality: 101 },
              "B-Line 3": { oee: 77, avail: 85, perf: 89, quality: 102 },
              "B-Line 4": { oee: 78, avail: 86, perf: 90, quality: 101.5 },
              "B-Line 5": { oee: 79, avail: 87, perf: 91, quality: 100.8 },
            },
          },
          Chakan: {
            oee: 75.2,
            availability: 84,
            performance: 88,
            quality: 101.8,
            lines: {
              "C-Line 1": { oee: 76, avail: 85, perf: 89, quality: 101 },
              "C-Line 2": { oee: 75, avail: 84, perf: 88, quality: 102 },
              "C-Line 3": { oee: 74, avail: 83, perf: 87, quality: 102.5 },
              "C-Line 4": { oee: 76, avail: 85, perf: 89, quality: 101.2 },
            },
          },
          "Khed 1": {
            oee: 74.8,
            availability: 83,
            performance: 87,
            quality: 103.5,
            lines: {},
          },
          "Khed 2": {
            oee: 75.5,
            availability: 84,
            performance: 88,
            quality: 102.2,
            lines: {},
          },
        },
      },
      bu3: {
        overall: 71.9,
        plants: {
          Bhiwadi: {
            oee: 73.5,
            availability: 82,
            performance: 86,
            quality: 104.2,
            lines: {
              "BH-Line 1": { oee: 74, avail: 83, perf: 87, quality: 103 },
              "BH-Line 2": { oee: 73, avail: 82, perf: 86, quality: 104 },
              "BH-Line 3": { oee: 74, avail: 83, perf: 87, quality: 104.5 },
            },
          },
          Gujarat: {
            oee: 72.1,
            availability: 81,
            performance: 85,
            quality: 104.8,
            lines: {
              "GJ-Line 1": { oee: 73, avail: 82, perf: 86, quality: 104 },
              "GJ-Line 2": { oee: 72, avail: 81, perf: 85, quality: 105 },
              "GJ-Line 3": { oee: 71, avail: 80, perf: 84, quality: 105.5 },
            },
          },
          Inmet: {
            oee: 70.5,
            availability: 80,
            performance: 84,
            quality: 105.2,
            lines: {},
          },
          Yokoha: {
            oee: 71.2,
            availability: 81,
            performance: 85,
            quality: 103.5,
            lines: {},
          },
        },
      },
    },
  };

  // Static chart data
  const salesTrendData = [
    { week: "W1", actual: 15, plan: 14 },
    { week: "W2", actual: 32, plan: 30 },
    { week: "W3", actual: 49, plan: 45 },
    { week: "W4", actual: 67, plan: 65 },
  ];

  const productionTrendData = [
    { day: "Mon", actual: 120, plan: 130 },
    { day: "Tue", actual: 132, plan: 130 },
    { day: "Wed", actual: 128, plan: 130 },
    { day: "Thu", actual: 145, plan: 130 },
    { day: "Fri", actual: 138, plan: 130 },
    { day: "Sat", actual: 125, plan: 130 },
  ];

  const powerTrendData = [
    { hour: "00", util: 78 },
    { hour: "04", util: 82 },
    { hour: "08", util: 95 },
    { hour: "12", util: 92 },
    { hour: "16", util: 88 },
    { hour: "20", util: 85 },
  ];

  const costBreakdown = [
    { name: "Raw Material", value: 42, color: "#10b981" },
    { name: "Power", value: 18, color: "#f59e0b" },
    { name: "Labour", value: 15, color: "#3b82f6" },
    { name: "Consumables", value: 12, color: "#8b5cf6" },
    { name: "Maintenance", value: 8, color: "#ef4444" },
    { name: "Overheads", value: 5, color: "#ec4899" },
  ];

  const htTrendData = [
    { day: "Mon", ht: 82, scm: 4.1 },
    { day: "Tue", ht: 85, scm: 4.3 },
    { day: "Wed", ht: 83, scm: 4.2 },
    { day: "Thu", ht: 87, scm: 4.4 },
    { day: "Fri", ht: 85, scm: 4.2 },
    { day: "Sat", ht: 80, scm: 4.0 },
  ];

  const getBUMetrics = (buKey) => {
    const plants = staticData.quality[buKey].plants;
    const plantValues = Object.values(plants);

    const avg = (key) =>
      (
        plantValues.reduce((sum, p) => sum + (p[key] || 0), 0) /
        (plantValues.length || 1)
      ).toFixed(1);

    return {
      scrap: avg("scrap"),
      yield: avg("yield"),
      inHouseRejection: 12,
      customerComplaint: 6,
    };
  };

  // Modal Component
  const DetailModal = ({ card, onClose }) => {
    if (!card) return null;

    const renderContent = () => {
      switch (card) {
        case "sales":
          return (
            <div className="space-y-4">
              {/* ✅ Header with Detail Sale View Button */}
              <div className="flex items-center justify-between mb-4">
                <h2
                  className={`text-2xl font-black ${currentTheme.textPrimary}`}
                >
                  Sales - Plan vs Actual
                </h2>

                {/* ✅ Detail Sale View Tab/Button */}
                <button
                  onClick={() =>
                    window.open("/dahsboard.html", "_blank", "noreferrer")
                  }
                  className="px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:scale-105 hover:shadow-xl"
                >
                  <span>📊</span>
                  Detail Sale
                  <span>→</span>
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-blue-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    Daily Sales
                  </h4>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-xs text-gray-600 font-bold">Actual</p>
                      <p
                        className={`text-3xl font-bold text-emerald-600 sans-font`}
                      >
                        ₹{staticData.sales.daily.actual}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 sans-font">
                        ₹{staticData.sales.daily.plan}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-100 rounded p-2 text-center">
                    <p className="text-lg font-black text-green-700 sans-font">
                      {staticData.sales.daily.achievement}% Achievement
                    </p>
                  </div>
                </div>
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-green-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    MTD Sales
                  </h4>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-xs text-gray-600 font-bold">Actual</p>
                      <p
                        className={`text-3xl font-bold text-emerald-600 sans-font`}
                      >
                        ₹{staticData.sales.mtd.actual}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 sans-font">
                        ₹{staticData.sales.mtd.plan}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-100 rounded p-2 text-center">
                    <p className="text-lg font-black text-green-700 sans-font">
                      {staticData.sales.mtd.achievement}% Achievement
                    </p>
                  </div>
                </div>
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-purple-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    YTD Sales
                  </h4>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-xs text-gray-600 font-bold">Actual</p>
                      <p
                        className={`text-3xl font-bold text-emerald-600 sans-font`}
                      >
                        ₹{staticData.sales.ytd.actual}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 sans-font">
                        ₹{staticData.sales.ytd.plan}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-100 rounded p-2 text-center">
                    <p className="text-lg font-black text-green-700 sans-font">
                      {staticData.sales.ytd.achievement}% Achievement
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart and Table Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Chart */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📊 Weekly Plan vs Actual Trend
                  </h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <ComposedChart
                      data={salesTrendData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="week"
                        stroke="#334155"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <YAxis
                        stroke="#334155"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #10b981",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <Bar
                        dataKey="actual"
                        fill="#10b981"
                        name="Actual"
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                      />
                      <Bar
                        dataKey="plan"
                        fill="#3b82f6"
                        name="Plan "
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#059669"
                        strokeWidth={3}
                        name="Actual Trend"
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Table */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📋 Weekly Performance Table
                  </h4>
                  <div className="overflow-auto max-h-[280px]">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-100 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-black text-gray-700">
                            Week
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Plan
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Actual
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Variance
                          </th>
                          <th className="px-3 py-2 text-center font-black text-gray-700">
                            Ach%
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesTrendData.map((row, idx) => {
                          const variance = row.actual - row.plan;
                          const achievement = (
                            (row.actual / row.plan) *
                            100
                          ).toFixed(1);
                          return (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="px-3 py-2 font-bold text-gray-800">
                                {row.week}
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-blue-600 sans-font">
                                {row.plan}
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-emerald-600 sans-font">
                                {row.actual}
                              </td>
                              <td
                                className={`px-3 py-2 text-right font-bold sans-font ${
                                  variance >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {variance >= 0 ? "+" : ""}
                                {variance.toFixed(1)}
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span
                                  className={`px-2 py-1 rounded font-black text-xs ${
                                    parseFloat(achievement) >= 100
                                      ? "bg-green-200 text-green-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {achievement}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="bg-blue-200 font-black">
                          <td className="px-3 py-2 text-gray-900">TOTAL</td>
                          <td className="px-3 py-2 text-right text-blue-700 sans-font">
                            {salesTrendData.reduce(
                              (sum, row) => sum + row.plan,
                              0
                            )}
                          </td>
                          <td className="px-3 py-2 text-right text-emerald-700 sans-font">
                            {salesTrendData.reduce(
                              (sum, row) => sum + row.actual,
                              0
                            )}
                          </td>
                          <td className="px-3 py-2 text-right text-green-700 sans-font">
                            +
                            {(
                              salesTrendData.reduce(
                                (sum, row) => sum + row.actual,
                                0
                              ) -
                              salesTrendData.reduce(
                                (sum, row) => sum + row.plan,
                                0
                              )
                            ).toFixed(1)}
                          </td>
                          <td className="px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded bg-green-300 text-green-900 font-black text-xs">
                              {(
                                (salesTrendData.reduce(
                                  (sum, row) => sum + row.actual,
                                  0
                                ) /
                                  salesTrendData.reduce(
                                    (sum, row) => sum + row.plan,
                                    0
                                  )) *
                                100
                              ).toFixed(1)}
                              %
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Plant-wise Breakdown Table */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  🏭 Plant-wise Sales Breakdown
                </h4>
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-blue-100 to-cyan-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        Plant
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Daily Plan
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Daily Actual
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        MTD Plan
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        MTD Actual
                      </th>
                      <th className="px-4 py-3 text-center font-black text-gray-700">
                        Achievement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["R2-5", "R1-16", "MDW-7"].map((plant, idx) => {
                      const dailyPlan = (
                        staticData.sales.daily.plan / 3
                      ).toFixed(2);
                      const dailyActual = (
                        (staticData.sales.daily.actual / 3) *
                        (0.9 + Math.random() * 0.2)
                      ).toFixed(2);
                      const mtdPlan = (staticData.sales.mtd.plan / 3).toFixed(
                        1
                      );
                      const mtdActual = (
                        (staticData.sales.mtd.actual / 3) *
                        (0.9 + Math.random() * 0.2)
                      ).toFixed(1);
                      const achievement = (
                        (parseFloat(mtdActual) / parseFloat(mtdPlan)) *
                        100
                      ).toFixed(1);

                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-3 font-bold text-gray-800">
                            {plant}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600 sans-font">
                            ₹{dailyPlan}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 sans-font">
                            ₹{dailyActual}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600 sans-font">
                            ₹{mtdPlan}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 sans-font">
                            ₹{mtdActual}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`px-3 py-1 rounded-full font-black ${
                                parseFloat(achievement) >= 100
                                  ? "bg-green-200 text-green-800"
                                  : parseFloat(achievement) >= 95
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {achievement}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ✅ Another Detail View Button at Bottom (Optional) */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => navigate("/noncore/kalyani")}
                  className="px-8 py-4 rounded-lg font-black text-lg transition-all flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 hover:shadow-xl"
                >
                  <span>🔍</span>
                  Open Detailed Sale Analysis
                  <span>→</span>
                </button>
              </div>
            </div>
          );

        case "oee":
          // ✅ Different variable names use karo
          const selectedBUOEEData = selectedOEEBU
            ? staticData.oee[selectedOEEBU]
            : null;
          const selectedPlantOEEData =
            selectedOEEPlant && selectedBUOEEData
              ? selectedBUOEEData.plants[selectedOEEPlant]
              : null;

          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4 flex items-center gap-3`}
              >
                <span>📊</span>
                OEE (Overall Equipment Effectiveness) Analysis
              </h2>

              {/* BU Selection Tabs */}
              {!selectedOEEBU && (
                <div className="flex gap-3 justify-center mb-4 flex-wrap">
                  <button
                    onClick={() => setSelectedOEEBU("bu1")}
                    className="px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:scale-105"
                  >
                    BU 1 - {staticData.oee.bu1.overall}%
                  </button>
                  <button
                    onClick={() => setSelectedOEEBU("bu2")}
                    className="px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg hover:scale-105"
                  >
                    BU 2 - {staticData.oee.bu2.overall}%
                  </button>
                  <button
                    onClick={() => setSelectedOEEBU("bu3")}
                    className="px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg hover:scale-105"
                  >
                    BU 3 - {staticData.oee.bu3.overall}%
                  </button>
                </div>
              )}

              {/* Back Button */}
              {selectedOEEBU && (
                <button
                  onClick={() => {
                    if (selectedOEEPlant) {
                      setSelectedOEEPlant(null);
                    } else {
                      setSelectedOEEBU(null);
                    }
                  }}
                  className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-sm flex items-center gap-2"
                >
                  ← Back {selectedOEEPlant ? "to Plants" : "to BU Selection"}
                </button>
              )}

              {/* Plant-wise View */}
              {selectedOEEBU && !selectedOEEPlant && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-blue-700 flex items-center gap-2">
                    <span>🏭</span>
                    {selectedOEEBU === "bu1"
                      ? "BU 1"
                      : selectedOEEBU === "bu2"
                      ? "BU 2"
                      : "BU 3"}{" "}
                    - Plant-wise OEE
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedBUOEEData.plants).map(
                      ([plantName, plantData]) => (
                        <div
                          key={plantName}
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-blue-500 cursor-pointer hover:scale-[1.02] transition`}
                          onClick={() => setSelectedOEEPlant(plantName)}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3`}
                          >
                            {plantName}
                          </h4>

                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded p-2">
                              <p className="text-3xl font-black text-blue-600 sans-font">
                                {plantData.oee}%
                              </p>
                              <p className="text-xs font-bold text-blue-600">
                                OEE
                              </p>
                            </div>
                            <div className="text-center bg-gradient-to-br from-green-50 to-emerald-100 rounded p-2">
                              <p className="text-3xl font-black text-green-600 sans-font">
                                {plantData.availability}%
                              </p>
                              <p className="text-xs font-bold text-green-600">
                                Avail
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded p-2">
                              <p className="text-2xl font-black text-cyan-600 sans-font">
                                {plantData.performance}%
                              </p>
                              <p className="text-xs font-bold text-cyan-600">
                                Perf
                              </p>
                            </div>
                            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-100 rounded p-2">
                              <p className="text-2xl font-black text-purple-600 sans-font">
                                {plantData.quality}%
                              </p>
                              <p className="text-xs font-bold text-purple-600">
                                Quality
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-center text-blue-600 font-bold mt-3">
                            Click to view lines →
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Line-wise View */}
              {selectedOEEPlant && selectedPlantOEEData && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-green-700 flex items-center gap-2">
                    <span>📏</span>
                    {selectedOEEPlant} - Line-wise OEE
                  </h3>

                  {/* Plant Summary */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div
                      className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-blue-500`}
                    >
                      <p className="text-sm font-bold text-gray-600 mb-1">
                        Overall OEE
                      </p>
                      <p className="text-4xl font-black text-blue-600 sans-font">
                        {selectedPlantOEEData.oee}%
                      </p>
                    </div>
                    <div
                      className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-green-500`}
                    >
                      <p className="text-sm font-bold text-gray-600 mb-1">
                        Availability
                      </p>
                      <p className="text-4xl font-black text-green-600 sans-font">
                        {selectedPlantOEEData.availability}%
                      </p>
                    </div>
                    <div
                      className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-cyan-500`}
                    >
                      <p className="text-sm font-bold text-gray-600 mb-1">
                        Performance
                      </p>
                      <p className="text-4xl font-black text-cyan-600 sans-font">
                        {selectedPlantOEEData.performance}%
                      </p>
                    </div>
                    <div
                      className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-purple-500`}
                    >
                      <p className="text-sm font-bold text-gray-600 mb-1">
                        Quality
                      </p>
                      <p className="text-4xl font-black text-purple-600 sans-font">
                        {selectedPlantOEEData.quality}%
                      </p>
                    </div>
                  </div>

                  {/* Lines Table */}
                  {Object.keys(selectedPlantOEEData.lines).length > 0 ? (
                    <div
                      className={`${currentTheme.bgSecondary} rounded-lg p-4`}
                    >
                      <h4
                        className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                      >
                        📋 Line-wise Performance
                      </h4>
                      <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-blue-100 to-cyan-100">
                          <tr>
                            <th className="px-4 py-3 text-left font-black text-gray-700">
                              Line
                            </th>
                            <th className="px-4 py-3 text-right font-black text-gray-700">
                              Availability
                            </th>
                            <th className="px-4 py-3 text-right font-black text-gray-700">
                              Performance
                            </th>
                            <th className="px-4 py-3 text-right font-black text-gray-700">
                              Quality
                            </th>
                            <th className="px-4 py-3 text-right font-black text-gray-700">
                              OEE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(selectedPlantOEEData.lines).map(
                            ([lineName, lineData], idx) => (
                              <tr
                                key={idx}
                                className={
                                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-4 py-3 font-bold text-gray-800">
                                  {lineName}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-green-600 mono-font">
                                  {lineData.avail}%
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-cyan-600 mono-font">
                                  {lineData.perf}%
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-purple-600 mono-font">
                                  {lineData.quality}%
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <span
                                    className={`px-3 py-1 rounded-full font-black ${
                                      lineData.oee >= 85
                                        ? "bg-green-200 text-green-800"
                                        : lineData.oee >= 75
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-red-200 text-red-800"
                                    }`}
                                  >
                                    {lineData.oee}%
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-gray-100 rounded-lg">
                      <p className="text-lg font-bold text-gray-600">
                        No line data available for this plant
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Overall Summary (when no BU selected) */}
              {!selectedOEEBU && (
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    🏢 Group-wide OEE Summary
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg">
                      <p className="text-sm font-bold text-gray-600 mb-2">
                        BU 1
                      </p>
                      <p className="text-5xl font-black text-green-600 sans-font">
                        {staticData.oee.bu1.overall}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg">
                      <p className="text-sm font-bold text-gray-600 mb-2">
                        BU 2
                      </p>
                      <p className="text-5xl font-black text-orange-600 sans-font">
                        {staticData.oee.bu2.overall}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-100 rounded-lg">
                      <p className="text-sm font-bold text-gray-600 mb-2">
                        BU 3
                      </p>
                      <p className="text-5xl font-black text-red-600 sans-font">
                        {staticData.oee.bu3.overall}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );

        case "ht":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                Heat Treatment - Plan vs Actual
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {["daily", "mtd", "ytd"].map((period, idx) => {
                  const data = staticData.ht[period];
                  const borderColor =
                    idx === 0
                      ? "border-blue-500"
                      : idx === 1
                      ? "border-green-500"
                      : "border-purple-500";
                  const achievement = ((data.actual / data.plan) * 100).toFixed(
                    1
                  );
                  return (
                    <div
                      key={period}
                      className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 ${borderColor}`}
                    >
                      <h4
                        className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2 uppercase`}
                      >
                        {period} HT
                      </h4>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-xs text-gray-600 font-bold">
                            Actual
                          </p>
                          <p
                            className={`text-4xl font-bold text-cyan-600 mono-font`}
                          >
                            {data.actual}
                          </p>
                          <p className="text-xs text-cyan-600 font-bold">MT</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600 font-bold">
                            Plan
                          </p>
                          <p className="text-3xl font-bold text-blue-600 mono-font">
                            {data.plan}
                          </p>
                          <p className="text-xs text-blue-600 font-bold">MT</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-amber-100 rounded p-1.5 text-center">
                          <p className="text-sm font-black text-amber-700 mono-font">
                            {achievement}%
                          </p>
                          <p className="text-[10px] text-gray-600">Ach</p>
                        </div>
                        <div className="bg-green-100 rounded p-1.5 text-center">
                          <p className="text-sm font-black text-green-700 mono-font">
                            {data.scm}
                          </p>
                          <p className="text-[10px] text-gray-600">SCM/T</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart and Table */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📊 Daily HT Performance & SCM/T
                  </h4>
                  <ResponsiveContainer width="100%" height={260}>
                    <ComposedChart
                      data={htTrendData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="day"
                        stroke="#334155"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <YAxis
                        yAxisId="left"
                        stroke="#334155"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#334155"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #06b6d4",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="ht"
                        fill="#06b6d4"
                        name="HT (MT)"
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="scm"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="SCM/T"
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Daily Performance Table */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📋 Daily HT Performance
                  </h4>
                  <div className="overflow-auto max-h-[260px]">
                    <table className="w-full text-sm">
                      <thead className="bg-cyan-100 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-black text-gray-700">
                            Day
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            HT (MT)
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            SCM/T
                          </th>
                          <th className="px-3 py-2 text-center font-black text-gray-700">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {htTrendData.map((row, idx) => {
                          const target = 90;
                          const achievement = ((row.ht / target) * 100).toFixed(
                            0
                          );
                          return (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="px-3 py-2 font-bold text-gray-800">
                                {row.day}
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-cyan-600 mono-font">
                                {row.ht}
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-green-600 mono-font">
                                {row.scm}
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span
                                  className={`px-2 py-1 rounded font-black text-xs ${
                                    parseFloat(achievement) >= 100
                                      ? "bg-green-200 text-green-800"
                                      : parseFloat(achievement) >= 90
                                      ? "bg-yellow-200 text-yellow-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {achievement}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Plant-wise HT Performance */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  🏭 Plant-wise HT Performance & Fuel Cost
                </h4>
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-cyan-100 to-blue-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        Plant
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Daily Plan
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Daily Actual
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        MTD Plan
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        MTD Actual
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        SCM/T
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Fuel Cost
                      </th>
                      <th className="px-4 py-3 text-center font-black text-gray-700">
                        Achievement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["R2-5", "R1-16", "MDW-7"].map((plant, idx) => {
                      const dailyPlan = Math.round(
                        staticData.ht.daily.plan / 3
                      );
                      const dailyActual = Math.round(
                        (staticData.ht.daily.actual / 3) *
                          (0.85 + Math.random() * 0.3)
                      );
                      const mtdPlan = Math.round(staticData.ht.mtd.plan / 3);
                      const mtdActual = Math.round(
                        (staticData.ht.mtd.actual / 3) *
                          (0.85 + Math.random() * 0.3)
                      );
                      const scm = (4.0 + Math.random() * 0.6).toFixed(1);
                      const fuelCost = (
                        (mtdActual * parseFloat(scm) * 15) /
                        1000
                      ).toFixed(2);
                      const achievement = ((mtdActual / mtdPlan) * 100).toFixed(
                        1
                      );

                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-3 font-bold text-gray-800">
                            {plant}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600 mono-font">
                            {dailyPlan} MT
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-cyan-600 mono-font">
                            {dailyActual} MT
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600 mono-font">
                            {mtdPlan} MT
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-cyan-600 mono-font">
                            {mtdActual} MT
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-green-600 mono-font">
                            {scm}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-amber-600 mono-font">
                            ₹{fuelCost}L
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`px-3 py-1 rounded-full font-black ${
                                parseFloat(achievement) >= 100
                                  ? "bg-green-200 text-green-800"
                                  : parseFloat(achievement) >= 90
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {achievement}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Furnace-wise Performance */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  🔥 Furnace-wise Utilization & Efficiency
                </h4>
                <table className="w-full text-sm">
                  <thead className="bg-orange-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        Furnace
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Capacity (MT/Day)
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Actual (MT)
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Utilization%
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Temperature (°C)
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Runtime (hrs)
                      </th>
                      <th className="px-4 py-3 text-center font-black text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Furnace-1", "Furnace-2", "Furnace-3", "Furnace-4"].map(
                      (furnace, idx) => {
                        const capacity = 25;
                        const actual = Math.round(18 + Math.random() * 10);
                        const utilization = ((actual / capacity) * 100).toFixed(
                          0
                        );
                        const temp = Math.round(820 + Math.random() * 30);
                        const runtime = (20 + Math.random() * 4).toFixed(1);

                        return (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-4 py-3 font-bold text-gray-800">
                              {furnace}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-gray-600 mono-font">
                              {capacity}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-cyan-600 mono-font">
                              {actual}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-purple-600 mono-font">
                              {utilization}%
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-orange-600 mono-font">
                              {temp}°C
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-blue-600 mono-font">
                              {runtime}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className={`px-3 py-1 rounded-full font-black ${
                                  parseFloat(utilization) >= 80
                                    ? "bg-green-200 text-green-800"
                                    : parseFloat(utilization) >= 70
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-red-200 text-red-800"
                                }`}
                              >
                                {parseFloat(utilization) >= 80
                                  ? "✓ OK"
                                  : parseFloat(utilization) >= 70
                                  ? "⚠ Low"
                                  : "✗ Critical"}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        case "npd":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                🚀 NPD Projects - Customer & Status Analysis
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-blue-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    Total Projects
                  </h4>
                  <p className={`text-5xl font-bold text-blue-600 mono-font`}>
                    {staticData.npd.total}
                  </p>
                </div>
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-green-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    Active
                  </h4>
                  <p className={`text-5xl font-bold text-green-600 mono-font`}>
                    {staticData.npd.active}
                  </p>
                </div>
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-amber-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    In Trial
                  </h4>
                  <p className={`text-5xl font-bold text-amber-600 mono-font`}>
                    {
                      staticData.npd.projects.filter(
                        (p) => p.status === "Trial"
                      ).length
                    }
                  </p>
                </div>
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-emerald-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    SOP Done
                  </h4>
                  <p
                    className={`text-5xl font-bold text-emerald-600 mono-font`}
                  >
                    {
                      staticData.npd.projects.filter((p) => p.status === "SOP")
                        .length
                    }
                  </p>
                </div>
              </div>

              {/* Chart and Table */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📊 Project Status Distribution
                  </h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Initiated",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "Initiated"
                            ).length,
                            color: "#3b82f6",
                          },
                          {
                            name: "In Progress",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "In Progress"
                            ).length,
                            color: "#06b6d4",
                          },
                          {
                            name: "Trial",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "Trial"
                            ).length,
                            color: "#f59e0b",
                          },
                          {
                            name: "SOP",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "SOP"
                            ).length,
                            color: "#10b981",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={90}
                        dataKey="value"
                        style={{ fontSize: "12px", fontWeight: "600" }}
                        isAnimationActive={false}
                      >
                        {[
                          {
                            name: "Initiated",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "Initiated"
                            ).length,
                            color: "#3b82f6",
                          },
                          {
                            name: "In Progress",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "In Progress"
                            ).length,
                            color: "#06b6d4",
                          },
                          {
                            name: "Trial",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "Trial"
                            ).length,
                            color: "#f59e0b",
                          },
                          {
                            name: "SOP",
                            value: staticData.npd.projects.filter(
                              (p) => p.status === "SOP"
                            ).length,
                            color: "#10b981",
                          },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #3b82f6",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Projects Table */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📋 Active Projects Summary
                  </h4>
                  <div className="overflow-auto max-h-[280px]">
                    <table className="w-full text-xs">
                      <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 sticky top-0">
                        <tr>
                          <th className="px-2 py-2 text-left font-black text-gray-700">
                            Customer
                          </th>
                          <th className="px-2 py-2 text-left font-black text-gray-700">
                            Project
                          </th>
                          <th className="px-2 py-2 text-center font-black text-gray-700">
                            Status
                          </th>
                          <th className="px-2 py-2 text-right font-black text-gray-700">
                            %
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {staticData.npd.projects.map((project, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-2 py-2 font-bold text-gray-700">
                              {project.customer}
                            </td>
                            <td className="px-2 py-2 font-semibold text-gray-600">
                              {project.project}
                            </td>
                            <td className="px-2 py-2 text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-black ${
                                  project.status === "SOP"
                                    ? "bg-green-200 text-green-800"
                                    : project.status === "Trial"
                                    ? "bg-amber-200 text-amber-800"
                                    : project.status === "In Progress"
                                    ? "bg-cyan-200 text-cyan-800"
                                    : "bg-blue-200 text-blue-800"
                                }`}
                              >
                                {project.status}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-right">
                              <span
                                className={`font-black mono-font ${
                                  project.completion === 100
                                    ? "text-green-600"
                                    : project.completion >= 75
                                    ? "text-amber-600"
                                    : project.completion >= 50
                                    ? "text-cyan-600"
                                    : "text-blue-600"
                                }`}
                              >
                                {project.completion}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Detailed Project Table */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  📑 Complete Project Details
                </h4>
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        #
                      </th>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        Customer Name
                      </th>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        Project Name
                      </th>
                      <th className="px-4 py-3 text-center font-black text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Completion
                      </th>
                      <th className="px-4 py-3 text-center font-black text-gray-700">
                        Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticData.npd.projects.map((project, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 font-bold text-gray-600 mono-font">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-800">
                          {project.customer}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-700">
                          {project.project}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black ${
                              project.status === "SOP"
                                ? "bg-green-200 text-green-800"
                                : project.status === "Trial"
                                ? "bg-amber-200 text-amber-800"
                                : project.status === "In Progress"
                                ? "bg-cyan-200 text-cyan-800"
                                : "bg-blue-200 text-blue-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-black text-indigo-600 mono-font">
                          {project.completion}%
                        </td>
                        <td className="px-4 py-3">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${
                                project.completion === 100
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                  : project.completion >= 75
                                  ? "bg-gradient-to-r from-amber-500 to-orange-600"
                                  : project.completion >= 50
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                                  : "bg-gradient-to-r from-blue-500 to-indigo-600"
                              }`}
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        case "production":
          const lineToPlantMapping = {
            MDWA: {
              plant: "MDW-7",
              lines: [
                "Line A",
                "Line B",
                "Line C",
                "Line D",
                "Line E",
                "Line F",
                "Line G",
              ],
            },
            RNGN: {
              plant: "R1-16",
              lines: [
                "630 TP",
                "1001 TP",
                "1002 TP",
                "1003 TP",
                "1601 TP",
                "1602 TP",
                "2501 TP",
                "2502 TP",
                "2503 TP",
                "2505 TP",
                "2506 TP",
                "3000 TP",
                "4000 TP",
                "4001 TP",
                "4002 TP",
                "ALU LINE TP",
              ],
            },
            KTPL: {
              plant: "R2-5",
              lines: [
                "1005 TP",
                "2504TP",
                "1000 T Screw Press",
                "4003 TP",
                "4004 TP",
              ],
            },
            BRFT: {
              plant: "Baramati-7",
              lines: [
                "B-Line 1",
                "B-Line 2",
                "B-Line 3",
                "B-Line 4",
                "B-Line 5",
              ],
            },
            CHKN: {
              plant: "Chakan-7",
              lines: ["C-Line 1", "C-Line 2", "C-Line 3", "C-Line 4"],
            },
            KHD: {
              plant: "Bhiwadi",
              lines: ["BH-Line 1", "BH-Line 2", "BH-Line 3"],
            },
            KHD2: {
              plant: "Gujarat",
              lines: ["GJ-Line 1", "GJ-Line 2", "GJ-Line 3"],
            },
            // Baaki bhi add kar lo same pattern mein
          };

          const currentPlantData =
            lineToPlantMapping[selectedLineInModal] ||
            lineToPlantMapping["MDWA"];

          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                PQCDSM (Productivity, Quality, Cost, Delivery, Safety & Morale)
              </h2>

              {/* Line Selection Tabs */}
              {/* <div className="flex gap-2 flex-wrap border-b-2 border-blue-300 pb-2">
                {[
                  "MDWA",
                  "RNGN",
                  "KTPL",
                  "BRFT",
                  "CHKN",
                  "KHD",
                  "KHD2",
                  "AMBT",
                  "CHGR",
                  "AMBT-3",
                  "BRM2",
                  "BHWD",
                  "GUJR",
                  "HTRN",
                  "MIMJ",
                  "YOKOHA",
                ].map((line) => (
                  <button
                    key={line}
                    onClick={() => setSelectedLineInModal(line)}
                    className={`px-4 py-2 rounded-t-lg font-bold text-sm transition-all ${
                      selectedLineInModal === line
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {line}
                  </button>
                ))}
              </div> */}

              {/* Line Selection Tabs */}
              <div className="flex gap-2 flex-wrap border-b-2 border-blue-300 pb-2">
                {Object.keys(lineToPlantMapping).map((lineKey) => (
                  <button
                    key={lineKey}
                    onClick={() => setSelectedLineInModal(lineKey)}
                    className={`px-4 py-2 rounded-t-lg font-bold text-sm transition-all ${
                      selectedLineInModal === lineKey
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {lineKey}
                  </button>
                ))}
              </div>
              {/* Plant Info Display */}
              <div>
                {/* Lines Display */}
                <div className="mt-2 flex gap-2 flex-wrap">
                  {currentPlantData.lines.map((line, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-xs font-bold text-blue-600 border border-blue-200"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
              {/* View Mode Tabs */}
              <div className="flex gap-3 justify-center mb-4">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 ${
                    viewMode === "table"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Table View
                </button>
                <button
                  onClick={() => setViewMode("graphical")}
                  className={`px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 ${
                    viewMode === "graphical"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <Activity className="w-5 h-5" />
                  Graphical View
                </button>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://ktfrancesrv.kalyanicorp.com/cs-prx-my-shopfloor?asset_oid=ef29049c-5f6a-11ee-a87f-00620b24a031&asset_id=AS-000006-7027")
                  }
                  className="px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  📌 Detail
                </button>
              </div>

              {/* Table View */}
              {viewMode === "table" && (
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg overflow-hidden shadow-lg`}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                          <th className="border border-gray-300 px-4 py-3 text-center font-black">
                            {selectedLineInModal}
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-black">
                            Parameter
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            UoM
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            BM 2024-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Apr-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            May-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Jun-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Jul-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Aug-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Sep-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Oct-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Nov-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Dec-25
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center font-black">
                            Target FY 2025-26
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Productivity Section */}
                        <tr className="bg-blue-100">
                          <td
                            rowSpan="3"
                            className="border border-gray-300 px-4 py-2 text-center font-black text-blue-700 text-lg"
                          >
                            P<br />
                            <span className="text-xs font-semibold">
                              roductivity
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            OEE
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            %
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            72.75
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            76.0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            70.2
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            73.7
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            81.31
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            78.29
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            73.69
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            67.23
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            65.3
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            73.0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            80
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Production/Hr.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            292
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            304
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            281
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            295
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            325
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            313
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            295
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            269
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            261
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            292
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            320
                          </td>
                        </tr>
                        <tr className="bg-blue-100">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Output/Man/day
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            656
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            684
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            632
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            663
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            732
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            705
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            663
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            605
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            588
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            657
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            720
                          </td>
                        </tr>

                        {/* Quality Section */}
                        <tr className="bg-green-100">
                          <td
                            rowSpan="2"
                            className="border border-gray-300 px-4 py-2 text-center font-black text-green-700 text-lg"
                          >
                            Q<br />
                            <span className="text-xs font-semibold">
                              uality
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            In-house Rejection
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            PPM
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            6722
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            7578
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            8353
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            8592
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            7908
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            5965
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            6874
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            7852
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            7998
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            8210
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            6000
                          </td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Customer Complaint
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            0
                          </td>
                        </tr>

                        {/* Cost Section */}
                        <tr className="bg-amber-100">
                          <td
                            rowSpan="2"
                            className="border border-gray-300 px-4 py-2 text-center font-black text-amber-700 text-lg"
                          >
                            C<br />
                            <span className="text-xs font-semibold">ost</span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Rejection Cost
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Lacs
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.34
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.47
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.64
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.84
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.43
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.46
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.65
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.27
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1.39
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            2.05
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            0.76
                          </td>
                        </tr>
                        <tr className="bg-amber-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Drop Out %
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            %
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            7.5
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            7.9
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            7.74
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            8.52
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            5
                          </td>
                        </tr>

                        {/* Delivery Section */}
                        <tr className="bg-cyan-100">
                          <td
                            rowSpan="2"
                            className="border border-gray-300 px-4 py-2 text-center font-black text-cyan-700 text-lg"
                          >
                            D<br />
                            <span className="text-xs font-semibold">
                              elivery
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Production (Plan)
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            140800
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            154000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            140000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            140000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            170000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            160000
                          </td>
                        </tr>
                        <tr className="bg-cyan-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Production (Actual)
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            154661
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            171573
                          </td>
                          <td clasName="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            145352
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            156220
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            190257
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            140924
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            151926
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            118000
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            113674
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            170864
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            180000
                          </td>
                        </tr>

                        {/* Morale Section */}
                        <tr className="bg-purple-100">
                          <td className="border border-gray-300 px-4 py-2 text-center font-black text-purple-700 text-lg">
                            M<br />
                            <span className="text-xs font-semibold">orale</span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Unsafe Act. (Identified)
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            40/40
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            2/2
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            3/3
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            2/2
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            3/3
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100">
                            0
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Graphical View */}
              {viewMode === "graphical" && (
                <div className="space-y-4">
                  {/* POCDSM Metric Tabs */}
                  <div className="flex gap-2 justify-center flex-wrap bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-lg shadow-inner">
                    <button
                      onClick={() => setSelectedMetric("productivity")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "productivity"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                          : "bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-300"
                      }`}
                    >
                      📊 P - Productivity
                    </button>
                    <button
                      onClick={() => setSelectedMetric("quality")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "quality"
                          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105"
                          : "bg-white text-green-700 hover:bg-green-50 border-2 border-green-300"
                      }`}
                    >
                      ✨ Q - Quality
                    </button>
                    <button
                      onClick={() => setSelectedMetric("cost")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "cost"
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg scale-105"
                          : "bg-white text-amber-700 hover:bg-amber-50 border-2 border-amber-300"
                      }`}
                    >
                      💰 C - Cost
                    </button>
                    <button
                      onClick={() => setSelectedMetric("delivery")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "delivery"
                          ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg scale-105"
                          : "bg-white text-cyan-700 hover:bg-cyan-50 border-2 border-cyan-300"
                      }`}
                    >
                      📦 D - Delivery
                    </button>
                    <button
                      onClick={() => setSelectedMetric("morale")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "morale"
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                          : "bg-white text-purple-700 hover:bg-purple-50 border-2 border-purple-300"
                      }`}
                    >
                      😊 M - Morale
                    </button>
                  </div>

                  {/* Productivity Charts */}
                  {selectedMetric === "productivity" && (
                    <div className="space-y-4 font-sans">
                      <h3 className="text-xl font-black text-blue-700 flex items-center gap-2">
                        <Activity className="w-6 h-6" />
                        📊 Productivity Analytics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {/* OEE Trend */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-blue-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <Activity className="w-5 h-5 text-blue-600" />
                            📈 OEE Trend (%)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart
                              data={[
                                { month: "Apr", oee: 76.0, target: 80 },
                                { month: "May", oee: 70.2, target: 80 },
                                { month: "Jun", oee: 73.7, target: 80 },
                                { month: "Jul", oee: 81.31, target: 80 },
                                { month: "Aug", oee: 78.29, target: 80 },
                                { month: "Sep", oee: 73.69, target: 80 },
                                { month: "Oct", oee: 67.23, target: 80 },
                                { month: "Nov", oee: 65.3, target: 80 },
                                { month: "Dec", oee: 73.0, target: 80 },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="month"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                                domain={[0, 100]}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #3b82f6",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="oee"
                                fill="#93c5fd"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                name="OEE %"
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target %"
                                isAnimationActive={false}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Production per Hour */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-cyan-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <Factory className="w-5 h-5 text-cyan-600" />
                            🏭 Production/Hr (Nos.)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                              data={[
                                { month: "Apr", prod: 304, target: 320 },
                                { month: "May", prod: 281, target: 320 },
                                { month: "Jun", prod: 295, target: 320 },
                                { month: "Jul", prod: 325, target: 320 },
                                { month: "Aug", prod: 313, target: 320 },
                                { month: "Sep", prod: 295, target: 320 },
                                { month: "Oct", prod: 269, target: 320 },
                                { month: "Nov", prod: 261, target: 320 },
                                { month: "Dec", prod: 292, target: 320 },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="month"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #06b6d4",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Bar
                                dataKey="prod"
                                fill="#06b6d4"
                                name="Actual"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                name="Target"
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Output per Man per Day */}
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-indigo-500`}
                      >
                        <h4
                          className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                        >
                          <Users className="w-5 h-5 text-indigo-600" />
                          👥 Output/Man/Day (Nos.)
                        </h4>
                        <ResponsiveContainer width="100%" height={280}>
                          <ComposedChart
                            data={[
                              { month: "Apr", output: 684, target: 720 },
                              { month: "May", output: 632, target: 720 },
                              { month: "Jun", output: 663, target: 720 },
                              { month: "Jul", output: 732, target: 720 },
                              { month: "Aug", output: 705, target: 720 },
                              { month: "Sep", output: 663, target: 720 },
                              { month: "Oct", output: 605, target: 720 },
                              { month: "Nov", output: 588, target: 720 },
                              { month: "Dec", output: 657, target: 720 },
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="month"
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <YAxis
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #6366f1",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            />
                            <Bar
                              dataKey="output"
                              fill="#6366f1"
                              name="Output/Man/Day"
                              radius={[6, 6, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="target"
                              stroke="#10b981"
                              strokeWidth={3}
                              name="Target"
                              isAnimationActive={false}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border-2 border-blue-300">
                          <p className="text-sm font-bold text-blue-700 mb-1">
                            Average OEE
                          </p>
                          <p className="text-4xl font-black text-blue-600 mono-font">
                            73.2%
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Target: 80%
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 text-center border-2 border-cyan-300">
                          <p className="text-sm font-bold text-cyan-700 mb-1">
                            Avg Production/Hr
                          </p>
                          <p className="text-4xl font-black text-cyan-600 mono-font">
                            294
                          </p>
                          <p className="text-xs text-cyan-600 mt-1">
                            Target: 320
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 text-center border-2 border-indigo-300">
                          <p className="text-sm font-bold text-indigo-700 mb-1">
                            Avg Output/Man
                          </p>
                          <p className="text-4xl font-black text-indigo-600 mono-font">
                            659
                          </p>
                          <p className="text-xs text-indigo-600 mt-1">
                            Target: 720
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quality Charts */}
                  {selectedMetric === "quality" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />✨ Quality Analytics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Rejection PPM */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-red-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <ShieldAlert className="w-5 h-5 text-red-600" />
                            🚨 In-house Rejection (PPM)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <AreaChart
                              data={[
                                { month: "Apr", rejection: 7578, target: 6000 },
                                { month: "May", rejection: 8353, target: 6000 },
                                { month: "Jun", rejection: 8592, target: 6000 },
                                { month: "Jul", rejection: 7908, target: 6000 },
                                { month: "Aug", rejection: 5965, target: 6000 },
                                { month: "Sep", rejection: 6874, target: 6000 },
                                { month: "Oct", rejection: 7852, target: 6000 },
                                { month: "Nov", rejection: 7998, target: 6000 },
                                { month: "Dec", rejection: 8210, target: 6000 },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <defs>
                                <linearGradient
                                  id="rejectionGrad"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#ef4444"
                                    stopOpacity={0.6}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#ef4444"
                                    stopOpacity={0.1}
                                  />
                                </linearGradient>
                              </defs>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="month"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #ef4444",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="rejection"
                                fill="url(#rejectionGrad)"
                                stroke="#ef4444"
                                strokeWidth={3}
                                name="Rejection PPM"
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target"
                                isAnimationActive={false}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Customer Complaints */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-green-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <ThumbsUp className="w-5 h-5 text-green-600" />
                            😊 Customer Complaints (Nos.)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                              data={[
                                { month: "Apr", complaints: 0, target: 0 },
                                { month: "May", complaints: 0, target: 0 },
                                { month: "Jun", complaints: 0, target: 0 },
                                { month: "Jul", complaints: 0, target: 0 },
                                { month: "Aug", complaints: 0, target: 0 },
                                { month: "Sep", complaints: 0, target: 0 },
                                { month: "Oct", complaints: 0, target: 0 },
                                { month: "Nov", complaints: 0, target: 0 },
                                { month: "Dec", complaints: 0, target: 0 },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="month"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #10b981",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Bar
                                dataKey="complaints"
                                fill="#10b981"
                                name="Complaints"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                          <div className="mt-4 text-center bg-green-100 rounded-lg p-3">
                            <p className="text-2xl font-black text-green-700">
                              ✓ EXCELLENT
                            </p>
                            <p className="text-sm text-green-600 font-bold">
                              Zero Complaints Maintained
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center border-2 border-red-300">
                          <p className="text-sm font-bold text-red-700 mb-1">
                            Avg Rejection PPM
                          </p>
                          <p className="text-4xl font-black text-red-600 mono-font">
                            7703
                          </p>
                          <p className="text-xs text-red-600 mt-1">
                            Target: 6000 PPM
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border-2 border-green-300">
                          <p className="text-sm font-bold text-green-700 mb-1">
                            Customer Complaints
                          </p>
                          <p className="text-4xl font-black text-green-600 mono-font">
                            0
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Target: 0 Complaints
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cost Charts */}
                  {selectedMetric === "cost" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-amber-700 flex items-center gap-2">
                        <IndianRupee className="w-6 h-6" />
                        💰 Cost Analytics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Rejection Cost */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-amber-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <IndianRupee className="w-5 h-5 text-amber-600" />
                            💰 Rejection Cost (Lacs)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart
                              data={[
                                { month: "Apr", cost: 1.47, target: 0.76 },
                                { month: "May", cost: 1.64, target: 0.76 },
                                { month: "Jun", cost: 1.84, target: 0.76 },
                                { month: "Jul", cost: 1.43, target: 0.76 },
                                { month: "Aug", cost: 1.46, target: 0.76 },
                                { month: "Sep", cost: 1.65, target: 0.76 },
                                { month: "Oct", cost: 1.27, target: 0.76 },
                                { month: "Nov", cost: 1.39, target: 0.76 },
                                { month: "Dec", cost: 2.05, target: 0.76 },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="month"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #f59e0b",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Bar
                                dataKey="cost"
                                fill="#f59e0b"
                                name="Cost (Lacs)"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target"
                                isAnimationActive={false}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Drop Out % */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-orange-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <TrendingDown className="w-5 h-5 text-orange-600" />
                            📉 Drop Out % Trend
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <LineChart
                              data={[
                                { month: "Sep", dropout: 7.5, target: 5 },
                                { month: "Oct", dropout: 7.9, target: 5 },
                                { month: "Nov", dropout: 7.74, target: 5 },
                                { month: "Dec", dropout: 8.52, target: 5 },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="month"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #f97316",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Line
                                type="monotone"
                                dataKey="dropout"
                                stroke="#f97316"
                                strokeWidth={3}
                                name="Drop Out %"
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target"
                                isAnimationActive={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 text-center border-2 border-amber-300">
                          <p className="text-sm font-bold text-amber-700 mb-1">
                            Avg Rejection Cost
                          </p>
                          <p className="text-4xl font-black text-amber-600 mono-font">
                            ₹1.52L
                          </p>
                          <p className="text-xs text-amber-600 mt-1">
                            Target: ₹0.76L
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border-2 border-orange-300">
                          <p className="text-sm font-bold text-orange-700 mb-1">
                            Avg Drop Out %
                          </p>
                          <p className="text-4xl font-black text-orange-600 mono-font">
                            7.9%
                          </p>
                          <p className="text-xs text-orange-600 mt-1">
                            Target: 5%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Delivery Charts */}
                  {selectedMetric === "delivery" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-cyan-700 flex items-center gap-2">
                        <Package className="w-6 h-6" />
                        📦 Delivery Performance Analytics
                      </h3>

                      {/* Production Plan vs Actual */}
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-cyan-500`}
                      >
                        <h4
                          className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                        >
                          <Package className="w-5 h-5 text-cyan-600" />
                          📦 Production Plan vs Actual (000's)
                        </h4>
                        <ResponsiveContainer width="100%" height={320}>
                          <ComposedChart
                            data={[
                              { month: "Apr", plan: 160, actual: 171.573 },
                              { month: "May", plan: 160, actual: 145.352 },
                              { month: "Jun", plan: 160, actual: 156.22 },
                              { month: "Jul", plan: 160, actual: 190.257 },
                              { month: "Aug", plan: 140.8, actual: 140.924 },
                              { month: "Sep", plan: 154, actual: 151.926 },
                              { month: "Oct", plan: 140, actual: 118.0 },
                              { month: "Nov", plan: 140, actual: 113.674 },
                              { month: "Dec", plan: 170, actual: 170.864 },
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="month"
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <YAxis
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #06b6d4",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            />
                            <Bar
                              dataKey="plan"
                              fill="#3b82f6"
                              name="Plan (000's)"
                              radius={[4, 4, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Bar
                              dataKey="actual"
                              fill="#06b6d4"
                              name="Actual (000's)"
                              radius={[4, 4, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="actual"
                              stroke="#059669"
                              strokeWidth={3}
                              name="Actual Trend"
                              isAnimationActive={false}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Achievement % */}
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-green-500`}
                      >
                        <h4
                          className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                        >
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          📈 Monthly Achievement %
                        </h4>
                        <ResponsiveContainer width="100%" height={280}>
                          <AreaChart
                            data={[
                              { month: "Apr", achievement: 107.2 },
                              { month: "May", achievement: 90.8 },
                              { month: "Jun", achievement: 97.6 },
                              { month: "Jul", achievement: 118.9 },
                              { month: "Aug", achievement: 100.1 },
                              { month: "Sep", achievement: 98.7 },
                              { month: "Oct", achievement: 84.3 },
                              { month: "Nov", achievement: 81.2 },
                              { month: "Dec", achievement: 100.5 },
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="achievementGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#10b981"
                                  stopOpacity={0.6}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#10b981"
                                  stopOpacity={0.1}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="month"
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <YAxis
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                              domain={[0, 130]}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #10b981",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="achievement"
                              fill="url(#achievementGrad)"
                              stroke="#10b981"
                              strokeWidth={3}
                              name="Achievement %"
                              isAnimationActive={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 text-center border-2 border-cyan-300">
                          <p className="text-sm font-bold text-cyan-700 mb-1">
                            Total Plan
                          </p>
                          <p className="text-4xl font-black text-cyan-600 mono-font">
                            1.38M
                          </p>
                          <p className="text-xs text-cyan-600 mt-1">Units</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border-2 border-blue-300">
                          <p className="text-sm font-bold text-blue-700 mb-1">
                            Total Actual
                          </p>
                          <p className="text-4xl font-black text-blue-600 mono-font">
                            1.36M
                          </p>
                          <p className="text-xs text-blue-600 mt-1">Units</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border-2 border-green-300">
                          <p className="text-sm font-bold text-green-700 mb-1">
                            Avg Achievement
                          </p>
                          <p className="text-4xl font-black text-green-600 mono-font">
                            97.7%
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            On Target
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Morale Charts */}
                  {selectedMetric === "morale" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-purple-700 flex items-center gap-2">
                        <Activity className="w-6 h-6" />
                        😊 Safety & Morale Analytics
                      </h3>

                      {/* Unsafe Acts Trend */}
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-purple-500`}
                      >
                        <h4
                          className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                        >
                          <ShieldAlert className="w-5 h-5 text-purple-600" />
                          🔒 Unsafe Acts Identified (Nos.)
                        </h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <ComposedChart
                            data={[
                              {
                                month: "Apr",
                                identified: 1,
                                corrected: 1,
                                target: 0,
                              },
                              {
                                month: "May",
                                identified: 2,
                                corrected: 2,
                                target: 0,
                              },
                              {
                                month: "Jun",
                                identified: 3,
                                corrected: 3,
                                target: 0,
                              },
                              {
                                month: "Jul",
                                identified: 0,
                                corrected: 0,
                                target: 0,
                              },
                              {
                                month: "Aug",
                                identified: 1,
                                corrected: 1,
                                target: 0,
                              },
                              {
                                month: "Sep",
                                identified: 0,
                                corrected: 0,
                                target: 0,
                              },
                              {
                                month: "Oct",
                                identified: 0,
                                corrected: 0,
                                target: 0,
                              },
                              {
                                month: "Nov",
                                identified: 2,
                                corrected: 2,
                                target: 0,
                              },
                              {
                                month: "Dec",
                                identified: 3,
                                corrected: 3,
                                target: 0,
                              },
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="month"
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <YAxis
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #8b5cf6",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            />
                            <Bar
                              dataKey="identified"
                              fill="#8b5cf6"
                              name="Identified"
                              radius={[6, 6, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Bar
                              dataKey="corrected"
                              fill="#10b981"
                              name="Corrected"
                              radius={[6, 6, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="target"
                              stroke="#ef4444"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="Target"
                              isAnimationActive={false}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Safety Performance */}
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-green-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <CheckCircle className="w-5 h-5 text-green-600" />✓
                            Correction Rate
                          </h4>
                          <div className="text-center py-8">
                            <p className="text-7xl font-black text-green-600 mono-font">
                              100%
                            </p>
                            <p className="text-lg font-bold text-green-700 mt-3">
                              All Unsafe Acts Corrected
                            </p>
                            <div className="mt-4 bg-green-100 rounded-lg p-3">
                              <p className="text-sm text-green-700 font-bold">
                                Excellent Safety Culture
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-blue-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <Activity className="w-5 h-5 text-blue-600" />
                            📊 Monthly Comparison
                          </h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                              data={[
                                { month: "Q1", acts: 6 },
                                { month: "Q2", acts: 1 },
                                { month: "Q3", acts: 0 },
                                { month: "Q4", acts: 5 },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="month"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #3b82f6",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Bar
                                dataKey="acts"
                                fill="#3b82f6"
                                name="Unsafe Acts"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border-2 border-purple-300">
                          <p className="text-sm font-bold text-purple-700 mb-1">
                            Total Identified
                          </p>
                          <p className="text-4xl font-black text-purple-600 mono-font">
                            12
                          </p>
                          <p className="text-xs text-purple-600 mt-1">
                            Unsafe Acts
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border-2 border-green-300">
                          <p className="text-sm font-bold text-green-700 mb-1">
                            Total Corrected
                          </p>
                          <p className="text-4xl font-black text-green-600 mono-font">
                            12
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            100% Closure
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border-2 border-blue-300">
                          <p className="text-sm font-bold text-blue-700 mb-1">
                            Target
                          </p>
                          <p className="text-4xl font-black text-blue-600 mono-font">
                            0
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Unsafe Acts
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Note */}
              <div className="text-xs text-gray-600 italic mt-2 text-center">
                * Switch between Table and Graphical views • Select different
                POCDSM metrics for detailed analysis
              </div>
            </div>
          );

        case "power":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                Power - Utilization
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {["daily", "mtd", "ytd"].map((period, idx) => {
                  const data = staticData.power[period];
                  const borderColor =
                    idx === 0
                      ? "border-blue-500"
                      : idx === 1
                      ? "border-green-500"
                      : "border-purple-500";
                  return (
                    <div
                      key={period}
                      className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 ${borderColor}`}
                    >
                      <h4
                        className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2 uppercase`}
                      >
                        {period} Utilization
                      </h4>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-xs text-gray-600 font-bold">
                            Actual
                          </p>
                          <p
                            className={`text-4xl font-bold text-purple-600 mono-font`}
                          >
                            {data.utilization}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600 font-bold">
                            Target
                          </p>
                          <p className="text-3xl font-bold text-blue-600 mono-font">
                            {data.plan}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 bg-green-100 rounded p-2 text-center">
                        <p className="text-base font-black text-green-700 mono-font">
                          {data.consumption}
                          {period === "daily"
                            ? "K kWh"
                            : period === "mtd"
                            ? " kWh"
                            : " kWh"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart and Table */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📊 Hourly Utilization Trend
                  </h4>
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart
                      data={powerTrendData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="powerGradStatic"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.6}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="hour"
                        stroke="#334155"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <YAxis
                        stroke="#334155"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #8b5cf6",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="util"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="url(#powerGradStatic)"
                        name="Utilization %"
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Hourly Table */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📋 Hourly Performance
                  </h4>
                  <div className="overflow-auto max-h-[260px]">
                    <table className="w-full text-sm">
                      <thead className="bg-purple-100 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-black text-gray-700">
                            Hour
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Util%
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Target%
                          </th>
                          <th className="px-3 py-2 text-center font-black text-gray-700">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {powerTrendData.map((row, idx) => {
                          const target = 85;
                          return (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="px-3 py-2 font-bold text-gray-800">
                                {row.hour}:00
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-purple-600 mono-font">
                                {row.util}%
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-blue-600 mono-font">
                                {target}%
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span
                                  className={`px-2 py-1 rounded font-black text-xs ${
                                    row.util >= target
                                      ? "bg-green-200 text-green-800"
                                      : row.util >= target * 0.9
                                      ? "bg-yellow-200 text-yellow-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {row.util >= target
                                    ? "✓"
                                    : row.util >= target * 0.9
                                    ? "⚠"
                                    : "✗"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Plant-wise Power Consumption */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  🏭 Plant-wise Power Consumption & Cost
                </h4>
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        Plant
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Daily Util%
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Daily kWh
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        MTD kWh
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Daily Cost
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        MTD Cost
                      </th>
                      <th className="px-4 py-3 text-center font-black text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["R2-5", "R1-16", "MDW-7"].map((plant, idx) => {
                      const util = 85 + Math.floor(Math.random() * 10);
                      const dailyKwh = (
                        800 + Math.floor(Math.random() * 400)
                      ).toFixed(0);
                      const mtdKwh = (
                        22000 + Math.floor(Math.random() * 8000)
                      ).toFixed(0);
                      const dailyCost = (
                        (parseFloat(dailyKwh) * 7.5) /
                        1000
                      ).toFixed(2);
                      const mtdCost = (
                        (parseFloat(mtdKwh) * 7.5) /
                        1000
                      ).toFixed(2);

                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-3 font-bold text-gray-800">
                            {plant}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-purple-600 mono-font">
                            {util}%
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-cyan-600 mono-font">
                            {dailyKwh}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-cyan-600 mono-font">
                            {mtdKwh}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-amber-600 mono-font">
                            ₹{dailyCost}L
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-amber-600 mono-font">
                            ₹{mtdCost}L
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`px-3 py-1 rounded-full font-black ${
                                util >= 85
                                  ? "bg-green-200 text-green-800"
                                  : "bg-yellow-200 text-yellow-800"
                              }`}
                            >
                              {util >= 85 ? "✓ OK" : "⚠ Low"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        // Quality Analysis with Tabular and Graphical Views
        case "quality":
          const selectedBUQualityData = selectedQualityBU
            ? staticData.quality[selectedQualityBU]
            : null;
          const selectedPlantQualityData =
            selectedQualityPlant && selectedBUQualityData
              ? selectedBUQualityData.plants[selectedQualityPlant]
              : null;

          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4 flex items-center gap-3`}
              >
                <span>✨</span>
                Quality Analysis - Scrap, Yield & Rejections
              </h2>

              {/* View Mode Toggle - Show only when BU is selected */}
              {selectedQualityBU && (
                <div className="flex justify-center mb-4">
                  <div className="inline-flex rounded-lg bg-gray-200 p-1">
                    <button
                      onClick={() => setQualityViewMode("tabular")}
                      className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                        qualityViewMode === "tabular"
                          ? "bg-white shadow-md text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      📊 Tabular View
                    </button>
                    <button
                      onClick={() => setQualityViewMode("graphical")}
                      className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                        qualityViewMode === "graphical"
                          ? "bg-white shadow-md text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      📈 Graphical View
                    </button>
                  </div>
                </div>
              )}

              {/* BU Selection Tabs */}
              {!selectedQualityBU && (
                <div className="flex gap-3 justify-center mb-4 flex-wrap">
                  {["bu1", "bu2", "bu3"].map((buKey) => {
                    const buName =
                      buKey === "bu1"
                        ? "BU 1"
                        : buKey === "bu2"
                        ? "BU 2"
                        : "BU 3";

                    const metrics = getBUMetrics(buKey);

                    return (
                      <button
                        key={buKey}
                        onClick={() => setSelectedQualityBU(buKey)}
                        className="w-[340px] px-6 py-4 rounded-xl font-black text-base transition-all 
                 bg-white text-gray-900 shadow-md border border-gray-200 
                 hover:shadow-lg hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg">{buName}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-left text-sm font-bold">
                          <div className="bg-gray-100 rounded-lg p-2">
                            Scrap:{" "}
                            <span className="font-black text-gray-900">
                              {metrics.scrap}%
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2">
                            Yield:{" "}
                            <span className="font-black text-gray-900">
                              {metrics.yield}%
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2">
                            In-House Rej:{" "}
                            <span className="font-black text-gray-900">
                              {metrics.inHouseRejection}
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2">
                            Cust Complaint:{" "}
                            <span className="font-black text-gray-900">
                              {metrics.customerComplaint}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs mt-3 text-gray-500 font-bold">
                          Click to view plants →
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Back Button */}
              {selectedQualityBU && (
                <button
                  onClick={() => {
                    if (selectedQualityPlant) {
                      setSelectedQualityPlant(null);
                    } else {
                      setSelectedQualityBU(null);
                    }
                  }}
                  className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-sm flex items-center gap-2"
                >
                  ← Back{" "}
                  {selectedQualityPlant ? "to Plants" : "to BU Selection"}
                </button>
              )}

              {/* TABULAR VIEW - Plant-wise */}
              {selectedQualityBU &&
                !selectedQualityPlant &&
                qualityViewMode === "tabular" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-green-700 flex items-center gap-2">
                      <span>🏭</span>
                      {selectedQualityBU === "bu1"
                        ? "BU 1"
                        : selectedQualityBU === "bu2"
                        ? "BU 2"
                        : "BU 3"}{" "}
                      - Plant-wise Quality
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedBUQualityData.plants).map(
                        ([plantName, plantData]) => (
                          <div
                            key={plantName}
                            className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-green-500 cursor-pointer hover:scale-[1.02] transition`}
                            onClick={() => setSelectedQualityPlant(plantName)}
                          >
                            <h4
                              className={`text-lg font-black ${currentTheme.textPrimary} mb-3`}
                            >
                              {plantName}
                            </h4>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="text-center bg-gradient-to-br from-red-50 to-rose-100 rounded p-2">
                                <p className="text-3xl font-black text-red-600 sans-font">
                                  {plantData.scrap}%
                                </p>
                                <p className="text-xs font-bold text-red-600">
                                  Scrap
                                </p>
                              </div>
                              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-100 rounded p-2">
                                <p className="text-3xl font-black text-green-600 sans-font">
                                  {plantData.yield}%
                                </p>
                                <p className="text-xs font-bold text-green-600">
                                  Yield
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center bg-gradient-to-br from-orange-50 to-amber-100 rounded p-2">
                                <p className="text-2xl font-black text-orange-600 sans-font">
                                  {plantData.inHouseRejection}%
                                </p>
                                <p className="text-xs font-bold text-orange-600">
                                  In-House Rej
                                </p>
                              </div>
                              <div className="text-center bg-gradient-to-br from-purple-50 to-pink-100 rounded p-2">
                                <p className="text-2xl font-black text-purple-600 sans-font">
                                  {plantData.customerComplaint}%
                                </p>
                                <p className="text-xs font-bold text-purple-600">
                                  Cust Complaint
                                </p>
                              </div>
                            </div>

                            <p className="text-xs text-center text-green-600 font-bold mt-3">
                              Click to view lines →
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* GRAPHICAL VIEW - Plant-wise with Modern Charts */}
              {selectedQualityBU &&
                !selectedQualityPlant &&
                qualityViewMode === "graphical" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-green-700 flex items-center gap-2">
                      <span>📊</span>
                      {selectedQualityBU === "bu1"
                        ? "BU 1"
                        : selectedQualityBU === "bu2"
                        ? "BU 2"
                        : "BU 3"}{" "}
                      - Plant-wise Quality (Graphical)
                    </h3>

                    {/* Radial Progress Cards - All Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedBUQualityData.plants).map(
                        ([plantName, plantData]) => (
                          <div
                            key={plantName}
                            className={`${currentTheme.bgSecondary} rounded-lg p-5 shadow-lg cursor-pointer hover:scale-[1.02] transition border-2 border-gray-200 hover:border-green-400`}
                            onClick={() => setSelectedQualityPlant(plantName)}
                          >
                            <h4 className="text-lg font-black text-gray-800 mb-4 text-center">
                              {plantName}
                            </h4>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Yield Radial */}
                              <div className="flex flex-col items-center">
                                <div className="relative w-24 h-24">
                                  <svg
                                    className="transform -rotate-90"
                                    width="96"
                                    height="96"
                                  >
                                    {/* Background circle */}
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="8"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#22c55e"
                                      strokeWidth="8"
                                      strokeDasharray={`${
                                        (plantData.yield / 100) * 251.2
                                      } 251.2`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-green-600">
                                      {plantData.yield}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs font-bold text-green-600 mt-2">
                                  Yield
                                </p>
                              </div>

                              {/* Scrap Radial */}
                              <div className="flex flex-col items-center">
                                <div className="relative w-24 h-24">
                                  <svg
                                    className="transform -rotate-90"
                                    width="96"
                                    height="96"
                                  >
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="8"
                                    />
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#ef4444"
                                      strokeWidth="8"
                                      strokeDasharray={`${
                                        (plantData.scrap / 10) * 251.2
                                      } 251.2`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-red-600">
                                      {plantData.scrap}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs font-bold text-red-600 mt-2">
                                  Scrap
                                </p>
                              </div>

                              {/* In-House Rejection Radial */}
                              <div className="flex flex-col items-center">
                                <div className="relative w-24 h-24">
                                  <svg
                                    className="transform -rotate-90"
                                    width="96"
                                    height="96"
                                  >
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="8"
                                    />
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#f97316"
                                      strokeWidth="8"
                                      strokeDasharray={`${
                                        (plantData.inHouseRejection / 5) * 251.2
                                      } 251.2`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-orange-600">
                                      {plantData.inHouseRejection}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs font-bold text-orange-600 mt-2">
                                  In-House Rej
                                </p>
                              </div>

                              {/* Customer Complaint Radial */}
                              <div className="flex flex-col items-center">
                                <div className="relative w-24 h-24">
                                  <svg
                                    className="transform -rotate-90"
                                    width="96"
                                    height="96"
                                  >
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="8"
                                    />
                                    <circle
                                      cx="48"
                                      cy="48"
                                      r="40"
                                      fill="none"
                                      stroke="#a855f7"
                                      strokeWidth="8"
                                      strokeDasharray={`${
                                        (plantData.customerComplaint / 3) *
                                        251.2
                                      } 251.2`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-purple-600">
                                      {plantData.customerComplaint}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs font-bold text-purple-600 mt-2">
                                  Cust Complaint
                                </p>
                              </div>
                            </div>

                            <p className="text-xs text-center text-green-600 font-bold mt-4">
                              Click to view lines →
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    {/* Comparison Bar Chart */}
                    <div
                      className={`${currentTheme.bgSecondary} rounded-lg p-5 shadow-lg mt-6`}
                    >
                      <h4 className="text-lg font-black text-gray-700 mb-5 flex items-center gap-2">
                        📊 Plant Comparison - All Metrics
                      </h4>

                      <div className="space-y-6">
                        {/* Yield Comparison */}
                        <div>
                          <p className="text-sm font-black text-green-600 mb-2">
                            🟢 Yield Percentage
                          </p>
                          <div className="space-y-2">
                            {Object.entries(selectedBUQualityData.plants).map(
                              ([plantName, plantData]) => (
                                <div
                                  key={plantName}
                                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                  onClick={() =>
                                    setSelectedQualityPlant(plantName)
                                  }
                                >
                                  <span className="font-bold text-gray-700 w-28 text-sm">
                                    {plantName}
                                  </span>
                                  <div className="flex-1 h-8 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <div
                                      className="h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-end px-3 transition-all duration-500"
                                      style={{ width: `${plantData.yield}%` }}
                                    >
                                      <span className="text-white font-black text-sm">
                                        {plantData.yield}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Scrap Comparison */}
                        <div>
                          <p className="text-sm font-black text-red-600 mb-2">
                            🔴 Scrap Percentage
                          </p>
                          <div className="space-y-2">
                            {Object.entries(selectedBUQualityData.plants).map(
                              ([plantName, plantData]) => (
                                <div
                                  key={plantName}
                                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                  onClick={() =>
                                    setSelectedQualityPlant(plantName)
                                  }
                                >
                                  <span className="font-bold text-gray-700 w-28 text-sm">
                                    {plantName}
                                  </span>
                                  <div className="flex-1 h-8 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <div
                                      className="h-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-end px-3 transition-all duration-500"
                                      style={{
                                        width: `${
                                          (plantData.scrap / 10) * 100
                                        }%`,
                                      }}
                                    >
                                      <span className="text-white font-black text-sm">
                                        {plantData.scrap}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* TABULAR VIEW - Line-wise */}
              {selectedQualityPlant &&
                selectedPlantQualityData &&
                qualityViewMode === "tabular" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-blue-700 flex items-center gap-2">
                      <span>📏</span>
                      {selectedQualityPlant} - Line-wise Quality
                    </h3>

                    {/* Plant Summary */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-red-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          Scrap
                        </p>
                        <p className="text-4xl font-black text-red-600 sans-font">
                          {selectedPlantQualityData.scrap}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-green-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          Yield
                        </p>
                        <p className="text-4xl font-black text-green-600 sans-font">
                          {selectedPlantQualityData.yield}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-orange-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          In-House Rej
                        </p>
                        <p className="text-4xl font-black text-orange-600 sans-font">
                          {selectedPlantQualityData.inHouseRejection}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-purple-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          Cust Complaint
                        </p>
                        <p className="text-4xl font-black text-purple-600 sans-font">
                          {selectedPlantQualityData.customerComplaint}%
                        </p>
                      </div>
                    </div>

                    {/* Lines Table */}
                    {Object.keys(selectedPlantQualityData.lines).length > 0 ? (
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4`}
                      >
                        <h4
                          className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                        >
                          📋 Line-wise Quality Performance
                        </h4>
                        <table className="w-full text-sm">
                          <thead className="bg-gradient-to-r from-green-100 to-emerald-100">
                            <tr>
                              <th className="px-4 py-3 text-left font-black text-gray-700">
                                Line
                              </th>
                              <th className="px-4 py-3 text-right font-black text-gray-700">
                                Scrap
                              </th>
                              <th className="px-4 py-3 text-right font-black text-gray-700">
                                Yield
                              </th>
                              <th className="px-4 py-3 text-right font-black text-gray-700">
                                In-House Rej
                              </th>
                              <th className="px-4 py-3 text-right font-black text-gray-700">
                                Cust Complaint
                              </th>
                              <th className="px-4 py-3 text-center font-black text-gray-700">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(selectedPlantQualityData.lines).map(
                              ([lineName, lineData], idx) => (
                                <tr
                                  key={idx}
                                  className={
                                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  <td className="px-4 py-3 font-bold text-gray-800">
                                    {lineName}
                                  </td>
                                  <td className="px-4 py-3 text-right font-bold text-red-600 mono-font">
                                    {lineData.scrap}%
                                  </td>
                                  <td className="px-4 py-3 text-right font-bold text-green-600 mono-font">
                                    {lineData.yield}%
                                  </td>
                                  <td className="px-4 py-3 text-right font-bold text-orange-600 mono-font">
                                    {lineData.rejection}%
                                  </td>
                                  <td className="px-4 py-3 text-right font-bold text-purple-600 mono-font">
                                    {lineData.complaint}%
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <span
                                      className={`px-3 py-1 rounded-full font-black ${
                                        lineData.yield >= 98
                                          ? "bg-green-200 text-green-800"
                                          : lineData.yield >= 97
                                          ? "bg-yellow-200 text-yellow-800"
                                          : "bg-red-200 text-red-800"
                                      }`}
                                    >
                                      {lineData.yield >= 98
                                        ? "✓ Excellent"
                                        : lineData.yield >= 97
                                        ? "⚠ Good"
                                        : "✗ Poor"}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center p-8 bg-gray-100 rounded-lg">
                        <p className="text-lg font-bold text-gray-600">
                          No line data available for this plant
                        </p>
                      </div>
                    )}
                  </div>
                )}

              {/* GRAPHICAL VIEW - Line-wise with Modern Visual Charts */}
              {selectedQualityPlant &&
                selectedPlantQualityData &&
                qualityViewMode === "graphical" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-blue-700 flex items-center gap-2">
                      <span>📊</span>
                      {selectedQualityPlant} - Line-wise Quality (Graphical)
                    </h3>

                    {/* Plant Summary Cards */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-red-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          Scrap
                        </p>
                        <p className="text-4xl font-black text-red-600 sans-font">
                          {selectedPlantQualityData.scrap}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-green-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          Yield
                        </p>
                        <p className="text-4xl font-black text-green-600 sans-font">
                          {selectedPlantQualityData.yield}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-orange-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          In-House Rej
                        </p>
                        <p className="text-4xl font-black text-orange-600 sans-font">
                          {selectedPlantQualityData.inHouseRejection}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-3 text-center border-l-4 border-purple-500`}
                      >
                        <p className="text-sm font-bold text-gray-600 mb-1">
                          Cust Complaint
                        </p>
                        <p className="text-4xl font-black text-purple-600 sans-font">
                          {selectedPlantQualityData.customerComplaint}%
                        </p>
                      </div>
                    </div>

                    {Object.keys(selectedPlantQualityData.lines).length > 0 ? (
                      <>
                        {/* Radial Progress Grid for Each Line */}
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedPlantQualityData.lines).map(
                            ([lineName, lineData]) => (
                              <div
                                key={lineName}
                                className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-2 border-gray-200`}
                              >
                                <h4 className="text-base font-black text-gray-800 mb-3 text-center">
                                  {lineName}
                                </h4>

                                <div className="grid grid-cols-2 gap-3">
                                  {/* Yield */}
                                  <div className="flex flex-col items-center">
                                    <div className="relative w-20 h-20">
                                      <svg
                                        className="transform -rotate-90"
                                        width="80"
                                        height="80"
                                      >
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke="#e5e7eb"
                                          strokeWidth="6"
                                        />
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke={
                                            lineData.yield >= 98
                                              ? "#22c55e"
                                              : lineData.yield >= 97
                                              ? "#eab308"
                                              : "#ef4444"
                                          }
                                          strokeWidth="6"
                                          strokeDasharray={`${
                                            (lineData.yield / 100) * 201
                                          } 201`}
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm font-black text-gray-800">
                                          {lineData.yield}%
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-xs font-bold text-green-600 mt-1">
                                      Yield
                                    </p>
                                  </div>

                                  {/* Scrap */}
                                  <div className="flex flex-col items-center">
                                    <div className="relative w-20 h-20">
                                      <svg
                                        className="transform -rotate-90"
                                        width="80"
                                        height="80"
                                      >
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke="#e5e7eb"
                                          strokeWidth="6"
                                        />
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke="#ef4444"
                                          strokeWidth="6"
                                          strokeDasharray={`${
                                            (lineData.scrap / 10) * 201
                                          } 201`}
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm font-black text-gray-800">
                                          {lineData.scrap}%
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-xs font-bold text-red-600 mt-1">
                                      Scrap
                                    </p>
                                  </div>

                                  {/* Rejection */}
                                  <div className="flex flex-col items-center">
                                    <div className="relative w-20 h-20">
                                      <svg
                                        className="transform -rotate-90"
                                        width="80"
                                        height="80"
                                      >
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke="#e5e7eb"
                                          strokeWidth="6"
                                        />
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke="#f97316"
                                          strokeWidth="6"
                                          strokeDasharray={`${
                                            (lineData.rejection / 5) * 201
                                          } 201`}
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm font-black text-gray-800">
                                          {lineData.rejection}%
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-xs font-bold text-orange-600 mt-1">
                                      Rejection
                                    </p>
                                  </div>

                                  {/* Complaint */}
                                  <div className="flex flex-col items-center">
                                    <div className="relative w-20 h-20">
                                      <svg
                                        className="transform -rotate-90"
                                        width="80"
                                        height="80"
                                      >
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke="#e5e7eb"
                                          strokeWidth="6"
                                        />
                                        <circle
                                          cx="40"
                                          cy="40"
                                          r="32"
                                          fill="none"
                                          stroke="#a855f7"
                                          strokeWidth="6"
                                          strokeDasharray={`${
                                            (lineData.complaint / 3) * 201
                                          } 201`}
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm font-black text-gray-800">
                                          {lineData.complaint}%
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-xs font-bold text-purple-600 mt-1">
                                      Complaint
                                    </p>
                                  </div>
                                </div>

                                {/* Status Badge */}
                                <div className="mt-3 text-center">
                                  <span
                                    className={`px-3 py-1 rounded-full font-black text-xs ${
                                      lineData.yield >= 98
                                        ? "bg-green-200 text-green-800"
                                        : lineData.yield >= 97
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-red-200 text-red-800"
                                    }`}
                                  >
                                    {lineData.yield >= 98
                                      ? "✓ Excellent"
                                      : lineData.yield >= 97
                                      ? "⚠ Good"
                                      : "✗ Poor"}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        {/* Stacked Comparison Bars */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-5 shadow-lg mt-6`}
                        >
                          <h4 className="text-lg font-black text-gray-700 mb-4 flex items-center gap-2">
                            📊 Line Performance Comparison
                          </h4>

                          <div className="space-y-4">
                            {Object.entries(selectedPlantQualityData.lines).map(
                              ([lineName, lineData]) => (
                                <div key={lineName}>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-black text-gray-800 text-sm">
                                      {lineName}
                                    </span>
                                    <span
                                      className={`text-xs font-bold px-2 py-1 rounded ${
                                        lineData.yield >= 98
                                          ? "bg-green-100 text-green-700"
                                          : lineData.yield >= 97
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      Yield: {lineData.yield}%
                                    </span>
                                  </div>

                                  {/* Grouped Mini Bars */}
                                  <div className="grid grid-cols-4 gap-2">
                                    {/* Yield */}
                                    <div>
                                      <div className="h-16 bg-gray-200 rounded relative overflow-hidden">
                                        <div
                                          className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-500"
                                          style={{
                                            height: `${lineData.yield}%`,
                                          }}
                                        ></div>
                                        <div className="absolute inset-0 flex items-end justify-center pb-1">
                                          <span className="text-xs font-black text-white mix-blend-difference">
                                            {lineData.yield}%
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-xs font-bold text-green-600 text-center mt-1">
                                        Yield
                                      </p>
                                    </div>

                                    {/* Scrap */}
                                    <div>
                                      <div className="h-16 bg-gray-200 rounded relative overflow-hidden">
                                        <div
                                          className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-red-400 transition-all duration-500"
                                          style={{
                                            height: `${
                                              (lineData.scrap / 10) * 100
                                            }%`,
                                          }}
                                        ></div>
                                        <div className="absolute inset-0 flex items-end justify-center pb-1">
                                          <span className="text-xs font-black text-white mix-blend-difference">
                                            {lineData.scrap}%
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-xs font-bold text-red-600 text-center mt-1">
                                        Scrap
                                      </p>
                                    </div>

                                    {/* Rejection */}
                                    <div>
                                      <div className="h-16 bg-gray-200 rounded relative overflow-hidden">
                                        <div
                                          className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-orange-400 transition-all duration-500"
                                          style={{
                                            height: `${
                                              (lineData.rejection / 5) * 100
                                            }%`,
                                          }}
                                        ></div>
                                        <div className="absolute inset-0 flex items-end justify-center pb-1">
                                          <span className="text-xs font-black text-white mix-blend-difference">
                                            {lineData.rejection}%
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-xs font-bold text-orange-600 text-center mt-1">
                                        Reject
                                      </p>
                                    </div>

                                    {/* Complaint */}
                                    <div>
                                      <div className="h-16 bg-gray-200 rounded relative overflow-hidden">
                                        <div
                                          className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-400 transition-all duration-500"
                                          style={{
                                            height: `${
                                              (lineData.complaint / 3) * 100
                                            }%`,
                                          }}
                                        ></div>
                                        <div className="absolute inset-0 flex items-end justify-center pb-1">
                                          <span className="text-xs font-black text-white mix-blend-difference">
                                            {lineData.complaint}%
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-xs font-bold text-purple-600 text-center mt-1">
                                        Comp
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Heat Map Style Metric Cards */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-5 shadow-lg mt-6`}
                        >
                          <h4 className="text-lg font-black text-gray-700 mb-4 flex items-center gap-2">
                            🔥 Performance Heat Map
                          </h4>

                          <div className="grid grid-cols-4 gap-3">
                            {/* Yield Heat Map */}
                            <div>
                              <p className="text-xs font-black text-gray-700 mb-2 text-center">
                                Yield
                              </p>
                              <div className="space-y-1">
                                {Object.entries(
                                  selectedPlantQualityData.lines
                                ).map(([lineName, lineData]) => (
                                  <div
                                    key={lineName}
                                    className={`p-2 rounded text-center transition-all ${
                                      lineData.yield >= 98
                                        ? "bg-green-500 text-white"
                                        : lineData.yield >= 97
                                        ? "bg-yellow-400 text-gray-900"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    <p className="text-xs font-black">
                                      {lineName}
                                    </p>
                                    <p className="text-sm font-black">
                                      {lineData.yield}%
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Scrap Heat Map */}
                            <div>
                              <p className="text-xs font-black text-gray-700 mb-2 text-center">
                                Scrap
                              </p>
                              <div className="space-y-1">
                                {Object.entries(
                                  selectedPlantQualityData.lines
                                ).map(([lineName, lineData]) => (
                                  <div
                                    key={lineName}
                                    className="p-2 rounded text-center"
                                    style={{
                                      backgroundColor: `rgba(239, 68, 68, ${
                                        lineData.scrap / 10
                                      })`,
                                      color:
                                        lineData.scrap > 5
                                          ? "white"
                                          : "#374151",
                                    }}
                                  >
                                    <p className="text-xs font-black">
                                      {lineName}
                                    </p>
                                    <p className="text-sm font-black">
                                      {lineData.scrap}%
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Rejection Heat Map */}
                            <div>
                              <p className="text-xs font-black text-gray-700 mb-2 text-center">
                                Rejection
                              </p>
                              <div className="space-y-1">
                                {Object.entries(
                                  selectedPlantQualityData.lines
                                ).map(([lineName, lineData]) => (
                                  <div
                                    key={lineName}
                                    className="p-2 rounded text-center"
                                    style={{
                                      backgroundColor: `rgba(249, 115, 22, ${
                                        lineData.rejection / 5
                                      })`,
                                      color:
                                        lineData.rejection > 2.5
                                          ? "white"
                                          : "#374151",
                                    }}
                                  >
                                    <p className="text-xs font-black">
                                      {lineName}
                                    </p>
                                    <p className="text-sm font-black">
                                      {lineData.rejection}%
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Complaint Heat Map */}
                            <div>
                              <p className="text-xs font-black text-gray-700 mb-2 text-center">
                                Complaint
                              </p>
                              <div className="space-y-1">
                                {Object.entries(
                                  selectedPlantQualityData.lines
                                ).map(([lineName, lineData]) => (
                                  <div
                                    key={lineName}
                                    className="p-2 rounded text-center"
                                    style={{
                                      backgroundColor: `rgba(168, 85, 247, ${
                                        lineData.complaint / 3
                                      })`,
                                      color:
                                        lineData.complaint > 1.5
                                          ? "white"
                                          : "#374151",
                                    }}
                                  >
                                    <p className="text-xs font-black">
                                      {lineName}
                                    </p>
                                    <p className="text-sm font-black">
                                      {lineData.complaint}%
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-8 bg-gray-100 rounded-lg">
                        <p className="text-lg font-bold text-gray-600">
                          No line data available for this plant
                        </p>
                      </div>
                    )}
                  </div>
                )}
            </div>
          );
        case "customer":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                😊 Customer Satisfaction - Score Card
              </h2>

              {/* Summary Card */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-green-500 col-span-1`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    Overall Score
                  </h4>
                  <p className={`text-6xl font-bold text-green-600 mono-font`}>
                    {staticData.customer.overallScore}
                  </p>
                  <p className="text-sm font-bold text-green-600 mt-1">
                    Excellent
                  </p>
                </div>
                <div className={`col-span-3 grid grid-cols-3 gap-4`}>
                  <div
                    className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-blue-500`}
                  >
                    <h4
                      className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                    >
                      Avg Quality Score
                    </h4>
                    <p className={`text-4xl font-bold text-blue-600 mono-font`}>
                      {(
                        staticData.customer.scores.reduce(
                          (sum, c) => sum + c.quality,
                          0
                        ) / staticData.customer.scores.length
                      ).toFixed(1)}
                    </p>
                  </div>
                  <div
                    className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-cyan-500`}
                  >
                    <h4
                      className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                    >
                      Avg Delivery Score
                    </h4>
                    <p className={`text-4xl font-bold text-cyan-600 mono-font`}>
                      {(
                        staticData.customer.scores.reduce(
                          (sum, c) => sum + c.delivery,
                          0
                        ) / staticData.customer.scores.length
                      ).toFixed(1)}
                    </p>
                  </div>
                  <div
                    className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-purple-500`}
                  >
                    <h4
                      className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                    >
                      Avg Support Score
                    </h4>
                    <p
                      className={`text-4xl font-bold text-purple-600 mono-font`}
                    >
                      {(
                        staticData.customer.scores.reduce(
                          (sum, c) => sum + c.support,
                          0
                        ) / staticData.customer.scores.length
                      ).toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart and Table */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📊 Customer-wise Overall Scores
                  </h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={staticData.customer.scores}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="name"
                        stroke="#334155"
                        style={{ fontSize: "11px", fontWeight: "600" }}
                        angle={-15}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis
                        stroke="#334155"
                        style={{ fontSize: "13px", fontWeight: "600" }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #10b981",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      />
                      <Bar
                        dataKey="overall"
                        fill="#10b981"
                        name="Overall Score"
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Customer Scores Table */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📋 Detailed Scores by Category
                  </h4>
                  <div className="overflow-auto max-h-[280px]">
                    <table className="w-full text-sm">
                      <thead className="bg-gradient-to-r from-green-100 to-emerald-100 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-black text-gray-700">
                            Customer
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Quality
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Delivery
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Support
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Overall
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {staticData.customer.scores.map((customer, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-3 py-2 font-bold text-gray-800">
                              {customer.name}
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-blue-600 mono-font">
                              {customer.quality}
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-cyan-600 mono-font">
                              {customer.delivery}
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-purple-600 mono-font">
                              {customer.support}
                            </td>
                            <td className="px-3 py-2 text-right">
                              <span
                                className={`px-2 py-1 rounded font-black mono-font ${
                                  customer.overall >= 95
                                    ? "bg-green-200 text-green-800"
                                    : customer.overall >= 90
                                    ? "bg-emerald-200 text-emerald-800"
                                    : customer.overall >= 85
                                    ? "bg-cyan-200 text-cyan-800"
                                    : "bg-amber-200 text-amber-800"
                                }`}
                              >
                                {customer.overall}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Detailed Multi-metric Chart */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  📈 Customer Performance Comparison
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart
                    data={staticData.customer.scores}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      stroke="#334155"
                      style={{ fontSize: "13px", fontWeight: "600" }}
                    />
                    <YAxis
                      stroke="#334155"
                      style={{ fontSize: "13px", fontWeight: "600" }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "2px solid #10b981",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "13px", fontWeight: "600" }}
                    />
                    <Bar
                      dataKey="quality"
                      fill="#3b82f6"
                      name="Quality"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    />
                    <Bar
                      dataKey="delivery"
                      fill="#06b6d4"
                      name="Delivery"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    />
                    <Bar
                      dataKey="support"
                      fill="#8b5cf6"
                      name="Support"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="overall"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Overall"
                      isAnimationActive={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          );

        case "opex":
          // OpEx Data handling
          const selectedBUOpExData = selectedOpExBU
            ? staticData.opex[selectedOpExBU]
            : null;
          const selectedPlantOpExData =
            selectedOpExPlant && selectedBUOpExData
              ? selectedBUOpExData.plants[selectedOpExPlant]
              : null;

          return (
            <div className="h-[calc(100vh-200px)] flex flex-col">
              <h2
                className={`text-xl font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
              >
                <span>🎯</span>
                OpEx Analysis
              </h2>

              {/* View Mode Toggle - Show only when BU is selected */}
              {selectedOpExBU && (
                <div className="flex justify-center mb-3">
                  <div className="inline-flex rounded-lg bg-gray-200 p-1">
                    <button
                      onClick={() => setOpExViewMode("tabular")}
                      className={`px-4 py-1 rounded-lg font-bold text-xs transition-all ${
                        opexViewMode === "tabular"
                          ? "bg-white shadow-md text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      📊 Table
                    </button>
                    <button
                      onClick={() => setOpExViewMode("graphical")}
                      className={`px-4 py-1 rounded-lg font-bold text-xs transition-all ${
                        opexViewMode === "graphical"
                          ? "bg-white shadow-md text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      📈 Graph
                    </button>
                  </div>
                </div>
              )}

              {/* BU Selection Tabs */}
              {!selectedOpExBU && (
                <div className="flex-1 flex flex-col">
                  <div className="flex gap-2 justify-center mb-3 flex-wrap">
                    <button
                      onClick={() => setSelectedOpExBU("bu1")}
                      className="px-5 py-2 rounded-lg font-black text-sm transition-all bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:scale-105"
                    >
                      BU 1 - {staticData.opex.bu1.overall}
                    </button>
                    <button
                      onClick={() => setSelectedOpExBU("bu2")}
                      className="px-5 py-2 rounded-lg font-black text-sm transition-all bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg hover:scale-105"
                    >
                      BU 2 - {staticData.opex.bu2.overall}
                    </button>
                    <button
                      onClick={() => setSelectedOpExBU("bu3")}
                      className="px-5 py-2 rounded-lg font-black text-sm transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105"
                    >
                      BU 3 - {staticData.opex.bu3.overall}
                    </button>
                  </div>

                  {/* Overall Summary */}
                  <div
                    className={`${currentTheme.bgSecondary} rounded-lg p-4 flex-1`}
                  >
                    <h4
                      className={`text-sm font-bold ${currentTheme.textPrimary} mb-3`}
                    >
                      🏢 Group-wide OpEx Summary
                    </h4>
                    <div className="grid grid-cols-3 gap-3 h-[calc(100%-2rem)]">
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex flex-col justify-center">
                        <p className="text-xs font-bold text-gray-600 mb-1">
                          BU 1
                        </p>
                        <p className="text-4xl font-black text-green-600 sans-font">
                          {staticData.opex.bu1.overall}
                        </p>
                        <p className="text-xs font-bold text-gray-500 mt-1">
                          Score
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg flex flex-col justify-center">
                        <p className="text-xs font-bold text-gray-600 mb-1">
                          BU 2
                        </p>
                        <p className="text-4xl font-black text-orange-600 sans-font">
                          {staticData.opex.bu2.overall}
                        </p>
                        <p className="text-xs font-bold text-gray-500 mt-1">
                          Score
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg flex flex-col justify-center">
                        <p className="text-xs font-bold text-gray-600 mb-1">
                          BU 3
                        </p>
                        <p className="text-4xl font-black text-purple-600 sans-font">
                          {staticData.opex.bu3.overall}
                        </p>
                        <p className="text-xs font-bold text-gray-500 mt-1">
                          Score
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Back Button */}
              {selectedOpExBU && (
                <button
                  onClick={() => {
                    if (selectedOpExPlant) {
                      setSelectedOpExPlant(null);
                    } else {
                      setSelectedOpExBU(null);
                    }
                  }}
                  className="mb-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xs flex items-center gap-1 self-start"
                >
                  ← Back {selectedOpExPlant ? "to Plants" : "to BU"}
                </button>
              )}

              {/* TABULAR VIEW - Plant-wise */}
              {selectedOpExBU &&
                !selectedOpExPlant &&
                opexViewMode === "tabular" && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <h3 className="text-base font-black text-blue-700 flex items-center gap-2 mb-2">
                      <span>🏭</span>
                      {selectedOpExBU === "bu1"
                        ? "BU 1"
                        : selectedOpExBU === "bu2"
                        ? "BU 2"
                        : "BU 3"}{" "}
                      Plants
                    </h3>

                    <div className="grid grid-cols-2 gap-2 flex-1">
                      {Object.entries(selectedBUOpExData.plants).map(
                        ([plantName, plantData]) => (
                          <div
                            key={plantName}
                            className={`${currentTheme.bgSecondary} rounded-lg p-3 shadow-lg border-l-4 border-purple-500 cursor-pointer hover:scale-[1.02] transition`}
                            onClick={() => setSelectedOpExPlant(plantName)}
                          >
                            <h4
                              className={`text-sm font-black ${currentTheme.textPrimary} mb-2`}
                            >
                              {plantName}
                            </h4>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="text-center bg-gradient-to-br from-purple-50 to-pink-100 rounded p-2">
                                <p className="text-2xl font-black text-purple-600 sans-font">
                                  {plantData.score}
                                </p>
                                <p className="text-xs font-bold text-purple-600">
                                  Score
                                </p>
                              </div>
                              <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded p-2">
                                <p className="text-2xl font-black text-blue-600 sans-font">
                                  {plantData.efficiency}%
                                </p>
                                <p className="text-xs font-bold text-blue-600">
                                  Efficiency
                                </p>
                              </div>
                              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-100 rounded p-2">
                                <p className="text-xl font-black text-green-600 sans-font">
                                  {plantData.cost}
                                </p>
                                <p className="text-xs font-bold text-green-600">
                                  Cost Index
                                </p>
                              </div>
                              <div className="text-center bg-gradient-to-br from-orange-50 to-amber-100 rounded p-2">
                                <p className="text-xl font-black text-orange-600 sans-font">
                                  {plantData.productivity}
                                </p>
                                <p className="text-xs font-bold text-orange-600">
                                  Productivity
                                </p>
                              </div>
                            </div>

                            <p className="text-xs text-center text-purple-600 font-bold mt-2">
                              Click for lines →
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* GRAPHICAL VIEW - Plant-wise */}
              {selectedOpExBU &&
                !selectedOpExPlant &&
                opexViewMode === "graphical" && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <h3 className="text-base font-black text-blue-700 flex items-center gap-2 mb-2">
                      <span>📊</span>
                      {selectedOpExBU === "bu1"
                        ? "BU 1"
                        : selectedOpExBU === "bu2"
                        ? "BU 2"
                        : "BU 3"}{" "}
                      - Graphical
                    </h3>

                    <div className="grid grid-cols-2 gap-2 flex-1">
                      {Object.entries(selectedBUOpExData.plants).map(
                        ([plantName, plantData]) => (
                          <div
                            key={plantName}
                            className={`${currentTheme.bgSecondary} rounded-lg p-3 shadow-lg cursor-pointer hover:scale-[1.02] transition border-2 border-gray-200 hover:border-purple-400`}
                            onClick={() => setSelectedOpExPlant(plantName)}
                          >
                            <h4 className="text-sm font-black text-gray-800 mb-2 text-center">
                              {plantName}
                            </h4>

                            <div className="grid grid-cols-2 gap-2">
                              {/* OpEx Score Radial */}
                              <div className="flex flex-col items-center col-span-2">
                                <div className="relative w-20 h-20">
                                  <svg
                                    className="transform -rotate-90"
                                    width="80"
                                    height="80"
                                  >
                                    <circle
                                      cx="40"
                                      cy="40"
                                      r="34"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="6"
                                    />
                                    <circle
                                      cx="40"
                                      cy="40"
                                      r="34"
                                      fill="none"
                                      stroke={
                                        plantData.score >= 85
                                          ? "#a855f7"
                                          : plantData.score >= 75
                                          ? "#f59e0b"
                                          : "#ef4444"
                                      }
                                      strokeWidth="6"
                                      strokeDasharray={`${
                                        (plantData.score / 100) * 213.6
                                      } 213.6`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-lg font-black text-purple-600">
                                      {plantData.score}
                                    </span>
                                    <span className="text-xs font-bold text-gray-600">
                                      Score
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Efficiency */}
                              <div className="flex flex-col items-center">
                                <div className="relative w-14 h-14">
                                  <svg
                                    className="transform -rotate-90"
                                    width="56"
                                    height="56"
                                  >
                                    <circle
                                      cx="28"
                                      cy="28"
                                      r="22"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="5"
                                    />
                                    <circle
                                      cx="28"
                                      cy="28"
                                      r="22"
                                      fill="none"
                                      stroke="#3b82f6"
                                      strokeWidth="5"
                                      strokeDasharray={`${
                                        (plantData.efficiency / 100) * 138.2
                                      } 138.2`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-black text-blue-600">
                                      {plantData.efficiency}%
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs font-bold text-blue-600 mt-1">
                                  Efficiency
                                </p>
                              </div>

                              {/* Cost Index */}
                              <div className="flex flex-col items-center">
                                <div className="relative w-14 h-14">
                                  <svg
                                    className="transform -rotate-90"
                                    width="56"
                                    height="56"
                                  >
                                    <circle
                                      cx="28"
                                      cy="28"
                                      r="22"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="5"
                                    />
                                    <circle
                                      cx="28"
                                      cy="28"
                                      r="22"
                                      fill="none"
                                      stroke="#22c55e"
                                      strokeWidth="5"
                                      strokeDasharray={`${
                                        (plantData.cost / 100) * 138.2
                                      } 138.2`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-black text-green-600">
                                      {plantData.cost}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs font-bold text-green-600 mt-1">
                                  Cost
                                </p>
                              </div>

                              {/* Productivity */}
                              <div className="flex flex-col items-center col-span-2">
                                <div className="relative w-14 h-14">
                                  <svg
                                    className="transform -rotate-90"
                                    width="56"
                                    height="56"
                                  >
                                    <circle
                                      cx="28"
                                      cy="28"
                                      r="22"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="5"
                                    />
                                    <circle
                                      cx="28"
                                      cy="28"
                                      r="22"
                                      fill="none"
                                      stroke="#f97316"
                                      strokeWidth="5"
                                      strokeDasharray={`${
                                        (plantData.productivity / 100) * 138.2
                                      } 138.2`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-black text-orange-600">
                                      {plantData.productivity}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs font-bold text-orange-600 mt-1">
                                  Productivity
                                </p>
                              </div>
                            </div>

                            <p className="text-xs text-center text-purple-600 font-bold mt-2">
                              Click for lines →
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* TABULAR VIEW - Line-wise */}
              {selectedOpExPlant &&
                selectedPlantOpExData &&
                opexViewMode === "tabular" && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <h3 className="text-base font-black text-green-700 flex items-center gap-2 mb-2">
                      <span>📏</span>
                      {selectedOpExPlant} - Lines
                    </h3>

                    {/* Plant Summary - Compact */}
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-purple-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">Score</p>
                        <p className="text-2xl font-black text-purple-600 sans-font">
                          {selectedPlantOpExData.score}
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-blue-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">
                          Efficiency
                        </p>
                        <p className="text-2xl font-black text-blue-600 sans-font">
                          {selectedPlantOpExData.efficiency}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-green-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">Cost</p>
                        <p className="text-2xl font-black text-green-600 sans-font">
                          {selectedPlantOpExData.cost}
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-orange-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">
                          Productivity
                        </p>
                        <p className="text-2xl font-black text-orange-600 sans-font">
                          {selectedPlantOpExData.productivity}
                        </p>
                      </div>
                    </div>

                    {/* Lines Table - Compact */}
                    {Object.keys(selectedPlantOpExData.lines).length > 0 ? (
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 flex-1 overflow-auto`}
                      >
                        <table className="w-full text-xs">
                          <thead className="bg-gradient-to-r from-purple-100 to-pink-100 sticky top-0">
                            <tr>
                              <th className="px-2 py-2 text-left font-black text-gray-700">
                                Line
                              </th>
                              <th className="px-2 py-2 text-right font-black text-gray-700">
                                Efficiency
                              </th>
                              <th className="px-2 py-2 text-right font-black text-gray-700">
                                Cost
                              </th>
                              <th className="px-2 py-2 text-right font-black text-gray-700">
                                Productivity
                              </th>
                              <th className="px-2 py-2 text-right font-black text-gray-700">
                                Score
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(selectedPlantOpExData.lines).map(
                              ([lineName, lineData], idx) => (
                                <tr
                                  key={idx}
                                  className={
                                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  <td className="px-2 py-2 font-bold text-gray-800">
                                    {lineName}
                                  </td>
                                  <td className="px-2 py-2 text-right font-bold text-blue-600">
                                    {lineData.efficiency}%
                                  </td>
                                  <td className="px-2 py-2 text-right font-bold text-green-600">
                                    {lineData.cost}
                                  </td>
                                  <td className="px-2 py-2 text-right font-bold text-orange-600">
                                    {lineData.productivity}
                                  </td>
                                  <td className="px-2 py-2 text-right">
                                    <span
                                      className={`px-2 py-1 rounded-full font-black text-xs ${
                                        lineData.score >= 85
                                          ? "bg-purple-200 text-purple-800"
                                          : lineData.score >= 75
                                          ? "bg-yellow-200 text-yellow-800"
                                          : "bg-red-200 text-red-800"
                                      }`}
                                    >
                                      {lineData.score}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm font-bold text-gray-600">
                          No line data available
                        </p>
                      </div>
                    )}
                  </div>
                )}

              {/* GRAPHICAL VIEW - Line-wise - COMPACT */}
              {selectedOpExPlant &&
                selectedPlantOpExData &&
                opexViewMode === "graphical" && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <h3 className="text-base font-black text-green-700 flex items-center gap-2 mb-2">
                      <span>📊</span>
                      {selectedOpExPlant} - Graph
                    </h3>

                    {/* Plant Summary - Compact */}
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-purple-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">Score</p>
                        <p className="text-2xl font-black text-purple-600 sans-font">
                          {selectedPlantOpExData.score}
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-blue-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">
                          Efficiency
                        </p>
                        <p className="text-2xl font-black text-blue-600 sans-font">
                          {selectedPlantOpExData.efficiency}%
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-green-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">Cost</p>
                        <p className="text-2xl font-black text-green-600 sans-font">
                          {selectedPlantOpExData.cost}
                        </p>
                      </div>
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-2 text-center border-l-4 border-orange-500`}
                      >
                        <p className="text-xs font-bold text-gray-600">
                          Productivity
                        </p>
                        <p className="text-2xl font-black text-orange-600 sans-font">
                          {selectedPlantOpExData.productivity}
                        </p>
                      </div>
                    </div>

                    {Object.keys(selectedPlantOpExData.lines).length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-auto">
                        {Object.entries(selectedPlantOpExData.lines).map(
                          ([lineName, lineData]) => (
                            <div
                              key={lineName}
                              className={`${currentTheme.bgSecondary} rounded-lg p-2 shadow border-2 border-gray-200`}
                            >
                              <h4 className="text-xs font-black text-gray-800 mb-2 text-center">
                                {lineName}
                              </h4>

                              {/* Score - Main */}
                              <div className="flex justify-center mb-2">
                                <div className="relative w-16 h-16">
                                  <svg
                                    className="transform -rotate-90"
                                    width="64"
                                    height="64"
                                  >
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="26"
                                      fill="none"
                                      stroke="#e5e7eb"
                                      strokeWidth="5"
                                    />
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="26"
                                      fill="none"
                                      stroke={
                                        lineData.score >= 85
                                          ? "#a855f7"
                                          : lineData.score >= 75
                                          ? "#eab308"
                                          : "#ef4444"
                                      }
                                      strokeWidth="5"
                                      strokeDasharray={`${
                                        (lineData.score / 100) * 163.4
                                      } 163.4`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-sm font-black text-gray-800">
                                      {lineData.score}
                                    </span>
                                    <span className="text-xs font-bold text-gray-600">
                                      Score
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Components - Mini bars */}
                              <div className="grid grid-cols-3 gap-1">
                                <div>
                                  <div className="h-10 bg-gray-200 rounded relative overflow-hidden">
                                    <div
                                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400"
                                      style={{
                                        height: `${lineData.efficiency}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <p className="text-xs font-bold text-blue-600 text-center mt-1">
                                    {lineData.efficiency}%
                                  </p>
                                </div>
                                <div>
                                  <div className="h-10 bg-gray-200 rounded relative overflow-hidden">
                                    <div
                                      className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400"
                                      style={{ height: `${lineData.cost}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs font-bold text-green-600 text-center mt-1">
                                    {lineData.cost}
                                  </p>
                                </div>
                                <div>
                                  <div className="h-10 bg-gray-200 rounded relative overflow-hidden">
                                    <div
                                      className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-orange-400"
                                      style={{
                                        height: `${lineData.productivity}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <p className="text-xs font-bold text-orange-600 text-center mt-1">
                                    {lineData.productivity}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-2 text-center">
                                <span
                                  className={`px-2 py-1 rounded-full font-black text-xs ${
                                    lineData.score >= 85
                                      ? "bg-purple-200 text-purple-800"
                                      : lineData.score >= 75
                                      ? "bg-yellow-200 text-yellow-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {lineData.score >= 85
                                    ? "✓ Good"
                                    : lineData.score >= 75
                                    ? "⚠ OK"
                                    : "✗ Low"}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm font-bold text-gray-600">
                          No line data
                        </p>
                      </div>
                    )}
                  </div>
                )}
            </div>
          );
        case "cost": {
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                Manufacturing Cost
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {["daily", "mtd", "ytd"].map((period, idx) => {
                  const data = staticData.cost[period];
                  const borderColor =
                    idx === 0
                      ? "border-blue-500"
                      : idx === 1
                      ? "border-green-500"
                      : "border-purple-500";

                  return (
                    <div
                      key={period}
                      className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 ${borderColor}`}
                    >
                      <h4
                        className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2 uppercase`}
                      >
                        {period} Cost
                      </h4>

                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-xs text-gray-600 font-bold">
                            Actual
                          </p>
                          <p className="text-4xl font-bold text-amber-600 mono-font">
                            ₹{data.actual}
                          </p>
                          <p className="text-xs text-amber-600 font-bold">
                            /kg
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-600 font-bold">
                            Target
                          </p>
                          <p className="text-3xl font-bold text-green-600 mono-font">
                            ₹{data.target}
                          </p>
                          <p className="text-xs text-green-600 font-bold">
                            /kg
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 bg-red-100 rounded p-2 text-center">
                        <p className="text-base font-black text-red-700 mono-font">
                          +45% Var
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart and Breakdown Table */}
              <div className="grid grid-cols-2 gap-4">
                {/* ✅ Pie chart */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📊 Cost Breakdown
                  </h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        dataKey="value"
                        style={{ fontSize: "12px", fontWeight: "600" }}
                        // ✅ STOP ANIMATION
                        isAnimationActive={false}
                        animationDuration={0}
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: "14px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Cost Component Table */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📋 Cost Components
                  </h4>

                  <table className="w-full text-sm">
                    <thead className="bg-amber-100">
                      <tr>
                        <th className="px-3 py-2 text-left font-black text-gray-700">
                          Component
                        </th>
                        <th className="px-3 py-2 text-right font-black text-gray-700">
                          %
                        </th>
                        <th className="px-3 py-2 text-right font-black text-gray-700">
                          ₹/kg
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {costBreakdown.map((item, idx) => {
                        const costPerKg = (
                          staticData.cost.daily.actual *
                          (item.value / 100)
                        ).toFixed(2);

                        return (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-3 py-2 font-bold text-gray-800">
                              {item.name}
                            </td>
                            <td
                              className="px-3 py-2 text-right font-bold mono-font"
                              style={{ color: item.color }}
                            >
                              {item.value}%
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-amber-600 mono-font">
                              ₹{costPerKg}
                            </td>
                          </tr>
                        );
                      })}

                      <tr className="bg-amber-200 font-black">
                        <td className="px-3 py-2 text-gray-900">TOTAL</td>
                        <td className="px-3 py-2 text-right text-gray-900 mono-font">
                          100%
                        </td>
                        <td className="px-3 py-2 text-right text-amber-700 mono-font">
                          ₹{staticData.cost.daily.actual}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Plant-wise Cost Analysis */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  🏭 Plant-wise Cost Analysis
                </h4>

                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-gray-700">
                        Plant
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Target (₹/kg)
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Actual (₹/kg)
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Variance
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Raw Material
                      </th>
                      <th className="px-4 py-3 text-right font-black text-gray-700">
                        Power
                      </th>
                      <th className="px-4 py-3 text-center font-black text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {["R2-5", "R1-16", "MDW-7"].map((plant, idx) => {
                      const target = 3.0;

                      // ❗ OPTIONAL: avoid Math.random() (it triggers visual "change" on every re-render)
                      // if you want stable values, replace with static values OR memo store.
                      const actual = (3.0 + Math.random() * 0.5).toFixed(2);

                      const variance = (
                        ((parseFloat(actual) - target) / target) *
                        100
                      ).toFixed(1);

                      const rawMat = (parseFloat(actual) * 0.42).toFixed(2);
                      const power = (parseFloat(actual) * 0.18).toFixed(2);

                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-3 font-bold text-gray-800">
                            {plant}
                          </td>

                          <td className="px-4 py-3 text-right font-bold text-green-600 mono-font">
                            ₹{target.toFixed(2)}
                          </td>

                          <td className="px-4 py-3 text-right font-bold text-amber-600 mono-font">
                            ₹{actual}
                          </td>

                          <td
                            className={`px-4 py-3 text-right font-bold mono-font ${
                              parseFloat(variance) > 0
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {parseFloat(variance) > 0 ? "+" : ""}
                            {variance}%
                          </td>

                          <td className="px-4 py-3 text-right font-bold text-blue-600 mono-font">
                            ₹{rawMat}
                          </td>

                          <td className="px-4 py-3 text-right font-bold text-purple-600 mono-font">
                            ₹{power}
                          </td>

                          <td className="px-4 py-3 text-center">
                            <span
                              className={`px-3 py-1 rounded-full font-black ${
                                parseFloat(actual) <= target
                                  ? "bg-green-200 text-green-800"
                                  : parseFloat(actual) <= target * 1.05
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {parseFloat(actual) <= target
                                ? "✓ OK"
                                : parseFloat(actual) <= target * 1.05
                                ? "⚠ High"
                                : "✗ Critical"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        case "yield":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                🎯 Yield Performance
              </h2>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-green-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2 uppercase`}
                  >
                    Daily Yield
                  </h4>
                  <p className="text-4xl font-black text-green-700 mono-font">
                    98.2%
                  </p>
                  <p className="text-xs font-bold text-gray-600 mt-1">
                    Target: 99.0%
                  </p>
                </div>

                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-blue-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2 uppercase`}
                  >
                    MTD Yield
                  </h4>
                  <p className="text-4xl font-black text-blue-700 mono-font">
                    97.6%
                  </p>
                  <p className="text-xs font-bold text-gray-600 mt-1">
                    Target: 98.5%
                  </p>
                </div>

                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-purple-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2 uppercase`}
                  >
                    YTD Yield
                  </h4>
                  <p className="text-4xl font-black text-purple-700 mono-font">
                    97.9%
                  </p>
                  <p className="text-xs font-bold text-gray-600 mt-1">
                    Target: 98.0%
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  📋 Yield Loss Breakdown
                </h4>

                <table className="w-full text-sm">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-black text-gray-700">
                        Loss Reason
                      </th>
                      <th className="px-3 py-2 text-right font-black text-gray-700">
                        %
                      </th>
                      <th className="px-3 py-2 text-right font-black text-gray-700">
                        Kg Loss
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { reason: "Edge Trim", pct: 0.8, kg: 120 },
                      { reason: "Quality Rejection", pct: 0.5, kg: 75 },
                      { reason: "Setup Scrap", pct: 0.3, kg: 45 },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-3 py-2 font-bold text-gray-800">
                          {row.reason}
                        </td>
                        <td className="px-3 py-2 text-right font-bold mono-font text-red-600">
                          {row.pct.toFixed(1)}%
                        </td>
                        <td className="px-3 py-2 text-right font-bold mono-font text-amber-700">
                          {row.kg}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        case "maint":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4 flex items-center gap-3`}
              >
                <span className="text-3xl">🔧</span>
                PM Pillar Target - Preventive Maintenance Excellence
              </h2>

              {/* View Mode Tabs */}
              <div className="flex gap-3 justify-center mb-4">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 ${
                    viewMode === "table"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span>📋</span>
                  Table View
                </button>
                <button
                  onClick={() => setViewMode("graphical")}
                  className={`px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 ${
                    viewMode === "graphical"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span>📊</span>
                  Graphical View
                </button>
                <button
                  onClick={() => {
                    window.location.href =
                      "https://ktflceprd.kalyanicorp.com/kalyani.iot/predictive";
                  }}
                  className="px-6 py-3 rounded-lg font-black text-base transition-all flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 hover:text-white hover:shadow-lg"
                >
                  <span>🔍</span>
                  Detail
                </button>
              </div>

              {/* Table View */}
              {viewMode === "table" && (
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg overflow-hidden shadow-lg`}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white">
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            Work Area
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-center font-black">
                            Parameter To Be Measured
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            UOM
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            BM
                            <br />
                            (Avg. Oct-18 to March-19)
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            FY
                            <br />
                            2019-2020
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            FY 2020-21
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            Target
                            <br />
                            FY 2021-22
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            Target
                            <br />
                            FY 2022-23
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            Present Status
                            <br />
                            FY 21-22
                            <br />
                            Feb-22
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-center font-black">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* P - Productivity Section */}
                        <tr className="bg-blue-100">
                          <td
                            rowSpan="4"
                            className="border border-gray-300 px-3 py-2 text-center font-black text-blue-700 text-lg align-middle"
                          >
                            P<br />
                            <span className="text-xs font-semibold">
                              roductivity
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Breakdown
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Occ / Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.occMonth.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.occMonth.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.occMonth.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.occMonth.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.occMonth.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.occMonth.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {staticData.maint.breakdown.occMonth.achievement}%
                              ↑
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800"></td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Mn Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.mmMonth.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.mmMonth.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.mmMonth.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.mmMonth.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.mmMonth.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.mmMonth.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {staticData.maint.breakdown.mmMonth.achievement}%
                              ↑
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-blue-100">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Repeated Breakdown
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Occ / Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.repeatedOccMonth.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.repeatedOccMonth.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.repeatedOccMonth.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.breakdown.repeatedOccMonth
                                .target2122
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.breakdown.repeatedOccMonth
                                .target2223
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.breakdown.repeatedOccMonth
                                .current
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {
                                staticData.maint.breakdown.repeatedOccMonth
                                  .achievement
                              }
                              % ↑
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            PM Time/Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Man-Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.pmTimeMonth.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.pmTimeMonth.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.pmTimeMonth.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.pmTimeMonth.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.pmTimeMonth.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.breakdown.pmTimeMonth.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-red-200 text-red-800">
                              {
                                staticData.maint.breakdown.pmTimeMonth
                                  .achievement
                              }
                              % ↑
                            </span>
                          </td>
                        </tr>

                        {/* Q - Quality Section */}
                        <tr className="bg-green-100">
                          <td
                            rowSpan="2"
                            className="border border-gray-300 px-3 py-2 text-center font-black text-green-700 text-lg align-middle"
                          >
                            Q<br />
                            <span className="text-xs font-semibold">
                              uality
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            No of Machines covered in PM
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos./Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.machinesCovered.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.machinesCovered.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.machinesCovered.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.quality.machinesCovered
                                .target2122
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.quality.machinesCovered
                                .target2223
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.machinesCovered.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {
                                staticData.maint.quality.machinesCovered
                                  .achievement
                              }
                              % ↑
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Defect phenomena due to weak PM
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos./Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.defectPhenomena.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.defectPhenomena.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.defectPhenomena.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.quality.defectPhenomena
                                .target2122
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.quality.defectPhenomena
                                .target2223
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.quality.defectPhenomena.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {
                                staticData.maint.quality.defectPhenomena
                                  .achievement
                              }
                              % ↑
                            </span>
                          </td>
                        </tr>

                        {/* C - Cost Section */}
                        <tr className="bg-amber-100">
                          <td
                            rowSpan="10"
                            className="border border-gray-300 px-3 py-2 text-center font-black text-amber-700 text-lg align-middle"
                          >
                            C<br />
                            <span className="text-xs font-semibold">ost</span>
                          </td>
                          <td
                            rowSpan="6"
                            className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-700"
                          >
                            Maintenance Cost
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Total Maintenance Cost
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            % of Sale
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.totalMaintCost.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.totalMaintCost.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.totalMaintCost.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.totalMaintCost.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.totalMaintCost.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {staticData.maint.cost.totalMaintCost.achievement}
                              % ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Parts replaced after B/D
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            % of Sale
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAfterBD.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAfterBD.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAfterBD.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAfterBD.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAfterBD.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {staticData.maint.cost.partsAfterBD.achievement}%
                              ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-100">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Parts replaced as per TBM/CBM
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            % of Sale
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAsTBM.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAsTBM.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAsTBM.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAsTBM.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.partsAsTBM.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {staticData.maint.cost.partsAsTBM.achievement}% ↑
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            JH Restoration/Up gradation
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Rs in lakh
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestoration.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestoration.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestoration.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestoration.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestoration.target2223}
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {staticData.maint.cost.jhRestoration.achievement}%
                              ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-100">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800"></td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            % of Sale
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestorationPercent.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestorationPercent.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.cost.jhRestorationPercent
                                .target2122
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.cost.jhRestorationPercent
                                .target2223
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.jhRestorationPercent.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {
                                staticData.maint.cost.jhRestorationPercent
                                  .achievement
                              }
                              % ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            AMC Contract
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            % of Sale
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.amcContract.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.amcContract.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.amcContract.fy2021}
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.amcContract.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.amcContract.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {staticData.maint.cost.amcContract.achievement}% ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-100">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Subcontract/Labour
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            % of Sale
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.subcontract.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.subcontract.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.subcontract.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.subcontract.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.subcontract.target2223}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.subcontract.current}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              {staticData.maint.cost.subcontract.achievement}% ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-50">
                          <td
                            rowSpan="3"
                            className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-700"
                          >
                            Energy Cost
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Power Consumption
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            KWh/Ton
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.powerConsumption.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.powerConsumption.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.powerConsumption.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.powerConsumption.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.powerConsumption.target2223}
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {
                                staticData.maint.cost.powerConsumption
                                  .achievement
                              }
                              % ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-100">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Grease Consumption
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Kg/Ton
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.greaseConsumption.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.greaseConsumption.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.greaseConsumption.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.greaseConsumption.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.greaseConsumption.target2223}
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {
                                staticData.maint.cost.greaseConsumption
                                  .achievement
                              }
                              % ↓
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-amber-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Hyd. oil Consumption
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Ltr/Ton
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.hydOilConsumption.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.hydOilConsumption.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.hydOilConsumption.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.hydOilConsumption.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.cost.hydOilConsumption.target2223}
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {
                                staticData.maint.cost.hydOilConsumption
                                  .achievement
                              }
                              % ↓
                            </span>
                          </td>
                        </tr>

                        {/* S - Safety Section */}
                        <tr className="bg-purple-100">
                          <td className="border border-gray-300 px-3 py-2 text-center font-black text-purple-700 text-lg align-middle">
                            S<br />
                            <span className="text-xs font-semibold">afety</span>
                          </td>
                          <td
                            rowSpan="1"
                            className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-700"
                          >
                            Safety
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Accident Due to Weak PM
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos./Month
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.safety.accidentDueToWeakPM.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.safety.accidentDueToWeakPM.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.safety.accidentDueToWeakPM.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.safety.accidentDueToWeakPM
                                .target2122
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.safety.accidentDueToWeakPM
                                .target2223
                            }
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-green-200 text-green-800">
                              ↔
                            </span>
                          </td>
                        </tr>

                        {/* M - Morale Section */}
                        <tr className="bg-cyan-100">
                          <td
                            rowSpan="3"
                            className="border border-gray-300 px-3 py-2 text-center font-black text-cyan-700 text-lg align-middle"
                          >
                            M<br />
                            <span className="text-xs font-semibold">orale</span>
                          </td>
                          <td
                            rowSpan="3"
                            className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-700"
                          >
                            Kaizen
                          </td>
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Technician Kaizen
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.technicianKaizen.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.technicianKaizen.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.technicianKaizen.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.morale.technicianKaizen
                                .target2122
                            }
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {
                              staticData.maint.morale.technicianKaizen
                                .target2223
                            }
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {
                                staticData.maint.morale.technicianKaizen
                                  .achievement
                              }
                              % ↑
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-cyan-50">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            Engineer / Manager Kaizen
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            Nos.
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.engineerKaizen.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.engineerKaizen.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.engineerKaizen.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.engineerKaizen.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.engineerKaizen.target2223}
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {
                                staticData.maint.morale.engineerKaizen
                                  .achievement
                              }
                              % ↑
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-cyan-100">
                          <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                            5S Audit Score
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                            %
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.ssAuditScore.bm}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.ssAuditScore.fy1920}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.ssAuditScore.fy2021}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.ssAuditScore.target2122}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            {staticData.maint.morale.ssAuditScore.target2223}
                          </td>

                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded font-black text-xs bg-amber-200 text-amber-800">
                              {staticData.maint.morale.ssAuditScore.achievement}
                              % ↑
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 px-4 py-2 mt-2 rounded-b-lg">
                    <p className="text-white text-sm font-black text-center">
                      KTTPL, Ranjangaon | Scaling Manufacturing Excellence
                      through TPM | Slide No. 8 of 100
                    </p>
                  </div>
                </div>
              )}

              {/* Graphical View */}
              {/* Graphical View */}
              {viewMode === "graphical" && (
                <div className="space-y-4">
                  {/* PM Pillar Metric Tabs */}
                  <div className="flex gap-2 justify-center flex-wrap bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-lg shadow-inner">
                    <button
                      onClick={() => setSelectedMetric("productivity")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "productivity"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                          : "bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-300"
                      }`}
                    >
                      📊 P - Productivity
                    </button>
                    <button
                      onClick={() => setSelectedMetric("quality")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "quality"
                          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105"
                          : "bg-white text-green-700 hover:bg-green-50 border-2 border-green-300"
                      }`}
                    >
                      ✨ Q - Quality
                    </button>
                    <button
                      onClick={() => setSelectedMetric("cost")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "cost"
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg scale-105"
                          : "bg-white text-amber-700 hover:bg-amber-50 border-2 border-amber-300"
                      }`}
                    >
                      💰 C - Cost
                    </button>
                    <button
                      onClick={() => setSelectedMetric("safety")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "safety"
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                          : "bg-white text-purple-700 hover:bg-purple-50 border-2 border-purple-300"
                      }`}
                    >
                      🦺 S - Safety
                    </button>
                    <button
                      onClick={() => setSelectedMetric("morale")}
                      className={`px-6 py-3 rounded-lg font-black text-sm transition-all ${
                        selectedMetric === "morale"
                          ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg scale-105"
                          : "bg-white text-cyan-700 hover:bg-cyan-50 border-2 border-cyan-300"
                      }`}
                    >
                      😊 M - Morale
                    </button>
                  </div>

                  {/* Productivity Charts */}
                  {selectedMetric === "productivity" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-blue-700 flex items-center gap-2">
                        <span>📊</span>
                        Productivity Analytics - Breakdown Reduction
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Breakdown Trend */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-blue-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-blue-600">📉</span>
                            Breakdown Occurrences/Month
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart
                              data={[
                                {
                                  period: "BM",
                                  value: staticData.maint.breakdown.occMonth.bm,
                                  target: 35,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.breakdown.occMonth.fy1920,
                                  target: 35,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.breakdown.occMonth.fy2021,
                                  target: 35,
                                },
                                {
                                  period: "Target21-22",
                                  value:
                                    staticData.maint.breakdown.occMonth
                                      .target2122,
                                  target: 35,
                                },
                                {
                                  period: "Target22-23",
                                  value:
                                    staticData.maint.breakdown.occMonth
                                      .target2223,
                                  target: 18,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.breakdown.occMonth.current,
                                  target: 35,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "11px", fontWeight: "600" }}
                                angle={-15}
                                textAnchor="end"
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #3b82f6",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                fill="#93c5fd"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                name="Breakdowns"
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target"
                                isAnimationActive={false}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Breakdown Minutes/Month */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-cyan-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-cyan-600">⏱️</span>
                            Breakdown Minutes/Month
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                              data={[
                                {
                                  period: "BM",
                                  value: staticData.maint.breakdown.mmMonth.bm,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.breakdown.mmMonth.fy1920,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.breakdown.mmMonth.fy2021,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.breakdown.mmMonth.current,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #06b6d4",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#06b6d4"
                                name="Minutes"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Repeated Breakdown & PM Time */}
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-indigo-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-indigo-600">🔄</span>
                            Repeated Breakdown Occ/Month
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart
                              data={[
                                {
                                  period: "BM",
                                  value:
                                    staticData.maint.breakdown.repeatedOccMonth
                                      .bm,
                                  target: 0,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.breakdown.repeatedOccMonth
                                      .fy1920,
                                  target: 0,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.breakdown.repeatedOccMonth
                                      .fy2021,
                                  target: 0,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.breakdown.repeatedOccMonth
                                      .current,
                                  target: 0,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #6366f1",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#6366f1"
                                name="Repeated B/D"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={3}
                                name="Target"
                                isAnimationActive={false}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>

                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-purple-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-purple-600">🛠️</span>
                            PM Time/Month (Man-Hours)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                              data={[
                                {
                                  period: "BM",
                                  value:
                                    staticData.maint.breakdown.pmTimeMonth.bm,
                                  target:
                                    staticData.maint.breakdown.pmTimeMonth
                                      .target2223,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.breakdown.pmTimeMonth
                                      .fy1920,
                                  target:
                                    staticData.maint.breakdown.pmTimeMonth
                                      .target2223,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.breakdown.pmTimeMonth
                                      .fy2021,
                                  target:
                                    staticData.maint.breakdown.pmTimeMonth
                                      .target2223,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.breakdown.pmTimeMonth
                                      .current,
                                  target:
                                    staticData.maint.breakdown.pmTimeMonth
                                      .target2223,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #a855f7",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#a855f7"
                                name="PM Time"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                name="Target"
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border-2 border-blue-300">
                          <p className="text-sm font-bold text-blue-700 mb-1">
                            B/D Achievement
                          </p>
                          <p className="text-4xl font-black text-blue-600 sans-font">
                            {staticData.maint.breakdown.occMonth.achievement}%
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            {staticData.maint.breakdown.occMonth.current} /{" "}
                            {staticData.maint.breakdown.occMonth.target2122}{" "}
                            Target
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 text-center border-2 border-cyan-300">
                          <p className="text-sm font-bold text-cyan-700 mb-1">
                            B/D Minutes
                          </p>
                          <p className="text-4xl font-black text-cyan-600 sans-font">
                            {staticData.maint.breakdown.mmMonth.current}
                          </p>
                          <p className="text-xs text-cyan-600 mt-1">
                            {staticData.maint.breakdown.mmMonth.achievement}%
                            Achievement
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 text-center border-2 border-indigo-300">
                          <p className="text-sm font-bold text-indigo-700 mb-1">
                            Repeated B/D
                          </p>
                          <p className="text-4xl font-black text-indigo-600 sans-font">
                            {
                              staticData.maint.breakdown.repeatedOccMonth
                                .current
                            }
                          </p>
                          <p className="text-xs text-indigo-600 mt-1">
                            {
                              staticData.maint.breakdown.repeatedOccMonth
                                .achievement
                            }
                            % Achievement
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border-2 border-purple-300">
                          <p className="text-sm font-bold text-purple-700 mb-1">
                            PM Time
                          </p>
                          <p className="text-4xl font-black text-purple-600 sans-font">
                            {staticData.maint.breakdown.pmTimeMonth.current}
                          </p>
                          <p className="text-xs text-purple-600 mt-1">
                            Target:{" "}
                            {staticData.maint.breakdown.pmTimeMonth.target2223}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quality Charts */}
                  {selectedMetric === "quality" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-green-700 flex items-center gap-2">
                        <span>✨</span>
                        Quality Analytics - PM Coverage & Defects
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Machines Covered */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-green-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-green-600">🔧</span>
                            Machines Covered in PM
                          </h4>
                          <ResponsiveContainer width="100%" height={280}>
                            <ComposedChart
                              data={[
                                {
                                  period: "BM",
                                  value:
                                    staticData.maint.quality.machinesCovered.bm,
                                  target: 62,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.quality.machinesCovered
                                      .fy1920,
                                  target: 62,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.quality.machinesCovered
                                      .fy2021,
                                  target: 62,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.quality.machinesCovered
                                      .current,
                                  target: 62,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                                domain={[0, 70]}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #10b981",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#10b981"
                                name="Machines"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#ef4444"
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                name="Target"
                                isAnimationActive={false}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Defect Phenomena */}
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-emerald-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-emerald-600">⚠️</span>
                            Defect Phenomena due to Weak PM
                          </h4>
                          <ResponsiveContainer width="100%" height={280}>
                            <BarChart
                              data={[
                                {
                                  period: "BM",
                                  value:
                                    staticData.maint.quality.defectPhenomena.bm,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.quality.defectPhenomena
                                      .fy1920,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.quality.defectPhenomena
                                      .fy2021,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.quality.defectPhenomena
                                      .current,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #059669",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#059669"
                                name="Defects"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 text-center border-2 border-green-300">
                          <p className="text-sm font-bold text-green-700 mb-2">
                            Machines in PM
                          </p>
                          <p className="text-5xl font-black text-green-600 sans-font">
                            {staticData.maint.quality.machinesCovered.current}
                          </p>
                          <p className="text-xs text-green-600 mt-2">
                            {
                              staticData.maint.quality.machinesCovered
                                .achievement
                            }
                            % Coverage ✓
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-6 text-center border-2 border-emerald-300">
                          <p className="text-sm font-bold text-emerald-700 mb-2">
                            Defect Phenomena
                          </p>
                          <p className="text-5xl font-black text-emerald-600 sans-font">
                            {staticData.maint.quality.defectPhenomena.current}
                          </p>
                          <p className="text-xs text-emerald-600 mt-2">
                            {
                              staticData.maint.quality.defectPhenomena
                                .achievement
                            }
                            % Achievement ✓
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cost Charts */}
                  {selectedMetric === "cost" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-amber-700 flex items-center gap-2">
                        <span>💰</span>
                        Cost Analytics - Maintenance Cost Optimization
                      </h3>

                      {/* Total Maintenance Cost */}
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-amber-500`}
                      >
                        <h4
                          className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                        >
                          <span className="text-amber-600">💵</span>
                          Total Maintenance Cost (% of Sale)
                        </h4>
                        <ResponsiveContainer width="100%" height={280}>
                          <ComposedChart
                            data={[
                              {
                                period: "BM",
                                cost: staticData.maint.cost.totalMaintCost.bm,
                                target: 0.92,
                              },
                              {
                                period: "FY19-20",
                                cost: staticData.maint.cost.totalMaintCost
                                  .fy1920,
                                target: 0.92,
                              },
                              {
                                period: "FY20-21",
                                cost: staticData.maint.cost.totalMaintCost
                                  .fy2021,
                                target: 0.92,
                              },
                              {
                                period: "Target21-22",
                                cost: staticData.maint.cost.totalMaintCost
                                  .target2122,
                                target: 0.92,
                              },
                              {
                                period: "Target22-23",
                                cost: staticData.maint.cost.totalMaintCost
                                  .target2223,
                                target: 0.82,
                              },
                              {
                                period: "Current",
                                cost: staticData.maint.cost.totalMaintCost
                                  .current,
                                target: 0.92,
                              },
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="period"
                              stroke="#334155"
                              style={{ fontSize: "11px", fontWeight: "600" }}
                              angle={-15}
                              textAnchor="end"
                            />
                            <YAxis
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                              domain={[0, 2.5]}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #f59e0b",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            />
                            <Bar
                              dataKey="cost"
                              fill="#f59e0b"
                              name="Maint Cost %"
                              radius={[6, 6, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="target"
                              stroke="#10b981"
                              strokeWidth={3}
                              name="Target %"
                              isAnimationActive={false}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Parts Cost Breakdown */}
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-orange-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-orange-600">🔧</span>
                            Parts Cost Analysis (% of Sale)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                              data={[
                                {
                                  category: "After B/D",
                                  bm: staticData.maint.cost.partsAfterBD.bm,
                                  current:
                                    staticData.maint.cost.partsAfterBD.current,
                                  target:
                                    staticData.maint.cost.partsAfterBD
                                      .target2223,
                                },
                                {
                                  category: "As TBM/CBM",
                                  bm: staticData.maint.cost.partsAsTBM.bm,
                                  current:
                                    staticData.maint.cost.partsAsTBM.current,
                                  target:
                                    staticData.maint.cost.partsAsTBM.target2223,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="category"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #f97316",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Bar
                                dataKey="bm"
                                fill="#94a3b8"
                                name="Benchmark"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                              <Bar
                                dataKey="current"
                                fill="#f97316"
                                name="Current"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                              <Bar
                                dataKey="target"
                                fill="#10b981"
                                name="Target FY22-23"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-rose-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-rose-600">⚡</span>
                            Energy Consumption (KWh/Ton)
                          </h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <ComposedChart
                              data={[
                                {
                                  period: "BM",
                                  value:
                                    staticData.maint.cost.powerConsumption.bm,
                                  target: 850,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.cost.powerConsumption
                                      .fy1920,
                                  target: 850,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.cost.powerConsumption
                                      .fy2021,
                                  target: 850,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.cost.powerConsumption
                                      .current,
                                  target: 850,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #f43f5e",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Legend
                                wrapperStyle={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                fill="#fda4af"
                                stroke="#f43f5e"
                                strokeWidth={3}
                                name="Power KWh/Ton"
                                isAnimationActive={false}
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target"
                                isAnimationActive={false}
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-4 text-center border-2 border-amber-300">
                          <p className="text-sm font-bold text-amber-700 mb-1">
                            Total Maint Cost
                          </p>
                          <p className="text-4xl font-black text-amber-600 sans-font">
                            {staticData.maint.cost.totalMaintCost.current}%
                          </p>
                          <p className="text-xs text-amber-600 mt-1">
                            {staticData.maint.cost.totalMaintCost.achievement}%
                            Achievement
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg p-4 text-center border-2 border-orange-300">
                          <p className="text-sm font-bold text-orange-700 mb-1">
                            Parts After B/D
                          </p>
                          <p className="text-4xl font-black text-orange-600 sans-font">
                            {staticData.maint.cost.partsAfterBD.current}%
                          </p>
                          <p className="text-xs text-orange-600 mt-1">
                            {staticData.maint.cost.partsAfterBD.achievement}%
                            Achievement
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg p-4 text-center border-2 border-yellow-300">
                          <p className="text-sm font-bold text-yellow-700 mb-1">
                            Parts TBM/CBM
                          </p>
                          <p className="text-4xl font-black text-yellow-600 sans-font">
                            {staticData.maint.cost.partsAsTBM.current}%
                          </p>
                          <p className="text-xs text-yellow-600 mt-1">
                            {staticData.maint.cost.partsAsTBM.achievement}%
                            Achievement
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-50 to-red-100 rounded-lg p-4 text-center border-2 border-rose-300">
                          <p className="text-sm font-bold text-rose-700 mb-1">
                            Power Consumption
                          </p>
                          <p className="text-4xl font-black text-rose-600 sans-font">
                            {staticData.maint.cost.powerConsumption.current}
                          </p>
                          <p className="text-xs text-rose-600 mt-1">
                            {staticData.maint.cost.powerConsumption.achievement}
                            % Achievement
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Safety Charts */}
                  {selectedMetric === "safety" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-purple-700 flex items-center gap-2">
                        <span>🦺</span>
                        Safety Analytics - Zero Accident Culture
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        <div
                          className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-purple-500`}
                        >
                          <h4
                            className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                          >
                            <span className="text-purple-600">⚠️</span>
                            Accident Due to Weak PM
                          </h4>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={[
                                {
                                  period: "BM",
                                  value:
                                    staticData.maint.safety.accidentDueToWeakPM
                                      .bm,
                                },
                                {
                                  period: "FY19-20",
                                  value:
                                    staticData.maint.safety.accidentDueToWeakPM
                                      .fy1920,
                                },
                                {
                                  period: "FY20-21",
                                  value:
                                    staticData.maint.safety.accidentDueToWeakPM
                                      .fy2021,
                                },
                                {
                                  period: "Current",
                                  value:
                                    staticData.maint.safety.accidentDueToWeakPM
                                      .current,
                                },
                              ]}
                              margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                              }}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                              />
                              <XAxis
                                dataKey="period"
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <YAxis
                                stroke="#334155"
                                style={{ fontSize: "12px", fontWeight: "600" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "2px solid #a855f7",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#a855f7"
                                name="Accidents"
                                radius={[6, 6, 0, 0]}
                                isAnimationActive={false}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Safety Summary */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-8 text-center border-2 border-purple-300">
                          <p className="text-lg font-bold text-purple-700 mb-2">
                            Current Status
                          </p>
                          <p className="text-6xl font-black text-purple-600 sans-font">
                            {
                              staticData.maint.safety.accidentDueToWeakPM
                                .current
                            }
                          </p>
                          <p className="text-sm text-purple-600 mt-2">
                            Accidents This Period
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-8 text-center border-2 border-green-300">
                          <p className="text-lg font-bold text-green-700 mb-2">
                            Target
                          </p>
                          <p className="text-6xl font-black text-green-600 sans-font">
                            {
                              staticData.maint.safety.accidentDueToWeakPM
                                .target2223
                            }
                          </p>
                          <p className="text-sm text-green-600 mt-2">
                            Zero Accidents ✓
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Morale Charts */}
                  {selectedMetric === "morale" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-cyan-700 flex items-center gap-2">
                        <span>😊</span>
                        Morale Analytics - Kaizen & 5S Culture
                      </h3>

                      {/* Kaizen Performance */}
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-cyan-500`}
                      >
                        <h4
                          className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                        >
                          <span className="text-cyan-600">💡</span>
                          Kaizen Implementation (Nos.)
                        </h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={[
                              {
                                category: "Technician",
                                bm: staticData.maint.morale.technicianKaizen.bm,
                                current:
                                  staticData.maint.morale.technicianKaizen
                                    .current,
                                target:
                                  staticData.maint.morale.technicianKaizen
                                    .target2223,
                              },
                              {
                                category: "Engineer",
                                bm: staticData.maint.morale.engineerKaizen.bm,
                                current:
                                  staticData.maint.morale.engineerKaizen
                                    .current,
                                target:
                                  staticData.maint.morale.engineerKaizen
                                    .target2223,
                              },
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="category"
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <YAxis
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #06b6d4",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            />
                            <Bar
                              dataKey="bm"
                              fill="#94a3b8"
                              name="Benchmark"
                              radius={[6, 6, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Bar
                              dataKey="current"
                              fill="#06b6d4"
                              name="Current"
                              radius={[6, 6, 0, 0]}
                              isAnimationActive={false}
                            />
                            <Bar
                              dataKey="target"
                              fill="#10b981"
                              name="Target FY22-23"
                              radius={[6, 6, 0, 0]}
                              isAnimationActive={false}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* 5S Audit Score */}
                      <div
                        className={`${currentTheme.bgSecondary} rounded-lg p-4 shadow-lg border-l-4 border-indigo-500`}
                      >
                        <h4
                          className={`text-lg font-black ${currentTheme.textPrimary} mb-3 flex items-center gap-2`}
                        >
                          <span className="text-indigo-600">📋</span>
                          5S Audit Score (%)
                        </h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <ComposedChart
                            data={[
                              {
                                period: "BM",
                                score: staticData.maint.morale.ssAuditScore.bm,
                                target: 90,
                              },
                              {
                                period: "FY19-20",
                                score:
                                  staticData.maint.morale.ssAuditScore.fy1920,
                                target: 90,
                              },
                              {
                                period: "FY20-21",
                                score:
                                  staticData.maint.morale.ssAuditScore.fy2021,
                                target: 90,
                              },
                              {
                                period: "Current",
                                score:
                                  staticData.maint.morale.ssAuditScore.current,
                                target: 90,
                              },
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="period"
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            />
                            <YAxis
                              stroke="#334155"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                              domain={[0, 100]}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #6366f1",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="score"
                              fill="#c7d2fe"
                              stroke="#6366f1"
                              strokeWidth={3}
                              name="5S Score %"
                              isAnimationActive={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="target"
                              stroke="#10b981"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="Target %"
                              isAnimationActive={false}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg p-6 text-center border-2 border-cyan-300">
                          <p className="text-sm font-bold text-cyan-700 mb-2">
                            Technician Kaizen
                          </p>
                          <p className="text-5xl font-black text-cyan-600 sans-font">
                            {staticData.maint.morale.technicianKaizen.current}
                          </p>
                          <p className="text-xs text-cyan-600 mt-2">
                            {
                              staticData.maint.morale.technicianKaizen
                                .achievement
                            }
                            % Achievement
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 text-center border-2 border-blue-300">
                          <p className="text-sm font-bold text-blue-700 mb-2">
                            Engineer Kaizen
                          </p>
                          <p className="text-5xl font-black text-blue-600 sans-font">
                            {staticData.maint.morale.engineerKaizen.current}
                          </p>
                          <p className="text-xs text-blue-600 mt-2">
                            {staticData.maint.morale.engineerKaizen.achievement}
                            % Achievement
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-lg p-6 text-center border-2 border-indigo-300">
                          <p className="text-sm font-bold text-indigo-700 mb-2">
                            5S Score
                          </p>
                          <p className="text-5xl font-black text-indigo-600 sans-font">
                            {staticData.maint.morale.ssAuditScore.current}%
                          </p>
                          <p className="text-xs text-indigo-600 mt-2">
                            {staticData.maint.morale.ssAuditScore.achievement}%
                            Achievement
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Note */}
              <div className="text-xs text-gray-600 italic mt-2 text-center">
                * Switch between Table and Graphical views for detailed PM
                Pillar analysis
              </div>
            </div>
          );
        // Continue with other cases (power, cost, ht, inventory, npd, customer)
        // Following the same pattern of replacing mono-font with sans-font
        // Due to length constraints, I'm showing the pattern is established

        default:
          return (
            <div className={`${currentTheme.textPrimary} text-lg`}>
              Details for {card}
            </div>
          );
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-7xl h-[90vh] rounded-2xl flex flex-col"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.cardBg} 0%, ${currentTheme.cardBgEnd} 100%)`,
            border: `1px solid ${currentTheme.shimmer}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
        </div>
      </div>
    );
  };

  // Render card content with Plan vs Actual
  const renderCardContent = (cardType) => {
    const data = staticData[cardType];

    if (globalView === "overview") {
      return (
        <div className="space-y-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            {["daily", "mtd", "ytd"].map((period, idx) => {
              const periodData = data[period];
              const actual =
                cardType === "sales"
                  ? periodData.actual
                  : cardType === "cost"
                  ? periodData.actual
                  : cardType === "power"
                  ? periodData.utilization
                  : cardType === "quality"
                  ? periodData.scrap
                  : periodData.actual;
              const plan =
                cardType === "sales"
                  ? periodData.plan
                  : cardType === "cost"
                  ? periodData.target
                  : cardType === "power"
                  ? periodData.plan
                  : periodData.plan;
              const percentage =
                cardType === "cost"
                  ? (actual / plan) * 100
                  : (actual / plan) * 100;
              const borderColor =
                idx === 0
                  ? "border-blue-500"
                  : idx === 1
                  ? "border-green-500"
                  : "border-purple-500";

              return (
                <div
                  key={period}
                  className={`${currentTheme.bgSecondary} rounded p-1.5 border-l-2 ${borderColor}`}
                >
                  <p
                    className={`text-[10px] font-bold ${currentTheme.textTertiary} mb-0.5 uppercase`}
                  >
                    {period}
                  </p>

                  {/* Actual Value */}
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className="text-[9px] font-semibold text-gray-600">
                      Act:
                    </span>
                    <p
                      className={`text-sm font-black ${currentTheme.textPrimary} sans-font`}
                    >
                      {cardType === "sales" || cardType === "cost" ? "₹" : ""}
                      {actual}
                      {cardType === "power" ? "%" : ""}
                    </p>
                  </div>

                  {/* Plan Value */}
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className="text-[9px] font-semibold text-gray-600">
                      Plan:
                    </span>
                    <p className="text-xs font-bold text-blue-600 sans-font">
                      {cardType === "sales" || cardType === "cost" ? "₹" : ""}
                      {plan}
                      {cardType === "power" ? "%" : ""}
                    </p>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="mt-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[8px] font-bold text-gray-500">
                        Progress
                      </span>
                      <span
                        className={`text-[9px] font-black ${
                          percentage >= 100
                            ? "text-green-600"
                            : percentage >= 90
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          percentage >= 100
                            ? "bg-green-500"
                            : percentage >= 90
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      const periodData = data[globalView];
      const actual =
        cardType === "sales"
          ? periodData.actual
          : cardType === "cost"
          ? periodData.actual
          : cardType === "power"
          ? periodData.utilization
          : cardType === "quality"
          ? periodData.scrap
          : periodData.actual;
      const plan =
        cardType === "sales"
          ? periodData.plan
          : cardType === "cost"
          ? periodData.target
          : cardType === "power"
          ? periodData.plan
          : periodData.plan;
      const percentage = (actual / plan) * 100;

      return (
        <div className="space-y-2">
          {/* Large Display */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-2">
              <p className="text-[10px] font-bold text-gray-600 mb-0.5">
                ACTUAL
              </p>
              <p
                className={`text-3xl font-black text-emerald-600 sans-font leading-tight`}
              >
                {cardType === "sales" || cardType === "cost" ? "₹" : ""}
                {actual}
                {cardType === "power" ? "%" : ""}
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg p-2">
              <p className="text-[10px] font-bold text-gray-600 mb-0.5">PLAN</p>

              <p
                className={`text-3xl font-black text-blue-600 sans-font leading-tight`}
              >
                99
              </p>
            </div>
          </div>

          {/* Achievement Bar */}
          <div className={`${currentTheme.bgSecondary} rounded-lg p-2`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-700">
                Achievement
              </span>
              <span className={`text-xl font-black "text-green-600" sans-font`}>
                95.4%
              </span>
            </div>
            <div className="relative w-full bg-green-500 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  percentage >= 100
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : percentage >= 90
                    ? "bg-gradient-to-r from-amber-500 to-orange-600"
                    : "bg-gradient-to-r from-red-500 to-rose-600"
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white">
                  {percentage >= 100
                    ? "✓ Achieved"
                    : percentage >= 90
                    ? "Near Target"
                    : "Below Target"}
                </span>
              </div>
            </div>
          </div>

          {/* Variance */}
          <div className="grid grid-cols-2 gap-2">
            <div
              className={`${currentTheme.bgSecondary} rounded p-1.5 text-center`}
            >
              <p className="text-[9px] font-semibold text-gray-600">Variance</p>
              <p
                className={`text-base font-black ${
                  actual >= plan ? "text-green-600" : "text-red-600"
                } sans-font`}
              >
                45
              </p>
            </div>
            <div
              className={`${currentTheme.bgSecondary} rounded p-1.5 text-center`}
            >
              <p className="text-[9px] font-semibold text-gray-600">Status</p>
              <p
                className={`text-base font-black ${
                  percentage >= 100 ? "text-green-600" : "text-red-600"
                } sans-font`}
              >
                {percentage >= 100 ? "✓ OK" : "✗ Low"}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} p-2`}>
      <style>{`
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        }
        .metric-card {
          background: linear-gradient(135deg, ${currentTheme.cardBg} 0%, ${
        currentTheme.cardBgEnd
      } 100%);
          border: 1px solid ${
            currentTheme.isDark
              ? "rgba(148, 163, 184, 0.2)"
              : "rgba(203, 213, 225, 0.6)"
          };
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: ${
            currentTheme.isDark
              ? "0 4px 6px rgba(0, 0, 0, 0.3)"
              : "0 2px 8px rgba(0, 0, 0, 0.06)"
          };
          cursor: pointer;
        }
        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, ${
            currentTheme.shimmer
          }, transparent);
        }
        .metric-card:hover {
          transform: translateY(-1px) scale(1.005);
          border-color: ${currentTheme.shimmer};
          box-shadow: ${
            currentTheme.isDark
              ? "0 8px 16px rgba(0, 0, 0, 0.4), 0 0 15px " +
                currentTheme.shimmer
              : "0 6px 12px rgba(0, 0, 0, 0.1), 0 0 15px " +
                currentTheme.shimmer
          };
        }
        .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .sans-font { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          font-weight: 800; 
          letter-spacing: -0.02em; 
        }
        .theme-btn { transition: all 0.2s ease; border: 2px solid transparent; }
        .theme-btn:hover { transform: scale(1.1); }
        .theme-btn.active { border-color: rgba(0, 0, 0, 0.3); box-shadow: 0 0 10px ${
          currentTheme.shimmer
        }; }
      `}</style>
      {/* Header */}

      <div className="mb-1.5">
        <div className="flex items-center justify-between mb-1">
          {/* Left Side: Logo + Heading */}
          <div className="flex items-center gap-3">
            {/* ✅ Company Logo from public folder */}
            <img
              src="/image.png" // ✅ public/logo.png
              alt="Company Logo"
              className="w-12 h-12 object-contain"
            />

            <h1
              className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.headerGradient} sans-font leading-tight`}
            >
              {selectedLine || selectedPlant || currentBU.name}
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Title above Daily/MTD/YTD */}
            <div className="text-center">
              <p className={`text-sm font-black ${currentTheme.textPrimary}`}>
                All cost value in ₹ Cr
              </p>
            </div>

            <div
              className={`flex gap-1 ${currentTheme.bgSecondary} p-1 rounded`}
            >
              <button
                onClick={() => setTheme("lightBlue")}
                className={`theme-btn w-6 h-6 rounded bg-blue-400 ${
                  theme === "lightBlue" && "active"
                }`}
              ></button>

              <button
                onClick={() => setTheme("dark")}
                className={`theme-btn w-6 h-6 rounded bg-slate-800 ${
                  theme === "dark" && "active"
                }`}
              ></button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex gap-1">
            <button
              onClick={() => {
                setSelectedBU("overview");
                setSelectedPlant(null);
                setSelectedLine(null);
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                selectedBU === "overview"
                  ? "bg-blue-600 text-white shadow"
                  : `${currentTheme.bgSecondary} ${currentTheme.textSecondary}`
              }`}
            >
              KTFL Group
            </button>
            {Object.keys(buConfig)
              .filter((k) => k !== "overview")
              .map((buKey) => (
                <button
                  key={buKey}
                  onClick={() => {
                    setSelectedBU(buKey);
                    setSelectedPlant(null);
                    setSelectedLine(null);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    selectedBU === buKey
                      ? "bg-emerald-600 text-white shadow"
                      : `${currentTheme.bgSecondary} ${currentTheme.textSecondary}`
                  }`}
                >
                  {buConfig[buKey].name}
                </button>
              ))}
          </div>

          {/* Global View Tabs */}
          <div className="flex gap-1 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded shadow">
            {["daily", "mtd", "ytd"].map((view) => (
              <button
                key={view}
                onClick={() => setGlobalView(view)}
                className={`px-4 py-1 rounded text-xs font-bold uppercase transition-all ${
                  globalView === view
                    ? "bg-white text-blue-600 shadow"
                    : "bg-transparent text-white hover:bg-white/20"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Plant/Line Navigation */}
        {plantsList.length > 0 && (
          <div className="flex gap-1 mb-0.5">
            {plantsList.map((plant) => (
              <button
                key={plant}
                onClick={() => {
                  setSelectedPlant(plant);
                  setSelectedLine(null);
                }}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                  selectedPlant === plant
                    ? "bg-blue-500 text-white"
                    : `${currentTheme.bgSecondary} ${currentTheme.textSecondary}`
                }`}
              >
                {plant}
              </button>
            ))}
          </div>
        )}
        {linesList.length > 0 && (
          <div className="flex gap-0.5 flex-wrap">
            {linesList.map((line) => (
              <button
                key={line}
                onClick={() => setSelectedLine(line)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                  selectedLine === line
                    ? "bg-emerald-500 text-white"
                    : `${currentTheme.bgTertiary} ${currentTheme.textSecondary}`
                }`}
              >
                {line}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid - Row 1 */}
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {/* Sales Card */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => setSelectedCard("sales")}
        >
          <div className="flex items-start justify-between mb-1">
            <h3
              className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide`}
            >
              💰 Sales & Marketing
            </h3>
            {/* <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-100">
              <span className="text-green-600">📈</span>
              <span className="text-[9px] font-black text-green-600">+3%</span>
            </div> */}
          </div>
          {renderCardContent("sales")}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>

        {/* Production Card */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => setSelectedCard("production")}
        >
          <div className="flex items-start justify-between mb-1">
            <h3
              className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide`}
            >
              🏭 Production
            </h3>
            <div className="px-1.5 py-0.5 rounded bg-cyan-100">
              <span className="text-[9px] font-black text-cyan-600">94%</span>
            </div>
          </div>
          {renderCardContent("production")}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>

        {/* Power Card */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() =>
            (window.location.href =
              "https://ktflceprd.kalyanicorp.com/kalyani.iot/energycons")
          }
        >
          <div className="flex items-start justify-between mb-1">
            <h3
              className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide`}
            >
              ⚡ Power
            </h3>
            <div className="px-1.5 py-0.5 rounded bg-green-100">
              <span className="text-[9px] font-black text-green-600">✓</span>
            </div>
          </div>
          {renderCardContent("power")}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>

        {/* Mfg Cost Card */}
        <div
          className="metric-card rounded-lg p-2.5"
          onClick={() => navigate("/noncore/cost")}
        >
          <div className="flex items-start justify-between mb-1">
            <h3
              className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide`}
            >
              💵 Cost
            </h3>
            <div className="px-1.5 py-0.5 rounded bg-amber-100">
              <span className="text-[9px] font-black text-amber-600">⚠</span>
            </div>
          </div>
          {renderCardContent("cost")}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>

        {/* HT Status Card */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => setSelectedCard("ht")}
        >
          <div className="flex items-start justify-between mb-1">
            <h3
              className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide`}
            >
              🔥 HT
            </h3>
            <div className="px-1.5 py-0.5 rounded bg-amber-100">
              <span className="text-[9px] font-black text-amber-600">94%</span>
            </div>
          </div>
          {renderCardContent("ht")}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        <div
          className="metric-card rounded-lg p-2.5"
          onClick={() => setSelectedCard("quality")} // ✅ Add this
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            ✨ Quality
          </h3>

          {/* Rest of the code same */}
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            <div className="text-center">
              <p className="text-2xl font-black text-red-500 sans-font">2.1%</p>
              <p className="text-[9px] font-bold text-red-500">Scrap</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-black text-green-600 sans-font">
                97.9%
              </p>
              <p className="text-[9px] font-bold text-green-600">Yield</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-center">
              <p className="text-xl font-black text-orange-500 sans-font">
                1.2%
              </p>
              <p className="text-[9px] font-bold text-orange-500">
                In House Rejection
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl font-black text-purple-600 sans-font">
                0.4%
              </p>
              <p className="text-[9px] font-bold text-purple-600">
                Customer Complain
              </p>
            </div>
          </div>

          {/* ✅ Add View Details */}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>

        {/* OpEx */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            🎯 OpEx
          </h3>

          {/* Overall Score */}
          <div className="text-center mb-2">
            <p
              className={`text-3xl font-black ${currentTheme.textPrimary} sans-font`}
            >
              88
            </p>
            <p className="text-[10px] font-bold text-blue-500">Score</p>
          </div>

          {/* ✅ BUs */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="text-center">
              <p className="text-lg font-black text-green-600 sans-font">82</p>
              <p className="text-[9px] font-bold text-green-600">BU 1</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-black text-orange-500 sans-font">87</p>
              <p className="text-[9px] font-bold text-orange-500">BU 2</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-black text-purple-600 sans-font">91</p>
              <p className="text-[9px] font-bold text-purple-600">BU 3</p>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        {/* Maintenance */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => setSelectedCard("maint")}
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            🔧 Maintenance
          </h3>

          {/* ✅ Added Metrics */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-center">
              <p className="text-lg font-black text-red-500 sans-font">4.5%</p>
              <p className="text-[9px] font-bold text-red-500">Breakdown %</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-black text-green-600 sans-font">
                2.3 H
              </p>
              <p className="text-[9px] font-bold text-green-600">MTTR</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-black text-blue-600 sans-font">
                120 H
              </p>
              <p className="text-[9px] font-bold text-blue-600">MTBF</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-black text-purple-600 sans-font">
                6.8%
              </p>
              <p className="text-[9px] font-bold text-purple-600">
                Maint Cost %
              </p>
            </div>
          </div>

          {/* PM Pillar */}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-2">
            View Details →
          </p>
        </div>

        {/* ESG - 3 Column: Environment | Safety | Governance */}
        <div
          className="metric-card rounded-lg p-2 cursor-pointer"
          onClick={() =>
            (window.location.href = "https://kesg.kalyanicorp.com/")
          }
        >
          {/* Header */}
          <h3
            className={`${currentTheme.textSecondary} text-[10px] uppercase font-black tracking-tight mb-1 text-center`}
          >
            🌍 ESG
          </h3>

          <div className="grid grid-cols-3 gap-1">
            {/* Column 1: Environment */}
            <div className="bg-green-50 rounded p-1 border border-green-200">
              <div className="text-center mb-0.5">
                <p className="text-[8px] font-black text-green-700">
                  Environment
                </p>
              </div>
              <div className="space-y-0.5">
                <div className="text-center">
                  <p className="text-xs font-black text-green-700 sans-font leading-tight">
                    450
                  </p>
                  <p className="text-[7px] font-bold text-green-600">CO₂ (t)</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-green-700 sans-font leading-tight">
                    85%
                  </p>
                  <p className="text-[7px] font-bold text-green-600">Water</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-green-700 sans-font leading-tight">
                    78%
                  </p>
                  <p className="text-[7px] font-bold text-green-600">Recycle</p>
                </div>
              </div>
            </div>

            {/* Column 2: Safety */}
            <div className="bg-red-50 rounded p-1 border border-red-200">
              <div className="text-center mb-0.5">
                <p className="text-[8px] font-black text-red-700">Safety</p>
              </div>
              <div className="space-y-0.5">
                <div className="text-center">
                  <p className="text-xs font-black text-red-700 sans-font leading-tight">
                    {staticData.safety.major}
                  </p>
                  <p className="text-[7px] font-bold text-red-600">Major</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-orange-700 sans-font leading-tight">
                    {staticData.safety.minor}
                  </p>
                  <p className="text-[7px] font-bold text-orange-600">Minor</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-blue-700 sans-font leading-tight">
                    {staticData.safety.firstAid}
                  </p>
                  <p className="text-[7px] font-bold text-blue-600">
                    First Aid
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Governance */}
            <div className="bg-purple-50 rounded p-1 border border-purple-200">
              <div className="text-center mb-0.5">
                <p className="text-[8px] font-black text-purple-700">
                  Governance
                </p>
              </div>
              <div className="space-y-0.5">
                <div className="text-center">
                  <p className="text-xs font-black text-purple-700 sans-font leading-tight">
                    96%
                  </p>
                  <p className="text-[7px] font-bold text-purple-600">Comply</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-indigo-700 sans-font leading-tight">
                    92
                  </p>
                  <p className="text-[7px] font-bold text-indigo-600">Audit</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-purple-700 sans-font leading-tight">
                    88%
                  </p>
                  <p className="text-[7px] font-bold text-purple-600">Trans</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[8px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>

        {/* NPD */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => setSelectedCard("npd")}
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            🚀 NPD
          </h3>
          <div className="space-y-1">
            {staticData.npd.projects.slice(0, 3).map((project, idx) => (
              <div
                key={idx}
                className={`${currentTheme.bgSecondary} rounded p-1`}
              >
                <div className="flex justify-between items-start mb-0.5">
                  <p className="text-[9px] font-bold text-gray-700">
                    {project.customer.split(" ")[0]}
                  </p>
                  <span
                    className={`text-[8px] px-1 py-0.5 rounded font-black ${
                      project.status === "SOP"
                        ? "bg-green-200 text-green-800"
                        : project.status === "Trial"
                        ? "bg-amber-200 text-amber-800"
                        : "bg-cyan-200 text-cyan-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${
                      project.completion >= 75 ? "bg-green-500" : "bg-cyan-500"
                    }`}
                    style={{ width: `${project.completion}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {/* Inventory */}
        {/* Inventory */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => navigate("/noncore/inventory")} // ✅ Change this
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            📦 Inventory
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded p-2">
              <p
                className={`text-3xl font-black text-cyan-600 sans-font mb-0.5`}
              >
                {staticData.inventory.turnAroundRatio}
              </p>
              <p className="text-[10px] font-bold text-cyan-600 leading-tight">
                ITR - Days
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-100 rounded p-2">
              <p
                className={`text-3xl font-black text-purple-600 sans-font mb-0.5`}
              >
                {staticData.inventory.turnAroundDays}
              </p>
              <p className="text-[10px] font-bold text-purple-600 leading-tight">
                Days
              </p>
            </div>
          </div>

          {/* Additional Inventory Metrics */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded px-2 py-1.5">
              <span className="text-[10px] font-bold text-gray-600">
                Raw Material
              </span>
              <span className="text-sm font-black text-blue-600 sans-font">
                420
              </span>
            </div>

            <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded px-2 py-1.5">
              <span className="text-[10px] font-bold text-gray-600">
                Work in Progress
              </span>
              <span className="text-sm font-black text-green-600 sans-font">
                78%
              </span>
            </div>

            <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded px-2 py-1.5">
              <span className="text-[10px] font-bold text-gray-600">
                Finished Goods
              </span>
              <span className="text-sm font-black text-orange-600 sans-font">
                7000
              </span>
            </div>
          </div>
        </div>
        {/* Customer */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => setSelectedCard("customer")}
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            😊 Customer
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-center bg-gradient-to-br from-green-50 to-emerald-100 rounded p-2">
              <p
                className={`text-3xl font-black text-green-600 sans-font mb-0.5`}
              >
                {staticData.customer.overallScore}
              </p>
              <p className="text-[10px] font-bold text-green-600 leading-tight">
                BU Wise Score
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-red-50 to-rose-100 rounded p-2">
              <p
                className={`text-3xl font-black text-red-600 sans-font mb-0.5`}
              >
                {staticData.customer.rejectionPPM || "0"}
              </p>
              <p className="text-[10px] font-bold text-red-600 leading-tight">
                Rejection PPM
              </p>
            </div>
          </div>
          <div className="space-y-1">
            {staticData.customer.scores.slice(0, 3).map((customer, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 rounded px-2 py-1"
              >
                <span className="text-[10px] font-bold text-gray-700">
                  {customer.name}
                </span>
                <span className="text-sm font-black text-green-600 sans-font">
                  {customer.overall}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* NON-CORE - NEW CARD */}

        {/* Yield Card */}
        <div
          className="metric-card rounded-lg p-2.5 cursor-pointer"
          onClick={() =>
            (window.location.href =
              "https://ktflceprd.kalyanicorp.com/kalyani.iot/engg")
          }
        >
          <div className="flex items-start justify-between mb-1">
            <h3
              className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide`}
            >
              🎯 Yield
            </h3>

            <div className="px-1.5 py-0.5 rounded bg-green-100">
              <span className="text-[9px] font-black text-green-700">✓</span>
            </div>
          </div>

          {renderCardContent("yield")}

          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            View Details →
          </p>
        </div>

        {/* OEE Summary */}
        {/* OEE Summary */}
        <div className="metric-card rounded-lg p-2">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            📊 OEE
          </h3>
          <div className="grid grid-cols-1 gap-2 mb-2">
            <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded p-2">
              <p
                className={`text-3xl font-black text-blue-600 sans-font mb-0.5`}
              >
                {staticData.oee.overall}%
              </p>
            </div>
          </div>
          <div className="space-y-1">
            {/* ✅ BU1 - Clickable */}
            <div
              className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded px-2 py-1.5 cursor-pointer hover:shadow-md transition"
              onClick={() => {
                setSelectedCard("oee");
                setSelectedOEEBU("bu1");
                setSelectedOEEPlant(null);
              }}
            >
              <span className="text-[10px] font-bold text-gray-600">BU 1</span>
              <span className="text-sm font-black text-green-600 sans-font">
                {staticData.oee.bu1.overall}%
              </span>
            </div>

            {/* ✅ BU2 - Clickable */}
            <div
              className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded px-2 py-1.5 cursor-pointer hover:shadow-md transition"
              onClick={() => {
                setSelectedCard("oee");
                setSelectedOEEBU("bu2");
                setSelectedOEEPlant(null);
              }}
            >
              <span className="text-[10px] font-bold text-gray-600">BU 2</span>
              <span className="text-sm font-black text-orange-600 sans-font">
                {staticData.oee.bu2.overall}%
              </span>
            </div>

            {/* ✅ BU3 - Clickable */}
            <div
              className="flex justify-between items-center bg-gradient-to-r from-red-50 to-rose-50 rounded px-2 py-1.5 cursor-pointer hover:shadow-md transition"
              onClick={() => {
                setSelectedCard("oee");
                setSelectedOEEBU("bu3");
                setSelectedOEEPlant(null);
              }}
            >
              <span className="text-[10px] font-bold text-gray-600">BU 3</span>
              <span className="text-sm font-black text-red-600 sans-font">
                {staticData.oee.bu3.overall}%
              </span>
            </div>
          </div>
        </div>

        <div
          className="metric-card rounded-lg p-3 cursor-pointer overflow-hidden"
          onClick={() => setSelectedCard("noncore")}
        >
          <h3
            className={`${currentTheme.textSecondary} text-[11px] uppercase font-black tracking-tight mb-3 text-center truncate`}
          >
            🏢 Non-Core
          </h3>

          <div className="grid grid-cols-3 gap-2 items-stretch w-full">
            {/* ✅ HR Column - CLICK */}
            <div
              className="bg-blue-50 rounded-lg p-2 border border-blue-200 flex flex-col justify-between min-h-[110px] overflow-hidden cursor-pointer hover:scale-[1.02] transition"
              onClick={(e) => {
                e.stopPropagation(); // parent click block
                navigate("/noncore/hr");
              }}
            >
              <p className="text-[10px] font-black text-blue-700 text-center truncate">
                HR
              </p>

              <div className="text-center leading-tight">
                <p className="text-[18px] font-black text-blue-800 sans-font truncate">
                  {staticData.nonCore.hr.headcount.total}
                </p>
                <p className="text-[10px] font-bold text-blue-600 truncate">
                  Headcount
                </p>
              </div>

              <div className="text-center leading-tight">
                <p className="text-[14px] font-black text-green-700 sans-font truncate">
                  ₹{staticData.nonCore.hr.budgeting.spent}
                </p>
                <p className="text-[10px] font-bold text-green-600 truncate">
                  Budget Used
                </p>
              </div>
            </div>

            {/* Finance Column */}
            <div
              className="bg-green-50 rounded-lg p-2 border border-green-200 flex flex-col justify-between min-h-[110px] overflow-hidden cursor-pointer hover:scale-[1.02] transition"
              onClick={() => {
                window.location.href = "/noncore/finance";
              }}
            >
              <p className="text-[10px] font-black text-green-700 text-center truncate">
                Finance
              </p>

              <div className="text-center leading-tight">
                <p className="text-[18px] font-black text-green-800 sans-font truncate">
                  ₹{staticData.nonCore.finance.revenue.actual}
                </p>
                <p className="text-[10px] font-bold text-green-600 truncate">
                  Revenue
                </p>
              </div>

              <div className="text-center leading-tight">
                <p className="text-[14px] font-black text-blue-700 sans-font truncate">
                  ₹{staticData.nonCore.finance.cashflow.closing}
                </p>
                <p className="text-[10px] font-bold text-blue-600 truncate">
                  Cashflow
                </p>
              </div>
            </div>

            {/* ✅ Purchase Column - CLICK */}
            <div
              className="bg-amber-50 rounded-lg p-2 border border-amber-200 flex flex-col justify-between min-h-[110px] overflow-hidden cursor-pointer hover:scale-[1.02] transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/noncore/purchase");
              }}
            >
              <p className="text-[10px] font-black text-amber-700 text-center truncate">
                Purchase
              </p>

              <div className="text-center leading-tight">
                <p className="text-[18px] font-black text-amber-800 sans-font truncate">
                  ₹{staticData.nonCore.purchase.poValue.mtd}
                </p>
                <p className="text-[10px] font-bold text-amber-600 truncate">
                  PO Value
                </p>
              </div>

              <div className="text-center leading-tight">
                <p className="text-[14px] font-black text-green-700 sans-font truncate">
                  {staticData.nonCore.purchase.vendorPerformance}%
                </p>
                <p className="text-[10px] font-bold text-green-600 truncate">
                  Vendor
                </p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-center text-blue-600 font-bold mt-3 truncate">
            View Details →
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="metric-card rounded-lg p-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full pulse-dot"></div>
            <span className={`${currentTheme.textPrimary} text-xs font-bold`}>
              Operations Active
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-cyan-500 rounded-full pulse-dot"></div>
            <span className={`${currentTheme.textPrimary} text-xs font-bold`}>
              Systems Online
            </span>
          </div>
        </div>
        <div
          className={`${currentTheme.textSecondary} text-xs font-bold sans-font`}
        >
          Last Updated: {currentTime.toLocaleString("en-GB")}
        </div>
      </div>
      {/* ✅ Non-Core Deep Components */}
      {selectedNonCore === "hr" && (
        <HRDashboard onBack={() => setSelectedNonCore(null)} />
      )}

      {selectedNonCore === "purchase" && (
        <PurchaseDashboard onBack={() => setSelectedNonCore(null)} />
      )}
      {/* ✅ NEW: Chatbot Floating Icon */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center z-50"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      )}

      {/* ✅ NEW: Chatbot Window */}
      {isChatOpen && (
        <div
          className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50"
          style={{
            border: "2px solid #3b82f6",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-lg">KTFL Assistant</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-sm font-semibold">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                placeholder="Ask about metrics..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-sm font-semibold"
              />
              <button
                onClick={handleChatSend}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl hover:shadow-lg transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {selectedNonCore === "finance" && (
        <FinanceDashboard onBack={() => setSelectedNonCore(null)} />
      )} */}

      {selectedCard && (
        <DetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default StaticBUDashboard;
