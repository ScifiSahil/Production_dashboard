import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
 
export default function SkillWillModal({ onClose }) {
  const [activeView, setActiveView] = useState('graph');
  const [selectedLocation, setSelectedLocation] = useState('all');
 
  // Complete location data
  const allLocationData = [
    { location: 'Ambethan', highSkill: 36, lowSkill: 15, grandTotalSkill: 51, highWill: 35, lowWill: 16, grandTotalWill: 51, headCount: 51, balance: 0, completion: '100%' },
    { location: 'Ambethan-II', highSkill: 43, lowSkill: 31, grandTotalSkill: 74, highWill: 52, lowWill: 22, grandTotalWill: 74, headCount: 74, balance: 0, completion: '100%' },
    { location: 'Ambethan-III', highSkill: 57, lowSkill: 9, grandTotalSkill: 66, highWill: 50, lowWill: 16, grandTotalWill: 66, headCount: 80, balance: 14, completion: '83%' },
    { location: 'AP-81', highSkill: 25, lowSkill: 7, grandTotalSkill: 32, highWill: 28, lowWill: 4, grandTotalWill: 32, headCount: 41, balance: 9, completion: '78%' },
    { location: 'Baramati', highSkill: 10, lowSkill: 1, grandTotalSkill: 11, highWill: 5, lowWill: 6, grandTotalWill: 11, headCount: 11, balance: 0, completion: '100%' },
    { location: 'Bhiwadi', highSkill: 31, lowSkill: 1, grandTotalSkill: 32, highWill: 31, lowWill: 1, grandTotalWill: 32, headCount: 32, balance: 0, completion: '100%' },
    { location: 'Chakan', highSkill: 32, lowSkill: 24, grandTotalSkill: 56, highWill: 30, lowWill: 26, grandTotalWill: 56, headCount: 56, balance: 0, completion: '100%' },
    { location: 'Corporate', highSkill: 63, lowSkill: 24, grandTotalSkill: 87, highWill: 62, lowWill: 25, grandTotalWill: 87, headCount: 90, balance: 3, completion: '97%' },
    { location: 'Corporate - MIM & MEDICAL', highSkill: 3, lowSkill: 2, grandTotalSkill: 5, highWill: 4, lowWill: 1, grandTotalWill: 5, headCount: 13, balance: 8, completion: '38%' },
    { location: 'Gujarat', highSkill: 5, lowSkill: 4, grandTotalSkill: 9, highWill: 8, lowWill: 1, grandTotalWill: 9, headCount: 9, balance: 0, completion: '100%' },
    { location: 'Jejuri', highSkill: 29, lowSkill: 14, grandTotalSkill: 43, highWill: 31, lowWill: 12, grandTotalWill: 43, headCount: 46, balance: 3, completion: '93%' },
    { location: 'Khed', highSkill: 77, lowSkill: 38, grandTotalSkill: 115, highWill: 66, lowWill: 49, grandTotalWill: 115, headCount: 117, balance: 2, completion: '98%' },
    { location: 'Mundhwa', highSkill: 28, lowSkill: 9, grandTotalSkill: 37, highWill: 32, lowWill: 5, grandTotalWill: 37, headCount: 38, balance: 1, completion: '97%' },
    { location: 'Rail Division', highSkill: 5, lowSkill: 0, grandTotalSkill: 5, highWill: 3, lowWill: 2, grandTotalWill: 5, headCount: 5, balance: 0, completion: '100%' },
    { location: 'Ranjangaon', highSkill: 98, lowSkill: 29, grandTotalSkill: 127, highWill: 103, lowWill: 24, grandTotalWill: 127, headCount: 127, balance: 0, completion: '100%' },
    { location: 'Ranjangaon - Heat Treatment', highSkill: 31, lowSkill: 9, grandTotalSkill: 40, highWill: 26, lowWill: 14, grandTotalWill: 40, headCount: 40, balance: 0, completion: '100%' },
    { location: 'Ranjangaon Transmission', highSkill: 33, lowSkill: 6, grandTotalSkill: 39, highWill: 36, lowWill: 3, grandTotalWill: 39, headCount: 40, balance: 1, completion: '98%' },
    { location: 'Scifi', highSkill: 11, lowSkill: 6, grandTotalSkill: 17, highWill: 11, lowWill: 6, grandTotalWill: 17, headCount: 17, balance: 0, completion: '100%' },
    { location: 'Baramati Transmission', highSkill: 35, lowSkill: 7, grandTotalSkill: 42, highWill: 32, lowWill: 10, grandTotalWill: 42, headCount: 47, balance: 5, completion: '89%' }
  ];
 
  const locationData = selectedLocation === 'all'
    ? allLocationData
    : allLocationData.filter(item => item.location === selectedLocation);
 
  const totals = {
    highSkill: locationData.reduce((sum, row) => sum + row.highSkill, 0),
    lowSkill: locationData.reduce((sum, row) => sum + row.lowSkill, 0),
    grandTotalSkill: locationData.reduce((sum, row) => sum + row.grandTotalSkill, 0),
    highWill: locationData.reduce((sum, row) => sum + row.highWill, 0),
    lowWill: locationData.reduce((sum, row) => sum + row.lowWill, 0),
    grandTotalWill: locationData.reduce((sum, row) => sum + row.grandTotalWill, 0),
    headCount: locationData.reduce((sum, row) => sum + row.headCount, 0),
    balance: locationData.reduce((sum, row) => sum + row.balance, 0)
  };
 
  const matrixData = [
    { quadrant: 'Q1', label: 'Star', value: 477 },
    { quadrant: 'Q2', label: 'Learners', value: 169 },
    { quadrant: 'Q3', label: 'Dis-engaged', value: 163 },
    { quadrant: 'Q4', label: 'Risk/Exit', value: 71 }
  ];
 
  const buData = [
    { bu: 'BU-A', hs: 165, ls: 78, hw: 158, lw: 85 },
    { bu: 'BU-B', hs: 142, ls: 62, hw: 135, lw: 69 },
    { bu: 'BU-C', hs: 188, ls: 54, hw: 182, lw: 60 },
    { bu: 'BU-D', hs: 98, ls: 32, hw: 105, lw: 25 },
    { bu: 'BU-E', hs: 59, ls: 10, hw: 65, lw: 4 }
  ];
 
  const locationComparison = allLocationData.slice(0, 10).map(item => ({
    name: item.location.length > 12 ? item.location.substring(0, 10) + '..' : item.location,
    hs: item.highSkill,
    ls: item.lowSkill
  }));
 
  const percentageData = [
    { category: 'HS vs LS', value: 73.4 },
    { category: 'HW vs LW', value: 72.6 },
    { category: 'HW vs HS', value: 99.0 },
    { category: 'LW vs LS', value: 103.0 }
  ];
 
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
        padding: '20px'
      }}
      onClick={onClose}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          .scrollbar-custom::-webkit-scrollbar { width: 6px; height: 6px; }
          .scrollbar-custom::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
          .scrollbar-custom::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        `}
      </style>
 
      <div
        className="scrollbar-custom"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '95vw',
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
            <h2 style={{ margin: '0 0 2px 0', fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
              Skill vs Will Matrix Dashboard
            </h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
              Location-wise Analysis
            </p>
          </div>
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
              fontWeight: '600'
            }}
          >
            ✕
          </button>
        </div>
 
        {/* Main Content */}
        <div style={{ padding: '20px' }}>
         
          {/* KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            marginBottom: '14px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #93c5fd'
            }}>
              <div style={{ fontSize: '9px', color: '#1e40af', fontWeight: '600', textTransform: 'uppercase', marginBottom: '3px' }}>High Skill</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e3a8a', lineHeight: '1' }}>{totals.highSkill}</div>
            </div>
           
            <div style={{
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #6ee7b7'
            }}>
              <div style={{ fontSize: '9px', color: '#065f46', fontWeight: '600', textTransform: 'uppercase', marginBottom: '3px' }}>High Will</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#064e3b', lineHeight: '1' }}>{totals.highWill}</div>
            </div>
           
            <div style={{
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #f9a8d4'
            }}>
              <div style={{ fontSize: '9px', color: '#9f1239', fontWeight: '600', textTransform: 'uppercase', marginBottom: '3px' }}>Low Skill</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#881337', lineHeight: '1' }}>{totals.lowSkill}</div>
            </div>
           
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #fcd34d'
            }}>
              <div style={{ fontSize: '9px', color: '#92400e', fontWeight: '600', textTransform: 'uppercase', marginBottom: '3px' }}>Low Will</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#78350f', lineHeight: '1' }}>{totals.lowWill}</div>
            </div>
          </div>
 
          {/* View Toggle + Location Filter */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                flex: '0 0 250px',
                padding: '10px 14px',
                background: 'white',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#0f172a',
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              <option value="all">🏭 All Locations</option>
              {allLocationData.map(loc => (
                <option key={loc.location} value={loc.location}>{loc.location}</option>
              ))}
            </select>
 
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
                textTransform: 'uppercase'
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
                textTransform: 'uppercase'
              }}
            >
              📋 Table View
            </button>
          </div>
 
          {/* Graph View */}
          {activeView === 'graph' && (
            <div>
              {/* Row 1: Quadrant + BU Comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
               
                {/* Quadrant Matrix */}
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
                    textTransform: 'uppercase'
                  }}>Skill vs Will Matrix</h4>
                 
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', padding: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{ fontSize: '9px', fontWeight: '600', color: '#64748b' }}>19%</div>
                      <div style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontSize: '10px',
                        fontWeight: '700',
                        color: '#0f172a'
                      }}>Skill →</div>
                      <div style={{ fontSize: '9px', fontWeight: '600', color: '#64748b' }}>8%</div>
                    </div>
 
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', paddingLeft: '10px' }}>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#64748b' }}>HS/LW</div>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#64748b', marginLeft: '70px' }}>HS/HW</div>
                      </div>
 
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 100px)',
                        gridTemplateRows: 'repeat(2, 80px)',
                        border: '2px solid #0f172a'
                      }}>
                        <div style={{
                          background: '#60a5fa',
                          border: '1px solid #2563eb',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px'
                        }}>
                          <div style={{ fontSize: '9px', fontWeight: '700', color: '#1e3a8a', marginBottom: '4px' }}>Q2-Learners</div>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e3a8a' }}>169</div>
                        </div>
 
                        <div style={{
                          background: '#86efac',
                          border: '1px solid #22c55e',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px'
                        }}>
                          <div style={{ fontSize: '9px', fontWeight: '700', color: '#14532d', marginBottom: '4px' }}>Q1-Star</div>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#14532d' }}>477</div>
                        </div>
 
                        <div style={{
                          background: '#f87171',
                          border: '1px solid #ef4444',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px'
                        }}>
                          <div style={{ fontSize: '9px', fontWeight: '700', color: '#7f1d1d', marginBottom: '4px' }}>Q4-Risk/Exit</div>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#7f1d1d' }}>71</div>
                        </div>
 
                        <div style={{
                          background: '#fde047',
                          border: '1px solid #facc15',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px'
                        }}>
                          <div style={{ fontSize: '9px', fontWeight: '700', color: '#713f12', marginBottom: '4px' }}>Q3-Dis-engaged</div>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#713f12' }}>163</div>
                        </div>
                      </div>
 
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingLeft: '10px' }}>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#64748b' }}>LS/LW</div>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#64748b', marginLeft: '70px' }}>LS/HW</div>
                      </div>
 
                      <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '10px', fontWeight: '700', color: '#0f172a' }}>
                        Will →
                      </div>
                    </div>
 
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '160px', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#64748b' }}>HS/HW</div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>54%</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#64748b' }}>HW/LS</div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>18%</div>
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* BU Comparison */}
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
                    textTransform: 'uppercase'
                  }}>BU-wise Comparison</h4>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={buData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="bu" stroke="#64748b" style={{ fontSize: '9px' }} />
                      <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '10px'
                        }}
                      />
                      <Bar dataKey="hs" fill="#3b82f6" name="High Skill" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="hw" fill="#10b981" name="High Will" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ls" fill="#ef4444" name="Low Skill" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="lw" fill="#f59e0b" name="Low Will" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
 
              {/* Row 2: Location + Percentage */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
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
                    textTransform: 'uppercase'
                  }}>Location-wise Comparison</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={locationComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '8px' }} angle={-15} textAnchor="end" height={60} />
                      <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '10px'
                        }}
                      />
                      <Bar dataKey="hs" fill="#3b82f6" name="High Skill" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ls" fill="#ef4444" name="Low Skill" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
 
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
                    textTransform: 'uppercase'
                  }}>Percentage Analysis</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={percentageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="category" stroke="#64748b" style={{ fontSize: '9px' }} />
                      <YAxis stroke="#64748b" style={{ fontSize: '9px' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '10px'
                        }}
                      />
                      <Bar dataKey="value" fill="#10b981" name="Percentage %" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
 
          {/* Table View */}
          {activeView === 'table' && (
            <div style={{
              background: 'white',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <div style={{
                background: '#f8fafc',
                padding: '10px 14px',
                borderBottom: '2px solid #e2e8f0'
              }}>
                <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                  Complete Location Details
                </h3>
              </div>
             
              <div style={{ overflowX: 'auto' }} className="scrollbar-custom">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: 'white' }}>
                      <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>Location</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>High Skill</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>Low Skill</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>Grand Total</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>High Will</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>Low Will</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>Grand Total</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>Head Count</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>Balance</th>
                      <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700', fontSize: '9px', whiteSpace: 'nowrap' }}>% Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationData.map((row, index) => (
                      <tr key={index} style={{ background: index % 2 === 0 ? 'white' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '6px 10px', color: '#0f172a', fontWeight: '600', whiteSpace: 'nowrap' }}>{row.location}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#3b82f6', fontWeight: '700' }}>{row.highSkill}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#ef4444', fontWeight: '700' }}>{row.lowSkill}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#0f172a', fontWeight: '700' }}>{row.grandTotalSkill}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#10b981', fontWeight: '700' }}>{row.highWill}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#f59e0b', fontWeight: '700' }}>{row.lowWill}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#0f172a', fontWeight: '700' }}>{row.grandTotalWill}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: '#64748b', fontWeight: '700' }}>{row.headCount}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: row.balance === 0 ? '#10b981' : '#f59e0b', fontWeight: '700' }}>{row.balance}</td>
                        <td style={{ padding: '6px 10px', textAlign: 'right', color: row.completion === '100%' ? '#10b981' : '#f59e0b', fontWeight: '700' }}>{row.completion}</td>
                      </tr>
                    ))}
                   
                    <tr style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', borderTop: '3px solid #0284c7' }}>
                      <td style={{ padding: '10px', color: '#0f172a', fontSize: '10px', fontWeight: '800' }}>GRAND TOTAL</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#3b82f6', fontSize: '11px', fontWeight: '800' }}>{totals.highSkill}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#ef4444', fontSize: '11px', fontWeight: '800' }}>{totals.lowSkill}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#0f172a', fontSize: '11px', fontWeight: '800' }}>{totals.grandTotalSkill}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#10b981', fontSize: '11px', fontWeight: '800' }}>{totals.highWill}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#f59e0b', fontSize: '11px', fontWeight: '800' }}>{totals.lowWill}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#0f172a', fontSize: '11px', fontWeight: '800' }}>{totals.grandTotalWill}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: '#64748b', fontSize: '11px', fontWeight: '800' }}>{totals.headCount}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: totals.balance === 0 ? '#10b981' : '#f59e0b', fontSize: '11px', fontWeight: '800' }}>{totals.balance}</td>
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
 