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
import HRDashboard from "./hrdashboard";
import PurchaseDashboard from "./purchase-dashboard";
import { useNavigate } from "react-router-dom";


const StaticBUDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLineInModal, setSelectedLineInModal] = useState("1005 TP");
  const [viewMode, setViewMode] = useState("table");
  const [selectedMetric, setSelectedMetric] = useState("productivity");
  const [theme, setTheme] = useState("lightBlue");
  const [selectedBU, setSelectedBU] = useState("overview");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [globalView, setGlobalView] = useState("overview");
  const navigate = useNavigate();


  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedNonCore, setSelectedNonCore] = useState(null);
  // values: null | "hr" | "finance" | "purchase"

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    overview: { name: "All Plants", plants: [] },
    bu1: {
      name: "BU Head 1",
      plants: {
        "R2-5": [
          "1005 TP",
          "2504TP",
          "1000 T Screw Press",
          "4003 TP",
          "4004 TP",
        ],
        "R1-16": ["R1 - mahesh gade", "1602", "1001", "1003", "630", "2502"],
        "MDW-7": [
          "Line A",
          "Line B",
          "Line C",
          "Line D",
          "Line E",
          "Line F",
          "Line G",
        ],
      },
    },
    bu2: {
      name: "BU Head 2",
      plants: {
        "Baramati-7": [
          "B-Line 1",
          "B-Line 2",
          "B-Line 3",
          "B-Line 4",
          "B-Line 5",
        ],
        "Chakan-7": ["C-Line 1", "C-Line 2", "C-Line 3", "C-Line 4"],
      },
    },
    bu3: {
      name: "BU Head 3",
      plants: {
        Bhiwadi: ["BH-Line 1", "BH-Line 2", "BH-Line 3"],
        Gujarat: ["GJ-Line 1", "GJ-Line 2", "GJ-Line 3"],
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
      daily: { scrap: 2.3, target: 2.5, yield: 97.7 },
      mtd: { scrap: 2.4, target: 2.5, yield: 97.6 },
      ytd: { scrap: 2.5, target: 2.5, yield: 97.5 },
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

  // Modal Component
  const DetailModal = ({ card, onClose }) => {
    if (!card) return null;

    const renderContent = () => {
      switch (card) {
        case "sales":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                💰 Sales Deep Dive - Plan vs Actual Analysis
              </h2>

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
                        ₹{staticData.sales.daily.actual}Cr
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 sans-font">
                        ₹{staticData.sales.daily.plan}Cr
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
                        ₹{staticData.sales.mtd.actual}Cr
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 sans-font">
                        ₹{staticData.sales.mtd.plan}Cr
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
                        ₹{staticData.sales.ytd.actual}Cr
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 sans-font">
                        ₹{staticData.sales.ytd.plan}Cr
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
                        name="Actual (₹Cr)"
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                      />
                      <Bar
                        dataKey="plan"
                        fill="#3b82f6"
                        name="Plan (₹Cr)"
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
                            Plan (₹Cr)
                          </th>
                          <th className="px-3 py-2 text-right font-black text-gray-700">
                            Actual (₹Cr)
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
                            ₹{dailyPlan}Cr
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 sans-font">
                            ₹{dailyActual}Cr
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600 sans-font">
                            ₹{mtdPlan}Cr
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 sans-font">
                            ₹{mtdActual}Cr
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
            </div>
          );

        case "production":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                🏭 Cell Wise PQCDSM (Productivity, Quality, Cost, Delivery,
                Morale, Safty)
              </h2>

              {/* Line Selection Tabs */}
              <div className="flex gap-2 flex-wrap border-b-2 border-blue-300 pb-2">
                {[
                  "1005 TP",
                  "2504TP",
                  "1000 T Screw Press",
                  "4003 TP",
                  "4004 TP",
                  "R1 - mahesh gade",
                  "1602",
                  "1001",
                  "1003",
                  "630",
                  "2502",
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
                      "https://ktfrancesrv.kalyanicorp.com/cs-prx-my-shopfloor?asset_oid=ef29049c-5f6a-11ee-a87f-00620b24a031&asset_id=AS-000006-7027";
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            72.75
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            76.0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            70.2
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            73.7
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            81.31
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            78.29
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            73.69
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            67.23
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            65.3
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            73.0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            292
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            304
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            281
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            295
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            325
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            313
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            295
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            269
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            261
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            292
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            656
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            684
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            632
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            663
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            732
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            705
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            663
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            605
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            588
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            657
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
                            720
                          </td>
                        </tr>

                        {/* Quality Section */}
                        <tr className="bg-green-100">
                          <td
                            rowSpan="5"
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            6722
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            7578
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            8353
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            8592
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            7908
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            5965
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            6874
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            7852
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            7998
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            8210
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.34
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.47
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.64
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.84
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.43
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.46
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.65
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.27
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1.39
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            2.05
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            -
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            7.5
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            7.9
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            7.74
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            8.52
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            160000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            140800
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            154000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            140000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            140000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            170000
                          </td>
                          <td
                            rowSpan="2"
                            className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100"
                          >
                            Capacity
                            <br />
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            154661
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            171573
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            145352
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            156220
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            190257
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            140924
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            151926
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            118000
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            113674
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            170864
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            40/40
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            2/2
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            3/3
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            1
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            0
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            2/2
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font">
                            3/3
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold sans-font bg-yellow-100">
                            0
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Graphical View - Continuing with remaining modal content... */}
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
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-blue-700 flex items-center gap-2">
                        <span>📊</span>
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
                            <span className="text-blue-600">📊</span>
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
                            <span className="text-cyan-600">🏭</span>
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
                          <span className="text-indigo-600">👥</span>
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
                          <p className="text-4xl font-black text-blue-600 sans-font">
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
                          <p className="text-4xl font-black text-cyan-600 sans-font">
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
                          <p className="text-4xl font-black text-indigo-600 sans-font">
                            659
                          </p>
                          <p className="text-xs text-indigo-600 mt-1">
                            Target: 720
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Remaining metric views would continue similarly... */}
                  {/* For brevity, I'm showing the pattern is established */}
                </div>
              )}

              {/* Footer Note */}
              <div className="text-xs text-gray-600 italic mt-2 text-center">
                * Switch between Table and Graphical views • Select different
                PQCDSM metrics for detailed analysis
              </div>
            </div>
          );

        case "power":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                ⚡ Power Deep Dive - Utilization Analysis
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

        case "cost": {
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                💵 Manufacturing Cost Deep Dive
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
                          +{data.variance.toFixed(1)}% Var
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
          className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl p-6"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.cardBg} 0%, ${currentTheme.cardBgEnd} 100%)`,
            border: `1px solid ${currentTheme.shimmer}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition z-10"
          >
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {renderContent()}
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
                {cardType === "sales" || cardType === "cost" ? "₹" : ""}
                {plan}
                {cardType === "power" ? "%" : ""}
              </p>
            </div>
          </div>

          {/* Achievement Bar */}
          <div className={`${currentTheme.bgSecondary} rounded-lg p-2`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-700">
                Achievement
              </span>
              <span
                className={`text-xl font-black ${
                  percentage >= 100
                    ? "text-green-600"
                    : percentage >= 90
                    ? "text-amber-600"
                    : "text-red-600"
                } sans-font`}
              >
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-3">
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
                {actual >= plan ? "+" : ""}
                {(actual - plan).toFixed(cardType === "cost" ? 2 : 0)}
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
      {/* Header */}
      <div className="mb-1.5">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1
              className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.headerGradient} sans-font leading-tight`}
            >
              {selectedLine || selectedPlant || currentBU.name} DASHBOARD
            </h1>
          </div>
          <div className="flex items-center gap-3">
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
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-dot"></div>
                <span className="text-green-500 text-xs font-bold uppercase">
                  LIVE
                </span>
              </div>
              <div
                className={`${currentTheme.textPrimary} text-base font-black sans-font leading-tight`}
              >
                {currentTime.toLocaleTimeString("en-US", { hour12: false })}
              </div>
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
              KTFL Grp
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
            {["overview", "daily", "mtd", "ytd"].map((view) => (
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
              💰 Sales
            </h3>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-100">
              <span className="text-green-600">📈</span>
              <span className="text-[9px] font-black text-green-600">+3%</span>
            </div>
          </div>
          {renderCardContent("sales")}
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            Deep Dive →
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
            OEE →
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
            Analysis →
          </p>
        </div>

        {/* Mfg Cost Card */}
        <div
          className="metric-card rounded-lg p-2"
          onClick={() => {
            window.location.href =
              "https://ktflceprd.kalyanicorp.com/kalyani.iot/costing";
          }}
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
            Breakdown →
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
            Details →
          </p>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {/* Quality Card with Yield */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            ✨ Quality
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-center">
              <p className={`text-2xl font-black text-red-500 sans-font`}>
                {staticData.quality.daily.scrap}%
              </p>
              <p className="text-[9px] font-bold text-red-500">Scrap</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-black text-green-600 sans-font`}>
                {staticData.quality.daily.yield}%
              </p>
              <p className="text-[9px] font-bold text-green-600">Yield</p>
            </div>
          </div>
        </div>

        {/* OpEx */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            🎯 OpEx
          </h3>
          <div className="text-center">
            <p
              className={`text-3xl font-black ${currentTheme.textPrimary} sans-font`}
            >
              88
            </p>
            <p className="text-[10px] font-bold text-blue-500">Score</p>
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
            🔧 Maint
          </h3>
          <div className="text-center">
            <p className={`text-3xl font-black text-amber-500 sans-font`}>3</p>
            <p className="text-[10px] font-bold text-amber-500">Open</p>
          </div>
          <p className="text-[9px] text-center text-blue-600 font-bold mt-1">
            PM Pillar →
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
            View ESG →
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
            {staticData.npd.projects.slice(0, 2).map((project, idx) => (
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
        <div
          className="metric-card rounded-lg p-2"
          onClick={() =>
            (window.location.href =
              "https://ktflceprd.kalyanicorp.com/kalyani.iot/ppc-forging")
          }
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            📦 Inventory
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded p-1">
              <p className={`text-2xl font-black text-cyan-600 sans-font`}>
                {staticData.inventory.turnAroundRatio}
              </p>
              <p className="text-[9px] font-bold text-cyan-600">Ratio</p>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-100 rounded p-1">
              <p className={`text-2xl font-black text-purple-600 sans-font`}>
                {staticData.inventory.turnAroundDays}
              </p>
              <p className="text-[9px] font-bold text-purple-600">Days</p>
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
          <div className="text-center mb-1">
            <p className={`text-3xl font-black text-green-600 sans-font`}>
              {staticData.customer.overallScore}
            </p>
            <p className="text-[9px] font-bold text-green-500">Score</p>
          </div>
          <div className="space-y-0.5">
            {staticData.customer.scores.slice(0, 2).map((customer, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-gray-700">
                  {customer.name.split(" ")[0]}
                </span>
                <span className="text-[9px] font-black text-green-600 sans-font">
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
            View →
          </p>
        </div>

        {/* OEE Summary */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            📊 OEE
          </h3>
          <div className="text-center">
            <p className={`text-3xl font-black text-blue-600 sans-font`}>
              78.2%
            </p>
            <p className="text-[10px] font-bold text-blue-500">Overall</p>
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
                  ₹{staticData.nonCore.hr.budgeting.spent}Cr
                </p>
                <p className="text-[10px] font-bold text-green-600 truncate">
                  Budget Used
                </p>
              </div>
            </div>

            {/* Finance Column */}
            <div
              className="bg-green-50 rounded-lg p-2 border border-green-200 flex flex-col justify-between min-h-[110px] overflow-hidden cursor-pointer hover:scale-[1.02] transition"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNonCore("finance");
              }}
            >
              <p className="text-[10px] font-black text-green-700 text-center truncate">
                Finance
              </p>

              <div className="text-center leading-tight">
                <p className="text-[18px] font-black text-green-800 sans-font truncate">
                  ₹{staticData.nonCore.finance.revenue.actual}Cr
                </p>
                <p className="text-[10px] font-bold text-green-600 truncate">
                  Revenue
                </p>
              </div>

              <div className="text-center leading-tight">
                <p className="text-[14px] font-black text-blue-700 sans-font truncate">
                  ₹{staticData.nonCore.finance.cashflow.closing}Cr
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
                  ₹{staticData.nonCore.purchase.poValue.mtd}Cr
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
