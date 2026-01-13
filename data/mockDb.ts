
import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cronos Horizon G3',
    price: 897.00,
    oldPrice: 1240.00,
    description: 'O equilíbrio perfeito entre sofisticação executiva e monitoramento de saúde de elite.',
    longDescription: 'Desenvolvido para profissionais que não aceitam menos que o extraordinário. O Horizon G3 combina um corpo em titânio aeroespacial com o processador S9 de última geração. Monitore seu estresse, sono e performance cardíaca com precisão médica.',
    features: [
      'Bateria de 14 dias',
      'Monitoramento ECG de alta precisão',
      'Display AMOLED 1.5" Always-on',
      'Chamadas via Bluetooth cristalinas'
    ],
    specs: {
      'Material': 'Titânio Aeroespacial',
      'Resistência': '5ATM (50 metros)',
      'Sensores': 'BioTracker 4.0, GPS Dual-Band',
      'Compatibilidade': 'iOS & Android'
    },
    image: 'https://images.unsplash.com/photo-1508685096489-7aac291bd5b3?q=80&w=800&auto=format&fit=crop',
    category: 'Business',
    stock: 12,
    rating: 4.9,
    reviewsCount: 124,
    isBestseller: true,
    isActive: true,
    slug: 'cronos-horizon-g3',
    displayOrder: 1
  },
  {
    id: '2',
    name: 'Stealth Velocity Pro',
    price: 649.00,
    oldPrice: 799.00,
    description: 'Leveza extrema para quem vive em movimento. O parceiro ideal para sua performance esportiva.',
    longDescription: 'Projetado para atletas de alta performance. Com apenas 28g, você nem sentirá o Velocity Pro no pulso, enquanto ele registra cada batimento, cadência e nível de oxigênio no sangue. Transforme seu treino com dados reais.',
    features: [
      'Mais de 150 modos esportivos',
      'GPS Integrado de alta precisão',
      'Resistência à água IP68',
      'Medição de SpO2 24h'
    ],
    specs: {
      'Material': 'Polímero de Carbono',
      'Peso': '28g',
      'Tela': 'TFT 1.43" Anti-risco',
      'Bateria': '10 dias em uso intenso'
    },
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81846?q=80&w=800&auto=format&fit=crop',
    category: 'Sport',
    stock: 5,
    rating: 4.8,
    reviewsCount: 89,
    isNew: true,
    isActive: true,
    slug: 'stealth-velocity-pro',
    displayOrder: 2
  },
  {
    id: '3',
    name: 'Titan Force Ultra',
    price: 1599.00,
    oldPrice: 1999.00,
    description: 'Indestrutível. O smartwatch definitivo para exploração e condições extremas.',
    longDescription: 'Certificação militar MIL-STD-810H. O Titan Force Ultra resiste a temperaturas de -40°C a 70°C. Com tela de Safira e corpo reforçado, é o único que te acompanha do Everest ao fundo do oceano.',
    features: [
      'Vidro de Safira',
      'Bateria de até 30 dias',
      'Lanterna LED integrada',
      'Sirene de emergência 86dB'
    ],
    specs: {
      'Material': 'Aço Inoxidável 316L',
      'Resistência': '10ATM (100 metros)',
      'GPS': 'L1 + L5 Quad-Satellite',
      'Tela': 'OLED 2.0" 1000 nits'
    },
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop',
    category: 'Ultra',
    stock: 8,
    rating: 5.0,
    reviewsCount: 42,
    isActive: true,
    slug: 'titan-force-ultra',
    displayOrder: 3
  },
  {
    id: '4',
    name: 'Elegance Ivory Smart',
    price: 749.00,
    oldPrice: 949.00,
    description: 'Estilo clássico, alma inteligente. O relógio que combina com qualquer traje.',
    longDescription: 'A beleza de um relógio analógico clássico com o poder da inteligência moderna. Receba notificações discretas e acompanhe seu ciclo de saúde com elegância incomparável.',
    features: [
      'Pulseira de couro legítimo italiano',
      'Notificações inteligentes',
      'Design ultrafino de 8.5mm',
      'Carregamento magnético rápido'
    ],
    specs: {
      'Material': 'Zinco Polido',
      'Vidro': 'Mineral Temperado',
      'Display': 'Circular 1.28"',
      'Cor': 'Marfim / Ouro Rosé'
    },
    image: 'https://images.unsplash.com/photo-1544117518-30dd5ff7a4b0?q=80&w=800&auto=format&fit=crop',
    category: 'Classic',
    stock: 15,
    rating: 4.7,
    reviewsCount: 56,
    isActive: true,
    slug: 'elegance-ivory-smart',
    displayOrder: 4
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Ricardo Silva',
    rating: 5,
    comment: 'O Horizon G3 superou todas as minhas expectativas. A bateria realmente dura muito e o design no pulso é impecável. Entrega muito rápida.',
    date: '15 de Outubro, 2023',
    avatar: 'https://i.pravatar.cc/150?u=r1',
    productId: '1',
    isVisible: true
  },
  {
    id: 'r2',
    userName: 'Juliana Mendes',
    rating: 5,
    comment: 'Finalmente um smartwatch que não parece um brinquedo de plástico. O Elegance Ivory é lindo e as funções de saúde são bem precisas.',
    date: '02 de Novembro, 2023',
    avatar: 'https://i.pravatar.cc/150?u=r2',
    productId: '4',
    isVisible: true
  },
  {
    id: 'r3',
    userName: 'Marcos Oliveira',
    rating: 4,
    comment: 'Comprei o Velocity Pro para correr e o GPS é fantástico. Só senti falta de mais opções de pulseira na caixa.',
    date: '20 de Outubro, 2023',
    avatar: 'https://i.pravatar.cc/150?u=r3',
    productId: '2',
    isVisible: true
  }
];
