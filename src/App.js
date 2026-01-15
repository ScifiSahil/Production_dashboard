import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StaticBUDashboard from "./components/dashboard";
import HRDashboard from "./components/hrdashboard";
import PurchaseDashboard from "./components/purchase-dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaticBUDashboard />} />

        {/* ✅ Non-Core Routes */}
        <Route path="/noncore/hr" element={<HRDashboard />} />
        <Route path="/noncore/purchase" element={<PurchaseDashboard />} />
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
