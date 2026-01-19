import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  ChevronLeft,
  MessageCircle,
  X,
  Send,
  DollarSign,
  Target,
} from "lucide-react";

export default function HRDashboard() {
  const [currentPage, setCurrentPage] = useState("overview");
  const [selectedNonCore, setSelectedNonCore] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! 👋 I'm your HR Assistant. Ask me about Headcount, Attrition, Training, or any HR metrics!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), type: "user", text: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    setChatInput("");
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "📊 Total Headcount: 1,096 | New Joined: 175 | Exits: 104 | Growth: +71",
        "⚠️ Attrition Rate: 5.16% | Main Reason: Better Opportunities (28 exits) | Highest Risk: Bhiwadi (15%)",
        "🎓 Training: 24 OJT + 10 CRT + 11 Safety programs | Avg 48 hrs/employee | Performance: +115% vs target",
        "💰 Compensation: Payroll On Track | Budget Variance ±2% | Cost per Employee: ₹12,850/month",
        "❤️ Engagement Score: 8.4/10 | Participation: 156 one-on-ones | Recognition: 287 appreciations",
        "📈 Initiatives: Young Leaders 12 | Six Sigma 5 | Skill/Will 100% | Role Expansion 28",
      ];
      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setChatMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 1000);
  };

  const handleBudgetingClick = () => {
    // Redirect to budgeting page
    window.location.href = "https://n3piot011.kalyanitfl.com/kalyani.iot/budgetting";
  };

  const handleSkillWillClick = () => {
    // Redirect to skill will page
    window.location.href = "/noncore/skillwill";
  };

  // ALL DATA
  const companyData = [
    { name: "KTFL", value: 969 },
    { name: "KTTL", value: 82 },
    { name: "Inmet", value: 47 },
    { name: "KAPL", value: 10 },
  ];

  const locationData = [
    { name: "Ranjangaon", value: 257 },
    { name: "Chakan", value: 138 },
    { name: "Khed", value: 126 },
    { name: "Mundhwa", value: 127 },
    { name: "Corporate", value: 101 },
  ];

  const levelData = [
    { name: "Top Mgmt", value: 8 },
    { name: "Higher Mgmt", value: 47 },
    { name: "Middle Mgmt", value: 110 },
    { name: "Junior Mgmt", value: 584 },
    { name: "Operators", value: 307 },
    { name: "Trainees", value: 48 },
  ];

  const coreVsSupport = [
    { name: "Ranjangaon", core: 54, support: 8 },
    { name: "Other", core: 15, support: 11 },
    { name: "Chakhan", core: 8, support: 8 },
  ];

  const gradeData = [
    { grade: "M0", value: 3 },
    { grade: "M1", value: 18 },
    { grade: "M2", value: 11 },
    { grade: "M3", value: 15 },
    { grade: "O5", value: 23 },
    { grade: "O4", value: 42 },
    { grade: "O3", value: 44 },
    { grade: "O2", value: 84 },
    { grade: "O1", value: 139 },
    { grade: "S2", value: 268 },
    { grade: "S1", value: 94 },
    { grade: "TTSA", value: 307 },
    { grade: "Trainee", value: 48 },
  ];

  const tenureData = [
    { range: "Below 1", value: 111 },
    { range: "1 to 2", value: 236 },
    { range: "3 to 5", value: 153 },
    { range: "6 to 10", value: 110 },
    { range: "11 to 15", value: 92 },
    { range: "16 to 20", value: 72 },
    { range: "21 to 25", value: 3 },
    { range: "25+", value: 3 },
  ];

  const monthData = [
    { month: "Q1", value: 1068 },
    { month: "QII", value: 1093 },
    { month: "QIII", value: 1096 },
    { month: "Jan", value: 1096 },
  ];

  // Attrition Data
  const attritionKPIs = [
    {
      label: "Period",
      value: "1st April, 23 TO 30th June, 23",
      color: "bg-blue-600",
    },
    { label: "No of Exit", value: "39", color: "bg-green-500" },
    { label: "Avg. Head Count", value: "756", color: "bg-green-500" },
    { label: "Attrition %", value: "5.16%", color: "bg-green-500" },
  ];

  const companyAttritionData = [
    { name: "KTFL", value: 5.2 },
    { name: "KTTL", value: 2.4 },
    { name: "Inmet", value: 0 },
    { name: "KMPL", value: 0 },
  ];

  const locationAttritionData = [
    { name: "Bhiwadi", value: 15.0 },
    { name: "Jejuri", value: 11.4 },
    { name: "Sofi", value: 11.0 },
    { name: "Ambejogai", value: 10.8 },
    { name: "Rajapur", value: 5.8 },
  ];

  const gradeAttritionData = [
    { grade: "Trainees", value: 17.5 },
    { grade: "S2", value: 3.4 },
    { grade: "S1", value: 6.3 },
    { grade: "O1", value: 5.3 },
    { grade: "O2", value: 4.9 },
    { grade: "O3", value: 4.5 },
  ];

  const reasonData = [
    { reason: "Better...", value: 28 },
    { reason: "Personal", value: 3 },
    { reason: "Genuine", value: 1 },
    { reason: "Career", value: 2 },
    { reason: "Performance", value: 2 },
    { reason: "Other", value: 3 },
  ];

  const monthAttritionData = [
    { month: "April", value: 17 },
    { month: "May", value: 10 },
    { month: "June", value: 12 },
  ];

  // Training Data
  const trainingPlannedVsActual = [
    { month: "Apr", planned: 26, actual: 46 },
    { month: "May", planned: 23, actual: 53 },
    { month: "Jun", planned: 19, actual: 53 },
    { month: "Jul-25", planned: 35, actual: 38 },
    { month: "Aug", planned: 28, actual: 38 },
    { month: "Sep", planned: 27, actual: 25 },
    { month: "Oct", planned: 27, actual: 29 },
    { month: "Nov", planned: 28, actual: 31 },
  ];

  const hoursPerEmployee = [
    { month: "jul-24-25", hrs: 2.0 },
    { month: "apr-25", hrs: 3.02 },
    { month: "may-25", hrs: 3.62 },
    { month: "jun-25", hrs: 3.82 },
    { month: "jul-25", hrs: 4.43 },
    { month: "Aug-25", hrs: 2.42 },
    { month: "sep-25", hrs: 2.97 },
    { month: "oct-25", hrs: 3.84 },
    { month: "nov-25", hrs: 5.45 },
    { month: "dec-25", hrs: 2.1 },
    { month: "jan-24", hrs: 0 },
    { month: "Target-24", hrs: 3.0 },
  ];

  // Compensation Data
  const costByLocation = [
    { location: "Ranjangaon", cost: 3298 },
    { location: "Chakan", cost: 1768 },
    { location: "Khed", cost: 1614 },
    { location: "Mundhwa", cost: 1628 },
    { location: "Corporate", cost: 1294 },
  ];

  const costByLevel = [
    { level: "Top Mgmt", cost: 185 },
    { level: "Higher", cost: 541 },
    { level: "Middle", cost: 1210 },
    { level: "Junior", cost: 6771 },
    { level: "Operators", cost: 3114 },
    { level: "Trainees", cost: 429 },
  ];

  const costTrend = [
    { month: "Apr", budget: 1200, actual: 1182 },
    { month: "May", budget: 1200, actual: 1198 },
    { month: "Jun", budget: 1200, actual: 1205 },
    { month: "Jul", budget: 1200, actual: 1189 },
    { month: "Aug", budget: 1200, actual: 1210 },
    { month: "Sep", budget: 1200, actual: 1195 },
  ];

  // Engagement Data
  const engagementScore = [
    { category: "Leadership", score: 8.1 },
    { category: "Culture", score: 8.4 },
    { category: "Growth", score: 8.2 },
    { category: "Support", score: 8.6 },
    { category: "Compensation", score: 7.9 },
    { category: "Work-life", score: 8.3 },
  ];

  const engagementTrend = [
    { quarter: "Q1", score: 7.8 },
    { quarter: "Q2", score: 8.1 },
    { quarter: "Q3", score: 8.3 },
    { quarter: "Q4", score: 8.4 },
  ];

  const participationData = [
    { month: "Apr", meetings: 34, appreciation: 52 },
    { month: "May", meetings: 41, appreciation: 68 },
    { month: "Jun", meetings: 39, appreciation: 61 },
    { month: "Jul", meetings: 42, appreciation: 71 },
    { month: "Aug", meetings: 40, appreciation: 65 },
    { month: "Sep", meetings: 41, appreciation: 70 },
    { month: "Oct", meetings: 42, appreciation: 68 },
    { month: "Nov", meetings: 43, appreciation: 72 },
  ];

  // Initiatives Data
  const youngLeadersData = [
    { level: "Ready Now", count: 3 },
    { level: "6-12 months", count: 5 },
    { level: "1-2 years", count: 4 },
  ];

  const sixSigmaData = [
    { status: "Completed", value: 2 },
    { status: "In Progress", value: 2 },
    { status: "Planned", value: 1 },
  ];

  // Summary Data
  const diversityData = [
    { category: "Female", value: 5 },
    { category: "PWD", value: 2 },
    { category: "SC/ST", value: 8 },
    { category: "Gen", value: 85 },
  ];

  const growthData = [
    { month: "Apr", joined: 34, exited: 18, net: 16 },
    { month: "May", joined: 52, exited: 12, net: 40 },
    { month: "Jun", joined: 89, exited: 74, net: 15 },
  ];

  const COLORS = [
    "#0066cc",
    "#00a8cc",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  // Components
  const KPIBox = ({ label, value, color }) => (
    <div
      className={`${color} text-white rounded-lg p-4 text-center shadow-lg border-2 border-white`}
    >
      <p className="text-xs font-black uppercase opacity-90">{label}</p>
      <p className="text-4xl font-black mt-2">{value}</p>
    </div>
  );

  const ChartCard = ({ title, children, colspan = 1 }) => (
    <div
      className={`bg-white rounded-lg p-4 shadow-lg border-2 border-blue-400 ${
        colspan === 2 ? "col-span-2" : ""
      }`}
    >
      <h3 className="text-sm font-black text-gray-800 mb-3">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );

  const MetricCard = ({ label, value, subtext, bgColor }) => (
    <div
      className={`${bgColor} text-white rounded-lg p-4 text-center shadow-lg`}
    >
      <p className="text-sm font-black opacity-90">{label}</p>
      <p className="text-3xl font-black mt-2">{value}</p>
      <p className="text-xs mt-1 opacity-75 font-semibold">{subtext}</p>
    </div>
  );

  // Render Detail Pages
  const renderWorkforceDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-2">
        <KPIBox label="Period" value="1st April, 23" color="bg-blue-600" />
        <KPIBox label="Total HC" value="1,096" color="bg-green-500" />
        <KPIBox label="New Joined" value="175" color="bg-green-500" />
        <KPIBox label="No of Exit" value="104" color="bg-green-500" />
        <KPIBox label="No of Female" value="53" color="bg-blue-400" />
        <KPIBox label="Trainees" value="48" color="bg-gray-500" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <ChartCard title="Company wise">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={companyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0066cc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Location wise" colspan={2}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0066cc"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Level wise">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={levelData} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={70} />
              <Tooltip />
              <Bar dataKey="value" fill="#0066cc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Core Vs Support">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={coreVsSupport}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="core" fill="#0066cc" />
              <Bar dataKey="support" fill="#00a8cc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Grade wise">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tenure wise">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tenureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Month wise trend" colspan={2}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthData}>
              <defs>
                <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066cc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0066cc" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0066cc"
                fill="url(#colorMonth)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );

  const renderAttritionDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {attritionKPIs.map((kpi, idx) => (
          <KPIBox
            key={idx}
            label={kpi.label}
            value={kpi.value}
            color={kpi.color}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-blue-400">
        <h3 className="text-sm font-black text-gray-800 mb-3">
          Female Employees
        </h3>
        <table className="w-full text-sm">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="p-2 font-black">No of Emp.</th>
              <th className="p-2 font-black">Exit</th>
              <th className="p-2 font-black">%</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 text-center font-black">36</td>
              <td className="p-2 text-center font-black">2</td>
              <td className="p-2 text-center font-black">5.55%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Company wise">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={companyAttritionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Location wise">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={locationAttritionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Grade wise">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gradeAttritionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Performance Rating wise">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "A+", value: 13 },
                  { name: "A", value: 15 },
                  { name: "B", value: 13 },
                  { name: "C", value: 10 },
                  { name: "D", value: 10 },
                  { name: "N.A", value: 39 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <Cell key={idx} fill={COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Month wise trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthAttritionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Reason wise">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reasonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="reason"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );

  const renderTrainingDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Planned vs Actual Training">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trainingPlannedVsActual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" fill="#8b5cf6" />
              <Bar dataKey="actual" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hours per Employee">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hoursPerEmployee}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hrs" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-blue-600">
          <h3 className="text-sm font-black text-white bg-blue-600 p-2 mb-3 rounded">
            OJT & CRT Training Data
          </h3>
          <table className="w-full text-sm mb-4">
            <thead className="bg-blue-100">
              <tr>
                <th colSpan="2" className="p-2 text-center border font-black">
                  OJT
                </th>
                <th colSpan="2" className="p-2 text-center border font-black">
                  CRT
                </th>
              </tr>
              <tr className="bg-blue-100">
                <th className="p-2 border font-black">No of Program</th>
                <th className="p-2 border font-black">Training Hrs</th>
                <th className="p-2 border font-black">No of Program</th>
                <th className="p-2 border font-black">Training Hrs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-blue-50">
                <td className="p-2 border text-center font-black">24</td>
                <td className="p-2 border text-center font-black">382</td>
                <td className="p-2 border text-center font-black">10</td>
                <td className="p-2 border text-center font-black">616</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-sm font-black text-white bg-blue-600 p-2 mb-3 rounded">
            Safety Training Data
          </h3>
          <table className="w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 border font-black">No. Planned</th>
                <th className="p-2 border font-black">No. Actual</th>
                <th className="p-2 border font-black">Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-blue-50">
                <td className="p-2 border text-center font-black">4</td>
                <td className="p-2 border text-center font-black">11</td>
                <td className="p-2 border text-center font-black">339</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-blue-600">
          <h3 className="text-sm font-black text-white bg-blue-600 p-2 mb-3 rounded">
            Skill Level
          </h3>
          <table className="w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 border font-black">No of Emp</th>
                <th className="p-2 border font-black">L1</th>
                <th className="p-2 border font-black">L2</th>
                <th className="p-2 border font-black">L3</th>
                <th className="p-2 border font-black">L4</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-blue-50">
                <td className="p-2 border text-center font-black">262</td>
                <td className="p-2 border text-center font-bold">0</td>
                <td className="p-2 border text-center font-bold">28</td>
                <td className="p-2 border text-center font-bold">103</td>
                <td className="p-2 border text-center font-bold">68</td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="p-2 border text-center font-black">%</td>
                <td className="p-2 border text-center font-bold">0%</td>
                <td className="p-2 border text-center font-bold">14%</td>
                <td className="p-2 border text-center font-bold">52%</td>
                <td className="p-2 border text-center font-bold">34%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-600 mt-3 italic font-semibold">
            Action Plan: L2→L3 & L3→L4 conversion monthly. Identify weak areas.
          </p>
        </div>
      </div>
    </div>
  );

  const renderRecruitmentDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          label="New Joined"
          value="175"
          subtext="Placed"
          bgColor="bg-green-500"
        />
        <MetricCard
          label="Time to Hire"
          value="30"
          subtext="Days"
          bgColor="bg-blue-600"
        />
        <MetricCard
          label="Offer Acceptance"
          value="High"
          subtext="Rate"
          bgColor="bg-green-500"
        />
        <MetricCard
          label="Quality Index"
          value="Good"
          subtext="Performance"
          bgColor="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-red-400">
          <h3 className="font-black text-gray-800 mb-3">Pipeline Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Open Positions:</span>
              <span className="font-black">12</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">In Process:</span>
              <span className="font-black">8</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Closed:</span>
              <span className="font-black">175</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-red-400">
          <h3 className="font-black text-gray-800 mb-3">Quality Metrics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Avg Quality:</span>
              <span className="font-black">8.5/10</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Retention:</span>
              <span className="font-black">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Cost/Hire:</span>
              <span className="font-black">₹2.5K</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-red-400">
          <h3 className="font-black text-gray-800 mb-3">Source Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Referral:</span>
              <span className="font-black">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Job Board:</span>
              <span className="font-black">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Campus:</span>
              <span className="font-black">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompensationDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          label="Total Payroll"
          value="₹1.42M"
          subtext="Monthly"
          bgColor="bg-green-500"
        />
        <MetricCard
          label="Budget Variance"
          value="±2%"
          subtext="On Track"
          bgColor="bg-blue-600"
        />
        <MetricCard
          label="Avg per Emp"
          value="₹12,850"
          subtext="Monthly"
          bgColor="bg-purple-600"
        />
        <MetricCard
          label="Overtime Cost"
          value="Managed"
          subtext="Optimized"
          bgColor="bg-cyan-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <ChartCard title="Cost by Location">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costByLocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="location"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}K`} />
              <Bar dataKey="cost" fill="#0066cc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost by Level">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costByLevel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}K`} />
              <Bar dataKey="cost" fill="#00a8cc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Budget vs Actual">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}K`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="budget"
                stackId="1"
                fill="#8b5cf6"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stackId="1"
                fill="#ef4444"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-500">
        <h3 className="text-sm font-black text-white bg-green-600 p-2 mb-3 rounded">
          Benefits & Welfare Programs
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
            <p className="font-black text-gray-800">Health Insurance</p>
            <p className="text-sm font-semibold text-gray-600">100% Coverage</p>
          </div>
          <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
            <p className="font-black text-gray-800">Retirement Plan</p>
            <p className="text-sm font-semibold text-gray-600">
              15% Contribution
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
            <p className="font-black text-gray-800">Leave Benefits</p>
            <p className="text-sm font-semibold text-gray-600">
              20 Days Annual
            </p>
          </div>
          <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-500">
            <p className="font-black text-gray-800">Bonus Structure</p>
            <p className="text-sm font-semibold text-gray-600">
              Performance Based
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEngagementDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          label="Engagement Score"
          value="8.4"
          subtext="Out of 10"
          bgColor="bg-green-500"
        />
        <MetricCard
          label="Participation"
          value="156"
          subtext="1:1 Meetings"
          bgColor="bg-blue-600"
        />
        <MetricCard
          label="Appreciation"
          value="287"
          subtext="Recognition"
          bgColor="bg-purple-600"
        />
        <MetricCard
          label="Satisfaction"
          value="92%"
          subtext="Survey Rate"
          bgColor="bg-cyan-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Engagement Score by Category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementScore}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Engagement Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0066cc"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard
        title="Participation Trend (Meetings & Appreciation)"
        colspan={1}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={participationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="meetings" fill="#0066cc" />
            <Bar dataKey="appreciation" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-pink-500">
        <h3 className="text-sm font-black text-white bg-pink-600 p-2 mb-3 rounded">
          Engagement Initiatives
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-pink-50 rounded border-l-4 border-pink-500">
            <p className="font-black text-gray-800">Team Events</p>
            <p className="text-sm font-semibold text-gray-600">
              Monthly celebrations & outings
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
            <p className="font-black text-gray-800">Wellness Program</p>
            <p className="text-sm font-semibold text-gray-600">
              Health & fitness activities
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
            <p className="font-black text-gray-800">Feedback Loop</p>
            <p className="text-sm font-semibold text-gray-600">
              Quarterly engagement surveys
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInitiativesDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          label="Young Leaders"
          value="12"
          subtext="Selected"
          bgColor="bg-blue-600"
        />
        <MetricCard
          label="Six Sigma"
          value="5"
          subtext="Projects"
          bgColor="bg-green-500"
        />
        <MetricCard
          label="Skill/Will"
          value="100%"
          subtext="Completion"
          bgColor="bg-purple-600"
        />
        <MetricCard
          label="Role Expansion"
          value="28"
          subtext="Employees"
          bgColor="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Young Leaders Readiness">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={youngLeadersData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                label
              >
                {[0, 1, 2].map((idx) => (
                  <Cell key={idx} fill={COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Six Sigma Projects Status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sixSigmaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-blue-600">
          <h3 className="text-sm font-black text-white bg-blue-600 p-2 mb-3 rounded">
            Young Leaders Program
          </h3>
          <table className="w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 border font-black">Readiness Level</th>
                <th className="p-2 border font-black">Count</th>
                <th className="p-2 border font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-blue-50">
                <td className="p-2 border font-bold">Ready Now</td>
                <td className="p-2 border text-center font-black">3</td>
                <td className="p-2 border text-center font-bold text-green-600">
                  ✓ Active
                </td>
              </tr>
              <tr className="border-b hover:bg-blue-50">
                <td className="p-2 border font-bold">6-12 months</td>
                <td className="p-2 border text-center font-black">5</td>
                <td className="p-2 border text-center font-bold text-orange-600">
                  → Pipeline
                </td>
              </tr>
              <tr className="hover:bg-blue-50">
                <td className="p-2 border font-bold">1-2 years</td>
                <td className="p-2 border text-center font-black">4</td>
                <td className="p-2 border text-center font-bold text-blue-600">
                  ○ Develop
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-orange-500">
          <h3 className="text-sm font-black text-white bg-orange-600 p-2 mb-3 rounded">
            Skill Development Programs
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-500">
              <p className="font-black text-gray-800">Skill/Will Matrix</p>
              <p className="text-sm font-semibold text-gray-600">
                100% Coverage Completed
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
              <p className="font-black text-gray-800">Functional Expertise</p>
              <p className="text-sm font-semibold text-gray-600">
                18 Specialists Identified
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
              <p className="font-black text-gray-800">Role Expansion</p>
              <p className="text-sm font-semibold text-gray-600">
                28 Employees Growth Ready
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummaryDetail = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          label="Female Diversity"
          value="53"
          subtext="5% of HC"
          bgColor="bg-pink-500"
        />
        <MetricCard
          label="Net Growth"
          value="+71"
          subtext="Joined - Exit"
          bgColor="bg-green-500"
        />
        <MetricCard
          label="Training Growth"
          value="+115%"
          subtext="vs Target"
          bgColor="bg-blue-600"
        />
        <MetricCard
          label="Engagement"
          value="8.4/10"
          subtext="Score"
          bgColor="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Workforce Diversity">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={diversityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {[0, 1, 2, 3].map((idx) => (
                  <Cell key={idx} fill={COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Growth Trend">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="joined" fill="#10b981" />
              <Bar dataKey="exited" fill="#ef4444" />
              <Bar dataKey="net" fill="#0066cc" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-pink-500">
          <h3 className="text-sm font-black text-white bg-pink-600 p-2 mb-3 rounded">
            Diversity & Inclusion Metrics
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-pink-50 rounded font-semibold">
              <span className="font-bold">Female Employees:</span>
              <span className="font-black">53 (5%)</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded font-semibold">
              <span className="font-bold">PWD Employees:</span>
              <span className="font-black">2 (0.2%)</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded font-semibold">
              <span className="font-bold">SC/ST Employees:</span>
              <span className="font-black">8 (0.7%)</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-50 rounded font-semibold">
              <span className="font-bold">Diversity Target 2025:</span>
              <span className="font-black">10% Female</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-500">
          <h3 className="text-sm font-black text-white bg-green-600 p-2 mb-3 rounded">
            Key Achievements
          </h3>
          <ul className="space-y-2">
            <li className="p-2 bg-green-50 border-l-4 border-green-500 font-semibold">
              ✓ +71 Net growth in headcount
            </li>
            <li className="p-2 bg-blue-50 border-l-4 border-blue-500 font-semibold">
              ✓ Training +115% vs target
            </li>
            <li className="p-2 bg-purple-50 border-l-4 border-purple-500 font-semibold">
              ✓ Engagement score 8.4/10
            </li>
            <li className="p-2 bg-orange-50 border-l-4 border-orange-500 font-semibold">
              ✓ Attrition rate under control
            </li>
            <li className="p-2 bg-pink-50 border-l-4 border-pink-500 font-semibold">
              ✓ 12 Young Leaders developed
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Overview Page with Enhanced Card Design
  const renderOverviewPage = () => (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col overflow-hidden">
      <div className="bg-white border-b-4 border-blue-600 shadow-lg px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-blue-600">
              KALYANI TECHNOFORGE - HR Dashboard
            </h1>
            <p className="text-sm text-gray-600 font-semibold">
              Comprehensive People Intelligence Platform
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBudgetingClick}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-bold"
            >
              E&W Expenses
            </button>
            <button
              onClick={handleSkillWillClick}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-bold"
            >
              <Target className="w-5 h-5" />
              Skill Will
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              id: "workforce",
              title: "Workforce Details & Structure",
              subtitle: "Active employees across all departments",
              mainValue: "1,096",
              mainColor: "text-blue-600",
              borderColor: "border-l-blue-600",
              bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
              headerBg: "bg-blue-600",
              icon: "👥",
              progress: 95,
              metrics: [
                { label: "Head Count Summary", value: "1,096" },
                { label: "Core/Support Ratio", value: "2.5:1" },
                { label: "SPAN of Control", value: "8.2" },
                {
                  label: "Gender Equality %",
                  value: "5%",
                  subtext: "(53 Female)",
                },
              ],
            },
            {
              id: "recruitment",
              title: "Recruitment & Talent Acquisition",
              subtitle: "New joiners placed in organization",
              mainValue: "175",
              mainColor: "text-red-600",
              borderColor: "border-l-red-600",
              bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
              headerBg: "bg-red-600",
              icon: "📊",
              progress: 86,
              metrics: [
                { label: "Open Positions", value: "12" },
                { label: "Time to Hire", value: "30 days" },
                { label: "Offer Acceptance Rate", value: "92%" },
                { label: "Quality of Hire Index", value: "Excellent" },
              ],
            },
            {
              id: "compensation",
              title: "Compensation & Benefits",
              subtitle: "Monthly payroll and cost management",
              mainValue: "₹1.42Cr",
              mainColor: "text-green-600",
              borderColor: "border-l-green-600",
              bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
              headerBg: "bg-green-600",
              icon: "💰",
              progress: 92,
              metrics: [
                { label: "Total Payroll", value: "₹1.42Cr" },
                {
                  label: "Payroll Variance",
                  value: "±2%",
                  subtext: "(On Track)",
                },
                { label: "Overtime Cost", value: "₹42L" },
                { label: "Revenue per Employee", value: "₹45L/Year" },
              ],
            },
            {
              id: "training",
              title: "Training & Development",
              subtitle: "Programs conducted and hours delivered",
              mainValue: "48 hrs",
              mainColor: "text-cyan-600",
              borderColor: "border-l-cyan-600",
              bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
              headerBg: "bg-cyan-600",
              icon: "🎓",
              progress: 115,
              metrics: [
                {
                  label: "Training Hrs/Employee (P vs A)",
                  value: "48 hrs",
                  subtext: "(Target: 40 hrs)",
                },
                { label: "Skill Matrix Coverage", value: "100%" },
                { label: "Training Effectiveness", value: "8.7/10" },
                { label: "Certification Rate", value: "87%" },
              ],
            },
            {
              id: "attrition",
              title: "Attrition & Absenteeism Analysis",
              subtitle: "Total employee departures for 2025",
              mainValue: "5.16%",
              mainColor: "text-orange-600",
              borderColor: "border-l-orange-600",
              bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50",
              headerBg: "bg-orange-600",
              icon: "📉",
              progress: 62,
              metrics: [
                { label: "Attrition Rate", value: "5.16%" },
                { label: "Critical Talent Lost", value: "12" },
                { label: "Highest Risk Location", value: "Bhiwadi (15%)" },
                { label: "Absenteeism Rate", value: "2.1%" },
              ],
            },
            {
              id: "engagement",
              title: "Employees Engagement",
              subtitle: "Score and participation metrics",
              mainValue: "8.4/10",
              mainColor: "text-pink-600",
              borderColor: "border-l-pink-600",
              bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
              headerBg: "bg-pink-600",
              icon: "❤️",
              progress: 84,
              metrics: [
                { label: "One-on-One Meetings", value: "156" },
                { label: "Appreciation Summary", value: "287" },
                { label: "Engagement Score", value: "8.4/10" },
                { label: "Participation Rate", value: "94%" },
              ],
            },
            {
              id: "initiatives",
              title: "HR Strategic Initiatives",
              subtitle: "Leadership development programs",
              mainValue: "45",
              mainColor: "text-purple-600",
              borderColor: "border-l-purple-600",
              bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
              headerBg: "bg-purple-600",
              icon: "🚀",
              progress: 78,
              metrics: [
                { label: "Young Leaders Selected", value: "12" },
                { label: "Six Sigma Projects", value: "5" },
                { label: "Skill & Will Updates", value: "100%" },
                { label: "Role Expansion Count", value: "28" },
              ],
            },
            {
              id: "compliance",
              title: "Compliance & Safety Management",
              subtitle: "Statutory and safety training coverage",
              mainValue: "100%",
              mainColor: "text-teal-600",
              borderColor: "border-l-teal-600",
              bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
              headerBg: "bg-teal-600",
              icon: "✓",
              progress: 100,
              metrics: [
                { label: "Statutory Compliance", value: "100%" },
                { label: "Audits Completed", value: "11" },
                { label: "POSH Compliance Training", value: "100%" },
                { label: "Safety Coverage", value: "100%" },
              ],
            },
            {
              id: "summary",
              title: "Key Performance Summary",
              subtitle: "Overall HR performance overview",
              mainValue: "+71",
              mainColor: "text-indigo-600",
              borderColor: "border-l-indigo-600",
              bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
              headerBg: "bg-indigo-600",
              icon: "📈",
              progress: 91,
              metrics: [
                {
                  label: "Diversity Index",
                  value: "53 (5%)",
                  subtext: "Female employees",
                },
                { label: "Net Growth", value: "+71" },
                { label: "Training vs Target", value: "+115%" },
                { label: "Overall Performance", value: "Excellent" },
              ],
            },
          ].map((card) => (
            <button
              key={card.id}
              onClick={() => {
                setSelectedCard(card.id);
                setCurrentPage("detail");
              }}
              className={`${card.bgColor} rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer text-left border-l-8 ${card.borderColor} overflow-hidden group`}
            >
              <div className="p-4">
                {/* Header with title and status badge */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-black text-gray-900 text-xs">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-semibold">
                      {card.subtitle}
                    </p>
                  </div>
                  <div
                    className={`${card.headerBg} text-white text-xs font-black px-2 py-1 rounded-full`}
                  >
                    ✓ On Track
                  </div>
                </div>

                {/* Main value */}
                <h2 className={`text-3xl font-black ${card.mainColor} mb-3`}>
                  {card.mainValue}
                </h2>

                {/* Metrics list */}
                <div className="space-y-2 mb-3">
                  {card.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-start text-xs"
                    >
                      <span className="text-gray-700 font-semibold">
                        {metric.label}
                      </span>
                      <div className="text-right">
                        <span className="font-black text-gray-900">
                          {metric.value}
                        </span>
                        {metric.subtext && (
                          <p className="text-gray-600 text-xs">
                            {metric.subtext}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-700">
                      Progress
                    </span>
                    <span className={`text-xs font-black ${card.mainColor}`}>
                      {card.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all rounded-full ${
                        card.mainColor === "text-blue-600"
                          ? "bg-blue-600"
                          : card.mainColor === "text-red-600"
                          ? "bg-red-600"
                          : card.mainColor === "text-green-600"
                          ? "bg-green-600"
                          : card.mainColor === "text-cyan-600"
                          ? "bg-cyan-600"
                          : card.mainColor === "text-orange-600"
                          ? "bg-orange-600"
                          : card.mainColor === "text-pink-600"
                          ? "bg-pink-600"
                          : card.mainColor === "text-purple-600"
                          ? "bg-purple-600"
                          : "bg-teal-600"
                      }`}
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 text-white py-2 px-4 flex-shrink-0 shadow-lg">
        <p className="text-sm font-black">KTFL - Human Resource Department</p>
      </div>
    </div>
  );

  // Detail Page
  const renderDetailPage = () => {
    const allCards = [
      { id: "workforce", title: "Work force Details & Structure" },
      { id: "recruitment", title: "Recruitment & Talent Acquisition" },
      { id: "compensation", title: "Compensation & Benefits" },
      { id: "training", title: "Training & Development" },
      { id: "attrition", title: "Attrition & Absenteeism Analysis" },
      { id: "engagement", title: "Employees Engagement" },
      { id: "initiatives", title: "HR Strategic Initiatives" },
      { id: "compliance", title: "Compliance & Safety Management" },
      { id: "summary", title: "Key Performance Summary" },
    ];

    const card = selectedCard
      ? allCards.find((c) => c.id === selectedCard)
      : null;

    if (!card) return null;

    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col overflow-hidden">
        <div className="bg-white border-b-4 border-blue-600 shadow-lg px-6 py-4 flex-shrink-0 flex items-center justify-between">
          <div>
            <button
              onClick={() => setCurrentPage("overview")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-2 font-bold"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Overview
            </button>
            <h1 className="text-3xl font-black text-gray-900">{card.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 font-bold">
              KALYANI TECHNOFORGE
            </p>
            <p className="font-black">KTFL, Human Resource</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {selectedCard === "workforce" && renderWorkforceDetail()}
          {selectedCard === "attrition" && renderAttritionDetail()}
          {selectedCard === "training" && renderTrainingDetail()}
          {selectedCard === "recruitment" && renderRecruitmentDetail()}
          {selectedCard === "compensation" && renderCompensationDetail()}
          {selectedCard === "engagement" && renderEngagementDetail()}
          {selectedCard === "initiatives" && renderInitiativesDetail()}
          {selectedCard === "summary" && renderSummaryDetail()}
          {selectedCard === "compliance" && (
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-3">
                <MetricCard
                  label="Statutory"
                  value="100%"
                  subtext="Compliant"
                  bgColor="bg-green-500"
                />
                <MetricCard
                  label="Audits"
                  value="11"
                  subtext="Active"
                  bgColor="bg-blue-600"
                />
                <MetricCard
                  label="POSH Training"
                  value="Active"
                  subtext="Mandatory"
                  bgColor="bg-purple-600"
                />
                <MetricCard
                  label="Safety Hours"
                  value="339"
                  subtext="Coverage"
                  bgColor="bg-orange-500"
                />
                <MetricCard
                  label="Programs"
                  value="45"
                  subtext="Total"
                  bgColor="bg-cyan-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-500">
                  <h3 className="text-sm font-black text-white bg-green-600 p-2 mb-3 rounded">
                    Compliance Checklist
                  </h3>
                  <ul className="space-y-2">
                    <li className="p-2 bg-green-50 border-l-4 border-green-500 font-semibold">
                      ✓ All Statutory Requirements
                    </li>
                    <li className="p-2 bg-green-50 border-l-4 border-green-500 font-semibold">
                      ✓ ENY & Customer Audits
                    </li>
                    <li className="p-2 bg-blue-50 border-l-4 border-blue-500 font-semibold">
                      → POSH Compliance Training
                    </li>
                    <li className="p-2 bg-green-50 border-l-4 border-green-500 font-semibold">
                      ✓ Safety Performance Tracking
                    </li>
                    <li className="p-2 bg-green-50 border-l-4 border-green-500 font-semibold">
                      ✓ 100% Safety Training Coverage
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-500">
                  <h3 className="text-sm font-black text-white bg-green-600 p-2 mb-3 rounded">
                    HR Initiatives
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded">
                      <p className="font-black">Young Leaders Program</p>
                      <p className="text-sm font-bold">12 Selected</p>
                    </div>
                    <div className="p-3 bg-green-100 border-l-4 border-green-500 rounded">
                      <p className="font-black">Six Sigma Projects</p>
                      <p className="text-sm font-bold">5 Active</p>
                    </div>
                    <div className="p-3 bg-purple-100 border-l-4 border-purple-500 rounded">
                      <p className="font-black">Role Expansion</p>
                      <p className="text-sm font-bold">28 Employees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden">
      {currentPage === "overview" ? renderOverviewPage() : renderDetailPage()}

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
          title="Open HR Assistant"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white border-4 border-blue-600 rounded-lg shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="font-black text-sm">HR Assistant</p>
              <p className="text-xs opacity-80 font-semibold">Always Online</p>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm font-semibold ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg px-4 py-2 flex gap-2 rounded-bl-none">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleChatSubmit}
            className="border-t p-4 bg-gray-50 flex-shrink-0"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 font-medium"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors font-black flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
