import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { templates, categories as rawCategories, toolFilters as rawToolFilters, categoryColors, toolColors } from '@/data/templates';
// Garantir que são arrays de string
const categories: string[] = rawCategories;
const toolFilters: string[] = rawToolFilters;

// Criar arrays explícitos para garantir que são string[]
const categoryList: string[] = ['Todos', '🔥Em alta🔥', 'Currículos', 'Apresentações', 'Cartões de Visita', 'Cartões de Aniversário', 'Cartões de Natal', 'Cartões de Casamento', 'Redes Sociais', 'Sites', 'Story Board', 'Slogans', 'Organogramas', 'Quadro Branco', 'Posts', 'Logos', 'Cartazes', 'Outros'];
const toolList: string[] = ['Todos', 'Canva', 'PowerPoint', 'Google Presentation'];
import TemplateCard from '@/components/TemplateCard';
import { useApp } from '@/contexts/AppContext';
import { renderCategoryTag, getPlatformBadge, renderCategoryButton, renderToolButton } from '@/components/templateUtils';

const Search = () => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, addToSaved, removeFromSaved, isFavorite, isSaved } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTool, setSelectedTool] = useState('Todos');

  useEffect(() => {
    let results = templates;
    if (searchTerm) {
      results = results.filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory && selectedCategory !== 'Todos') {
      results = results.filter(template => template.categories.some(cat => cat === selectedCategory));
    }
    if (selectedTool && selectedTool !== 'Todos') {
      results = results.filter(template => template.tool === selectedTool);
    }
    setFilteredResults(results);
  }, [searchTerm, selectedCategory, selectedTool]);

  const handleFavoriteToggle = (template: any) => {
    if (isFavorite(template.id)) {
      removeFromFavorites(template.id);
    } else {
      addToFavorites(template);
    }
  };

  const handleSavedToggle = (template: any) => {
    if (isSaved(template.id)) {
      removeFromSaved(template.id);
    } else {
      addToSaved(template);
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
        {showFilters && (
          <div className="space-y-4">
            <div>
              <p className="w-full text-sm font-medium text-foreground mb-2">Categorias:</p>
              <div className="flex flex-wrap gap-2">
                {(categoryList.map(category =>
                  renderCategoryButton(category, selectedCategory === category, () => setSelectedCategory(category))
                ) as any)}
              </div>
            </div>
            <div>
              <p className="w-full text-sm font-medium text-foreground mb-2">Ferramentas:</p>
              <div className="flex flex-wrap gap-2">
                {(toolList.map(tool =>
                  renderToolButton(tool, selectedTool === tool, () => setSelectedTool(tool))
                ) as any)}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Search Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResults.map((template, idx) => (
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
            showActions={true}
            showDate={true}
            showTags={true}
          />
        ))}
      </div>
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