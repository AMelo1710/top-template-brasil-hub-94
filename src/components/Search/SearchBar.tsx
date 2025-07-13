import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Filter } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  resultsCount: number;
}

export default function SearchBar({ searchTerm, setSearchTerm, showFilters, setShowFilters, resultsCount }: SearchBarProps) {
  return (
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
          {resultsCount} resultado(s) encontrado(s)
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
    </div>
  );
} 