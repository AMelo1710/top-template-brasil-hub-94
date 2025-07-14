import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, MoreHorizontal, Eye, Package, CreditCard, TrendingUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { productCodes, products } from '@/data/products';
import { users } from '@/data/users';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  userId: string;
  productType: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: string;
  date: Date;
  code?: string;
}

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const { toast } = useToast();

  // Simular pedidos baseados nos códigos usados
  const orders: Order[] = productCodes
    .filter(code => code.usageStatus === 'invalid' && code.usedBy)
    .map((code, index) => {
      const product = products.find(p => p.id === code.productType);
      return {
        id: `ORD-${1000 + index}`,
        userId: code.usedBy!,
        productType: code.productType,
        amount: product?.price || 0,
        status: Math.random() > 0.1 ? 'completed' : 'processing' as any,
        paymentMethod: ['PIX', 'Cartão de Crédito', 'Boleto'][Math.floor(Math.random() * 3)],
        date: code.usedAt || new Date(),
        code: code.code
      };
    });

  const filteredOrders = orders.filter(order => {
    const user = users.find(u => u.id === order.userId);
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.code?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOrderAction = (orderId: string, action: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    switch (action) {
      case 'view':
        toast({
          title: "Visualizar pedido",
          description: `Abrindo detalhes do pedido ${order.id}`,
        });
        break;
      case 'process':
        toast({
          title: "Processar pedido",
          description: `Pedido ${order.id} está sendo processado.`,
        });
        break;
      case 'cancel':
        toast({
          title: "Cancelar pedido",
          description: `Pedido ${order.id} foi cancelado.`,
          variant: "destructive",
        });
        break;
    }
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'processing':
        return 'Processando';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Pedidos</h1>
          <p className="text-muted-foreground">Controle total sobre vendas e pedidos</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">{completedOrders}</div>
                <p className="text-sm text-muted-foreground">Pedidos Concluídos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
                <p className="text-sm text-muted-foreground">Pedidos Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por ID, cliente ou código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos ({filteredOrders.length})</CardTitle>
          <CardDescription>
            Gerencie todos os pedidos realizados na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID do Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const user = users.find(u => u.id === order.userId);
                const product = products.find(p => p.id === order.productType);
                
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.id}</div>
                      {order.code && (
                        <div className="text-sm text-muted-foreground">
                          Código: {order.code}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {user?.fullName?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="font-medium">{user?.fullName || 'Usuário não encontrado'}</div>
                          <div className="text-sm text-muted-foreground">{user?.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{product?.title}</div>
                      <div className="text-sm text-muted-foreground">{order.productType}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(order.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOrderAction(order.id, 'view')}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          {order.status === 'pending' && (
                            <DropdownMenuItem onClick={() => handleOrderAction(order.id, 'process')}>
                              <Package className="mr-2 h-4 w-4" />
                              Processar
                            </DropdownMenuItem>
                          )}
                          {order.status !== 'cancelled' && order.status !== 'completed' && (
                            <DropdownMenuItem 
                              onClick={() => handleOrderAction(order.id, 'cancel')}
                              className="text-destructive"
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Cancelar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;