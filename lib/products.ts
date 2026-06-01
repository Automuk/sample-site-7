export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  details: string[];
  materials: string;
  dimensions: string;
  inStock: boolean;
  featured: boolean;
  badge?: string;
};

export const categories = [
  { label: "All", value: "all" },
  { label: "Living Room", value: "living-room" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Lighting", value: "lighting" },
  { label: "Textiles", value: "textiles" },
  { label: "Decor", value: "decor" },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "linden-sofa",
    name: "Linden Sofa",
    category: "living-room",
    price: 1895,
    description: "A sculptural sofa that blends comfort with refined minimalism.",
    longDescription:
      "The Linden Sofa is a statement piece designed for those who believe a living room should be both beautiful and livable. Its wide arms and deep seat invite you to settle in, while the solid oak legs keep the silhouette grounded and elegant. Upholstered in a performance-grade linen blend that resists daily wear without sacrificing the soft, natural texture we love.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
      "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=900&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80",
    ],
    details: ["Solid oak frame", "Performance linen blend", "Removable seat cushions", "Available in 3 colourways"],
    materials: "Solid oak, performance linen blend (68% linen, 32% polyester)",
    dimensions: "W 228cm × D 96cm × H 78cm. Seat H 43cm",
    inStock: true,
    featured: true,
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "harlow-dining-table",
    name: "Harlow Dining Table",
    category: "living-room",
    price: 2450,
    description: "Live-edge walnut dining table, each piece one of a kind.",
    longDescription:
      "Cut from a single walnut slab, the Harlow Dining Table preserves the natural edge of the wood — no two tables are ever identical. The hairpin steel legs provide an industrial counterpoint, keeping the organic form from feeling too rustic. Seats up to eight comfortably.",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=900&q=80",
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=900&q=80",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80",
    ],
    details: ["Live-edge walnut slab", "Blackened steel hairpin legs", "Seats 6–8", "Oil finish"],
    materials: "American black walnut, blackened mild steel",
    dimensions: "W 220cm × D 95cm × H 76cm",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    slug: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    category: "lighting",
    price: 345,
    description: "Brushed brass arc lamp with a marble base and linen shade.",
    longDescription:
      "The Arc Floor Lamp brings the warmth of brass and the solidity of marble into one sculptural form. The long arc arm casts soft, directional light perfect for reading corners or highlighting a sofa. The weighted marble base ensures stability, while the natural linen shade diffuses the light into something warm and inviting.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35f8bb26?w=900&q=80",
    ],
    details: ["Brushed brass arm", "Carrara marble base", "Linen drum shade", "E27 bulb (not included)"],
    materials: "Brushed brass-plated steel, Carrara marble, natural linen",
    dimensions: "H 165cm, Shade Ø 38cm, Base Ø 26cm",
    inStock: true,
    featured: true,
    badge: "New",
  },
  {
    id: "4",
    slug: "cove-bed-frame",
    name: "Cove Bed Frame",
    category: "bedroom",
    price: 1650,
    description: "A low-profile bed in solid white oak with a padded linen headboard.",
    longDescription:
      "The Cove Bed Frame redefines the bedroom with a grounded, architectural silhouette. The padded linen headboard is generously proportioned — perfect for leaning back with a book. The low profile and splayed solid oak legs keep the room feeling open and airy. Available in Queen and King.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&q=80",
    ],
    details: ["Solid white oak frame", "Padded linen headboard", "Centre support rail", "Available: Queen, King"],
    materials: "Solid white oak, linen upholstery, high-density foam",
    dimensions: "Queen: W 168cm × L 216cm × H 95cm (headboard)",
    inStock: true,
    featured: false,
  },
  {
    id: "5",
    slug: "rattan-pendant-light",
    name: "Rattan Pendant Light",
    category: "lighting",
    price: 295,
    description: "Handwoven rattan pendant that casts dappled warm light.",
    longDescription:
      "Made by artisans in Southeast Asia, this pendant light is woven by hand from sustainable rattan. The intricate weave creates a beautiful pattern of light and shadow when lit — turning any ceiling into something interesting. Works beautifully over a dining table or in clusters above a bed.",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=900&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=900&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35f8bb26?w=900&q=80",
    ],
    details: ["Handwoven rattan", "3m fabric cord included", "E27 fitting", "Indoor use only"],
    materials: "Natural rattan, cotton cord",
    dimensions: "Ø 46cm × H 38cm",
    inStock: true,
    featured: false,
    badge: "Handmade",
  },
  {
    id: "6",
    slug: "marble-side-table",
    name: "Marble Side Table",
    category: "living-room",
    price: 620,
    description: "White Carrara marble top on a slender brushed brass frame.",
    longDescription:
      "Small but striking, the Marble Side Table is the kind of piece that elevates a whole corner. The genuine Carrara marble slab sits atop a hand-welded brushed brass frame, slightly angled for visual tension. Each marble top is unique in its natural veining.",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    ],
    details: ["Genuine Carrara marble top", "Hand-welded brass frame", "Each piece unique", "Not dishwasher safe"],
    materials: "Carrara marble, brushed brass-plated steel",
    dimensions: "Ø 42cm × H 55cm",
    inStock: true,
    featured: false,
  },
  {
    id: "7",
    slug: "linen-duvet-cover",
    name: "Linen Duvet Cover",
    category: "textiles",
    price: 225,
    originalPrice: 280,
    description: "Stone-washed European flax linen in a palette of earthy tones.",
    longDescription:
      "Our Linen Duvet Cover is made from 100% European flax linen, stone-washed for a naturally relaxed, worn-in feel from day one. It gets softer with every wash. Available in six earthy, understated colourways that work beautifully with any bedroom palette.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&q=80",
    ],
    details: ["100% European flax linen", "OEKO-TEX certified", "Stone-washed", "Machine washable 40°C"],
    materials: "100% European flax linen",
    dimensions: "Double: 200×200cm / King: 220×240cm",
    inStock: true,
    featured: false,
    badge: "Sale",
  },
  {
    id: "8",
    slug: "walnut-bookshelf",
    name: "Walnut Bookshelf",
    category: "living-room",
    price: 980,
    description: "Open-shelf bookcase in American black walnut — minimal and stately.",
    longDescription:
      "The Walnut Bookshelf is built to display books and objects the way a museum displays art. Five open shelves in solid American black walnut, jointed without visible hardware. The dark, rich grain develops a deeper patina over time, making the piece feel more alive the longer you own it.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=900&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    ],
    details: ["Solid American black walnut", "5 adjustable shelves", "Wall-mount anchors included", "Oil finish"],
    materials: "Solid American black walnut, oil finish",
    dimensions: "W 100cm × D 30cm × H 210cm",
    inStock: false,
    featured: false,
    badge: "Out of Stock",
  },
  {
    id: "9",
    slug: "ceramic-vase-set",
    name: "Ceramic Vase Set",
    category: "decor",
    price: 125,
    description: "A trio of hand-thrown stoneware vases in warm terracotta glaze.",
    longDescription:
      "Each piece in this set is hand-thrown and glazed by potters in Lisbon, Portugal. No two sets are exactly alike — slight variations in form and glaze colour are part of what makes them special. The terracotta tone brings warmth to any shelf, table, or windowsill.",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80",
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=900&q=80",
    ],
    details: ["Set of 3", "Hand-thrown stoneware", "Made in Lisbon, Portugal", "Dishwasher safe"],
    materials: "Stoneware, terracotta reactive glaze",
    dimensions: "Small: H 14cm / Medium: H 22cm / Large: H 30cm",
    inStock: true,
    featured: false,
    badge: "Handmade",
  },
  {
    id: "10",
    slug: "wool-area-rug",
    name: "Wool Area Rug",
    category: "textiles",
    price: 485,
    description: "Hand-knotted Moroccan wool rug in a muted geometric pattern.",
    longDescription:
      "Woven by Berber artisans in the Atlas Mountains of Morocco, this area rug is built to last generations. The thick pile of undyed natural wool creates subtle tonal variation across the geometric pattern. It softens the acoustics of a room while grounding the furniture around it.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=900&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
    ],
    details: ["Hand-knotted wool pile", "Made in Morocco", "Low shedding", "Professional clean recommended"],
    materials: "100% undyed natural wool",
    dimensions: "200×290cm",
    inStock: true,
    featured: false,
  },
  {
    id: "11",
    slug: "linen-pillow-set",
    name: "Linen Pillow Set",
    category: "textiles",
    price: 89,
    description: "Set of two stone-washed linen cushion covers, 50×50cm.",
    longDescription:
      "Pair with our Linen Duvet Cover for a cohesive bedroom look, or mix with contrasting textures in the living room. Stone-washed for softness, made from the same certified European flax as all our textiles.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
    ],
    details: ["Set of 2 covers", "100% European flax linen", "Hidden zip closure", "50×50cm"],
    materials: "100% European flax linen, stone-washed",
    dimensions: "50×50cm (inserts not included)",
    inStock: true,
    featured: false,
  },
  {
    id: "12",
    slug: "oak-nightstand",
    name: "Oak Nightstand",
    category: "bedroom",
    price: 390,
    description: "Solid white oak bedside table with a single floating drawer.",
    longDescription:
      "The Oak Nightstand is a study in restraint. A single floating drawer on a solid white oak body — nothing extra, nothing missing. Push-to-open mechanism keeps the front face clean and uninterrupted. The finger-jointed corners showcase the wood grain.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&q=80",
    ],
    details: ["Solid white oak", "Push-to-open drawer", "Finger-jointed construction", "Oil finish"],
    materials: "Solid white oak, oil finish",
    dimensions: "W 45cm × D 40cm × H 52cm",
    inStock: true,
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
