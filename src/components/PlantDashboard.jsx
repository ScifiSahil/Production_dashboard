import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const PlantDashboard = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Plants");
  const [monthOffset, setMonthOffset] = useState(0);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const getLast6Months = (offset = 0) => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i - offset);
      months.push(d.toLocaleString("default", { month: "short" }));
    }
    return months;
  };

  const months = getLast6Months(monthOffset);

  const plantCategories = {
    "All Plants": [
      {
        name: "MDWA",
        fullName: "Mundhwa",
        ebitda: 16.2,
        cost: 145000,
        target: 17.5,
      },
      {
        name: "RNGN",
        fullName: "Ranjangaon E-84",
        ebitda: 14.5,
        cost: 138000,
        target: 16.0,
      },
      {
        name: "KTPL",
        fullName: "Transmission Ranjangaon",
        ebitda: 15.8,
        cost: 142000,
        target: 17.0,
      },
      {
        name: "BRFT",
        fullName: "Transmission Baramati",
        ebitda: 17.1,
        cost: 135000,
        target: 18.0,
      },
      {
        name: "CHKN",
        fullName: "Chakan",
        ebitda: 13.9,
        cost: 148000,
        target: 15.5,
      },
      {
        name: "KHD",
        fullName: "Khed-1",
        ebitda: 16.5,
        cost: 140000,
        target: 17.8,
      },
      {
        name: "AMBT",
        fullName: "Ambethan-1",
        ebitda: 14.8,
        cost: 141000,
        target: 16.2,
      },
      {
        name: "CHGR",
        fullName: "Ambethan-2",
        ebitda: 16.9,
        cost: 137000,
        target: 18.2,
      },
      {
        name: "BRM2",
        fullName: "Baramati KTFL",
        ebitda: 14.2,
        cost: 146000,
        target: 15.8,
      },
      {
        name: "BHWD",
        fullName: "Bhiwadi",
        ebitda: 17.3,
        cost: 134000,
        target: 18.5,
      },
      {
        name: "GUJR",
        fullName: "Gujarat",
        ebitda: 15.4,
        cost: 139000,
        target: 16.8,
      },
      {
        name: "KHD2",
        fullName: "Khed-2",
        ebitda: 15.2,
        cost: 144000,
        target: 16.5,
      },
      {
        name: "AMBT-3",
        fullName: "Ambethan-3",
        ebitda: 15.6,
        cost: 143000,
        target: 17.0,
      },
      {
        name: "HTRN",
        fullName: "Heat Treatment",
        ebitda: 16.7,
        cost: 136000,
        target: 18.0,
      },
      {
        name: "MIMJ",
        fullName: "Inmet Jejuri",
        ebitda: 14.6,
        cost: 147000,
        target: 16.0,
      },
      {
        name: "YOKOHA",
        fullName: "Yokoha Jejuri",
        ebitda: 16.1,
        cost: 141000,
        target: 17.5,
      },
    ],
    Forging: [
      {
        name: "MDWA",
        fullName: "Mundhwa",
        ebitda: 16.2,
        cost: 145000,
        target: 17.5,
      },
      {
        name: "RNGN",
        fullName: "Ranjangaon E-84",
        ebitda: 14.5,
        cost: 138000,
        target: 16.0,
      },
      {
        name: "KTPL",
        fullName: "Transmission Ranjangaon",
        ebitda: 15.8,
        cost: 142000,
        target: 17.0,
      },
      {
        name: "BRFT",
        fullName: "Transmission Baramati",
        ebitda: 17.1,
        cost: 135000,
        target: 18.0,
      },
    ],
    Machining: [
      {
        name: "CHKN",
        fullName: "Chakan",
        ebitda: 13.9,
        cost: 148000,
        target: 15.5,
      },
      {
        name: "KHD",
        fullName: "Khed-1",
        ebitda: 16.5,
        cost: 140000,
        target: 17.8,
      },
      {
        name: "AMBT",
        fullName: "Ambethan-1",
        ebitda: 14.8,
        cost: 141000,
        target: 16.2,
      },
      {
        name: "CHGR",
        fullName: "Ambethan-2",
        ebitda: 16.9,
        cost: 137000,
        target: 18.2,
      },
      {
        name: "BRM2",
        fullName: "Baramati KTFL",
        ebitda: 14.2,
        cost: 146000,
        target: 15.8,
      },
      {
        name: "BHWD",
        fullName: "Bhiwadi",
        ebitda: 17.3,
        cost: 134000,
        target: 18.5,
      },
      {
        name: "GUJR",
        fullName: "Gujarat",
        ebitda: 15.4,
        cost: 139000,
        target: 16.8,
      },
      {
        name: "KHD2",
        fullName: "Khed-2",
        ebitda: 15.2,
        cost: 144000,
        target: 16.5,
      },
      {
        name: "AMBT-3",
        fullName: "Ambethan-3",
        ebitda: 15.6,
        cost: 143000,
        target: 17.0,
      },
      {
        name: "HTRN",
        fullName: "Heat Treatment",
        ebitda: 16.7,
        cost: 136000,
        target: 18.0,
      },
    ],
    Other: [
      {
        name: "MIMJ",
        fullName: "Inmet Jejuri",
        ebitda: 14.6,
        cost: 147000,
        target: 16.0,
      },
      {
        name: "YOKOHA",
        fullName: "Yokoha Jejuri",
        ebitda: 16.1,
        cost: 141000,
        target: 17.5,
      },
    ],
  };

  const plants = plantCategories[activeCategory];

  const getMonthlyData = (plantName) => {
    const plant = plants.find((p) => p.name === plantName);
    return months.map((month, i) => ({
      month,
      ebitda: plant.ebitda + (Math.random() - 0.5) * 3,
      target: plant.target,
      cost: plant.cost + (Math.random() - 0.5) * 10000,
      costTarget: plant.cost * 0.95,
    }));
  };

  const getPlantComparisonData = () => {
    return plants.map((plant) => ({
      name: plant.name,
      ebitdaActual: plant.ebitda,
      ebitdaTarget: plant.target,
      costActual: plant.cost / 1000,
      costTarget: (plant.cost * 0.95) / 1000,
    }));
  };

  const monthlyData = selectedPlant ? getMonthlyData(selectedPlant) : [];
  const comparisonData = !selectedPlant ? getPlantComparisonData() : [];

  return (
    <div className="h-screen bg-gray-50 p-3 overflow-hidden">
      <div className="h-full max-w-[1600px] mx-auto flex flex-col">
        {/* Header */}
        {/* Header */}
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-3 mb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Kalyani Technoforge Ltd.</h1>
              <p className="text-blue-100 text-xs mt-1">
                {currentMonth} {currentYear}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  (window.location.href =
                    "https://ktflceprd.kalyanicorp.com/kalyani.iot/costing")
                }
                className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition font-semibold text-sm"
              >
                Detail Costing
              </button>
              {selectedPlant && (
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition font-semibold text-sm"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-3 flex-shrink-0">
          {Object.keys(plantCategories).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSelectedPlant(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition text-sm ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
              <span className="ml-1 text-xs">
                ({plantCategories[category].length})
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-3 flex-1 min-h-0">
          {/* Left Side - Plant Cards */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-2.5 h-full flex flex-col">
              <h3 className="font-bold text-white text-sm mb-2 flex items-center justify-between">
                <span>Plants</span>
                <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                  {plants.length}
                </span>
              </h3>
              <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex-1">
                {plants.map((plant) => {
                  const isOnTarget = plant.ebitda >= plant.target * 0.95;

                  return (
                    <div
                      key={plant.name}
                      onClick={() => setSelectedPlant(plant.name)}
                      className={`rounded-lg cursor-pointer transition-all ${
                        selectedPlant === plant.name
                          ? "bg-white shadow-lg"
                          : "bg-white bg-opacity-90 hover:bg-opacity-100"
                      }`}
                    >
                      <div className="p-2">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-800 text-xs">
                              {plant.name}
                            </div>
                            <div className="text-[9px] text-gray-500 truncate">
                              {plant.fullName}
                            </div>
                          </div>
                          <div
                            className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ml-1 flex-shrink-0 ${
                              isOnTarget
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {isOnTarget ? "✓" : "⚠"}
                          </div>
                        </div>
                        <div className="flex gap-1 text-[10px]">
                          <div className="bg-blue-50 rounded p-1 flex-1">
                            <div className="text-gray-600">EBITDA</div>
                            <div className="font-bold text-blue-700">
                              {plant.ebitda.toFixed(1)}%
                            </div>
                          </div>
                          <div className="bg-orange-50 rounded p-1 flex-1">
                            <div className="text-gray-600">Target</div>
                            <div className="font-bold text-orange-700">
                              {plant.target.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Graphs */}
          <div className="flex-1 flex flex-col min-w-0">
            {!selectedPlant ? (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-2 flex-shrink-0">
                  {activeCategory} Comparison
                </h2>

                <div className="grid grid-rows-2 gap-3 flex-1 min-h-0">
                  <div className="bg-white rounded-lg shadow-lg p-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      EBITDA Performance (%)
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="name"
                          stroke="#6b7280"
                          style={{ fontSize: "11px" }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          stroke="#6b7280"
                          style={{ fontSize: "11px" }}
                          domain={[12, 20]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            fontSize: "11px",
                          }}
                          formatter={(value) => `${value.toFixed(2)}%`}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line
                          type="monotone"
                          dataKey="ebitdaActual"
                          stroke="#10b981"
                          strokeWidth={2.5}
                          dot={{ fill: "#10b981", r: 3 }}
                          name="Actual"
                        />
                        <Line
                          type="monotone"
                          dataKey="ebitdaTarget"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#f59e0b", r: 2.5 }}
                          name="Target"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Manufacturing Cost (₹ in K)
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="name"
                          stroke="#6b7280"
                          style={{ fontSize: "11px" }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis stroke="#6b7280" style={{ fontSize: "11px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            fontSize: "11px",
                          }}
                          formatter={(value) => `₹${value.toFixed(0)}K`}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line
                          type="monotone"
                          dataKey="costActual"
                          stroke="#3b82f6"
                          strokeWidth={2.5}
                          dot={{ fill: "#3b82f6", r: 3 }}
                          name="Actual"
                        />
                        <Line
                          type="monotone"
                          dataKey="costTarget"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#f59e0b", r: 2.5 }}
                          name="Target"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedPlant} - Last 6 Months
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMonthOffset(monthOffset + 6)}
                      className="p-1.5 bg-white rounded-lg hover:bg-gray-100 shadow"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-gray-600 px-2">
                      {months[0]} - {months[5]}
                    </span>
                    <button
                      onClick={() =>
                        setMonthOffset(Math.max(0, monthOffset - 6))
                      }
                      disabled={monthOffset === 0}
                      className="p-1.5 bg-white rounded-lg hover:bg-gray-100 shadow disabled:opacity-50"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-3 flex-1 min-h-0">
                  <div className="bg-white rounded-lg shadow-lg p-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      EBITDA Performance (%)
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="month"
                          stroke="#6b7280"
                          style={{ fontSize: "11px" }}
                        />
                        <YAxis
                          domain={[10, 22]}
                          stroke="#6b7280"
                          style={{ fontSize: "11px" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            fontSize: "11px",
                          }}
                          formatter={(value, name) => [
                            `${value.toFixed(2)}%`,
                            name === "ebitda" ? "Actual" : "Target",
                          ]}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line
                          type="monotone"
                          dataKey="ebitda"
                          stroke="#10b981"
                          strokeWidth={2.5}
                          dot={{ fill: "#10b981", r: 3 }}
                          name="Actual"
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#f59e0b", r: 2.5 }}
                          name="Target"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Manufacturing Cost (₹)
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="month"
                          stroke="#6b7280"
                          style={{ fontSize: "11px" }}
                        />
                        <YAxis stroke="#6b7280" style={{ fontSize: "11px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            fontSize: "11px",
                          }}
                          formatter={(value, name) => [
                            `₹${value.toFixed(0)}`,
                            name === "cost" ? "Actual" : "Target",
                          ]}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line
                          type="monotone"
                          dataKey="cost"
                          stroke="#3b82f6"
                          strokeWidth={2.5}
                          dot={{ fill: "#3b82f6", r: 3 }}
                          name="Actual"
                        />
                        <Line
                          type="monotone"
                          dataKey="costTarget"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#f59e0b", r: 2.5 }}
                          name="Target"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default PlantDashboard;
