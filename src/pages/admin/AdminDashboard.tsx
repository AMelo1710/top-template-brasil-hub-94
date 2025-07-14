import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, ShoppingCart, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { users } from '@/data/users';
import { templates } from '@/data/templates';
import { productCodes } from '@/data/products';

const AdminDashboard = () => {
  // Estatísticas simuladas
  const totalUsers = users.length;
  const totalTemplates = templates.length;
  const totalSales = productCodes.filter(code => code.usageStatus === 'invalid').length;
  const totalRevenue = totalSales * 35.90; // Preço médio

  const stats = [
    {
      title: "Total de Usuários",
      value: totalUsers.toString(),
      description: "+12% do mês passado",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Templates Disponíveis",
      value: totalTemplates.toString(),
      description: "+3 novos esta semana",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Vendas Realizadas",
      value: totalSales.toString(),
      description: "+8% do mês passado",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Receita Total",
      value: `R$ ${totalRevenue.toFixed(2)}`,
      description: "+15% do mês passado",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const recentActivities = [
    { action: "Novo usuário cadastrado", user: "João Silva", time: "há 2 horas" },
    { action: "Template comprado", template: "Currículo Criativo", time: "há 3 horas" },
    { action: "Novo template adicionado", template: "Apresentação Corporativa", time: "há 5 horas" },
    { action: "Código utilizado", code: "PREMIUM2025", time: "há 1 dia" },
  ];

  const popularTemplates = templates.slice(0, 5).map((template, index) => ({
    ...template,
    views: Math.floor(Math.random() * 1000) + 100,
    sales: Math.floor(Math.random() * 50) + 10,
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Visão geral do sistema Top Templates Brasil</p>
      </div>

      {/* Estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user || activity.template || activity.code} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates populares */}
        <Card>
          <CardHeader>
            <CardTitle>Templates Mais Populares</CardTitle>
            <CardDescription>Templates com mais visualizações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularTemplates.map((template, index) => (
                <div key={template.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{template.title}</p>
                      <p className="text-xs text-muted-foreground">{template.tool}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      <span>{template.views}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{template.sales} vendas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de vendas (simulado) */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
          <CardDescription>Evolução diária das vendas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end justify-between space-x-2">
            {[12, 19, 15, 25, 22, 30, 28].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-t-md transition-all duration-300 hover:bg-primary/80"
                  style={{ height: `${(value / 30) * 160}px` }}
                ></div>
                <span className="text-xs text-muted-foreground mt-2">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
                </span>
                <span className="text-xs font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;