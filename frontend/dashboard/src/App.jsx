import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import CreateProduct from "./components/products/createProduct";
import Registration from "./pages/Registration";
import OtpVerification from "./pages/OtpVerification";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/otpverification" element={<OtpVerification />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
              {/* BG */}
              <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
              </div>
              <Sidebar />
              <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
