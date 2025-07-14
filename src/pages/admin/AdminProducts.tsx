import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, MoreHorizontal, Edit, Trash, Eye, Image, Star } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { templates, categories, toolFilters } from '@/data/templates';
import { useToast } from '@/hooks/use-toast';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [toolFilter, setToolFilter] = useState('all');
  const { toast } = useToast();

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || 
      template.categories.includes(categoryFilter);
    
    const matchesTool = toolFilter === 'all' || template.tool === toolFilter;
    
    return matchesSearch && matchesCategory && matchesTool;
  });

  const handleTemplateAction = (templateId: string, action: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    switch (action) {
      case 'edit':
        toast({
          title: "Editar template",
          description: `Editando "${template.title}"`,
        });
        break;
      case 'delete':
        toast({
          title: "Excluir template",
          description: `"${template.title}" será excluído.`,
          variant: "destructive",
        });
        break;
      case 'view':
        toast({
          title: "Visualizar template",
          description: `Abrindo "${template.title}"`,
        });
        break;
      case 'duplicate':
        toast({
          title: "Duplicar template",
          description: `"${template.title}" foi duplicado.`,
        });
        break;
    }
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const getToolColor = (tool: string) => {
    switch (tool) {
      case 'Canva':
        return 'bg-purple-100 text-purple-800';
      case 'PowerPoint':
        return 'bg-orange-100 text-orange-800';
      case 'Google Presentation':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Templates</h1>
          <p className="text-muted-foreground">Controle total sobre os templates disponíveis</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Template
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-sm text-muted-foreground">Total de Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {templates.filter(t => t.tool === 'Canva').length}
            </div>
            <p className="text-sm text-muted-foreground">Templates Canva</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {templates.filter(t => t.tool === 'PowerPoint').length}
            </div>
            <p className="text-sm text-muted-foreground">Templates PowerPoint</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {templates.filter(t => t.tool === 'Google Presentation').length}
            </div>
            <p className="text-sm text-muted-foreground">Templates Google</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por título, descrição ou tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={toolFilter} onValueChange={setToolFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ferramenta" />
              </SelectTrigger>
              <SelectContent>
                {toolFilters.map(tool => (
                  <SelectItem key={tool} value={tool === 'Todos' ? 'all' : tool}>
                    {tool}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de templates */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Templates ({filteredTemplates.length})</CardTitle>
          <CardDescription>
            Gerencie todos os templates disponíveis na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Ferramenta</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                        <Image className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{template.title}</div>
                        <div className="text-sm text-muted-foreground max-w-[300px] truncate">
                          {template.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {template.categories.slice(0, 2).map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {template.categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getToolColor(template.tool)}>
                      {template.tool}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(template.price)}
                  </TableCell>
                  <TableCell>{template.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Ativo
                      </Badge>
                      {template.categories.includes('🔥Em alta🔥') && (
                        <Star className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleTemplateAction(template.id, 'view')}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTemplateAction(template.id, 'edit')}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTemplateAction(template.id, 'duplicate')}>
                          <Plus className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleTemplateAction(template.id, 'delete')}
                          className="text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;