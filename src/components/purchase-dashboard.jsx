import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar, PolarGrid, 
         PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
         ResponsiveContainer, Cell } from 'recharts';

// Theme Configuration
const themes = {
  dark: {
    bg: 'linear-gradient(135deg, #0a1628 0%, #1a2942 100%)',
    cardBg: 'rgba(15, 23, 42, 0.8)',
    headerBg: 'linear-gradient(90deg, rgba(10, 37, 64, 0.95) 0%, rgba(30, 90, 168, 0.95) 100%)',
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
    border: 'rgba(0, 212, 255, 0.2)',
    borderHover: '#00d4ff',
    accent: '#00d4ff',
    primary: '#1e5aa8',
    chartColors: ['#00d4ff', '#1e5aa8', '#64748b', '#f59e0b'],
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  light: {
    bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    headerBg: 'linear-gradient(90deg, #1e5aa8 0%, #0ea5e9 100%)',
    text: '#0f172a',
    textSecondary: '#475569',
    border: 'rgba(30, 90, 168, 0.2)',
    borderHover: '#0ea5e9',
    accent: '#0ea5e9',
    primary: '#1e5aa8',
    chartColors: ['#0ea5e9', '#1e5aa8', '#64748b', '#f59e0b'],
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  }
};

// Dashboard Data
const dashboardData = {
  rm: {
    target: 100,
    achieved: 80,
    aluminiumPrices: [
      { quarter: 'Q1', india: 2400, usa: 2600 },
      { quarter: 'Q2', india: 2550, usa: 2700 },
      { quarter: 'Q3', india: 2600, usa: 2750 },
      { quarter: 'Q4', india: 2500, usa: 2650 },
    ]
  },
  packaging: {
    monthly: [
      { period: 'Apr', plan: 12, actual: 11.8 },
      { period: 'May', plan: 12.5, actual: 12.7 },
      { period: 'Jun', plan: 13, actual: 12.6 },
      { period: 'Jul', plan: 13.2, actual: 13.5 },
    ],
    weekly: [
      { period: 'W1', plan: 3.2, actual: 3.0 },
      { period: 'W2', plan: 3.1, actual: 3.4 },
      { period: 'W3', plan: 3.3, actual: 3.1 },
      { period: 'W4', plan: 3.4, actual: 3.6 },
    ]
  },
  subcon: {
    cost: [
      { category: 'Budget', value: 200 },
      { category: 'Actual', value: 215 },
    ],
    npd: [
      { stage: 'RFQ', count: 12 },
      { stage: 'Dev', count: 8 },
      { stage: 'PPAP', count: 5 },
      { stage: 'SOP', count: 3 },
    ]
  },
  exim: {
    costs: [
      { category: 'Freight', value: 45 },
      { category: 'Duty', value: 30 },
      { category: 'CHA', value: 15 },
      { category: 'WH', value: 10 },
    ],
    marketing: { budget: 50, actual: 58 }
  },
  stores: {
    inventoryTarget: 98,
    inventoryActual: 96,
    audits: [
      { subcon: 'Vendor A', planned: 4, done: 4, completion: 100, findings: 2, actions: 2, status: 'Complete' },
      { subcon: 'Vendor B', planned: 3, done: 2, completion: 67, findings: 1, actions: 0, status: 'In Progress' }
    ]
  },
  capex: {
    budget: [
      { category: 'Approved', value: 120 },
      { category: 'Utilized', value: 95 },
    ],
    projects: [
      { status: 'On Track', count: 8 },
      { status: 'Delayed', count: 2 },
    ]
  },
  feedback: [
    { metric: 'Cost', score: 4.2, fullMark: 5 },
    { metric: 'Service', score: 4.0, fullMark: 5 },
    { metric: 'Quality', score: 4.3, fullMark: 5 },
    { metric: 'Delivery', score: 3.9, fullMark: 5 },
  ]
};

// Header Component
const Header = ({ theme, toggleTheme }) => {
  const currentTheme = themes[theme];
  
  return (
    <header style={{
      background: currentTheme.headerBg,
      backdropFilter: 'blur(10px)',
      borderBottom: `2px solid ${currentTheme.accent}`,
      boxShadow: `0 4px 20px ${theme === 'dark' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(14, 165, 233, 0.2)'}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 2rem',
      }}>
        <div>
          <svg width="150" height="45" viewBox="0 0 200 50">
            <text x="10" y="35" fontFamily="'Orbitron', sans-serif" fontSize="24" fontWeight="bold" fill={currentTheme.accent}>
              KALYANI
            </text>
          </svg>
        </div>
        
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            fontFamily: "'Orbitron', sans-serif",
            textShadow: `0 0 20px ${theme === 'dark' ? 'rgba(0, 212, 255, 0.5)' : 'rgba(14, 165, 233, 0.5)'}`,
            letterSpacing: '1px',
          }}>
            Purchase Dashboard
          </h1>
        </div>
        
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.85rem',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          
          <a href="#summary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 0.8rem',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.85rem',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
            <span>Summary</span>
          </a>
          
          <a href="#home" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 0.8rem',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.85rem',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 11L12 3l9 8M9 21V9h6v12M21 21H3"></path>
            </svg>
            <span>Home</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

// Footer Component
const Footer = ({ theme }) => {
  const currentTheme = themes[theme];
  
  return (
    <footer style={{
      background: currentTheme.headerBg,
      borderTop: `2px solid ${currentTheme.accent}`,
      padding: '1rem 2rem',
      marginTop: '2rem',
      boxShadow: `0 -4px 20px ${theme === 'dark' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(14, 165, 233, 0.2)'}`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <svg width="35" height="35" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke={currentTheme.accent} strokeWidth="2"/>
            <path d="M15 25 L25 15 L35 25 L25 35 Z" fill={currentTheme.accent}/>
          </svg>
          <span style={{ color: currentTheme.accent, fontWeight: '600', fontSize: '0.9rem' }}>
            AI Driven Manufacturing
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>© 2025 Purchase Dashboard System</span>
          <span style={{ color: '#64748b', margin: '0 0.5rem' }}>|</span>
          <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>v1.0.0</span>
        </div>
        
        <div>
          <svg width="60" height="35" viewBox="0 0 80 50">
            <text x="5" y="30" fontFamily="'Orbitron', sans-serif" fontSize="20" fontWeight="bold" fill={currentTheme.accent}>
              KTFL
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
};

// Dashboard Card Component
const DashboardCard = ({ title, children, theme, span = 4 }) => {
  const currentTheme = themes[theme];
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        background: currentTheme.cardBg,
        borderRadius: '12px',
        padding: '1.25rem',
        border: `1px solid ${isHovered ? currentTheme.borderHover : currentTheme.border}`,
        boxShadow: isHovered 
          ? `0 8px 25px ${theme === 'dark' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(14, 165, 233, 0.3)'}`
          : `0 4px 15px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: currentTheme.accent,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: "'Orbitron', sans-serif",
      }}>
        {title}
      </div>
      {children}
    </div>
  );
};

// AI Chatbot Component
const AIChatbot = ({ theme }) => {
  const currentTheme = themes[theme];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hello! I'm your AI assistant. Ask me anything about the Purchase Dashboard data." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('rm') || q.includes('raw material') || q.includes('cost saving')) {
      return `Raw Material Analysis: Target was ₹100 Cr, achieved ₹80 Cr (80% achievement). Aluminum prices in India range from $2400-2600/MT while USA prices are $2600-2750/MT.`;
    } else if (q.includes('packaging') || q.includes('packing')) {
      return `Packaging costs: July actual (₹13.5 Cr) exceeded plan (₹13.2 Cr) by 2.3%. Weekly variance shows W4 had highest overrun at ₹3.6 Cr vs plan of ₹3.4 Cr.`;
    } else if (q.includes('subcon') || q.includes('subcontract')) {
      return `Subcon costs are ₹215 Cr vs budget of ₹200 Cr (7.5% over budget). NPD pipeline: 12 RFQs, 8 in Development, 5 in PPAP, 3 in SOP stage.`;
    } else if (q.includes('exim') || q.includes('logistics')) {
      return `EXIM costs breakdown: Freight ₹45 Cr, Duty ₹30 Cr, CHA ₹15 Cr, Warehouse ₹10 Cr. Marketing costs at ₹58 Cr vs budget ₹50 Cr (16% over).`;
    } else if (q.includes('inventory') || q.includes('stores')) {
      return `Inventory accuracy is 96% vs target of 98%. Vendor A completed all 4 audits (100%) with 2 findings. Vendor B completed 2/3 audits (67%) with 1 finding pending action.`;
    } else if (q.includes('capex') || q.includes('capital')) {
      return `Capex utilization: ₹95 Cr utilized out of ₹120 Cr approved (79.2%). Projects: 8 on track, 2 delayed. Overall good progress with some attention needed on delayed projects.`;
    } else if (q.includes('feedback') || q.includes('customer')) {
      return `Internal customer feedback scores: Quality leads at 4.3/5, Cost 4.2/5, Service 4.0/5, Delivery needs improvement at 3.9/5. Focus recommended on delivery performance.`;
    } else if (q.includes('theme')) {
      return `You can toggle between light and dark themes using the theme button in the header. The ${theme} theme is currently active.`;
    } else if (q.includes('summary') || q.includes('overview')) {
      return `Dashboard Overview: RM 80% achieved, Subcon 7.5% over budget, EXIM marketing 16% over, Inventory at 96%, Capex 79% utilized. Key concern: Delivery feedback at 3.9/5.`;
    } else {
      return `I can provide insights on: RM cost savings, Packaging/Consumables (Plan vs Actual), Subcon costs & NPD, EXIM logistics, Stores audits & inventory, Capex projects, and Internal customer feedback. What would you like to know?`;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(input);
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 999,
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
          border: 'none',
          cursor: 'pointer',
          boxShadow: theme === 'dark' 
            ? '0 8px 30px rgba(0, 212, 255, 0.4)'
            : '0 8px 30px rgba(14, 165, 233, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="9" cy="10" r="1.5"/>
          <circle cx="15" cy="10" r="1.5"/>
          <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '400px',
          height: '550px',
          background: theme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          borderRadius: '16px',
          border: `2px solid ${currentTheme.accent}`,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{
            padding: '1rem 1.25rem',
            background: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
            borderRadius: '14px 14px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
          }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: "'Orbitron', sans-serif" }}>
                AI Assistant
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                Purchase Dashboard Insights
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.type === 'user'
                    ? `linear-gradient(135deg, ${currentTheme.primary} 0%, #2563eb 100%)`
                    : theme === 'dark'
                    ? 'rgba(30, 90, 168, 0.2)'
                    : 'rgba(226, 232, 240, 0.8)',
                  border: msg.type === 'ai' ? `1px solid ${currentTheme.border}` : 'none',
                  color: msg.type === 'user' ? 'white' : currentTheme.text,
                  animation: 'slideIn 0.3s ease',
                }}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                maxWidth: '85%',
                alignSelf: 'flex-start',
                background: theme === 'dark' ? 'rgba(30, 90, 168, 0.2)' : 'rgba(226, 232, 240, 0.8)',
                border: `1px solid ${currentTheme.border}`,
              }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: currentTheme.accent,
                    animation: 'typing 1.4s infinite',
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: currentTheme.accent,
                    animation: 'typing 1.4s infinite 0.2s',
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: currentTheme.accent,
                    animation: 'typing 1.4s infinite 0.4s',
                  }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: '1rem',
            borderTop: `1px solid ${currentTheme.border}`,
            display: 'flex',
            gap: '0.5rem',
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about dashboard data..."
              style={{
                flex: 1,
                background: theme === 'dark' ? 'rgba(30, 90, 168, 0.2)' : 'rgba(226, 232, 240, 0.5)',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                padding: '0.75rem',
                color: currentTheme.text,
                outline: 'none',
                fontSize: '0.9rem',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                color: 'white',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const PurchaseDashboard = () => {
  const [theme, setTheme] = useState('dark');
  const [timeframe, setTimeframe] = useState('monthly');
  const [quarter, setQuarter] = useState('Q4');
  const currentTheme = themes[theme];

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const packagingData = timeframe === 'monthly' ? dashboardData.packaging.monthly : dashboardData.packaging.weekly;

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-10px); }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(226, 232, 240, 0.5)'};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${currentTheme.primary};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.accent};
        }
      `}</style>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <div style={{ maxWidth: '100vw', padding: '1.5rem', minHeight: 'calc(100vh - 180px)' }}>
        {/* Filters */}
        <div style={{
          background: currentTheme.cardBg,
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          border: `1px solid ${currentTheme.border}`,
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: currentTheme.accent, fontWeight: '600', fontSize: '0.9rem' }}>
              Timeframe:
            </span>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              style={{
                background: theme === 'dark' ? 'rgba(30, 90, 168, 0.2)' : 'rgba(226, 232, 240, 0.5)',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: currentTheme.text,
                outline: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                minWidth: '150px',
              }}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: currentTheme.accent, fontWeight: '600', fontSize: '0.9rem' }}>
              Quarter:
            </span>
            <select
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              style={{
                background: theme === 'dark' ? 'rgba(30, 90, 168, 0.2)' : 'rgba(226, 232, 240, 0.5)',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: currentTheme.text,
                outline: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                minWidth: '150px',
              }}
            >
              <option value="Q1">Q1 (Jan-Mar)</option>
              <option value="Q2">Q2 (Apr-Jun)</option>
              <option value="Q3">Q3 (Jul-Sep)</option>
              <option value="Q4">Q4 (Oct-Dec)</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: currentTheme.accent, fontWeight: '600', fontSize: '0.9rem' }}>
              Year:
            </span>
            <select
              style={{
                background: theme === 'dark' ? 'rgba(30, 90, 168, 0.2)' : 'rgba(226, 232, 240, 0.5)',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: currentTheme.text,
                outline: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                minWidth: '150px',
              }}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(12, 1fr)',
        }}>
          {/* RM Cost Savings */}
          <DashboardCard title="💎 RM Cost Savings" theme={theme} span={4}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: currentTheme.text,
                  fontFamily: "'Orbitron', sans-serif",
                }}>
                  ₹80 Cr
                </div>
                <div style={{ fontSize: '0.85rem', color: currentTheme.textSecondary, marginTop: '0.25rem' }}>
                  Achieved of ₹100 Cr Target
                </div>
                <div style={{
                  background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                  height: '8px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginTop: '0.75rem',
                }}>
                  <div style={{
                    height: '100%',
                    width: '80%',
                    background: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                    transition: 'width 1s ease',
                    boxShadow: `0 0 10px ${currentTheme.accent}`,
                  }}></div>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: currentTheme.success }}>
                  ↗ 80% Achievement Rate
                </div>
              </div>
              <div style={{ flex: 1, height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.subcon.cost.slice(0, 2).map(d => ({ ...d, value: d.category === 'Budget' ? 100 : 80 }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <XAxis dataKey="category" stroke={currentTheme.textSecondary} />
                    <YAxis stroke={currentTheme.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        background: currentTheme.cardBg, 
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '8px',
                        color: currentTheme.text
                      }} 
                    />
                    <Bar dataKey="value" fill={currentTheme.accent} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </DashboardCard>

          {/* Aluminium Prices */}
          <DashboardCard title="📊 Aluminium Price Trend (USD/MT)" theme={theme} span={4}>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.rm.aluminiumPrices}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis dataKey="quarter" stroke={currentTheme.textSecondary} />
                  <YAxis stroke={currentTheme.textSecondary} />
                  <Tooltip 
                    contentStyle={{ 
                      background: currentTheme.cardBg, 
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.text
                    }} 
                  />
                  <Legend wrapperStyle={{ color: currentTheme.textSecondary }} />
                  <Line type="monotone" dataKey="india" stroke={currentTheme.accent} strokeWidth={2} name="India" />
                  <Line type="monotone" dataKey="usa" stroke={currentTheme.warning} strokeWidth={2} name="USA" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Packaging */}
          <DashboardCard title="📦 Packaging - Plan vs Actual (₹ Cr)" theme={theme} span={4}>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={packagingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis dataKey="period" stroke={currentTheme.textSecondary} />
                  <YAxis stroke={currentTheme.textSecondary} />
                  <Tooltip 
                    contentStyle={{ 
                      background: currentTheme.cardBg, 
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.text
                    }} 
                  />
                  <Legend wrapperStyle={{ color: currentTheme.textSecondary }} />
                  <Bar dataKey="plan" fill={currentTheme.primary} name="Plan" />
                  <Bar dataKey="actual" fill={currentTheme.accent} name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Subcon Cost */}
          <DashboardCard title="⚙️ Subcon Cost" theme={theme} span={3}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: currentTheme.danger,
              fontFamily: "'Orbitron', sans-serif",
            }}>
              ₹215 Cr
            </div>
            <div style={{ fontSize: '0.85rem', color: currentTheme.textSecondary, marginTop: '0.25rem' }}>
              Budget: ₹200 Cr
            </div>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.5rem',
              background: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '6px',
              border: `1px solid ${currentTheme.danger}`,
            }}>
              <div style={{ fontSize: '0.85rem', color: currentTheme.danger }}>
                ⚠ 7.5% Over Budget
              </div>
            </div>
          </DashboardCard>

          {/* NPD Parts */}
          <DashboardCard title="🔄 NPD Parts Status" theme={theme} span={3}>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.subcon.npd}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis dataKey="stage" stroke={currentTheme.textSecondary} />
                  <YAxis stroke={currentTheme.textSecondary} />
                  <Tooltip 
                    contentStyle={{ 
                      background: currentTheme.cardBg, 
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.text
                    }} 
                  />
                  <Bar dataKey="count">
                    {dashboardData.subcon.npd.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={currentTheme.chartColors[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* EXIM Costs */}
          <DashboardCard title="🌍 EXIM Cost Breakdown (₹ Cr)" theme={theme} span={3}>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.exim.costs}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {dashboardData.exim.costs.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={currentTheme.chartColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: currentTheme.cardBg, 
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.text
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Marketing Cost */}
          <DashboardCard title="📈 Marketing Cost" theme={theme} span={3}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: currentTheme.warning,
              fontFamily: "'Orbitron', sans-serif",
            }}>
              ₹58 Cr
            </div>
            <div style={{ fontSize: '0.85rem', color: currentTheme.textSecondary, marginTop: '0.25rem' }}>
              Budget: ₹50 Cr
            </div>
            <div style={{
              background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              marginTop: '0.75rem',
            }}>
              <div style={{
                height: '100%',
                width: '116%',
                background: `linear-gradient(90deg, ${currentTheme.warning} 0%, ${currentTheme.danger} 100%)`,
                transition: 'width 1s ease',
              }}></div>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: currentTheme.warning }}>
              ↗ 16% Over Budget
            </div>
          </DashboardCard>

          {/* Inventory Accuracy */}
          <DashboardCard title="📋 Inventory Accuracy" theme={theme} span={3}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: currentTheme.text,
              fontFamily: "'Orbitron', sans-serif",
            }}>
              96%
            </div>
            <div style={{ fontSize: '0.85rem', color: currentTheme.textSecondary, marginTop: '0.25rem' }}>
              Target: 98%
            </div>
            <div style={{
              background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              marginTop: '0.75rem',
            }}>
              <div style={{
                height: '100%',
                width: '96%',
                background: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                transition: 'width 1s ease',
              }}></div>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: 'rgba(245, 158, 11, 0.2)',
                color: currentTheme.warning,
                border: `1px solid ${currentTheme.warning}`,
              }}>
                -2% Below Target
              </span>
            </div>
          </DashboardCard>

          {/* Subcon Audits */}
          <DashboardCard title="🔍 Subcon Audit Status" theme={theme} span={6}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th style={{
                    background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                    color: currentTheme.accent,
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: `2px solid ${currentTheme.accent}`,
                  }}>Subcon/Plant</th>
                  <th style={{
                    background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                    color: currentTheme.accent,
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: `2px solid ${currentTheme.accent}`,
                  }}>Planned</th>
                  <th style={{
                    background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                    color: currentTheme.accent,
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: `2px solid ${currentTheme.accent}`,
                  }}>Done</th>
                  <th style={{
                    background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                    color: currentTheme.accent,
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: `2px solid ${currentTheme.accent}`,
                  }}>% Complete</th>
                  <th style={{
                    background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                    color: currentTheme.accent,
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: `2px solid ${currentTheme.accent}`,
                  }}>Findings</th>
                  <th style={{
                    background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                    color: currentTheme.accent,
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: `2px solid ${currentTheme.accent}`,
                  }}>Actions</th>
                  <th style={{
                    background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                    color: currentTheme.accent,
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    borderBottom: `2px solid ${currentTheme.accent}`,
                  }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.stores.audits.map((audit, idx) => (
                  <tr key={idx} style={{
                    borderBottom: `1px solid ${theme === 'dark' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  }}>
                    <td style={{ padding: '0.5rem', color: currentTheme.text }}>{audit.subcon}</td>
                    <td style={{ padding: '0.5rem', color: currentTheme.text }}>{audit.planned}</td>
                    <td style={{ padding: '0.5rem', color: currentTheme.text }}>{audit.done}</td>
                    <td style={{ padding: '0.5rem', color: currentTheme.text }}>{audit.completion}%</td>
                    <td style={{ padding: '0.5rem', color: currentTheme.text }}>{audit.findings}</td>
                    <td style={{ padding: '0.5rem', color: currentTheme.text }}>{audit.actions}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: audit.status === 'Complete' 
                          ? 'rgba(16, 185, 129, 0.2)' 
                          : 'rgba(245, 158, 11, 0.2)',
                        color: audit.status === 'Complete' ? currentTheme.success : currentTheme.warning,
                        border: `1px solid ${audit.status === 'Complete' ? currentTheme.success : currentTheme.warning}`,
                      }}>
                        {audit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DashboardCard>

          {/* Capex Budget */}
          <DashboardCard title="💰 Capex Utilization" theme={theme} span={3}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: currentTheme.text,
              fontFamily: "'Orbitron', sans-serif",
            }}>
              ₹95 Cr
            </div>
            <div style={{ fontSize: '0.85rem', color: currentTheme.textSecondary, marginTop: '0.25rem' }}>
              Approved: ₹120 Cr
            </div>
            <div style={{
              background: theme === 'dark' ? 'rgba(30, 90, 168, 0.3)' : 'rgba(226, 232, 240, 0.5)',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              marginTop: '0.75rem',
            }}>
              <div style={{
                height: '100%',
                width: '79.2%',
                background: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                transition: 'width 1s ease',
              }}></div>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: currentTheme.success }}>
              ↗ 79.2% Utilized
            </div>
          </DashboardCard>

          {/* Capex Projects */}
          <DashboardCard title="🚀 Project Status" theme={theme} span={3}>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.capex.projects}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    <Cell fill={currentTheme.success} />
                    <Cell fill={currentTheme.danger} />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: currentTheme.cardBg, 
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.text
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
              <span style={{ color: currentTheme.success }}>8 On Track</span> | <span style={{ color: currentTheme.danger }}>2 Delayed</span>
            </div>
          </DashboardCard>

          {/* Customer Feedback */}
          <DashboardCard title="💬 Internal Customer Feedback" theme={theme} span={6}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ flex: 1, height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={dashboardData.feedback}>
                    <PolarGrid stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="metric" stroke={currentTheme.textSecondary} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} stroke={currentTheme.textSecondary} />
                    <Radar name="Score" dataKey="score" stroke={currentTheme.accent} fill={currentTheme.accent} fillOpacity={0.3} />
                    <Tooltip 
                      contentStyle={{ 
                        background: currentTheme.cardBg, 
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '8px',
                        color: currentTheme.text
                      }} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {dashboardData.feedback.map((item, idx) => (
                    <div key={idx} style={{
                      padding: '0.75rem',
                      background: theme === 'dark' 
                        ? `rgba(${item.score >= 4.2 ? '16, 185, 129' : item.score >= 4 ? '0, 212, 255' : '239, 68, 68'}, 0.1)`
                        : `rgba(${item.score >= 4.2 ? '16, 185, 129' : item.score >= 4 ? '14, 165, 233' : '239, 68, 68'}, 0.15)`,
                      borderRadius: '8px',
                      border: `1px solid ${item.score >= 4.2 ? currentTheme.success : item.score >= 4 ? currentTheme.accent : currentTheme.danger}`,
                    }}>
                      <div style={{ fontSize: '0.85rem', color: currentTheme.textSecondary }}>{item.metric}</div>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: item.score >= 4.2 ? currentTheme.success : item.score >= 4 ? currentTheme.accent : currentTheme.danger,
                      }}>
                        {item.score}/5
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* AI Chatbot */}
        <AIChatbot theme={theme} />
      </div>

      <Footer theme={theme} />
    </div>
  );
};

export default PurchaseDashboard;