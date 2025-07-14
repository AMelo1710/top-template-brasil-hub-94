import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  LogOut,
  Menu,
  X,
  Home,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Verificar autenticação de admin
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do painel administrativo.",
    });
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: "Hub Principal",
      icon: Home,
      path: "/admin",
      description: "Página inicial do admin"
    },
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      description: "Visão geral e estatísticas"
    },
    {
      title: "Usuários",
      icon: Users,
      path: "/admin/users",
      description: "Gerenciar usuários"
    },
    {
      title: "Templates",
      icon: Package,
      path: "/admin/products",
      description: "Gerenciar templates"
    },
    {
      title: "Pedidos",
      icon: ShoppingCart,
      path: "/admin/orders",
      description: "Gerenciar vendas"
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-card border-r border-border flex flex-col`}>
        {/* Header da sidebar */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-sm">Admin Panel</h2>
                  <p className="text-xs text-muted-foreground">Top Templates</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 p-0"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Menu items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              className={`w-full justify-start ${!sidebarOpen && 'px-2'}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`w-4 h-4 ${sidebarOpen && 'mr-3'}`} />
              {sidebarOpen && (
                <div className="text-left">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              )}
            </Button>
          ))}
        </nav>

        {/* Footer da sidebar */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className={`w-full justify-start ${!sidebarOpen && 'px-2'}`}
            onClick={() => navigate('/')}
          >
            <Home className={`w-4 h-4 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && 'Voltar ao Site'}
          </Button>
          <Button
            variant="destructive"
            className={`w-full justify-start mt-2 ${!sidebarOpen && 'px-2'}`}
            onClick={handleLogout}
          >
            <LogOut className={`w-4 h-4 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && 'Sair'}
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground">Top Templates Brasil</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right mr-3">
                <p className="text-sm font-medium">Administrador</p>
                <p className="text-xs text-muted-foreground">admin@toptemplates.com</p>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;