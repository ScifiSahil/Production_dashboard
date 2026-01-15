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

const StaticBUDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLineInModal, setSelectedLineInModal] = useState("1005 TP");
  const [viewMode, setViewMode] = useState("table"); // Add this line
  const [selectedMetric, setSelectedMetric] = useState("productivity"); // Add this line
  const [theme, setTheme] = useState("lightBlue");
  const [selectedBU, setSelectedBU] = useState("overview");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [globalView, setGlobalView] = useState("overview");
  const [selectedCard, setSelectedCard] = useState(null);

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
      target: 0,
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
                        className={`text-3xl font-bold text-emerald-600 mono-font`}
                      >
                        ₹{staticData.sales.daily.actual}Cr
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 mono-font">
                        ₹{staticData.sales.daily.plan}Cr
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-100 rounded p-2 text-center">
                    <p className="text-lg font-black text-green-700 mono-font">
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
                        className={`text-3xl font-bold text-emerald-600 mono-font`}
                      >
                        ₹{staticData.sales.mtd.actual}Cr
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 mono-font">
                        ₹{staticData.sales.mtd.plan}Cr
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-100 rounded p-2 text-center">
                    <p className="text-lg font-black text-green-700 mono-font">
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
                        className={`text-3xl font-bold text-emerald-600 mono-font`}
                      >
                        ₹{staticData.sales.ytd.actual}Cr
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Plan</p>
                      <p className="text-2xl font-bold text-blue-600 mono-font">
                        ₹{staticData.sales.ytd.plan}Cr
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-100 rounded p-2 text-center">
                    <p className="text-lg font-black text-green-700 mono-font">
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
                              <td className="px-3 py-2 text-right font-bold text-blue-600 mono-font">
                                {row.plan}
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-emerald-600 mono-font">
                                {row.actual}
                              </td>
                              <td
                                className={`px-3 py-2 text-right font-bold mono-font ${
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
                          <td className="px-3 py-2 text-right text-blue-700 mono-font">
                            {salesTrendData.reduce(
                              (sum, row) => sum + row.plan,
                              0
                            )}
                          </td>
                          <td className="px-3 py-2 text-right text-emerald-700 mono-font">
                            {salesTrendData.reduce(
                              (sum, row) => sum + row.actual,
                              0
                            )}
                          </td>
                          <td className="px-3 py-2 text-right text-green-700 mono-font">
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
                          <td className="px-4 py-3 text-right font-bold text-blue-600 mono-font">
                            ₹{dailyPlan}Cr
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 mono-font">
                            ₹{dailyActual}Cr
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600 mono-font">
                            ₹{mtdPlan}Cr
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 mono-font">
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
                🏭 Cell Wise POCDSM (Productivity, Quality, Cost, Delivery &
                Morale)
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
                  <FileText className="w-5 h-5" />
                  📋 Table View
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
                  📊 Graphical View
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
                          <td
                            rowSpan="2"
                            className="border border-gray-300 px-3 py-2 text-center font-bold mono-font bg-yellow-100"
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
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            154661
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
                            171573
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold mono-font">
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

        case "cost":
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
                          <p
                            className={`text-4xl font-bold text-amber-600 mono-font`}
                          >
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
                        outerRadius={100}
                        dataKey="value"
                        style={{ fontSize: "12px", fontWeight: "600" }}
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

        case "ht":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                🔥 Heat Treatment Deep Dive - Plan vs Actual
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

        case "inventory":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                📦 Inventory - Customer & Die Wise Analysis
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-cyan-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    Total Inventory
                  </h4>
                  <p className={`text-5xl font-bold text-cyan-600 mono-font`}>
                    {staticData.inventory.total}
                  </p>
                  <p className="text-sm font-bold text-cyan-600 mt-1">MT</p>
                </div>
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-green-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    Turn Around Ratio
                  </h4>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p
                        className={`text-4xl font-bold text-emerald-600 mono-font`}
                      >
                        {staticData.inventory.turnAroundRatio}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Target</p>
                      <p className="text-2xl font-bold text-blue-600 mono-font">
                        {staticData.inventory.target.ratio}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-amber-100 rounded p-2 text-center">
                    <p className="text-sm font-black text-amber-700">
                      98% Achievement
                    </p>
                  </div>
                </div>
                <div
                  className={`${currentTheme.bgSecondary} rounded-lg p-4 border-l-4 border-purple-500`}
                >
                  <h4
                    className={`text-sm font-semibold ${currentTheme.textSecondary} mb-2`}
                  >
                    Turn Around Days
                  </h4>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p
                        className={`text-4xl font-bold text-purple-600 mono-font`}
                      >
                        {staticData.inventory.turnAroundDays}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-bold">Target</p>
                      <p className="text-2xl font-bold text-blue-600 mono-font">
                        {staticData.inventory.target.days}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-green-100 rounded p-2 text-center">
                    <p className="text-sm font-black text-green-700">
                      ✓ On Track
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
                    📊 Customer-wise Inventory Distribution
                  </h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={staticData.inventory.customers}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="name"
                        stroke="#334155"
                        style={{ fontSize: "12px", fontWeight: "600" }}
                        angle={-15}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis
                        stroke="#334155"
                        style={{ fontSize: "13px", fontWeight: "600" }}
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
                        wrapperStyle={{ fontSize: "13px", fontWeight: "600" }}
                      />
                      <Bar
                        dataKey="qty"
                        fill="#06b6d4"
                        name="Inventory (MT)"
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Customer Die Table */}
                <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                  <h4
                    className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                  >
                    📋 Customer & Die Details
                  </h4>
                  <div className="overflow-auto max-h-[280px]">
                    <table className="w-full text-sm">
                      <thead className="bg-gradient-to-r from-cyan-100 to-blue-100 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left font-black text-gray-700">
                            Customer
                          </th>
                          <th className="px-4 py-3 text-right font-black text-gray-700">
                            Inventory (MT)
                          </th>
                          <th className="px-4 py-3 text-right font-black text-gray-700">
                            Dies
                          </th>
                          <th className="px-4 py-3 text-right font-black text-gray-700">
                            Avg/Die
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {staticData.inventory.customers.map((customer, idx) => {
                          const avgPerDie = (
                            customer.qty / customer.dies
                          ).toFixed(1);
                          return (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="px-4 py-3 font-bold text-gray-800">
                                {customer.name}
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-cyan-600 mono-font">
                                {customer.qty}
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-purple-600 mono-font">
                                {customer.dies}
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-emerald-600 mono-font">
                                {avgPerDie}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="bg-gradient-to-r from-cyan-200 to-blue-200 font-black">
                          <td className="px-4 py-3 text-gray-900">TOTAL</td>
                          <td className="px-4 py-3 text-right text-cyan-800 mono-font">
                            {staticData.inventory.total}
                          </td>
                          <td className="px-4 py-3 text-right text-purple-800 mono-font">
                            {staticData.inventory.customers.reduce(
                              (sum, c) => sum + c.dies,
                              0
                            )}
                          </td>
                          <td className="px-4 py-3 text-right text-emerald-800 mono-font">
                            {(
                              staticData.inventory.total /
                              staticData.inventory.customers.reduce(
                                (sum, c) => sum + c.dies,
                                0
                              )
                            ).toFixed(1)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Die Distribution Chart */}
              <div className={`${currentTheme.bgSecondary} rounded-lg p-4`}>
                <h4
                  className={`text-base font-bold ${currentTheme.textPrimary} mb-3`}
                >
                  🔢 Die Distribution by Customer
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={staticData.inventory.customers}
                    layout="horizontal"
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      type="category"
                      dataKey="name"
                      stroke="#334155"
                      style={{ fontSize: "13px", fontWeight: "600" }}
                    />
                    <YAxis
                      type="number"
                      stroke="#334155"
                      style={{ fontSize: "13px", fontWeight: "600" }}
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
                    <Bar
                      dataKey="dies"
                      fill="#8b5cf6"
                      name="Number of Dies"
                      radius={[6, 6, 0, 0]}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
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

        case "customer":
          return (
            <div className="space-y-4">
              <h2
                className={`text-2xl font-black ${currentTheme.textPrimary} mb-4`}
              >
                😊 Customer Satisfaction - Score Analysis
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
                      className={`text-sm font-black ${currentTheme.textPrimary} mono-font`}
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
                    <p className="text-xs font-bold text-blue-600 mono-font">
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
                className={`text-3xl font-black text-emerald-600 mono-font leading-tight`}
              >
                {cardType === "sales" || cardType === "cost" ? "₹" : ""}
                {actual}
                {cardType === "power" ? "%" : ""}
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg p-2">
              <p className="text-[10px] font-bold text-gray-600 mb-0.5">PLAN</p>
              <p
                className={`text-3xl font-black text-blue-600 mono-font leading-tight`}
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
                } mono-font`}
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
                } mono-font`}
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
                } mono-font`}
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
    <div
      className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} p-3 font-sans`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
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
        .mono-font { font-family: 'JetBrains Mono', monospace; font-weight: 800; letter-spacing: -0.03em; }
        .theme-btn { transition: all 0.2s ease; border: 2px solid transparent; }
        .theme-btn:hover { transform: scale(1.1); }
        .theme-btn.active { border-color: rgba(0, 0, 0, 0.3); box-shadow: 0 0 10px ${
          currentTheme.shimmer
        }; }
      `}</style>

      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <h1
              className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.headerGradient} mono-font leading-tight`}
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
                className={`${currentTheme.textPrimary} text-base font-black mono-font leading-tight`}
              >
                {currentTime.toLocaleTimeString("en-US", { hour12: false })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <div className="flex gap-1.5">
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
              All Plants
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
          <div className="flex gap-1.5 mb-1">
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
          <div className="flex gap-1 flex-wrap">
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
      <div className="grid grid-cols-5 gap-2 mb-2">
        {/* Sales Card */}
        <div
          className="metric-card rounded-lg p-2.5"
          onClick={() => setSelectedCard("sales")}
        >
          <div className="flex items-start justify-between mb-1">
            <h3
              className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide`}
            >
              💰 Sales
            </h3>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-100">
              <TrendingUp className="w-2.5 h-2.5 text-green-600" />
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
          className="metric-card rounded-lg p-2.5"
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
          className="metric-card rounded-lg p-2.5"
          onClick={() => setSelectedCard("power")}
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
          className="metric-card rounded-lg p-2.5"
          onClick={() => setSelectedCard("cost")}
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
          className="metric-card rounded-lg p-2.5"
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
      <div className="grid grid-cols-5 gap-2 mb-2">
        {/* Quality Card with Yield */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            ✨ Quality
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-center">
              <p className={`text-2xl font-black text-red-500 mono-font`}>
                {staticData.quality.daily.scrap}%
              </p>
              <p className="text-[9px] font-bold text-red-500">Scrap</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-black text-green-600 mono-font`}>
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
              className={`text-3xl font-black ${currentTheme.textPrimary} mono-font`}
            >
              88
            </p>
            <p className="text-[10px] font-bold text-blue-500">Score</p>
          </div>
        </div>

        {/* Maintenance */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            🔧 Maint
          </h3>
          <div className="text-center">
            <p className={`text-3xl font-black text-amber-500 mono-font`}>3</p>
            <p className="text-[10px] font-bold text-amber-500">Open</p>
          </div>
        </div>

        {/* Safety */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            🦺 Safety
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-center">
              <p className={`text-2xl font-black text-red-500 mono-font`}>
                {staticData.safety.major}
              </p>
              <p className="text-[9px] font-bold text-red-500">Major</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-black text-amber-500 mono-font`}>
                {staticData.safety.minor}
              </p>
              <p className="text-[9px] font-bold text-amber-500">Minor</p>
            </div>
          </div>
        </div>

        {/* NPD */}
        <div
          className="metric-card rounded-lg p-2.5"
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
      <div className="grid grid-cols-5 gap-2 mb-2">
        {/* Inventory */}
        <div
          className="metric-card rounded-lg p-2.5"
          onClick={() => setSelectedCard("inventory")}
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            📦 Inventory
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded p-1">
              <p className={`text-2xl font-black text-cyan-600 mono-font`}>
                {staticData.inventory.turnAroundRatio}
              </p>
              <p className="text-[9px] font-bold text-cyan-600">Ratio</p>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-100 rounded p-1">
              <p className={`text-2xl font-black text-purple-600 mono-font`}>
                {staticData.inventory.turnAroundDays}
              </p>
              <p className="text-[9px] font-bold text-purple-600">Days</p>
            </div>
          </div>
        </div>

        {/* Customer */}
        <div
          className="metric-card rounded-lg p-2.5"
          onClick={() => setSelectedCard("customer")}
        >
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            😊 Customer
          </h3>
          <div className="text-center mb-1">
            <p className={`text-3xl font-black text-green-600 mono-font`}>
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
                <span className="text-[9px] font-black text-green-600 mono-font">
                  {customer.overall}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            ⚙️ Efficiency
          </h3>
          <div className="text-center">
            <p
              className={`text-3xl font-black ${currentTheme.textPrimary} mono-font`}
            >
              94%
            </p>
            <p className="text-[10px] font-bold text-cyan-500">Overall</p>
          </div>
        </div>

        {/* Environment */}
        <div className="metric-card rounded-lg p-2.5">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            🌱 Environment
          </h3>
          <div className="text-center">
            <p className={`text-3xl font-black text-green-500 mono-font`}>
              85%
            </p>
            <p className="text-[10px] font-bold text-green-500">Recycled</p>
          </div>
        </div>

        {/* OEE Summary */}
        <div className="metric-card rounded-lg p-2.5 font-sans">
          <h3
            className={`${currentTheme.textSecondary} text-xs uppercase font-black tracking-wide mb-1`}
          >
            📊 OEE
          </h3>
          <div className="text-center">
            <p className={`text-3xl font-black text-blue-600 mono-font`}>
              78.2%
            </p>
            <p className="text-[10px] font-bold text-blue-500">Overall</p>
          </div>
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
          className={`${currentTheme.textSecondary} text-xs font-bold mono-font`}
        >
          Last Updated: {currentTime.toLocaleString("en-GB")}
        </div>
      </div>

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
