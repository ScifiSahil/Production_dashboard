import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, IndianRupee, Activity, Users, ShoppingCart, Briefcase, Clock, FileText, Package, BarChart3, AlertCircle, CheckCircle, Filter, Download, RefreshCw, Lightbulb, MessageSquare, Send, X, ChevronRight, Search, Percent, DollarSign, Building, Archive, Truck, Settings, Target } from 'lucide-react';

const UltimateFinanceDashboard = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: '🤖 Hello! Ask me about any module - MIS, Sales, FI, Treasury, GST, Materials, Plant, or Dispatch!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const COLORS = { primary: '#2563EB', success: '#059669', warning: '#D97706', danger: '#DC2626', info: '#7C3AED' };

  // All 11 Module Cards Data
  const modules = [
    {
      id: 'mis',
      title: 'MIS Dashboard',
      subtitle: 'P&L, Balance Sheet & Ratios',
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      summary: { metric1: 'P&L', value1: 'On Track', metric2: 'Balance Sheet', value2: 'Healthy', metric3: 'Ratios', value3: 'Positive' },
      deepDiveData: {
        sections: ['Dashboard - P & L', 'Balance sheet & MIS P & L', 'Balancesheet ratios', 'Sales', 'Raw Material Consumption', 'Manufacturing Cost']
      }
    },
    {
      id: 'treasury',
      title: 'Treasury',
      subtitle: 'Cash, FX, Loans, AP/AR',
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      summary: { metric1: 'Cash Flow', value1: '₹285 Cr', metric2: 'FX Loss', value2: '₹6 Mn', metric3: 'Loans', value3: '₹630 Cr' },
      deepDiveData: {
        sections: ['Cash Flow', 'Bank balances', 'FX - Forward position', 'Fx - Realised & unrealised gain/loss', 'Loan position', 'Account payable', 'Account Receivable']
      }
    },
    {
      id: 'fi',
      title: 'FI - Ageing',
      subtitle: 'Advances, CWIP, Sub-con',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      summary: { metric1: 'Advances', value1: '₹30 L', metric2: 'CWIP >12M', value2: '₹200 Cr 🔴', metric3: 'Sub-con', value3: '₹222 Cr' },
      deepDiveData: {
        ageingAdvances: [
          { category: 'abc', '1m': 1000000, '3m': 0, '6m': 0, '12m': 0, '>12m': 0, total: 1000000 },
          { category: 'xyz', '1m': 0, '3m': 0, '6m': 0, '12m': 2000000, '>12m': 0, total: 2000000 },
          { category: 'Total', '1m': 1000000, '3m': 0, '6m': 0, '12m': 2000000, '>12m': 0, total: 3000000 }
        ],
        ageingCWIP: [
          { category: 'abc', '1m': 1000000, '3m': 2000000, '6m': 15000000, '12m': 0, '>12m': 200000000, total: 218000000 },
          { category: 'xyz', '1m': 0, '3m': 1000000, '6m': 2000000, '12m': 2000000, '>12m': 0, total: 5000000 },
          { category: 'Total', '1m': 1000000, '3m': 3000000, '6m': 17000000, '12m': 2000000, '>12m': 200000000, total: 223000000 }
        ],
        subconChallan: [
          { vendor: 'abc', '3m': 2000000, '6m': 15000000, '12m': 0, '>12m': 200000000, total: 217000000 },
          { vendor: 'xyz', '3m': 1000000, '6m': 2000000, '12m': 2000000, '>12m': 0, total: 5000000 },
          { vendor: 'Total', '3m': 3000000, '6m': 17000000, '12m': 2000000, '>12m': 200000000, total: 222000000 }
        ]
      }
    },
    {
      id: 'sales',
      title: 'Sales Performance',
      subtitle: 'Auto, Gear, GB&DC',
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      summary: { metric1: 'Total FTM', value1: '₹1,892 Mn', metric2: 'Auto', value2: '₹1,367 Mn', metric3: 'Export', value3: '₹689 Mn' },
      deepDiveData: {
        ftm: {
          auto: { plan: 1347.48, actual: 1367.42, exportUSD: { plan: 360.54, actual: 352.72 }, exportEuro: { plan: 40.52, actual: 27.13 }, domestic: { plan: 818.75, actual: 842.99 } },
          gear: { plan: 478.60, actual: 479.91, exportUSD: { plan: 41.42, actual: 74.25 }, exportEuro: { plan: 239.65, actual: 228.51 }, domestic: { plan: 94.15, actual: 77.12 } },
          gbdc: { plan: 52.72, actual: 44.98, exportUSD: { plan: 0, actual: 0.20 }, exportEuro: { plan: 15.00, actual: 6.31 }, domestic: { plan: 2.07, actual: 4.88 } },
          total: { plan: 1878.79, actual: 1892.32 }
        }
      }
    },
    {
      id: 'customers',
      title: 'Sales by Customer',
      subtitle: 'Top Customers Analysis',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100',
      summary: { metric1: 'Stellantis', value1: 'Top', metric2: 'Dana', value2: '2nd', metric3: 'TML/Maruti', value3: '3rd/4th' },
      deepDiveData: {
        customers: [
          { name: 'Stellantis', budOct: 450, actOct: 460, delta: 10, budYTD: 2500, actYTD: 2600, deltaYTD: 100 },
          { name: 'Dana', budOct: 380, actOct: 375, delta: -5, budYTD: 2100, actYTD: 2080, deltaYTD: -20 },
          { name: 'TML', budOct: 320, actOct: 310, delta: -10, budYTD: 1800, actYTD: 1750, deltaYTD: -50 },
          { name: 'Maruti', budOct: 280, actOct: 295, delta: 15, budYTD: 1600, actYTD: 1680, deltaYTD: 80 }
        ]
      }
    },
    {
      id: 'fx',
      title: 'FX Management',
      subtitle: 'Forward Contracts & Hedging',
      icon: DollarSign,
      color: 'from-teal-500 to-teal-600',
      bgGradient: 'from-teal-50 to-teal-100',
      summary: { metric1: 'USD Forward', value1: '36 Mn', metric2: 'Euro Forward', value2: '36 Mn', metric3: 'FX Loss', value3: '₹6 Mn' },
      deepDiveData: {
        usdForward: [
          { month: 'Oct-25', contract: 5.00, rate: 89.00, loss: -5.00 },
          { month: 'Nov-25', contract: 5.00, rate: 90.00, loss: 0 },
          { month: 'Dec-25', contract: 6.00, rate: 90.20, loss: 1.20 },
          { month: 'Jan-26', contract: 6.00, rate: 90.30, loss: 1.80 },
          { month: 'FY 25-26', contract: 36.00, rate: 0, loss: 4.30 }
        ],
        euroForward: [
          { month: 'Oct-25', contract: 5.00, rate: 104.00, loss: -5.00 },
          { month: 'Nov-25', contract: 5.00, rate: 105.00, loss: 0 },
          { month: 'Dec-25', contract: 6.00, rate: 105.10, loss: 0.60 },
          { month: 'Jan-26', contract: 6.00, rate: 105.20, loss: 1.20 },
          { month: 'FY 25-26', contract: 36.00, rate: 0, loss: 1.70 }
        ]
      }
    },
    {
      id: 'gst',
      title: 'GST Management',
      subtitle: 'CGST, SGST, IGST Balance',
      icon: FileText,
      color: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100',
      summary: { metric1: 'Net Balance', value1: '₹-10 L', metric2: 'CGST', value2: '₹-10 L', metric3: 'ITC', value3: '₹250 L' },
      deepDiveData: {
        gstBalance: [
          { type: 'CGST', opening: 40, itc: 25, liability: -70, rcm: -5, net: -10 },
          { type: 'SGST', opening: 50, itc: 25, liability: -70, rcm: -5, net: 0 },
          { type: 'IGST', opening: 60, itc: 200, liability: -240, rcm: -20, net: 0 },
          { type: 'Total', opening: 150, itc: 250, liability: -380, rcm: -30, net: -10 }
        ]
      }
    },
    {
      id: 'refunds',
      title: 'Tax Refunds',
      subtitle: 'IGST, DBK, RODTEP',
      icon: Package,
      color: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100',
      summary: { metric1: 'IGST Pending', value1: '₹476 L', metric2: 'DBK Pending', value2: '₹105 L', metric3: 'RODTEP', value3: '₹29 L' },
      deepDiveData: {
        refunds: [
          { year: '2020-21', igstTotal: 2000, igstRecv: 10, dbkTotal: 150, dbkRecv: 22, rodtepTotal: 100, rodtepRecv: 0 },
          { year: '2021-22', igstTotal: 2200, igstRecv: 15, dbkTotal: 200, dbkRecv: 10, rodtepTotal: 110, rodtepRecv: 1 },
          { year: '2022-23', igstTotal: 2500, igstRecv: 10, dbkTotal: 220, dbkRecv: 1, rodtepTotal: 115, rodtepRecv: 1 },
          { year: '2024-25', igstTotal: 2550, igstRecv: 30, dbkTotal: 230, dbkRecv: 30, rodtepTotal: 115, rodtepRecv: 6 },
          { year: 'Total', igstTotal: 10850, igstRecv: 476, dbkTotal: 960, dbkRecv: 105, rodtepTotal: 520, rodtepRecv: 29 }
        ]
      }
    },
    {
      id: 'material',
      title: 'Material Management',
      subtitle: 'GRN, Stock, Movement',
      icon: Archive,
      color: 'from-cyan-500 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100',
      summary: { metric1: 'Pending GRN', value1: '30 items', metric2: '>7 days', value2: '2 items 🔴', metric3: 'Mismatch', value3: '₹1 L' },
      deepDiveData: {
        pendingGRN: [
          { days: 'For 1 days', mundhwa: 10, ranjangaon: 15, total: 25 },
          { days: 'For 2-3 days', mundhwa: 1, ranjangaon: 1, total: 2 },
          { days: 'For 4-7 days', mundhwa: 0, ranjangaon: 1, total: 1 },
          { days: 'More than 7 days', mundhwa: 1, ranjangaon: 1, total: 2 },
          { days: 'Total', mundhwa: 12, ranjangaon: 18, total: 30 }
        ],
        mismatch: [
          { type: 'Mismatch numbers', mundhwa: 0, ranjangaon: 2, total: 2 },
          { type: 'Mismatch value', mundhwa: 0, ranjangaon: 100000, total: 100000 }
        ],
        partMovement: [
          { period: 'Last 1 month', count: 30, value: 300000 },
          { period: 'Last 3 month', count: 30, value: 300000 },
          { period: 'Last 6 month', count: 30, value: 300000 },
          { period: 'Last 12 month', count: 30, value: 300000 }
        ]
      }
    },
    {
      id: 'plant',
      title: 'Plant Operations',
      subtitle: 'Utilization & Efficiency',
      icon: Building,
      color: 'from-rose-500 to-rose-600',
      bgGradient: 'from-rose-50 to-rose-100',
      summary: { metric1: 'Avg Util', value1: '46%', metric2: 'Rejection', value2: '₹50 Mn/yr', metric3: 'Scrap', value3: '73%' },
      deepDiveData: {
        utilization: [
          { machine: '2500 Ton Press', mundhwa: 50, ranjangaon: 20, khed: null },
          { machine: '1500 Ton Press', mundhwa: 70, ranjangaon: 80, khed: null },
          { machine: 'Tesla line - 4 DU', mundhwa: null, ranjangaon: null, khed: 10 }
        ],
        rejection: [
          { month: 'Apr-25', mundhwa: 2500000, ranjangaon: 5000000, khed: 6000000, total: 13500000 },
          { month: 'May-25', mundhwa: 2500000, ranjangaon: 5000000, khed: 7000000, total: 14500000 },
          { month: 'Jun-25', mundhwa: 2500000, ranjangaon: 5000000, khed: 5000000, total: 12500000 }
        ],
        scrap: [
          { month: 'Apr-25', mundhwa: 95, ranjangaon: 100, khed: 50 },
          { month: 'May-25', mundhwa: 80, ranjangaon: 90, khed: 60 }
        ]
      }
    },
    {
      id: 'consumption',
      title: 'Material Consumption',
      subtitle: 'Die-wise Variance',
      icon: Percent,
      color: 'from-violet-500 to-violet-600',
      bgGradient: 'from-violet-50 to-violet-100',
      summary: { metric1: 'Die #12345', value1: '-5%', metric2: 'Die #25600', value2: '+3%', metric3: 'Variance', value3: '>2%' },
      deepDiveData: {
        materialChange: [
          { dieNumber: 12345, mundhwa: -5.00, ranjangaon: -4.50 },
          { dieNumber: 25600, mundhwa: 3.00, ranjangaon: 2.40 },
          { dieNumber: 21456, mundhwa: 0, ranjangaon: 0 }
        ]
      }
    },
    {
      id: 'dispatch',
      title: 'Dispatch Discipline',
      subtitle: 'On-time Performance',
      icon: Truck,
      color: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      summary: { metric1: 'Post 5 PM', value1: '10-20%', metric2: 'Delays', value2: '15-30%', metric3: 'Cancel', value3: '45 cases' },
      deepDiveData: {
        dispatch: [
          { metric: 'Post 5 pm', mundhwa: 10, ranjangaon: 5, khed: 20 },
          { metric: 'Delay in PGI and invoice time beyond 24 hrs', mundhwa: 20, ranjangaon: 30, khed: 15 },
          { metric: 'Delay in invoice and e invoice time beyond 24 hrs', mundhwa: 20, ranjangaon: 30, khed: 15 },
          { metric: 'Delay in e invoice and e-way bill time beyond 24 hrs', mundhwa: 20, ranjangaon: 30, khed: 15 },
          { metric: 'Cancellation of invoice', mundhwa: 10, ranjangaon: 15, khed: 20 }
        ]
      }
    }
  ];

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { type: 'user', text: chatInput }]);
    const msg = chatInput.toLowerCase();
    setChatInput('');

    setTimeout(() => {
      let response = '';
      if (msg.includes('sales') || msg.includes('revenue')) response = '📊 Total Sales: ₹1,892 Mn. Auto: ₹1,367 Mn, Gear: ₹480 Mn, GB&DC: ₹45 Mn. Export: ₹689 Mn (+6.3%)';
      else if (msg.includes('cwip') || msg.includes('ageing')) response = '⚠️ CRITICAL: ₹200 Cr CWIP aged >12 months! Advances: ₹30 L (₹20L >12M). Sub-con: ₹222 Cr.';
      else if (msg.includes('gst')) response = 'GST Net: ₹-10 Lakhs payable. CGST: ₹-10L, SGST: ₹0, IGST: ₹0. Total ITC: ₹250L';
      else if (msg.includes('refund')) response = 'Pending Refunds: IGST ₹476L, DBK ₹105L, RODTEP ₹29L. Total: ₹610 Lakhs';
      else if (msg.includes('grn') || msg.includes('material')) response = 'Pending GRN: 30 items (Mundhwa: 12, Ranjangaon: 18). 2 items >7 days ⚠️. Mismatch value: ₹1L';
      else if (msg.includes('plant') || msg.includes('utilization')) response = 'Plant Utilization - Mundhwa: 50-70%, Ranjangaon: 20-80% (2500T critical at 20% 🔴), Khed: 10%';
      else if (msg.includes('dispatch')) response = 'Dispatch Issues: Post 5PM (10-20%), Invoice delays (15-30%), Cancellations: 45 cases';
      else if (msg.includes('fx') || msg.includes('forward')) response = 'FX Forwards: USD 36Mn, Euro 36Mn. Current loss: ₹6 Mn. Spot rate: USD ₹90, Euro ₹105';
      else response = 'I can help with: Sales, FI Ageing, GST, Refunds, Material/GRN, Plant, Dispatch, FX, Customers. What would you like to know?';
      
      setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 800);
  };

  const DeepDiveModal = ({ module, onClose }) => {
    if (!module) return null;

    const renderDeepDive = () => {
      switch (module.id) {
        case 'fi':
          return (
            <div className="space-y-4">
              {/* Ageing of Advances */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-orange-600 text-white px-4 py-2 font-semibold text-sm">Ageing of Advances</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Category</th>
                        <th className="px-3 py-2 text-center">1 month</th>
                        <th className="px-3 py-2 text-center">3 month</th>
                        <th className="px-3 py-2 text-center">6 month</th>
                        <th className="px-3 py-2 text-center">12 month</th>
                        <th className="px-3 py-2 text-center">&gt;12 month</th>
                        <th className="px-3 py-2 text-center bg-blue-50 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.ageingAdvances.map((row, idx) => (
                        <tr key={idx} className={`border-b ${row.category === 'Total' ? 'bg-green-50 font-semibold' : 'hover:bg-gray-50'}`}>
                          <td className="px-3 py-2">{row.category}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['1m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['3m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['6m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['12m'])}</td>
                          <td className="px-3 py-2 text-center text-red-600 font-semibold">{formatCurrency(row['>12m'])}</td>
                          <td className="px-3 py-2 text-center bg-blue-50 font-bold">{formatCurrency(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ageing of CWIP */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-purple-600 text-white px-4 py-2 font-semibold text-sm">Ageing of CWIP / Asset</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Category</th>
                        <th className="px-3 py-2 text-center">1 month</th>
                        <th className="px-3 py-2 text-center">3 month</th>
                        <th className="px-3 py-2 text-center">6 month</th>
                        <th className="px-3 py-2 text-center">12 month</th>
                        <th className="px-3 py-2 text-center">&gt;12 month</th>
                        <th className="px-3 py-2 text-center bg-blue-50 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.ageingCWIP.map((row, idx) => (
                        <tr key={idx} className={`border-b ${row.category === 'Total' ? 'bg-green-50 font-semibold' : 'hover:bg-gray-50'}`}>
                          <td className="px-3 py-2">{row.category}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['1m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['3m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['6m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['12m'])}</td>
                          <td className="px-3 py-2 text-center text-red-600 font-bold">{formatCurrency(row['>12m'])}</td>
                          <td className="px-3 py-2 text-center bg-blue-50 font-bold">{formatCurrency(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-con Challan */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-teal-600 text-white px-4 py-2 font-semibold text-sm">Open Sub-con Challan / Vendor name - Material</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Vendor</th>
                        <th className="px-3 py-2 text-center">3 month</th>
                        <th className="px-3 py-2 text-center">6 month</th>
                        <th className="px-3 py-2 text-center">12 month</th>
                        <th className="px-3 py-2 text-center">&gt;12 month</th>
                        <th className="px-3 py-2 text-center bg-blue-50 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.subconChallan.map((row, idx) => (
                        <tr key={idx} className={`border-b ${row.vendor === 'Total' ? 'bg-green-50 font-semibold' : 'hover:bg-gray-50'}`}>
                          <td className="px-3 py-2">{row.vendor}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['3m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['6m'])}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row['12m'])}</td>
                          <td className="px-3 py-2 text-center text-red-600 font-bold">{formatCurrency(row['>12m'])}</td>
                          <td className="px-3 py-2 text-center bg-blue-50 font-bold">{formatCurrency(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'sales':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Filters: Customer, country, PY to CY FTM and YTD</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-purple-600 text-white px-4 py-2 font-semibold text-sm">FTM Oct 25 (Rs. Mio.)</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left" rowSpan="2">Particulars</th>
                        <th className="px-3 py-2 text-center" colSpan="2">Auto</th>
                        <th className="px-3 py-2 text-center" colSpan="2">Gear</th>
                        <th className="px-3 py-2 text-center" colSpan="2">GB & DC</th>
                        <th className="px-3 py-2 text-center bg-blue-50" colSpan="2">Total-KTFL</th>
                      </tr>
                      <tr>
                        <th className="px-3 py-1.5 text-center text-gray-600">Plan</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Actuals</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Plan</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Actuals</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Plan</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Actuals</th>
                        <th className="px-3 py-1.5 text-center bg-blue-50 text-gray-600">Plan</th>
                        <th className="px-3 py-1.5 text-center bg-blue-50 text-gray-600">Actuals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium">Export (INR Mn / US$ Mn)</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.auto.exportUSD.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.auto.exportUSD.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gear.exportUSD.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.gear.exportUSD.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gbdc.exportUSD.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.gbdc.exportUSD.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-blue-50">{(module.deepDiveData.ftm.auto.exportUSD.plan + module.deepDiveData.ftm.gear.exportUSD.plan + module.deepDiveData.ftm.gbdc.exportUSD.plan).toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-blue-50 font-semibold">{(module.deepDiveData.ftm.auto.exportUSD.actual + module.deepDiveData.ftm.gear.exportUSD.actual + module.deepDiveData.ftm.gbdc.exportUSD.actual).toFixed(2)}</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium">Export (INR Mn / Euro Mn)</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.auto.exportEuro.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.auto.exportEuro.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gear.exportEuro.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.gear.exportEuro.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gbdc.exportEuro.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.gbdc.exportEuro.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-blue-50">{(module.deepDiveData.ftm.auto.exportEuro.plan + module.deepDiveData.ftm.gear.exportEuro.plan + module.deepDiveData.ftm.gbdc.exportEuro.plan).toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-blue-50 font-semibold">{(module.deepDiveData.ftm.auto.exportEuro.actual + module.deepDiveData.ftm.gear.exportEuro.actual + module.deepDiveData.ftm.gbdc.exportEuro.actual).toFixed(2)}</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium">Domestic Income</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.auto.domestic.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.auto.domestic.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gear.domestic.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.gear.domestic.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gbdc.domestic.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center font-semibold">{module.deepDiveData.ftm.gbdc.domestic.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-blue-50">{(module.deepDiveData.ftm.auto.domestic.plan + module.deepDiveData.ftm.gear.domestic.plan + module.deepDiveData.ftm.gbdc.domestic.plan).toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-blue-50 font-semibold">{(module.deepDiveData.ftm.auto.domestic.actual + module.deepDiveData.ftm.gear.domestic.actual + module.deepDiveData.ftm.gbdc.domestic.actual).toFixed(2)}</td>
                      </tr>
                      <tr className="bg-green-50 font-bold">
                        <td className="px-3 py-2">Total</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.auto.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.auto.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gear.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gear.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gbdc.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{module.deepDiveData.ftm.gbdc.actual.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-green-100">{module.deepDiveData.ftm.total.plan.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center bg-green-100">{module.deepDiveData.ftm.total.actual.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'customers':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm text-gray-600">Filter for monthly, YTD comparison | Filter for Domestic, exports & Auto, Gear, and GBDC</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-pink-600 text-white px-4 py-2 font-semibold text-sm">Sales by Customer (Rs. Mio.)</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Customer name</th>
                        <th className="px-3 py-2 text-center">Bud Oct 25</th>
                        <th className="px-3 py-2 text-center">Act Oct 25</th>
                        <th className="px-3 py-2 text-center">Delta</th>
                        <th className="px-3 py-2 text-center">Bud YTD Oct</th>
                        <th className="px-3 py-2 text-center">Act Oct 25</th>
                        <th className="px-3 py-2 text-center">Delta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.customers.map((cust, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{cust.name}</td>
                          <td className="px-3 py-2 text-center">{cust.budOct}</td>
                          <td className="px-3 py-2 text-center font-semibold">{cust.actOct}</td>
                          <td className={`px-3 py-2 text-center font-semibold ${cust.delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>{cust.delta}</td>
                          <td className="px-3 py-2 text-center">{cust.budYTD}</td>
                          <td className="px-3 py-2 text-center font-semibold">{cust.actYTD}</td>
                          <td className={`px-3 py-2 text-center font-semibold ${cust.deltaYTD >= 0 ? 'text-green-600' : 'text-red-600'}`}>{cust.deltaYTD}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'fx':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-teal-600 text-white px-4 py-2 font-semibold text-sm">Spot Rate Rs 90 / USD</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left"></th>
                        <th className="px-3 py-2 text-center">Oct-25</th>
                        <th className="px-3 py-2 text-center">Nov-25</th>
                        <th className="px-3 py-2 text-center">Dec-25</th>
                        <th className="px-3 py-2 text-center">Jan-26</th>
                        <th className="px-3 py-2 text-center bg-blue-50">2025-26</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.usdForward.map((row, idx) => {
                        if (idx < 4) {
                          return (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                              <td className="px-3 py-2 font-medium">{idx === 0 ? 'Forward contract Mio. USD' : idx === 1 ? 'Forward contract Rate' : 'Forward contract loss'}</td>
                              <td className="px-3 py-2 text-center">{row.contract !== undefined ? row.contract.toFixed(2) : row.rate !== undefined ? row.rate.toFixed(2) : row.loss.toFixed(2)}</td>
                              <td className="px-3 py-2 text-center">{module.deepDiveData.usdForward[idx+4]?.contract !== undefined ? module.deepDiveData.usdForward[idx+4].contract.toFixed(2) : ''}</td>
                              <td className="px-3 py-2 text-center"></td>
                              <td className="px-3 py-2 text-center"></td>
                              <td className="px-3 py-2 text-center bg-blue-50 font-semibold"></td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-teal-700 text-white px-4 py-2 font-semibold text-sm">Spot Rate Rs 105 / Euro</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left"></th>
                        <th className="px-3 py-2 text-center">Oct-25</th>
                        <th className="px-3 py-2 text-center">Nov-25</th>
                        <th className="px-3 py-2 text-center">Dec-25</th>
                        <th className="px-3 py-2 text-center">Jan-26</th>
                        <th className="px-3 py-2 text-center bg-blue-50">2025-26</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="px-3 py-2 font-medium">Forward contract Mio. Euro</td><td className="px-3 py-2 text-center">5.00</td><td className="px-3 py-2 text-center">5.00</td><td className="px-3 py-2 text-center">6.00</td><td className="px-3 py-2 text-center">6.00</td><td className="px-3 py-2 text-center bg-blue-50 font-semibold">36.00</td></tr>
                      <tr className="border-b"><td className="px-3 py-2 font-medium">Forward contract Rate</td><td className="px-3 py-2 text-center">104.00</td><td className="px-3 py-2 text-center">105.00</td><td className="px-3 py-2 text-center">105.10</td><td className="px-3 py-2 text-center">105.20</td><td className="px-3 py-2 text-center bg-blue-50"></td></tr>
                      <tr className="border-b"><td className="px-3 py-2 font-medium">Forward contract loss</td><td className="px-3 py-2 text-center text-red-600">-5.00</td><td className="px-3 py-2 text-center">-</td><td className="px-3 py-2 text-center">0.60</td><td className="px-3 py-2 text-center">1.20</td><td className="px-3 py-2 text-center bg-blue-50 font-semibold">1.70</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'gst':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm text-gray-600">Filter for month / Year, different GST and company</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-yellow-600 text-white px-4 py-2 font-semibold text-sm">FTM Oct 25</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left"></th>
                        <th className="px-3 py-2 text-center">CGST</th>
                        <th className="px-3 py-2 text-center">SGST</th>
                        <th className="px-3 py-2 text-center">IGST</th>
                        <th className="px-3 py-2 text-center bg-blue-50 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.gstBalance.map((row, idx) => {
                        if (idx < 4) {
                          const labels = ['Opening balance', 'ITC', 'GST Liability', 'RCM GST'];
                          const values = idx === 0 ? [row.opening, module.deepDiveData.gstBalance[1].opening, module.deepDiveData.gstBalance[2].opening, module.deepDiveData.gstBalance[3].opening] :
                                        idx === 1 ? [row.itc, module.deepDiveData.gstBalance[1].itc, module.deepDiveData.gstBalance[2].itc, module.deepDiveData.gstBalance[3].itc] :
                                        idx === 2 ? [row.liability, module.deepDiveData.gstBalance[1].liability, module.deepDiveData.gstBalance[2].liability, module.deepDiveData.gstBalance[3].liability] :
                                        [row.rcm, module.deepDiveData.gstBalance[1].rcm, module.deepDiveData.gstBalance[2].rcm, module.deepDiveData.gstBalance[3].rcm];
                          return null;
                        }
                        return null;
                      })}
                      <tr className="border-b"><td className="px-3 py-2 font-medium">Opening balance</td><td className="px-3 py-2 text-center">40.00</td><td className="px-3 py-2 text-center">50.00</td><td className="px-3 py-2 text-center">60.00</td><td className="px-3 py-2 text-center bg-blue-50 font-semibold">150.00</td></tr>
                      <tr className="border-b"><td className="px-3 py-2 font-medium">ITC</td><td className="px-3 py-2 text-center text-green-600">25.00</td><td className="px-3 py-2 text-center text-green-600">25.00</td><td className="px-3 py-2 text-center text-green-600">200.00</td><td className="px-3 py-2 text-center bg-blue-50 font-semibold text-green-600">250.00</td></tr>
                      <tr className="border-b"><td className="px-3 py-2 font-medium">GST Liability</td><td className="px-3 py-2 text-center text-red-600">-70.00</td><td className="px-3 py-2 text-center text-red-600">-70.00</td><td className="px-3 py-2 text-center text-red-600">-240.00</td><td className="px-3 py-2 text-center bg-blue-50 font-semibold text-red-600">-380.00</td></tr>
                      <tr className="border-b"><td className="px-3 py-2 font-medium">RCM GST</td><td className="px-3 py-2 text-center text-red-600">-5.00</td><td className="px-3 py-2 text-center text-red-600">-5.00</td><td className="px-3 py-2 text-center text-red-600">-20.00</td><td className="px-3 py-2 text-center bg-blue-50 font-semibold text-red-600">-30.00</td></tr>
                      <tr className="bg-green-50 font-bold"><td className="px-3 py-2">Net Balance</td><td className="px-3 py-2 text-center text-red-600">-10.00</td><td className="px-3 py-2 text-center">-</td><td className="px-3 py-2 text-center">-</td><td className="px-3 py-2 text-center bg-green-100 text-red-600">-10.00</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'refunds':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm text-gray-600">Filter for year / All</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-indigo-600 text-white px-4 py-2 font-semibold text-sm">Refunds Rs. Mio.</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Year / Month</th>
                        <th className="px-3 py-2 text-center" colSpan="2">IGST</th>
                        <th className="px-3 py-2 text-center" colSpan="2">DBK</th>
                        <th className="px-3 py-2 text-center" colSpan="2">RODTEP</th>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-1.5 text-left"></th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Total refund</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Receivable</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Total refund</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Receivable</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Total refund</th>
                        <th className="px-3 py-1.5 text-center text-gray-600">Receivable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.refunds.map((row, idx) => (
                        <tr key={idx} className={`border-b ${row.year === 'Total' ? 'bg-green-50 font-bold' : 'hover:bg-gray-50'}`}>
                          <td className="px-3 py-2 font-medium">{row.year}</td>
                          <td className="px-3 py-2 text-center">{row.igstTotal.toFixed(2)}</td>
                          <td className="px-3 py-2 text-center text-orange-600 font-semibold">{row.igstRecv.toFixed(2)}</td>
                          <td className="px-3 py-2 text-center">{row.dbkTotal.toFixed(2)}</td>
                          <td className="px-3 py-2 text-center text-orange-600 font-semibold">{row.dbkRecv.toFixed(2)}</td>
                          <td className="px-3 py-2 text-center">{row.rodtepTotal.toFixed(2)}</td>
                          <td className="px-3 py-2 text-center text-orange-600 font-semibold">{row.rodtepRecv.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'material':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-cyan-600 text-white px-4 py-2 font-semibold text-sm">Pending GRN / Plant</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left"></th>
                        <th className="px-3 py-2 text-center">Mundhwa</th>
                        <th className="px-3 py-2 text-center">Ranjangaon</th>
                        <th className="px-3 py-2 text-center bg-blue-50 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.pendingGRN.map((row, idx) => (
                        <tr key={idx} className={`border-b ${row.days === 'Total' ? 'bg-green-50 font-bold' : row.days === 'More than 7 days' ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                          <td className="px-3 py-2 font-medium">{row.days}</td>
                          <td className="px-3 py-2 text-center">{row.mundhwa}</td>
                          <td className="px-3 py-2 text-center">{row.ranjangaon}</td>
                          <td className="px-3 py-2 text-center bg-blue-50 font-semibold">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-cyan-700 text-white px-4 py-2 font-semibold text-sm">101 and 561 recon</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <tbody>
                      {module.deepDiveData.mismatch.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{row.type}</td>
                          <td className="px-3 py-2 text-center">{row.mundhwa}</td>
                          <td className="px-3 py-2 text-center">{row.ranjangaon}</td>
                          <td className="px-3 py-2 text-center bg-blue-50 font-semibold">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-cyan-800 text-white px-4 py-2 font-semibold text-sm">Part movement</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Period</th>
                        <th className="px-3 py-2 text-center">Parts Count</th>
                        <th className="px-3 py-2 text-center">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.partMovement.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">No movement of parts in {row.period}</td>
                          <td className="px-3 py-2 text-center">{row.count}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'plant':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-rose-600 text-white px-4 py-2 font-semibold text-sm">Utilization of machines</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Machine</th>
                        <th className="px-3 py-2 text-center">Mundhwa</th>
                        <th className="px-3 py-2 text-center">Ranjangaon</th>
                        <th className="px-3 py-2 text-center">Khed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.utilization.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{row.machine}</td>
                          <td className="px-3 py-2 text-center">
                            {row.mundhwa !== null ? (
                              <span className={`font-semibold ${row.mundhwa < 30 ? 'text-red-600' : row.mundhwa < 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {row.mundhwa}%
                              </span>
                            ) : '-'}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {row.ranjangaon !== null ? (
                              <span className={`font-semibold ${row.ranjangaon < 30 ? 'text-red-600' : row.ranjangaon < 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {row.ranjangaon}%
                              </span>
                            ) : '-'}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {row.khed !== null ? (
                              <span className={`font-semibold ${row.khed < 30 ? 'text-red-600' : row.khed < 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {row.khed}%
                              </span>
                            ) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-rose-700 text-white px-4 py-2 font-semibold text-sm">Rejection</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Month</th>
                        <th className="px-3 py-2 text-center">Mundhwa</th>
                        <th className="px-3 py-2 text-center">Ranjangaon</th>
                        <th className="px-3 py-2 text-center">Khed</th>
                        <th className="px-3 py-2 text-center bg-blue-50 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.rejection.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{row.month}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row.mundhwa)}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row.ranjangaon)}</td>
                          <td className="px-3 py-2 text-center">{formatCurrency(row.khed)}</td>
                          <td className="px-3 py-2 text-center bg-blue-50 font-semibold">{formatCurrency(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'consumption':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm text-gray-600">Filter for two random month comparison</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-violet-600 text-white px-4 py-2 font-semibold text-sm">Material % change by more than 2% than previous month / Die number</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Die Number</th>
                        <th className="px-3 py-2 text-center">Mundhwa</th>
                        <th className="px-3 py-2 text-center">Ranjangaon</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.materialChange.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{row.dieNumber}</td>
                          <td className={`px-3 py-2 text-center font-semibold ${row.mundhwa < 0 ? 'text-red-600' : row.mundhwa > 0 ? 'text-green-600' : ''}`}>
                            {row.mundhwa !== 0 ? `${row.mundhwa.toFixed(2)}%` : ''}
                          </td>
                          <td className={`px-3 py-2 text-center font-semibold ${row.ranjangaon < 0 ? 'text-red-600' : row.ranjangaon > 0 ? 'text-green-600' : ''}`}>
                            {row.ranjangaon !== 0 ? `${row.ranjangaon.toFixed(2)}%` : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case 'dispatch':
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-emerald-600 text-white px-4 py-2 font-semibold text-sm">Dispatch discipline</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Metric</th>
                        <th className="px-3 py-2 text-center">Mundhwa</th>
                        <th className="px-3 py-2 text-center">Ranjangaon</th>
                        <th className="px-3 py-2 text-center">Khed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.deepDiveData.dispatch.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-xs">{row.metric}</td>
                          <td className="px-3 py-2 text-center">
                            {row.metric === 'Cancellation of invoice' ? row.mundhwa : `${row.mundhwa}%`}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {row.metric === 'Cancellation of invoice' ? row.ranjangaon : `${row.ranjangaon}%`}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {row.metric === 'Cancellation of invoice' ? row.khed : `${row.khed}%`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        default:
          return <div className="text-center text-gray-600 py-8">Deep dive content for {module.title}</div>;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className={`bg-gradient-to-r ${module.color} text-white px-6 py-4 rounded-t-xl flex justify-between items-center sticky top-0 z-10`}>
            <div className="flex items-center">
              {React.createElement(module.icon, { size: 28, className: 'mr-3' })}
              <div>
                <h3 className="text-2xl font-bold">{module.title}</h3>
                <p className="text-sm opacity-90">{module.subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {renderDeepDive()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
        <div className="max-w-[1920px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <IndianRupee className="mr-2" size={28} />
                Ultimate Finance Dashboard
              </h1>
              <p className="text-xs text-blue-100">11 Modules • All Excel Data • Single Screen • Interactive Deep Dive</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Live
              </div>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded text-xs flex items-center gap-1">
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-4 py-3">
        <div className="grid grid-cols-12 gap-3">
          {/* Main Content - 11 Module Cards (9 columns) */}
          <div className="col-span-9">
            <div className="grid grid-cols-4 gap-3">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className={`bg-gradient-to-br ${module.bgGradient} rounded-xl p-3 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl border-2 border-white`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`bg-gradient-to-br ${module.color} p-2 rounded-lg shadow-md`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-800 mb-1">{module.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{module.subtitle}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">{module.summary.metric1}:</span>
                        <span className="font-semibold text-gray-800">{module.summary.value1}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">{module.summary.metric2}:</span>
                        <span className="font-semibold text-gray-800">{module.summary.value2}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">{module.summary.metric3}:</span>
                        <span className="font-semibold text-gray-800">{module.summary.value3}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar - AI Chatbot (3 columns) */}
          <div className="col-span-3">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-xl h-full flex flex-col">
              <div className="p-3 border-b border-white border-opacity-20">
                <div className="flex items-center">
                  <MessageSquare className="text-white mr-2" size={20} />
                  <h3 className="text-white font-bold text-sm">AI Assistant</h3>
                </div>
                <p className="text-xs text-white text-opacity-80 mt-1">Ask about any module!</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-lg text-xs ${msg.type === 'user' ? 'bg-white text-gray-800' : 'bg-white bg-opacity-20 text-white'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-white border-opacity-20">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about MIS, Sales, FI, GST..."
                    className="flex-1 px-3 py-2 border border-white border-opacity-30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-60"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-white bg-opacity-30 hover:bg-opacity-40 text-white p-2 rounded-lg transition"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedModule && <DeepDiveModal module={selectedModule} onClose={() => setSelectedModule(null)} />}
    </div>
  );
};

export default UltimateFinanceDashboard;