import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const KalyaniDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeModal, setActiveModal] = useState(null);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [salesView, setSalesView] = useState("main");
  const [salesDetailType, setSalesDetailType] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [salesPeriod, setSalesPeriod] = useState("last-quarter");
  const [pipelinePeriod, setPipelinePeriod] = useState("last-quarter");
  const [visits, setVisits] = useState([
    {
      id: 1,
      companyName: "Tata Motors Ltd.",
      attendee: "Mr. Rajesh Kumar",
      visitDate: "2024-01-15",
      mom: "Discussed new forging requirements for upcoming EV platform. Need to increase production capacity by 30% in Q2.",
    },
    {
      id: 2,
      companyName: "Mahindra & Mahindra",
      attendee: "Ms. Priya Sharma",
      visitDate: "2024-01-10",
      mom: "Quality audit completed successfully. Agreed on new pricing structure for gear components.",
    },
  ]);
  const [visitForm, setVisitForm] = useState({
    companyName: "",
    attendee: "",
    visitDate: "",
    mom: "",
  });
  const [chatMessages, setChatMessages] = useState([
    { type: "ai", text: "Hello! How can I help you with the dashboard?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getPeriodLabel = (period) => {
    const labels = {
      "current-month": "Current Month",
      "last-quarter": "Q3 2025",
      "last-6-months": "Last 6 Months",
      ytd: "YTD 2025",
      "last-year": "FY 2024",
      "last-2-years": "Last 2 Years",
    };
    return labels[period] || "Q3 2025";
  };

  const COLORS = [
    "#2196f3",
    "#4caf50",
    "#ff9800",
    "#f44336",
    "#9c27b0",
    "#00bcd4",
  ];

  // Chart Data
  const salesData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 22 },
    { month: "Mar", value: 21 },
    { month: "Apr", value: 24 },
    { month: "May", value: 23 },
    { month: "Jun", value: 26 },
  ];

  const pipelineData = [
    { stage: "Lead", value: 85, amount: 156 },
    { stage: "Qualified", value: 62, amount: 128 },
    { stage: "Proposal", value: 45, amount: 98 },
    { stage: "Negotiation", value: 28, amount: 72 },
    { stage: "Closed", value: 18, amount: 45 },
  ];

  const rfqData = [
    { week: "Week 1", value: 18 },
    { week: "Week 2", value: 19 },
    { week: "Week 3", value: 15 },
    { week: "Week 4", value: 22 },
  ];

  const qualityData = [
    { name: "Open", value: 15, color: "#ef4444" },
    { name: "Closed", value: 60, color: "#22c55e" },
    { name: "On-going", value: 25, color: "#f97316" },
  ];

  const receivablesData = [
    { name: "Tata Motors", value: 250 },
    { name: "Mahindra", value: 200 },
    { name: "Bajaj Auto", value: 180 },
    { name: "Force Motors", value: 150 },
    { name: "Ashok Leyland", value: 120 },
  ];

  const capacityData = [
    { name: "KTFL R1", value: 85, color: "#f97316" },
    { name: "KTTPL R2", value: 75, color: "#22c55e" },
    { name: "KTFL Mundhwa", value: 90, color: "#ef4444" },
    { name: "KTFL Baramati", value: 70, color: "#22c55e" },
  ];

  const continentData = [
    { name: "Asia", value: 65.2, yoy: "+22%" },
    { name: "Europe", value: 38.5, yoy: "+15%" },
    { name: "North America", value: 15.8, yoy: "+18%" },
    { name: "South America", value: 3.2, yoy: "+12%" },
    { name: "Africa", value: 2.6, yoy: "+25%" },
  ];

  const plantData = [
    { name: "KTPL Mundhwa", value: 32.5, yoy: "+20%" },
    { name: "KTTPL R1", value: 28.8, yoy: "+19%" },
    { name: "KTFL Mundhwa", value: 24.2, yoy: "+17%" },
    { name: "KTTPL R2", value: 22.3, yoy: "+18%" },
    { name: "KTFL Baramati", value: 17.5, yoy: "+15%" },
  ];

  const sectorData = [
    { name: "Automotive", value: 52.3 },
    { name: "Heavy Engineering", value: 28.7 },
    { name: "Agriculture", value: 18.5 },
    { name: "Aerospace", value: 12.8 },
    { name: "Defense", value: 8.5 },
    { name: "Railways", value: 4.5 },
  ];

  const productData = [
    { name: "Automotive Dies", value: 48.2 },
    { name: "Heavy Forging Dies", value: 32.5 },
    { name: "Precision Dies", value: 22.8 },
    { name: "Agricultural Dies", value: 15.3 },
    { name: "Special Purpose Dies", value: 6.5 },
  ];

  const getDetailedPlantData = (plant) => {
    const plantDetails = {
      "KTPL Mundhwa": {
        total: 32.5,
        yoy: "+20%",
        customers: [
          { name: "Tata Motors", sales: 8.5, yoy: "+22%" },
          { name: "Mahindra & Mahindra", sales: 7.2, yoy: "+20%" },
          { name: "Ashok Leyland", sales: 6.8, yoy: "+19%" },
          { name: "Maruti Suzuki", sales: 5.5, yoy: "+18%" },
          { name: "Hyundai Motor", sales: 4.5, yoy: "+21%" },
        ],
        dies: [
          { name: "Heavy Vehicle Dies", sales: 15.2, yoy: "+21%" },
          { name: "Passenger Car Dies", sales: 10.3, yoy: "+20%" },
          { name: "Component Dies", sales: 5.0, yoy: "+18%" },
          { name: "Transmission Dies", sales: 2.0, yoy: "+19%" },
        ],
      },
      "KTTPL R1": {
        total: 28.8,
        yoy: "+19%",
        customers: [
          { name: "Bharat Forge", sales: 9.2, yoy: "+21%" },
          { name: "Ramkrishna Forgings", sales: 7.5, yoy: "+18%" },
          { name: "India Forge", sales: 5.8, yoy: "+19%" },
          { name: "Setco Automotive", sales: 3.8, yoy: "+17%" },
          { name: "Amtek Auto", sales: 2.5, yoy: "+20%" },
        ],
        dies: [
          { name: "Axle Forging Dies", sales: 12.5, yoy: "+20%" },
          { name: "Crankshaft Dies", sales: 8.3, yoy: "+19%" },
          { name: "Chassis Dies", sales: 5.5, yoy: "+18%" },
          { name: "Suspension Dies", sales: 2.5, yoy: "+17%" },
        ],
      },
      "KTFL Mundhwa": {
        total: 24.2,
        yoy: "+17%",
        customers: [
          { name: "John Deere", sales: 8.0, yoy: "+19%" },
          { name: "Mahindra Tractors", sales: 6.5, yoy: "+17%" },
          { name: "TAFE", sales: 5.2, yoy: "+16%" },
          { name: "Escorts", sales: 3.0, yoy: "+15%" },
          { name: "Sonalika", sales: 1.5, yoy: "+18%" },
        ],
        dies: [
          { name: "Tractor Dies", sales: 12.0, yoy: "+18%" },
          { name: "Agricultural Dies", sales: 7.5, yoy: "+17%" },
          { name: "Implement Dies", sales: 3.5, yoy: "+15%" },
          { name: "Component Dies", sales: 1.2, yoy: "+16%" },
        ],
      },
      "KTTPL R2": {
        total: 22.3,
        yoy: "+18%",
        customers: [
          { name: "Bajaj Auto", sales: 7.8, yoy: "+20%" },
          { name: "Hero MotoCorp", sales: 6.2, yoy: "+18%" },
          { name: "TVS Motor", sales: 4.8, yoy: "+17%" },
          { name: "Royal Enfield", sales: 2.5, yoy: "+19%" },
          { name: "Honda India", sales: 1.0, yoy: "+16%" },
        ],
        dies: [
          { name: "Two-wheeler Dies", sales: 10.5, yoy: "+19%" },
          { name: "Engine Dies", sales: 6.8, yoy: "+18%" },
          { name: "Gear Dies", sales: 3.5, yoy: "+17%" },
          { name: "Frame Dies", sales: 1.5, yoy: "+16%" },
        ],
      },
      "KTFL Baramati": {
        total: 17.5,
        yoy: "+15%",
        customers: [
          { name: "Tata Motors", sales: 6.0, yoy: "+17%" },
          { name: "Force Motors", sales: 4.5, yoy: "+15%" },
          { name: "Ashok Leyland", sales: 3.5, yoy: "+14%" },
          { name: "Eicher Motors", sales: 2.5, yoy: "+16%" },
          { name: "SML Isuzu", sales: 1.0, yoy: "+13%" },
        ],
        dies: [
          { name: "Commercial Vehicle Dies", sales: 8.5, yoy: "+16%" },
          { name: "Axle Dies", sales: 5.2, yoy: "+15%" },
          { name: "Chassis Dies", sales: 2.8, yoy: "+14%" },
          { name: "Component Dies", sales: 1.0, yoy: "+13%" },
        ],
      },
    };
    return plantDetails[plant] || plantDetails["KTPL Mundhwa"];
  };

  const handleVisitSubmit = () => {
    if (
      visitForm.companyName &&
      visitForm.attendee &&
      visitForm.visitDate &&
      visitForm.mom
    ) {
      setVisits([...visits, { ...visitForm, id: Date.now() }]);
      setVisitForm({ companyName: "", attendee: "", visitDate: "", mom: "" });
      setShowVisitModal(false);
    }
  };

  const handleChatSend = () => {
    if (chatInput.trim()) {
      setChatMessages([
        ...chatMessages,
        { type: "user", text: chatInput },
        {
          type: "ai",
          text: "Thank you for your query. Analyzing dashboard data...",
        },
      ]);
      setChatInput("");
    }
  };

  const showSalesDetail = (type, plant = null) => {
    setSalesDetailType(type);
    setSelectedPlant(plant);
    setSalesView("detail");
  };

  // Compact Card Component
  const DashboardCard = ({ title, icon, children, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-blue-900">{title}</h3>
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white text-base">
          {icon}
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
              K
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900">
              Kalyani Technoforge Ltd.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowVisitModal(true)}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white text-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
            >
              +
            </button>
            <div className="text-xs md:text-sm text-gray-600">
              {formatDateTime(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Sales Card */}
        <DashboardCard
          title="Sales"
          icon="₹"
          onClick={() => setActiveModal("sales")}
        >
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: "11px" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Business Pipeline Card */}
        <DashboardCard
          title="Business Pipeline"
          icon="📊"
          onClick={() => setActiveModal("pipeline")}
        >
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={pipelineData.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="stage"
                tick={{ fontSize: 9 }}
                angle={-15}
                textAnchor="end"
                height={45}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: "11px" }} />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* RFQ Card */}
        <DashboardCard
          title="RFQ"
          icon="📋"
          onClick={() => setActiveModal("rfq")}
        >
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={rfqData}>
              <defs>
                <linearGradient id="colorRfq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: "11px" }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#colorRfq)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Quality Complaints Card */}
        <DashboardCard
          title="Quality Complaints"
          icon="⚠️"
          onClick={() => setActiveModal("quality")}
        >
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={qualityData}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={50}
                paddingAngle={3}
                dataKey="value"
                isAnimationActive={false}
              >
                {qualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-2 mt-1">
            {qualityData.map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-[9px] text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Outstanding Receivables Card - UPDATED */}
        <DashboardCard
          title="Outstanding Receivables"
          icon="💰"
          onClick={() => setActiveModal("outstanding")}
        >
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={receivablesData.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 8 }}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis 
                tick={{ fontSize: 9 }}
                tickFormatter={(value) => `₹${value}L`}
              />
              <Tooltip 
                contentStyle={{ fontSize: "11px" }}
                formatter={(value) => [`₹${value}L`, 'Outstanding']}
              />
              <Bar
                dataKey="value"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* EDI Card */}
        <DashboardCard
          title="EDI"
          icon="📡"
          onClick={() => setActiveModal("edi")}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-blue-900">98.5%</div>
              <div className="text-[9px] text-gray-600">Accuracy</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-blue-900">1.2s</div>
              <div className="text-[9px] text-gray-600">Response</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-blue-900">15,234</div>
              <div className="text-[9px] text-gray-600">Transactions</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-blue-900">99.8%</div>
              <div className="text-[9px] text-gray-600">Uptime</div>
            </div>
          </div>
        </DashboardCard>

        {/* Capacity Utilization Card */}
        <DashboardCard
          title="Forging Capacity"
          icon="⚙️"
          onClick={() => setActiveModal("capacity")}
        >
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={capacityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 8 }}
                angle={-15}
                textAnchor="end"
                height={45}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: "11px" }} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              >
                {capacityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Recent Visit Reports Card - UPDATED WITH NEW DESIGN */}
        <DashboardCard
          title="Recent Visit Reports"
          icon="📝"
          onClick={() => setActiveModal("visits")}
        >
          {visits.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-gray-400 text-xs mb-2">No visits yet</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVisitModal(true);
                }}
                className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Add First Visit
              </button>
            </div>
          ) : (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {visits.slice(0, 3).map((visit) => (
                <div
                  key={visit.id}
                  className="bg-gray-50 p-2 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-blue-600 text-[11px]">
                      {visit.companyName}
                    </h4>
                    <span className="text-[8px] text-gray-500">
                      {visit.visitDate}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-600 mb-1">
                    <strong>Attendee:</strong> {visit.attendee}
                  </p>
                  <p className="text-[8px] text-gray-700 line-clamp-2">
                    {visit.mom}
                  </p>
                </div>
              ))}
              {visits.length > 3 && (
                <div className="text-center text-[9px] text-blue-600 font-medium pt-1">
                  +{visits.length - 3} more
                </div>
              )}
            </div>
          )}
        </DashboardCard>
      </div>

      {/* Sales Modal - Professional Sizing */}
      {activeModal === "sales" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setActiveModal(null);
            setSalesView("main");
            setSalesDetailType(null);
            setSelectedPlant(null);
          }}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-5xl max-h-[75vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap justify-between items-center gap-3 mb-5 pb-4 border-b-2 border-blue-100">
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-bold text-blue-900">
                  Sales Dashboard
                </h2>
                <span className="text-sm text-gray-600 italic">
                  ({getPeriodLabel(salesPeriod)})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-600">
                  Period:
                </span>
                {[
                  "current-month",
                  "last-quarter",
                  "last-6-months",
                  "ytd",
                  "last-year",
                ].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSalesPeriod(period)}
                    className={`px-2 py-1 text-[10px] rounded-full border transition-all ${
                      salesPeriod === period
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {period.split("-").join(" ").toUpperCase()}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setSalesView("main");
                  }}
                  className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm ml-2"
                >
                  ×
                </button>
              </div>
            </div>

            {salesView === "main" ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-blue-900">
                      ₹125.3Cr
                    </div>
                    <div className="text-[10px] text-gray-600">
                      Total Revenue
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      +18.5%
                    </div>
                    <div className="text-[10px] text-gray-600">YoY Growth</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-purple-900">87</div>
                    <div className="text-[10px] text-gray-600">
                      Active Clients
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">
                      ₹14.2Cr
                    </div>
                    <div className="text-[10px] text-gray-600">Monthly Avg</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-blue-900 font-semibold mb-3 text-sm">
                      Continent-wise Sales
                    </h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={continentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={70}
                          dataKey="value"
                          isAnimationActive={false}
                        >
                          {continentData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: "11px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div
                    onClick={() => showSalesDetail("plant")}
                    className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-blue-900 font-semibold mb-3 text-sm">
                      Plant-wise Performance
                    </h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={plantData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          tick={{ fontSize: 9 }}
                        />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={{ fontSize: "11px" }} />
                        <Bar
                          dataKey="value"
                          fill="#4caf50"
                          radius={[4, 4, 0, 0]}
                          isAnimationActive={false}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="text-center text-blue-600 text-[10px] mt-2 font-medium">
                      Click to view details →
                    </div>
                  </div>

                  <div
                    onClick={() => showSalesDetail("sector")}
                    className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-blue-900 font-semibold mb-3 text-sm">
                      Sector Analysis
                    </h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={sectorData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis
                          dataKey="name"
                          type="category"
                          width={100}
                          tick={{ fontSize: 9 }}
                        />
                        <Tooltip contentStyle={{ fontSize: "11px" }} />
                        <Bar
                          dataKey="value"
                          fill="#ff9800"
                          radius={[0, 4, 4, 0]}
                          isAnimationActive={false}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="text-center text-blue-600 text-[10px] mt-2 font-medium">
                      Click to view details →
                    </div>
                  </div>

                  <div
                    onClick={() => showSalesDetail("product")}
                    className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-blue-900 font-semibold mb-3 text-sm">
                      Product Category
                    </h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name.split(" ")[0]} ${(percent * 100).toFixed(
                              0
                            )}%`
                          }
                          outerRadius={70}
                          dataKey="value"
                          isAnimationActive={false}
                        >
                          {productData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: "11px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center text-blue-600 text-[10px] mt-2 font-medium">
                      Click to view details →
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setSalesView("main");
                    setSalesDetailType(null);
                    setSelectedPlant(null);
                  }}
                  className="bg-blue-900 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 mb-5 text-sm"
                >
                  ← Back
                </button>

                {salesDetailType === "plant" && !selectedPlant && (
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                      Plant-wise Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {plantData.map((plant) => (
                        <div
                          key={plant.name}
                          onClick={() => setSelectedPlant(plant.name)}
                          className="bg-white border border-blue-200 p-3 rounded-lg cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all"
                        >
                          <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                            {plant.name}
                          </h4>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-600 text-xs">
                              Sales:
                            </span>
                            <span className="font-bold text-blue-900 text-sm">
                              ₹{plant.value}Cr
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-xs">YoY:</span>
                            <span className="font-bold text-green-600 text-sm">
                              {plant.yoy}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPlant &&
                  (() => {
                    const data = getDetailedPlantData(selectedPlant);
                    return (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <button
                          onClick={() => setSelectedPlant(null)}
                          className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 mb-4 text-xs"
                        >
                          ← Back to Plants
                        </button>
                        <h3 className="text-base font-bold text-blue-900 mb-4">
                          {selectedPlant} - Details
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                          <div className="bg-white p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-blue-900">
                              ₹{data.total}Cr
                            </div>
                            <div className="text-[9px] text-gray-600">
                              Total
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-600">
                              {data.yoy}
                            </div>
                            <div className="text-[9px] text-gray-600">YoY</div>
                          </div>
                          <div className="bg-white p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-purple-900">
                              {data.customers.length}
                            </div>
                            <div className="text-[9px] text-gray-600">
                              Customers
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-orange-600">
                              {data.dies.length}
                            </div>
                            <div className="text-[9px] text-gray-600">
                              Die Types
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2 text-xs">
                              Customers
                            </h4>
                            <ResponsiveContainer width="100%" height={180}>
                              <PieChart>
                                <Pie
                                  data={data.customers}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name }) => name.split(" ")[0]}
                                  outerRadius={60}
                                  dataKey="sales"
                                  isAnimationActive={false}
                                >
                                  {data.customers.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip contentStyle={{ fontSize: "10px" }} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2 text-xs">
                              Dies
                            </h4>
                            <ResponsiveContainer width="100%" height={180}>
                              <BarChart data={data.dies}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#e0e0e0"
                                />
                                <XAxis
                                  dataKey="name"
                                  angle={-45}
                                  textAnchor="end"
                                  height={80}
                                  tick={{ fontSize: 8 }}
                                />
                                <YAxis tick={{ fontSize: 9 }} />
                                <Tooltip contentStyle={{ fontSize: "10px" }} />
                                <Bar
                                  dataKey="sales"
                                  fill="#4caf50"
                                  radius={[3, 3, 0, 0]}
                                  isAnimationActive={false}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-blue-100">
                                <th className="p-2 text-left">Customer</th>
                                <th className="p-2 text-center">Sales</th>
                                <th className="p-2 text-center">% Share</th>
                                <th className="p-2 text-center">YoY</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.customers.map((customer, index) => (
                                <tr
                                  key={index}
                                  className={
                                    index % 2 === 1 ? "bg-gray-100" : "bg-white"
                                  }
                                >
                                  <td className="p-2">{customer.name}</td>
                                  <td className="p-2 text-center font-bold">
                                    ₹{customer.sales}
                                  </td>
                                  <td className="p-2 text-center">
                                    {(
                                      (customer.sales / data.total) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </td>
                                  <td
                                    className={`p-2 text-center font-bold ${
                                      customer.yoy.startsWith("+")
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {customer.yoy}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })()}

                {salesDetailType === "sector" && (
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                      Sector Analysis
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="p-2 text-left">Sector</th>
                            <th className="p-2 text-center">Sales (₹ Cr)</th>
                            <th className="p-2 text-center">% Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sectorData.map((sector, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 1 ? "bg-gray-100" : "bg-white"
                              }
                            >
                              <td className="p-2 font-semibold">
                                {sector.name}
                              </td>
                              <td className="p-2 text-center font-bold text-blue-900">
                                ₹{sector.value}
                              </td>
                              <td className="p-2 text-center">
                                {(
                                  (sector.value /
                                    sectorData.reduce(
                                      (sum, s) => sum + s.value,
                                      0
                                    )) *
                                  100
                                ).toFixed(1)}
                                %
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {salesDetailType === "product" && (
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                      Product Categories
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-center">Sales (₹ Cr)</th>
                            <th className="p-2 text-center">% Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.map((product, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 1 ? "bg-gray-100" : "bg-white"
                              }
                            >
                              <td className="p-2 font-semibold">
                                {product.name}
                              </td>
                              <td className="p-2 text-center font-bold text-blue-900">
                                ₹{product.value}
                              </td>
                              <td className="p-2 text-center">
                                {(
                                  (product.value /
                                    productData.reduce(
                                      (sum, p) => sum + p.value,
                                      0
                                    )) *
                                  100
                                ).toFixed(1)}
                                %
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Pipeline Modal - Compact */}
      {activeModal === "pipeline" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-4xl max-h-[70vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">
                Business Pipeline
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#2196f3"
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#4caf50"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip contentStyle={{ fontSize: "11px" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar
                  yAxisId="left"
                  dataKey="value"
                  fill="#2196f3"
                  name="Deals"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />
                <Bar
                  yAxisId="right"
                  dataKey="amount"
                  fill="#4caf50"
                  name="Amount (₹Cr)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
              {pipelineData.map((stage, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg text-center"
                >
                  <div className="text-xl font-bold text-blue-900">
                    {stage.value}
                  </div>
                  <div className="text-[10px] text-gray-600 mb-1">
                    {stage.stage}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    ₹{stage.amount}Cr
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RFQ Modal - Compact */}
      {activeModal === "rfq" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-3xl max-h-[65vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">RFQ Details</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={rfqData}>
                <defs>
                  <linearGradient
                    id="colorRfqModal"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: "11px" }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fill="url(#colorRfqModal)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quality Modal - Compact */}
      {activeModal === "quality" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-3xl max-h-[65vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">
                Quality Complaints
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={90}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {qualityData.map((item, i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded-lg"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-700 mt-1">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Outstanding Modal - UPDATED WITH MATCHING CHART */}
      {activeModal === "outstanding" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-3xl max-h-[65vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">
                Outstanding Receivables
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={receivablesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `₹${value}L`}
                />
                <Tooltip 
                  contentStyle={{ fontSize: "11px" }}
                  formatter={(value) => [`₹${value}L`, 'Outstanding']}
                />
                <Bar
                  dataKey="value"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
              {receivablesData.map((item, index) => (
                <div key={index} className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-orange-600">
                    ₹{item.value}L
                  </div>
                  <div className="text-[10px] text-gray-600 mt-1">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDI Modal - Compact */}
      {activeModal === "edi" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-2xl max-h-[60vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">
                EDI Performance
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-blue-900">98.5%</div>
                <div className="text-sm text-gray-600 mt-2">Accuracy</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-green-600">1.2s</div>
                <div className="text-sm text-gray-600 mt-2">Avg Response</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-purple-900">15,234</div>
                <div className="text-sm text-gray-600 mt-2">Transactions</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-orange-600">99.8%</div>
                <div className="text-sm text-gray-600 mt-2">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Capacity Modal - Compact */}
      {activeModal === "capacity" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-4xl max-h-[70vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">
                Forging Capacity Utilization
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={capacityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{ fontSize: "11px" }}
                  formatter={(value) => `${value}%`}
                />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                >
                  {capacityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              {capacityData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg text-center"
                >
                  <div
                    className="text-xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}%
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visit Modal - Compact */}
      {showVisitModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVisitModal(false)}
        >
          <div
            className="bg-white rounded-xl p-5 max-w-2xl w-full max-h-[70vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">
                Add Visit Report
              </h2>
              <button
                onClick={() => setShowVisitModal(false)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-blue-900 font-medium mb-1.5 text-sm">
                  Company Name
                </label>
                <input
                  type="text"
                  value={visitForm.companyName}
                  onChange={(e) =>
                    setVisitForm({ ...visitForm, companyName: e.target.value })
                  }
                  className="w-full p-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-1.5 text-sm">
                  Attendee
                </label>
                <input
                  type="text"
                  value={visitForm.attendee}
                  onChange={(e) =>
                    setVisitForm({ ...visitForm, attendee: e.target.value })
                  }
                  className="w-full p-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                  placeholder="Enter attendee"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-blue-900 font-medium mb-1.5 text-sm">
                  Date
                </label>
                <input
                  type="date"
                  value={visitForm.visitDate}
                  onChange={(e) =>
                    setVisitForm({ ...visitForm, visitDate: e.target.value })
                  }
                  className="w-full p-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-blue-900 font-medium mb-1.5 text-sm">
                Minutes of Meeting
              </label>
              <textarea
                value={visitForm.mom}
                onChange={(e) =>
                  setVisitForm({ ...visitForm, mom: e.target.value })
                }
                rows="3"
                className="w-full p-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                placeholder="Enter meeting minutes"
              />
            </div>
            <button
              onClick={handleVisitSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2.5 rounded-lg font-semibold hover:scale-105 transition-transform text-sm"
            >
              Add Visit Report
            </button>
          </div>
        </div>
      )}

      {/* Visits Detail Modal - UPDATED WITH ENHANCED DESIGN */}
      {activeModal === "visits" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-xl p-5 w-full max-w-4xl max-h-[75vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-900">
                Recent Visit Reports
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVisitModal(true);
                  }}
                  className="bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 text-sm"
                >
                  + Add New
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
                >
                  ×
                </button>
              </div>
            </div>

            {visits.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No visit reports yet.</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVisitModal(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add First Visit Report
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {visits.map((visit) => (
                  <div
                    key={visit.id}
                    className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-blue-600 text-base">
                        {visit.companyName}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {visit.visitDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Attendee:</strong> {visit.attendee}
                    </p>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded-lg leading-relaxed">
                      {visit.mom}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center text-xl"
        >
          💬
        </button>

        {showAIChat && (
          <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 font-semibold text-sm">
              AI Assistant
            </div>
            <div className="h-64 overflow-y-auto p-3 bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-[80%] text-xs ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                className="flex-1 p-2 border border-gray-300 rounded-full outline-none text-xs"
                placeholder="Ask me..."
              />
              <button
                onClick={handleChatSend}
                className="px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-xs"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KalyaniDashboard;