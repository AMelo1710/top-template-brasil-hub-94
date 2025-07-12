import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, addToSaved, removeFromSaved, isFavorite, isSaved } = useApp();
  const { toast } = useToast();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState('🔥Em alta🔥');
  const [showProModal, setShowProModal] = useState(false);
  const [toolFilter, setToolFilter] = useState('Todos');

  const categories = [
    '🔥Em alta🔥', 'Currículos', 'Apresentações', 'Cartões de Visita',
    'Cartões de Aniversário', 'Cartões de Natal', 'Cartões de Casamento',
    'Redes Sociais', 'Sites', 'Story Board', 'Slogans', 'Organogramas',
    'Quadro Branco', 'Posts', 'Logos', 'Cartazes', 'Outros'
  ];

  const toolFilters = ['Todos', 'Canva', 'PowerPoint', 'Google Presentation'];

  const templates = [
    {
      id: '1',
      title: 'Template Moderno',
      description: 'Template moderno e elegante com design profissional para suas apresentações corporativas.',
      icon: 'presentation',
      color: 'bg-purple-200',
      iconColor: 'text-purple-600',
      date: 'há 2 dias atrás',
      price: 29.90,
      tool: 'Canva',
      image: '/lovable-uploads/3b68387c-40d8-40f8-a7c8-3aef6a5fdb79.png'
    },
    {
      id: '2',
      title: 'Currículo Criativo',
      description: 'Currículo criativo e moderno para se destacar no mercado de trabalho.',
      icon: 'filetext',
      color: 'bg-blue-200',
      iconColor: 'text-blue-600',
      date: 'há 1 dia atrás',
      price: 19.90,
      tool: 'PowerPoint',
      image: '/lovable-uploads/554c6cd2-0a8e-4771-bcad-ca383c01e503.png'
    },
    {
      id: '3',
      title: 'Apresentação Corporativa',
      description: 'Apresentação corporativa elegante com slides profissionais para suas reuniões de negócios.',
      icon: 'briefcase',
      color: 'bg-indigo-200',
      iconColor: 'text-indigo-600',
      date: 'há 3 dias atrás',
      price: 39.90,
      tool: 'Google Presentation',
      image: '/lovable-uploads/cb4a3ecf-97bf-460b-bc6f-61afbd9778ac.png'
    },
    {
      id: '4',
      title: 'Infográfico Educativo',
      description: 'Infográfico educativo com design moderno para transmitir informações de forma visual e atrativa.',
      icon: 'chartbar',
      color: 'bg-green-200',
      iconColor: 'text-green-600',
      date: 'há 5 dias atrás',
      price: 24.90,
      tool: 'Canva',
      image: '/lovable-uploads/d650c6e6-9831-4d95-9f50-c2ab47949c4d.png'
    }
  ];

  const handleFavoriteToggle = (template: any) => {
    if (isFavorite(template.id)) {
      removeFromFavorites(template.id);
      toast({
        title: "Removido dos favoritos",
        description: `${template.title} foi removido dos seus favoritos.`,
      });
    } else {
      addToFavorites(template);
      toast({
        title: "Adicionado aos favoritos",
        description: `${template.title} foi adicionado aos seus favoritos.`,
      });
    }
  };

  const handleSavedToggle = (template: any) => {
    if (isSaved(template.id)) {
      removeFromSaved(template.id);
      toast({
        title: "Removido dos salvos",
        description: `${template.title} foi removido dos seus salvos.`,
      });
    } else {
      addToSaved(template);
      toast({
        title: "Salvo com sucesso",
        description: `${template.title} foi salvo para visualização posterior.`,
      });
    }
  };

  const handleViewTemplate = (templateId: string) => {
    // Navegar para o início e piscar o template
    navigate('/plataform', { state: { highlightTemplateId: templateId } });
    setTimeout(() => {
      const templateElement = document.querySelector(`[data-template-id="${templateId}"]`);
      if (templateElement) {
        templateElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        templateElement.classList.add('animate-pulse');
        setTimeout(() => {
          templateElement.classList.remove('animate-pulse');
        }, 2000);
      }
    }, 100);
  };

  const handleAccessWithoutAds = () => {
    setShowProModal(true);
  };

  const handleGoToCart = () => {
    setShowProModal(false);
    navigate('/cart');
    // Piscar o produto "Remover Anúncios"
    setTimeout(() => {
      const noAdsProduct = document.querySelector('[data-product="no-ads"]');
      if (noAdsProduct) {
        noAdsProduct.classList.add('animate-pulse');
        setTimeout(() => {
          noAdsProduct.classList.remove('animate-pulse');
        }, 2000);
      }
    }, 100);
  };

  const getIconName = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      presentation: '📊',
      filetext: '📄',
      briefcase: '💼',
      chartbar: '📈'
    };
    return iconMap[iconName] || '📄';
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Google Presentation':
        return (
          <span 
            className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1"
            style={{ backgroundColor: '#FFC107' }}
          >
            {platform}
          </span>
        );
      case 'Canva':
        return (
          <span 
            className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1"
            style={{ background: 'linear-gradient(135deg, #823AF3, #4B66E1, #01F1C4)' }}
          >
            {platform}
          </span>
        );
      case 'PowerPoint':
        return (
          <span 
            className="inline-block px-2 py-1 text-xs font-medium text-white rounded-full mr-1"
            style={{ backgroundColor: '#E64A19' }}
          >
            {platform}
          </span>
        );
      default:
        return (
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-500 text-white rounded-full mr-1">
            {platform}
          </span>
        );
    }
  };

  const filteredTemplates = toolFilter === 'Todos' 
    ? templates 
    : templates.filter(template => template.tool === toolFilter);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-hero text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2">Bem-vindo de volta!</h2>
          <p className="mb-4 opacity-90">
            Confira nossas novidades de designs separados por categorias e as melhores ofertas em nossa plataforma que há anos ajuda a criar apresentações incríveis e melhorar a qualidade na forma de como você se apresenta.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/plataform/cart')}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Ver Ofertas
          </Button>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center justify-center md:justify-start">
          <span className="mr-2">🏷️</span>
          Categorias
          <span className="ml-2">📚</span>
        </h2>
        
        {!showAllCategories ? (
          <div className="flex justify-center md:justify-start space-x-4 overflow-x-auto pb-2">
            {categories.slice(0, 3).map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="flex-shrink-0 rounded-full"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
            <Button 
              variant="secondary" 
              className="flex-shrink-0 rounded-full"
              onClick={() => setShowAllCategories(true)}
            >
              Ver mais
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
            <Button 
              variant="secondary" 
              className="rounded-full"
              onClick={() => setShowAllCategories(false)}
            >
              Ocultar
            </Button>
          </div>
        )}
      </div>

      {/* Tool Filters */}
      <div>
        <h3 className="text-md font-medium text-foreground mb-3">Filtrar por ferramenta</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {toolFilters.map((tool) => (
            <Button
              key={tool}
              variant={toolFilter === tool ? "default" : "outline"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setToolFilter(tool)}
            >
              {tool}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="overflow-hidden hover:shadow-hover transition-all duration-300"
              data-template-id={template.id}
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary">{template.title}</CardTitle>
              </CardHeader>
              
              <div className={`h-32 ${template.color} flex items-center justify-center relative overflow-hidden`}>
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl">{getIconName(template.icon)}</div>
                )}
              </div>
              
              <CardContent className="p-4 space-y-4">
                <p className="text-muted-foreground text-sm">{template.description}</p>
                
                <div className="mb-3">
                  {getPlatformBadge(template.tool)}
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full">
                    Acessar este design
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-primary"
                    onClick={() => handleViewTemplate(template.id)}
                  >
                    Acessar este design sem anúncios
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{template.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleFavoriteToggle(template)}
                      className={isFavorite(template.id) ? 'text-red-500' : 'text-muted-foreground'}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(template.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleSavedToggle(template)}
                      className={isSaved(template.id) ? 'text-blue-500' : 'text-muted-foreground'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved(template.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showProModal} onOpenChange={setShowProModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Versão Pro</DialogTitle>
            <DialogDescription>
              Assine a versão Pro e poderá acessar todos os templates sem anúncios, com recursos premium e suporte prioritário.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGoToCart}>
              Ver Planos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;