import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTool, setSelectedTool] = useState('');

  const allTemplates = [
    {
      id: '1',
      title: 'Fones Premium',
      description: 'Fones de alta qualidade com som premium e design moderno para uma experiência de áudio excepcional.',
      category: 'Eletrônicos',
      date: 'há 2 dias atrás',
      tags: ['fones', 'audio', 'premium', 'música'],
      icon: 'headphones',
      color: 'bg-purple-200',
      tool: 'Canva'
    },
    {
      id: '2',
      title: 'Camiseta Casual',
      description: 'Camiseta casual confortável com design moderno e tecido de alta qualidade para o dia a dia.',
      category: 'Roupas',
      date: 'há 1 dia atrás',
      tags: ['camiseta', 'casual', 'conforto', 'moda'],
      icon: 'shirt',
      color: 'bg-blue-200',
      tool: 'PowerPoint'
    },
    {
      id: '3',
      title: 'Smartphone X',
      description: 'Smartphone de última geração com câmera profissional e performance excepcional para todas as suas necessidades.',
      category: 'Eletrônicos',
      date: 'há 3 dias atrás',
      tags: ['smartphone', 'tecnologia', 'celular', 'comunicação'],
      icon: 'smartphone',
      color: 'bg-indigo-200',
      tool: 'Google Presentation'
    },
    {
      id: '4',
      title: 'Tênis Esportivo',
      description: 'Tênis esportivo com tecnologia avançada para máximo conforto e performance em suas atividades físicas.',
      category: 'Esportes',
      date: 'há 5 dias atrás',
      tags: ['tênis', 'esporte', 'corrida', 'fitness'],
      icon: 'footprints',
      color: 'bg-green-200',
      tool: 'Canva'
    }
  ];

  const categories = ['Todos', 'Eletrônicos', 'Roupas', 'Esportes', 'Currículos', 'Apresentações'];
  const toolFilters = ['Todos', 'Canva', 'PowerPoint', 'Google Presentation'];

  useEffect(() => {
    let results = allTemplates;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'Todos') {
      results = results.filter(template => template.category === selectedCategory);
    }

    // Filter by tool
    if (selectedTool && selectedTool !== 'Todos') {
      results = results.filter(template => template.tool === selectedTool);
    }

    setFilteredResults(results);
  }, [searchTerm, selectedCategory, selectedTool]);

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

  const handleViewTemplate = (templateId: string) => {
    navigate('/');
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

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-primary">Buscar Templates</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Busque por templates, categorias ou palavras-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 text-base"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            {filteredResults.length} resultado(s) encontrado(s)
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
              <p className="w-full text-sm font-medium text-foreground mb-2">Categorias:</p>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSelectedCategory(category === 'Todos' ? '' : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
              <p className="w-full text-sm font-medium text-foreground mb-2">Ferramentas:</p>
              {toolFilters.map((tool) => (
                <Badge
                  key={tool}
                  variant={selectedTool === tool ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSelectedTool(tool === 'Todos' ? '' : tool)}
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResults.map((template) => {
          const getIconName = (iconName: string) => {
            const iconMap: { [key: string]: string } = {
              headphones: '🎧',
              shirt: '👕',
              smartphone: '📱',
              footprints: '👟'
            };
            return iconMap[iconName] || '📄';
          };

          return (
            <Card key={template.id} className="overflow-hidden hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-primary">{template.title}</CardTitle>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
              </CardHeader>
              
              <div className={`h-32 ${template.color} flex items-center justify-center`}>
                <div className="text-4xl">{getIconName(template.icon)}</div>
              </div>
              
              <CardContent className="p-4 space-y-4">
                <p className="text-muted-foreground text-sm">{template.description}</p>
                
                <div className="mb-3">
                  {getPlatformBadge(template.tool)}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button size="sm" onClick={() => handleViewTemplate(template.id)}>
                    Ver Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-muted-foreground">
            Tente ajustar sua busca ou explorar nossas categorias
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;