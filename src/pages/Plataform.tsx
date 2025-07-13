import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { templates, categories as rawCategories, toolFilters as rawToolFilters, categoryColors, toolColors } from '@/data/templates';
import { renderCategoryTag, getPlatformBadge, renderCategoryButton, renderToolButton } from '@/components/templateUtils';

// Garantir que são arrays de string
const categories: string[] = rawCategories;
const toolFilters: string[] = rawToolFilters;

// Criar arrays explícitos para garantir que são string[]
const categoryList: string[] = ['Todos', '🔥Em alta🔥', 'Currículos', 'Apresentações', 'Cartões de Visita', 'Cartões de Aniversário', 'Cartões de Natal', 'Cartões de Casamento', 'Redes Sociais', 'Sites', 'Story Board', 'Slogans', 'Organogramas', 'Quadro Branco', 'Posts', 'Logos', 'Cartazes', 'Outros'];
const toolList: string[] = ['Todos', 'Canva', 'PowerPoint', 'Google Presentation'];

const TemplateCard = ({ template, idx, handleFavoriteToggle, handleSavedToggle, handleViewTemplate, isFavorite, isSaved, renderCategoryTag, getPlatformBadge }) => {
  const images = [
    '/lovable-uploads/3b68387c-40d8-40f8-a7c8-3aef6a5fdb79.png',
    '/lovable-uploads/554c6cd2-0a8e-4771-bcad-ca383c01e503.png',
    '/lovable-uploads/d650c6e6-9831-4d95-9f50-c2ab47949c4d.png',
  ];
  const cardImages = images.map((img, i) => images[(i + idx) % images.length]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isImgHovered, setIsImgHovered] = React.useState(false);
  const goLeft = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + cardImages.length) % cardImages.length);
  };
  const goRight = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % cardImages.length);
  };
  return (
    <Card 
      key={template.id} 
      className="overflow-hidden hover:shadow-hover transition-all duration-300"
      data-template-id={template.id}
    >
      <CardHeader>
        <CardTitle className="text-xl text-primary">{template.title}</CardTitle>
      </CardHeader>
      {/* Carrossel de imagens com navegação manual e fundo reativo */}
      <div
        className={`relative h-40 flex items-center justify-center overflow-visible`}
        onMouseEnter={() => setIsImgHovered(true)}
        onMouseLeave={() => setIsImgHovered(false)}
      >
        {cardImages.map((img, i) => {
          let imgClass = 'transition-transform transition-all duration-[2500ms] ease-in-out';
          if (i === activeIndex) {
            if (isImgHovered) {
              imgClass += ' rounded-xl z-40 object-contain scale-[1.2] opacity-95 shadow-2xl';
            } else {
              imgClass += ' rounded-xl z-30 object-cover scale-75 opacity-100 shadow-lg';
            }
          } else {
            imgClass += ' z-10 scale-100 opacity-0 pointer-events-none';
          }
          return (
            <img
              key={img}
              src={img}
              alt={template.title}
              className={`absolute top-0 left-0 w-full h-full ${imgClass}`}
            />
          );
        })}
        {/* Botões de navegação só no hover */}
        {isImgHovered && (
          <>
            <button
              onClick={goLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-110 hover:shadow-lg rounded-full p-2 shadow z-40 transition-all duration-300"
              style={{ border: 'none' }}
              aria-label="Imagem anterior"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={goRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-110 hover:shadow-lg rounded-full p-2 shadow z-40 transition-all duration-300"
              style={{ border: 'none' }}
              aria-label="Próxima imagem"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </>
        )}
      </div>
      <CardContent className="p-4 space-y-4">
        <p className="text-muted-foreground text-sm">{template.description}</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {template.categories.map(category => renderCategoryTag(category)).filter(tag => tag !== null)}
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
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, addToSaved, removeFromSaved, isFavorite, isSaved } = useApp();
  const { toast } = useToast();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showProModal, setShowProModal] = useState(false);
  const [toolFilter, setToolFilter] = useState('Todos');

  // Cores para cada categoria
  const categoryColors = {
    'Todos': {
      bg: 'bg-gray-700',
      hover: 'hover:bg-gray-800',
      text: 'text-white',
      border: 'border-gray-700'
    },
    '🔥Em alta🔥': {
      bg: 'bg-orange-500',
      hover: 'hover:bg-orange-600',
      text: 'text-white',
      border: 'border-orange-500',
      pulse: true,
      sparkle: true
    },
    'Currículos': {
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      text: 'text-white',
      border: 'border-blue-500'
    },
    'Apresentações': {
      bg: 'bg-purple-500',
      hover: 'hover:bg-purple-600',
      text: 'text-white',
      border: 'border-purple-500'
    },
    'Cartões de Visita': {
      bg: 'bg-green-500',
      hover: 'hover:bg-green-600',
      text: 'text-white',
      border: 'border-green-500'
    },
    'Cartões de Aniversário': {
      bg: 'bg-pink-500',
      hover: 'hover:bg-pink-600',
      text: 'text-white',
      border: 'border-pink-500'
    },
    'Cartões de Natal': {
      bg: 'bg-red-500',
      hover: 'hover:bg-red-600',
      text: 'text-white',
      border: 'border-red-500'
    },
    'Cartões de Casamento': {
      bg: 'bg-rose-500',
      hover: 'hover:bg-rose-600',
      text: 'text-white',
      border: 'border-rose-500'
    },
    'Redes Sociais': {
      bg: 'bg-indigo-500',
      hover: 'hover:bg-indigo-600',
      text: 'text-white',
      border: 'border-indigo-500'
    },
    'Sites': {
      bg: 'bg-teal-500',
      hover: 'hover:bg-teal-600',
      text: 'text-white',
      border: 'border-teal-500'
    },
    'Story Board': {
      bg: 'bg-amber-500',
      hover: 'hover:bg-amber-600',
      text: 'text-white',
      border: 'border-amber-500'
    },
    'Slogans': {
      bg: 'bg-cyan-500',
      hover: 'hover:bg-cyan-600',
      text: 'text-white',
      border: 'border-cyan-500'
    },
    'Organogramas': {
      bg: 'bg-emerald-500',
      hover: 'hover:bg-emerald-600',
      text: 'text-white',
      border: 'border-emerald-500'
    },
    'Quadro Branco': {
      bg: 'bg-slate-500',
      hover: 'hover:bg-slate-600',
      text: 'text-white',
      border: 'border-slate-500'
    },
    'Posts': {
      bg: 'bg-violet-500',
      hover: 'hover:bg-violet-600',
      text: 'text-white',
      border: 'border-violet-500'
    },
    'Logos': {
      bg: 'bg-yellow-500',
      hover: 'hover:bg-yellow-600',
      text: 'text-black',
      border: 'border-yellow-500'
    },
    'Cartazes': {
      bg: 'bg-orange-400',
      hover: 'hover:bg-orange-500',
      text: 'text-white',
      border: 'border-orange-400'
    },
    'Outros': {
      bg: 'bg-gray-500',
      hover: 'hover:bg-gray-600',
      text: 'text-white',
      border: 'border-gray-500'
    }
  };

  // Cores para cada ferramenta
  const toolColors = {
    'Todos': {
      bg: 'bg-gray-700',
      hover: 'hover:bg-gray-800',
      text: 'text-white',
      border: 'border-gray-700'
    },
    'Canva': {
      bg: 'bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400',
      hover: 'hover:from-purple-600 hover:via-blue-600 hover:to-teal-500',
      text: 'text-white',
      border: 'border-transparent'
    },
    'PowerPoint': {
      bg: 'bg-orange-600',
      hover: 'hover:bg-orange-700',
      text: 'text-white',
      border: 'border-orange-600'
    },
    'Google Presentation': {
      bg: 'bg-yellow-400',
      hover: 'hover:bg-yellow-500',
      text: 'text-black',
      border: 'border-yellow-400'
    }
  };

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

  // Adiciona o botão 'Todos' no início das categorias
  const allCategories: string[] = ['Todos', ...categoryList];

  // Função para obter a ordem das categorias para exibição
  const getVisibleCategories = (): string[] => {
    // Garante que todos os itens são string
    if (activeCategory !== 'Todos' && activeCategory !== '🔥Em alta🔥' && allCategories.includes(activeCategory)) {
      return [
        'Todos',
        activeCategory,
        '🔥Em alta🔥',
        ...allCategories.filter(cat => cat !== 'Todos' && cat !== '🔥Em alta🔥' && cat !== activeCategory)
      ];
    } else {
      return [
        'Todos',
        '🔥Em alta🔥',
        ...allCategories.filter(cat => cat !== 'Todos' && cat !== '🔥Em alta🔥')
      ];
    }
  };

  // Ajustar a filtragem para considerar o botão 'Todos' corretamente
  const filteredTemplates = templates.filter(template => {
    const matchTool = toolFilter === 'Todos' || template.tool === toolFilter;
    let matchCategory = true;
    if (activeCategory === '🔥Em alta🔥') {
      matchCategory = template.categories.some(cat => cat.trim().toLowerCase() === '🔥em alta🔥'.toLowerCase());
    } else if (activeCategory !== 'Todos') {
      matchCategory = template.categories.some(cat => cat.trim().toLowerCase() === activeCategory.trim().toLowerCase());
    }
    return matchTool && matchCategory;
  });

  // Remover logs de debug
  // console.log('Categorias dos templates:', templates.map(t => t.categories));
  // console.log('Categoria ativa:', activeCategory);
  // console.log('Tool ativa:', toolFilter);
  // console.log('Templates filtrados:', filteredTemplates);

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
            {(getVisibleCategories().slice(0, 4).map(category =>
              renderCategoryButton(category, activeCategory === category, () => setActiveCategory(category))
            ) as any)}
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
            {(getVisibleCategories().map(category =>
              renderCategoryButton(category, activeCategory === category, () => setActiveCategory(category))
            ) as any)}
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
          {(toolList.map(tool =>
            renderToolButton(tool, toolFilter === tool, () => setToolFilter(tool))
          ) as any)}
        </div>
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Produtos em Destaque</h2>
        {filteredTemplates.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">Nenhum resultado encontrado para esta categoria/ferramenta.</div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template, idx) => (
            <TemplateCard
              key={template.id}
              template={template}
              idx={idx}
              handleFavoriteToggle={handleFavoriteToggle}
              handleSavedToggle={handleSavedToggle}
              handleViewTemplate={handleViewTemplate}
              isFavorite={isFavorite}
              isSaved={isSaved}
              renderCategoryTag={renderCategoryTag}
              getPlatformBadge={getPlatformBadge}
            />
          ))}
        </div>
        )}
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