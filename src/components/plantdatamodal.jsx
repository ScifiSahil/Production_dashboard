import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
 
export default function PlantDataModal({ onClose }) {
  const [activeView, setActiveView] = useState('graph');
  const [selectedPlant, setSelectedPlant] = useState('all');
 
  // Handle Detail button click
  const handleDetailClick = () => {
    window.location.href = 'https://ktflceprd.kalyanicorp.com/kalyani.iot/ppc-forging';
  };

  // Mixed inventory data from all plants (2 entries per plant)
  const allInventoryData = [
    { plant: 'KTFL Mundhwa', rmSapCode: 'R0201109D', customer: 'DANA', dieNo: '1449', rmGrade: 'SAE1140 - 90 DIA', rmStock: 79.04, rmValue: 50.62, wipStock: 1155, wipValue: 15.05, remark: 'Schedule dropped suddenly' },
    { plant: 'KTFL Mundhwa', rmSapCode: 'R0700305D', customer: 'DANA', dieNo: '1714', rmGrade: '42 CRMO4 - 95 DIA', rmStock: 122.76, rmValue: 18.83, wipStock: 1229, wipValue: 16.03, remark: 'Schedule dropped suddenly' },
    { plant: 'KTFL Ranajangaon 1', rmSapCode: 'R1201109D', customer: 'Cummins', dieNo: '2341', rmGrade: 'SAE4140 - 75 DIA', rmStock: 65.45, rmValue: 42.18, wipStock: 980, wipValue: 12.45, remark: 'Normal production' },
    { plant: 'KTFL Ranajangaon 1', rmSapCode: 'R1700305D', customer: 'Eaton', dieNo: '2156', rmGrade: '20MNCR5 - 65 DIA', rmStock: 88.92, rmValue: 55.67, wipStock: 1450, wipValue: 18.92, remark: 'On track' },
    { plant: 'KTFL Ranajangaon 2', rmSapCode: 'R2201109D', customer: 'Bosch', dieNo: '3125', rmGrade: 'SAE8620 - 68 DIA', rmStock: 95.23, rmValue: 62.45, wipStock: 2145, wipValue: 28.67, remark: 'High demand' },
    { plant: 'KTFL Ranajangaon 2', rmSapCode: 'R2700305D', customer: 'Continental', dieNo: '3456', rmGrade: '34CRNIMO6 - 92 DIA', rmStock: 112.67, rmValue: 74.89, wipStock: 1967, wipValue: 25.43, remark: 'Production peak' },
    { plant: 'KTFL Baramati', rmSapCode: 'R3201109D', customer: 'Ashok Leyland', dieNo: '4156', rmGrade: 'SAE1141 - 72 DIA', rmStock: 78.56, rmValue: 51.23, wipStock: 1456, wipValue: 17.89, remark: 'Normal flow' },
    { plant: 'KTFL Baramati', rmSapCode: 'R3700305D', customer: 'Bharat Forge', dieNo: '4289', rmGrade: '16MNCR5 - 58 DIA', rmStock: 82.34, rmValue: 54.67, wipStock: 1589, wipValue: 20.12, remark: 'Good progress' }
  ];
 
  // Filter data based on selected plant
  const inventoryData = selectedPlant === 'all'
    ? allInventoryData
    : allInventoryData.filter(item => item.plant === selectedPlant);
 
  // Calculate KPI totals based on filtered data
  const kpiTotals = {
    rmStock: inventoryData.reduce((sum, row) => sum + row.rmStock, 0),
    rmValue: inventoryData.reduce((sum, row) => sum + row.rmValue, 0),
    wipStock: inventoryData.reduce((sum, row) => sum + row.wipStock, 0),
    wipValue: inventoryData.reduce((sum, row) => sum + row.wipValue, 0)
  };
 
  const allPlantAggregateData = [
    { plant: 'Mundhwa', totalRM: 201.8, rmValue: 69.45 },
    { plant: 'R\'gaon 1', totalRM: 154.37, rmValue: 97.85 },
    { plant: 'R\'gaon 2', totalRM: 207.9, rmValue: 137.34 },
    { plant: 'Baramati', totalRM: 160.9, rmValue: 105.9 }
  ];
 
  // Month-wise distribution for each plant (RM Stock)
  const plantMonthlyData = {
    'KTFL Mundhwa': [
      { month: 'Jan', rmStock: 185.3, wipStock: 2150 },
      { month: 'Feb', rmStock: 192.8, wipStock: 2240 },
      { month: 'Mar', rmStock: 197.5, wipStock: 2320 },
      { month: 'Apr', rmStock: 201.2, wipStock: 2380 },
      { month: 'May', rmStock: 205.6, wipStock: 2420 },
      { month: 'Jun', rmStock: 201.8, wipStock: 2384 }
    ],
    'KTFL Ranajangaon 1': [
      { month: 'Jan', rmStock: 142.5, wipStock: 2250 },
      { month: 'Feb', rmStock: 146.9, wipStock: 2320 },
      { month: 'Mar', rmStock: 150.2, wipStock: 2380 },
      { month: 'Apr', rmStock: 152.8, wipStock: 2410 },
      { month: 'May', rmStock: 156.4, wipStock: 2450 },
      { month: 'Jun', rmStock: 154.37, wipStock: 2430 }
    ],
    'KTFL Ranajangaon 2': [
      { month: 'Jan', rmStock: 195.6, wipStock: 3850 },
      { month: 'Feb', rmStock: 200.3, wipStock: 3920 },
      { month: 'Mar', rmStock: 203.8, wipStock: 4010 },
      { month: 'Apr', rmStock: 206.5, wipStock: 4080 },
      { month: 'May', rmStock: 210.2, wipStock: 4150 },
      { month: 'Jun', rmStock: 207.9, wipStock: 4112 }
    ],
    'KTFL Baramati': [
      { month: 'Jan', rmStock: 152.8, wipStock: 2850 },
      { month: 'Feb', rmStock: 155.6, wipStock: 2920 },
      { month: 'Mar', rmStock: 158.2, wipStock: 2980 },
      { month: 'Apr', rmStock: 160.5, wipStock: 3020 },
      { month: 'May', rmStock: 163.8, wipStock: 3080 },
      { month: 'Jun', rmStock: 160.9, wipStock: 3045 }
    ]
  };
 
  // Get month-wise data based on selected plant
  const getMonthlyDistribution = () => {
    if (selectedPlant === 'all') {
      // For all plants, show combined RM Stock data
      return [
        { month: 'Jan', Mundhwa: 185.3, 'R\'gaon 1': 142.5, 'R\'gaon 2': 195.6, Baramati: 152.8 },
        { month: 'Feb', Mundhwa: 192.8, 'R\'gaon 1': 146.9, 'R\'gaon 2': 200.3, Baramati: 155.6 },
        { month: 'Mar', Mundhwa: 197.5, 'R\'gaon 1': 150.2, 'R\'gaon 2': 203.8, Baramati: 158.2 },
        { month: 'Apr', Mundhwa: 201.2, 'R\'gaon 1': 152.8, 'R\'gaon 2': 206.5, Baramati: 160.5 },
        { month: 'May', Mundhwa: 205.6, 'R\'gaon 1': 156.4, 'R\'gaon 2': 210.2, Baramati: 163.8 },
        { month: 'Jun', Mundhwa: 201.8, 'R\'gaon 1': 154.37, 'R\'gaon 2': 207.9, Baramati: 160.9 }
      ];
    } else {
      return plantMonthlyData[selectedPlant];
    }
  };
 
  // Filter aggregate data based on selected plant
  const plantAggregateData = selectedPlant === 'all'
    ? allPlantAggregateData
    : allPlantAggregateData.filter(item => {
        if (selectedPlant === 'KTFL Mundhwa') return item.plant === 'Mundhwa';
        if (selectedPlant === 'KTFL Ranajangaon 1') return item.plant === 'R\'gaon 1';
        if (selectedPlant === 'KTFL Ranajangaon 2') return item.plant === 'R\'gaon 2';
        if (selectedPlant === 'KTFL Baramati') return item.plant === 'Baramati';
        return true;
      });
 
  const plantComparisonData = [
    { name: 'Mundhwa', value: 69.45 },
    { name: 'R\'gaon 1', value: 97.85 },
    { name: 'R\'gaon 2', value: 137.34 },
    { name: 'Baramati', value: 105.9 }
  ];
 
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
 
  // Ageing data for each plant
  const allAgeingData = {
    'all': [
      { days: '0-30', value: 4687 },
      { days: '30-60', value: 559 },
      { days: '60-90', value: 262 },
      { days: '>90', value: 884 }
    ],
    'KTFL Mundhwa': [
      { days: '0-30', value: 1150 },
      { days: '30-60', value: 142 },
      { days: '60-90', value: 68 },
      { days: '>90', value: 215 }
    ],
    'KTFL Ranajangaon 1': [
      { days: '0-30', value: 1280 },
      { days: '30-60', value: 165 },
      { days: '60-90', value: 72 },
      { days: '>90', value: 198 }
    ],
    'KTFL Ranajangaon 2': [
      { days: '0-30', value: 1425 },
      { days: '30-60', value: 178 },
      { days: '60-90', value: 85 },
      { days: '>90', value: 289 }
    ],
    'KTFL Baramati': [
      { days: '0-30', value: 832 },
      { days: '30-60', value: 74 },
      { days: '60-90', value: 37 },
      { days: '>90', value: 182 }
    ]
  };
 
  const ageingData = allAgeingData[selectedPlant] || allAgeingData['all'];
 
  // Monthly trend data for each plant
  const allMonthlyTrendData = {
    'all': [
      { month: 'Mar', value: 395.52 },
      { month: 'Apr', value: 446.16 },
      { month: 'May', value: 471.16 },
      { month: 'Jun', value: 461.16 },
      { month: 'Jul', value: 446.16 },
      { month: 'Aug', value: 431.16 }
    ],
    'KTFL Mundhwa': [
      { month: 'Mar', value: 65.8 },
      { month: 'Apr', value: 69.4 },
      { month: 'May', value: 71.2 },
      { month: 'Jun', value: 69.5 },
      { month: 'Jul', value: 67.8 },
      { month: 'Aug', value: 66.2 }
    ],
    'KTFL Ranajangaon 1': [
      { month: 'Mar', value: 92.1 },
      { month: 'Apr', value: 95.8 },
      { month: 'May', value: 99.2 },
      { month: 'Jun', value: 97.8 },
      { month: 'Jul', value: 96.4 },
      { month: 'Aug', value: 94.7 }
    ],
    'KTFL Ranajangaon 2': [
      { month: 'Mar', value: 128.9 },
      { month: 'Apr', value: 135.4 },
      { month: 'May', value: 142.1 },
      { month: 'Jun', value: 137.3 },
      { month: 'Jul', value: 134.8 },
      { month: 'Aug', value: 131.6 }
    ],
    'KTFL Baramati': [
      { month: 'Mar', value: 98.7 },
      { month: 'Apr', value: 102.9 },
      { month: 'May', value: 108.4 },
      { month: 'Jun', value: 105.9 },
      { month: 'Jul', value: 103.2 },
      { month: 'Aug', value: 100.8 }
    ]
  };
 
  const monthlyTrendData = allMonthlyTrendData[selectedPlant] || allMonthlyTrendData['all'];
 
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={onClose}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
         
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
         
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
         
          .modal-content {
            animation: slideUp 0.4s ease;
          }
 
          .scrollbar-custom::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
 
          .scrollbar-custom::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }
 
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
 
          .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>
 
      <div
        className="modal-content scrollbar-custom"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '100%',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e2e8f0',
          fontFamily: '"Inter", sans-serif'
        }}
      >
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          padding: '18px 24px',
          borderBottom: '2px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <div>
            <h2 style={{
              margin: '0 0 2px 0',
              fontSize: '22px',
              fontWeight: '800',
              color: '#0f172a',
              letterSpacing: '-0.5px'
            }}>
              KTFL RM Inventory Dashboard
            </h2>
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: '#64748b',
              fontWeight: '500'
            }}>
              All Plants Combined View
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Detail Button */}
            <button
              onClick={handleDetailClick}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
              }}
            >
              📊 Detail
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#fecaca';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fee2e2';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>
          </div>
        </div>
 
        {/* Main Content */}
        <div style={{ padding: '20px' }}>
         
          {/* Plant Filter Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px',
            overflowX: 'auto'
          }}>
            <button
              onClick={() => setSelectedPlant('all')}
              style={{
                padding: '8px 16px',
                background: selectedPlant === 'all' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'white',
                color: selectedPlant === 'all' ? 'white' : '#64748b',
                border: selectedPlant === 'all' ? 'none' : '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}
            >
              🏭 All Plants
            </button>
           
            <button
              onClick={() => setSelectedPlant('KTFL Mundhwa')}
              style={{
                padding: '8px 16px',
                background: selectedPlant === 'KTFL Mundhwa' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'white',
                color: selectedPlant === 'KTFL Mundhwa' ? 'white' : '#64748b',
                border: selectedPlant === 'KTFL Mundhwa' ? 'none' : '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}
            >
              Mundhwa
            </button>
           
            <button
              onClick={() => setSelectedPlant('KTFL Ranajangaon 1')}
              style={{
                padding: '8px 16px',
                background: selectedPlant === 'KTFL Ranajangaon 1' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'white',
                color: selectedPlant === 'KTFL Ranajangaon 1' ? 'white' : '#64748b',
                border: selectedPlant === 'KTFL Ranajangaon 1' ? 'none' : '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}
            >
              Ranajangaon 1
            </button>
           
            <button
              onClick={() => setSelectedPlant('KTFL Ranajangaon 2')}
              style={{
                padding: '8px 16px',
                background: selectedPlant === 'KTFL Ranajangaon 2' ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' : 'white',
                color: selectedPlant === 'KTFL Ranajangaon 2' ? 'white' : '#64748b',
                border: selectedPlant === 'KTFL Ranajangaon 2' ? 'none' : '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}
            >
              Ranajangaon 2
            </button>
           
            <button
              onClick={() => setSelectedPlant('KTFL Baramati')}
              style={{
                padding: '8px 16px',
                background: selectedPlant === 'KTFL Baramati' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'white',
                color: selectedPlant === 'KTFL Baramati' ? 'white' : '#64748b',
                border: selectedPlant === 'KTFL Baramati' ? 'none' : '1px solid #cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}
            >
              Baramati
            </button>
          </div>
 
          {/* Compact KPI Cards in One Line */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '14px'
          }}>
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #93c5fd'
            }}>
              <div style={{ fontSize: '9px', color: '#1e40af', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '3px' }}>RM Stock</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e3a8a', lineHeight: '1' }}>{kpiTotals.rmStock.toFixed(2)} T</div>
            </div>
           
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #6ee7b7'
            }}>
              <div style={{ fontSize: '9px', color: '#065f46', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '3px' }}>RM Value</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#064e3b', lineHeight: '1' }}>₹{kpiTotals.rmValue.toFixed(2)}L</div>
            </div>
           
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #f9a8d4'
            }}>
              <div style={{ fontSize: '9px', color: '#9f1239', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '3px' }}>WIP Stock</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#881337', lineHeight: '1' }}>{kpiTotals.wipStock.toLocaleString()} N</div>
            </div>
           
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #fcd34d'
            }}>
              <div style={{ fontSize: '9px', color: '#92400e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '3px' }}>WIP Value</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#78350f', lineHeight: '1' }}>₹{kpiTotals.wipValue.toFixed(2)}L</div>
            </div>
          </div>
 
          {/* View Toggle Buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <button
              onClick={() => setActiveView('graph')}
              style={{
                flex: 1,
                padding: '10px',
                background: activeView === 'graph' ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'white',
                color: activeView === 'graph' ? 'white' : '#64748b',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              📊 Graph View
            </button>
           
            <button
              onClick={() => setActiveView('table')}
              style={{
                flex: 1,
                padding: '10px',
                background: activeView === 'table' ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'white',
                color: activeView === 'table' ? 'white' : '#64748b',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '700',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              📋 Table View
            </button>
          </div>
 
          {/* Graph View - 4 Charts in 2x2 Grid */}
          {activeView === 'graph' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px'
            }}>
              {/* Chart 1: Month-wise RM Stock Distribution */}
              <div style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{
                  margin: '0 0 10px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {selectedPlant === 'all' ? 'Plant-wise RM Stock Trend' : 'Monthly RM Stock'}
                </h4>
                <ResponsiveContainer width="100%" height={180}>
                  {selectedPlant === 'all' ? (
                    <LineChart data={getMonthlyDistribution()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '9px' }} />
                      <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '10px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="Mundhwa" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Mundhwa (Ton)" />
                      <Line type="monotone" dataKey="R'gaon 1" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="R'gaon 1 (Ton)" />
                      <Line type="monotone" dataKey="R'gaon 2" stroke="#ec4899" strokeWidth={2} dot={{ r: 3 }} name="R'gaon 2 (Ton)" />
                      <Line type="monotone" dataKey="Baramati" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Baramati (Ton)" />
                    </LineChart>
                  ) : (
                    <BarChart data={getMonthlyDistribution()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '9px' }} />
                      <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '10px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="rmStock" fill="#0284c7" name="RM Stock (Ton)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
 
              {/* Chart 2: WIP Stock or Plant Value Distribution */}
              <div style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{
                  margin: '0 0 10px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {selectedPlant === 'all' ? 'Plant Value Distribution' : 'Monthly WIP Stock'}
                </h4>
                <ResponsiveContainer width="100%" height={180}>
                  {selectedPlant === 'all' ? (
                    <PieChart>
                      <Pie
                        data={plantComparisonData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={65}
                        fill="#8884d8"
                        dataKey="value"
                        label={(entry) => `${entry.name}`}
                        labelStyle={{ fontSize: '9px', fontWeight: '600' }}
                      >
                        {plantComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '10px'
                        }}
                      />
                    </PieChart>
                  ) : (
                    <BarChart data={getMonthlyDistribution()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '9px' }} />
                      <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '10px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="wipStock" fill="#ec4899" name="WIP Stock (Nos)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
 
              {/* Chart 3: RM Ageing Analysis */}
              <div style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{
                  margin: '0 0 10px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>RM Ageing Analysis</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={ageingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="days" stroke="#64748b" style={{ fontSize: '9px' }} />
                    <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                    <Tooltip
                      contentStyle={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" fill="#f59e0b" name="Value (Lac)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
 
              {/* Chart 4: Monthly Trend */}
              <div style={{
                background: '#f8fafc',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{
                  margin: '0 0 10px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Monthly Trend</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '9px' }} />
                    <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                    <Tooltip
                      contentStyle={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0284c7"
                      strokeWidth={2}
                      dot={{ fill: '#0284c7', r: 3 }}
                      name="Value (Lac)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
 
          {/* Table View - Compact Table */}
          {activeView === 'table' && (
            <div style={{
              background: 'white',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                background: '#f8fafc',
                padding: '10px 14px',
                borderBottom: '2px solid #e2e8f0'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#0f172a'
                }}>
                  Complete Inventory Details
                </h3>
              </div>
             
              <div style={{ overflowX: 'auto' }} className="scrollbar-custom">
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '10px'
                }}>
                  <thead>
                    <tr style={{
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      color: 'white'
                    }}>
                      <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>Plant</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>RM SAP</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>Customer</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>Die No</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>RM Grade</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>RM Stock (T)</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>RM Val (L)</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>WIP Stock</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>WIP Val (L)</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '9px', whiteSpace: 'nowrap' }}>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((row, index) => (
                      <tr key={index} style={{ background: index % 2 === 0 ? 'white' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            background: row.plant === 'KTFL Mundhwa' ? '#dbeafe' :
                                        row.plant === 'KTFL Ranajangaon 1' ? '#d1fae5' :
                                        row.plant === 'KTFL Ranajangaon 2' ? '#fce7f3' : '#fef3c7',
                            color: row.plant === 'KTFL Mundhwa' ? '#1e40af' :
                                   row.plant === 'KTFL Ranajangaon 1' ? '#065f46' :
                                   row.plant === 'KTFL Ranajangaon 2' ? '#9f1239' : '#92400e',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '8px',
                            fontWeight: '700'
                          }}>
                            {row.plant.replace('KTFL ', '')}
                          </span>
                        </td>
                        <td style={{ padding: '6px 10px', color: '#475569', fontWeight: '600', fontFamily: 'monospace', whiteSpace: 'nowrap', fontSize: '9px' }}>{row.rmSapCode}</td>
                        <td style={{ padding: '6px 10px', color: '#0f172a', fontWeight: '600', whiteSpace: 'nowrap' }}>{row.customer}</td>
                        <td style={{ padding: '6px 10px', color: '#64748b', fontFamily: 'monospace', whiteSpace: 'nowrap', fontSize: '9px' }}>{row.dieNo}</td>
                        <td style={{ padding: '6px 10px', color: '#475569', fontSize: '9px', whiteSpace: 'nowrap' }}>{row.rmGrade}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#0f172a', fontWeight: '700', whiteSpace: 'nowrap' }}>{row.rmStock.toFixed(2)}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#059669', fontWeight: '700', whiteSpace: 'nowrap' }}>₹{row.rmValue.toFixed(2)}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#0f172a', fontWeight: '700', whiteSpace: 'nowrap' }}>{row.wipStock.toLocaleString()}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#d97706', fontWeight: '700', whiteSpace: 'nowrap' }}>₹{row.wipValue.toFixed(2)}</td>
                        <td style={{
                          padding: '6px 10px',
                          color: row.remark.includes('suddenly') || row.remark.includes('delay') ? '#dc2626' :
                                 row.remark.includes('peak') || row.remark.includes('progress') ? '#059669' : '#64748b',
                          fontSize: '9px',
                          fontWeight: '500',
                          whiteSpace: 'nowrap'
                        }}>{row.remark}</td>
                      </tr>
                    ))}
                   
                    <tr style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', borderTop: '3px solid #0284c7', fontWeight: '800' }}>
                      <td colSpan="5" style={{ padding: '10px', color: '#0f172a', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GRAND TOTAL</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#0f172a', fontSize: '11px' }}>
                        {inventoryData.reduce((sum, row) => sum + row.rmStock, 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#059669', fontSize: '11px' }}>
                        ₹{inventoryData.reduce((sum, row) => sum + row.rmValue, 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#0f172a', fontSize: '11px' }}>
                        {inventoryData.reduce((sum, row) => sum + row.wipStock, 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#d97706', fontSize: '11px' }}>
                        ₹{inventoryData.reduce((sum, row) => sum + row.wipValue, 0).toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}