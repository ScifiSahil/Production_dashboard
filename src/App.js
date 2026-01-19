import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StaticBUDashboard from "./components/dashboard";
import HRDashboard from "./components/hrdashboard";
import PurchaseDashboard from "./components/purchase-dashboard";
import PlantDataModal from "./components/plantdatamodal"; // ✅ Import karo
import KalyaniDashboard from "./components/KalyaniDashboardProfessional";
import SkillWillModal from "./components/skillwillmodal";
import PlantDashboard from "./components/PlantDashboard";
import FinanceDashboard  from "./components/FinanceDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaticBUDashboard />} />
        {/* ✅ Non-Core Routes */}
        <Route path="/noncore/hr" element={<HRDashboard />} />
        <Route path="/noncore/purchase" element={<PurchaseDashboard />} />
        <Route path="/noncore/inventory" element={<PlantDataModal />} />{" "}
        {/* ✅ Add this */}
        <Route path="/noncore/kalyani" element={<KalyaniDashboard />} />{" "}
        {/* ✅ Add this */}
        <Route path="/noncore/skillwill" element={<SkillWillModal />} />{" "}
        {/* ✅ Add this */}
        <Route path="/noncore/cost" element={<PlantDashboard />} />{" "}
        {/* ✅ Add this */}
        <Route path="/noncore/finance" element={<FinanceDashboard />} />{" "}
        {/* ✅ Add this */}
      </Routes>
    </BrowserRouter>
  );
}

// import logo from './logo.svg';
// import './App.css';

// import HRDashboard from './components/hrdashboard';
// import PurchaseDashboard from './components/purchase-dashboard';
// import StaticBUDashboard from './components/dashboard';

// function App() {
//   return (
//    <Routes>
//   <Route path="/" element={<StaticBUDashboard />} />

//   {/* ✅ Noncore Routes */}
//   <Route path="/noncore/hr" element={<HRDashboard />} />
//   <Route path="/noncore/purchase" element={<PurchaseDashboard />} />

// </Routes>
//   );
// }

// export default App;
