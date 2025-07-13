// src/data/templates.ts

export const templates = [
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
    image: '/lovable-uploads/3b68387c-40d8-40f8-a7c8-3aef6a5fdb79.png',
    categories: ['Apresentações', '🔥Em alta🔥'],
    tags: ['apresentação', 'moderno', 'corporativo', 'canva', 'slides']
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
    image: '/lovable-uploads/554c6cd2-0a8e-4771-bcad-ca383c01e503.png',
    categories: ['Currículos'],
    tags: ['currículo', 'criativo', 'moderno', 'powerpoint', 'trabalho']
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
    image: '/lovable-uploads/cb4a3ecf-97bf-460b-bc6f-61afbd9778ac.png',
    categories: ['🔥Em alta🔥'],
    tags: ['apresentação', 'corporativa', 'negócios', 'google', 'slides']
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
    image: '/lovable-uploads/d650c6e6-9831-4d95-9f50-c2ab47949c4d.png',
    categories: ['Posts'],
    tags: ['infográfico', 'educativo', 'visual', 'canva', 'design']
  }
];

export const categories = [
  '🔥Em alta🔥', 'Currículos', 'Apresentações', 'Cartões de Visita',
  'Cartões de Aniversário', 'Cartões de Natal', 'Cartões de Casamento',
  'Redes Sociais', 'Sites', 'Story Board', 'Slogans', 'Organogramas',
  'Quadro Branco', 'Posts', 'Logos', 'Cartazes', 'Outros'
];

export const toolFilters = ['Todos', 'Canva', 'PowerPoint', 'Google Presentation'];

export const categoryColors = {
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

export const toolColors = {
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