
import { Product, Review } from '../types';

const TechAssets = {
  ULTRA_ORANGE: 'https://images.unsplash.com/photo-1610017803434-a899398421b3?q=80&w=1200&auto=format&fit=crop',
  SERIES_10_LUX: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop',
  W59_PRO_VIEW: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
  PODS_MAX: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
  BAND_ELITE: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a1b?q=80&w=1200&auto=format&fit=crop',
  TECH_STUDIO: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1200&auto=format&fit=crop'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '12',
    name: 'GS10 Ultra Mini - Series 10 Titanium',
    price: 157.50,
    oldPrice: 349.00,
    description: 'A joia minimalista em Titanium de 41mm. Detalhes reais que impõem respeito.',
    longDescription: 'O GS10 Ultra Mini redefine o conceito de elegância compacta. Com acabamento em Titanium de grau aeroespacial e sensores de 10ª geração, ele é o acessório definitivo para quem não abre mão do status mesmo em punhos menores.',
    features: [
      '✔ Notificações Push (WhatsApp, Insta, FB)',
      '✔ Controle de Pressão Arterial Real',
      '✔ Oximetria Sanguínea Dinâmica',
      '✔ Monitoramento Cardíaco 24/7',
      '✔ Gestos de Atendimento Rápido',
      '✔ Chassi em Titanium Aeroespacial',
      '✔ NFC Integrado para Acessos',
      '✔ Modo Multi-Esportes Avançado',
      '✔ Ciclo Feminino & Sono Profundo',
      '✔ Tela AMOLED 90Hz High-Fluid'
    ],
    specs: { 
      'Tamanho': '41mm Compact', 
      'Material': 'Titanium Grade 2', 
      'Bateria': 'Até 5 dias (Mix)',
      'Resistência': 'IP68 Professional',
      'CPU': 'Dual-Core S10',
      'Compatibilidade': 'iOS/Android'
    },
    image: TechAssets.ULTRA_ORANGE,
    gallery: [TechAssets.ULTRA_ORANGE, TechAssets.SERIES_10_LUX, TechAssets.TECH_STUDIO, TechAssets.ULTRA_ORANGE, TechAssets.SERIES_10_LUX],
    category: 'Smartwatches',
    stock: 8,
    rating: 5.0,
    reviewsCount: 124,
    isNew: true,
    isBestseller: true,
    slug: 'gs10-ultra-mini',
    displayOrder: 1,
    isActive: true
  },
  {
    id: '1',
    name: 'D22 W59 Pro + S9 Exclusive',
    price: 115.50,
    oldPrice: 249.00,
    description: 'A fusão entre design icônico e performance absoluta.',
    longDescription: 'O W59 Pro é o modelo mais desejado da nossa coleção. Sua interface fluida de 90Hz e carregamento por indução entregam a experiência premium que você merece.',
    features: [
      '✔ Chamadas Bluetooth High-Def',
      '✔ Notificações Inteligentes em Tempo Real',
      '✔ Monitoramento Bio-Óptico de Saúde',
      '✔ Controle de Pressão e Sono REM',
      '✔ Assistente de Voz Ativo (Siri)',
      '✔ Carregamento Magnético Indutivo',
      '✔ Remote Music & Photo Control',
      '✔ IP67 Resistente à Água',
      '✔ Cronômetro & Calculadora Elite',
      '✔ +500 Watchfaces na Nuvem'
    ],
    specs: { 
      'Display': '2.2" HD Retina', 
      'CPU': 'S9 High Perf', 
      'Resistência': 'Resistente à Água',
      'Conexão': 'BT 5.2 LE',
      'Sistema': 'D22 OS v4.0'
    },
    image: TechAssets.W59_PRO_VIEW,
    gallery: [TechAssets.W59_PRO_VIEW, TechAssets.SERIES_10_LUX, TechAssets.TECH_STUDIO, TechAssets.W59_PRO_VIEW, TechAssets.SERIES_10_LUX],
    category: 'Smartwatches',
    stock: 12,
    rating: 4.9,
    reviewsCount: 842,
    slug: 'w59-pro-exclusive',
    displayOrder: 2,
    isActive: true
  }
];

// Populando outros produtos
for(let i=3; i<=36; i++) {
    INITIAL_PRODUCTS.push({
        id: `p-${i}`,
        name: `Elite Model X-${i}`,
        price: 120 + (i * 2.5),
        oldPrice: 250 + (i * 5),
        description: 'Tecnologia de ponta com design ergonômico.',
        longDescription: 'A linha X traz o equilíbrio perfeito entre custo e performance extrema para o dia a dia.',
        features: [
            '✔ Notificações Redes Sociais',
            '✔ Sensor de Pressão Arterial',
            '✔ Batimentos Cardíacos',
            '✔ Modo Esporte & Caminhada',
            '✔ Controle de Música Bluetooth'
        ],
        specs: { 'Edição': 'Limitada Elite', 'Versão': '2024' },
        image: TechAssets.BAND_ELITE,
        gallery: [TechAssets.BAND_ELITE, TechAssets.TECH_STUDIO, TechAssets.BAND_ELITE, TechAssets.TECH_STUDIO, TechAssets.BAND_ELITE],
        category: 'Smartwatches',
        stock: 5 + i,
        rating: 4.5 + (Math.random() * 0.5),
        reviewsCount: 10 + i,
        slug: `elite-model-${i}`,
        displayOrder: i,
        isActive: true
    });
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Carlos Mendes',
    rating: 5,
    comment: 'Recebi o GS10 Ultra Mini. A medição de pressão é precisa e as notificações chegam sem atraso nenhum. Melhor compra!',
    date: '15/01/2024',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    productId: '12',
    isVisible: true
  }
];
