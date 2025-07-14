
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Funnel from "./pages/Funnel";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Plataform from "./pages/Plataform";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Saved from "./pages/Saved";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Support from "./pages/support";
import Page404 from "./pages/Page-404";
import { AppProvider } from "./contexts/AppContext";
import { CodeProvider } from "./contexts/CodeContext";
import { AuthProvider } from "./hooks/useAuth";

// Páginas administrativas
import AdminLayout from "./components/admin/AdminLayout";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPage from "./pages/admin/AdminPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <AuthProvider>
            <CodeProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/funnel" element={<Funnel />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Rotas da plataforma */}
              <Route path="/plataform/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Plataform />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </Layout>
              } />
              
              {/* Rotas administrativas */}
              <Route path="/admin/login" element={
                <AdminProtectedRoute>
                  <AdminLogin />
                </AdminProtectedRoute>
              } />
              
              <Route path="/admin/*" element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }>
                <Route path="" element={<AdminPage />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
              
              {/* Rota catch-all para páginas não encontradas */}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
            </CodeProvider>
          </AuthProvider>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
