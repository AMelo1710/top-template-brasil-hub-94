import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  FileText,
  Bell,
  TrendingUp,
  Activity,
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { users } from '@/data/users';
import { templates } from '@/data/templates';
import { productCodes } from '@/data/products';

const AdminPage = () => {
  const navigate = useNavigate();

  const adminSections = [
    {
      title: "Dashboard",
      description: "Visão geral e estatísticas do sistema",
      icon: LayoutDashboard,
      route: "/admin/dashboard",
      color: "bg-blue-500 hover:bg-blue-600",
      stats: "Métricas em tempo real"
    },
    {
      title: "Usuários",
      description: "Gerenciar usuários cadastrados",
      icon: Users,
      route: "/admin/users",
      color: "bg-green-500 hover:bg-green-600",
      stats: `${users.length} usuários`
    },
    {
      title: "Templates",
      description: "Gerenciar templates e produtos",
      icon: Package,
      route: "/admin/products",
      color: "bg-purple-500 hover:bg-purple-600",
      stats: `${templates.length} templates`
    },
    {
      title: "Pedidos",
      description: "Gerenciar vendas e pedidos",
      icon: ShoppingCart,
      route: "/admin/orders",
      color: "bg-orange-500 hover:bg-orange-600",
      stats: `${productCodes.filter(c => c.usageStatus === 'invalid').length} vendas`
    }
  ];

  const recentActivities = [
    { 
      type: 'success', 
      message: 'Sistema funcionando normalmente', 
      time: 'Agora',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    { 
      type: 'info', 
      message: 'Novo usuário cadastrado', 
      time: 'há 2 horas',
      icon: Users,
      color: 'text-blue-600'
    },
    { 
      type: 'warning', 
      message: 'Template com baixas visualizações', 
      time: 'há 5 horas',
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    { 
      type: 'info', 
      message: 'Backup realizado com sucesso', 
      time: 'há 1 dia',
      icon: Shield,
      color: 'text-blue-600'
    }
  ];

  const systemStats = [
    { label: 'Usuários Ativos', value: users.filter(u => u.isActive).length, total: users.length },
    { label: 'Templates Populares', value: Math.floor(templates.length * 0.7), total: templates.length },
    { label: 'Vendas do Mês', value: 42, total: 50 },
    { label: 'Satisfação', value: 98, total: 100, suffix: '%' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Central de controle do Top Templates Brasil</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">3</Badge>
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">
                    {stat.value}{stat.suffix || ''}
                    <span className="text-sm text-muted-foreground font-normal">
                      {!stat.suffix && `/${stat.total}`}
                    </span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stat.value / stat.total) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seções principais */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Seções Principais</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adminSections.map((section, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                    onClick={() => navigate(section.route)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${section.color} transition-colors`}>
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {section.stats}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Atividades recentes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Atividades Recentes</span>
              </CardTitle>
              <CardDescription>Últimas atualizações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações rápidas */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Adicionar Template
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Ver Novos Usuários
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configurações Avançadas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status do sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Status do Sistema</CardTitle>
          <CardDescription>Monitoramento em tempo real</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium">Servidor Web</p>
                <p className="text-sm text-muted-foreground">Online - 99.9% uptime</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium">Base de Dados</p>
                <p className="text-sm text-muted-foreground">Funcionando normalmente</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium">CDN</p>
                <p className="text-sm text-muted-foreground">Velocidade ótima</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;