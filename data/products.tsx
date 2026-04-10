export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: {
    label: "Individual" | "Médio (500g)" | "Grande (1kg)";
    price: number;
  }[];
}

export const pudins: Product[] = [
    {
    id: "tradicional",
    name: "Pudim Tradicional",
    description: "O clássico pudim de leite condensado com calda de caramelo dourado.",
    image: "/pudim-tradicional.jpg",
    sizes: [
      { label: "Individual", price: 12 },
      { label: "Médio (500g)", price: 28 },
      { label: "Grande (1kg)", price: 48 },
    ],
  },
  {
    id: "chocolate",
    name: "Pudim de Chocolate",
    description: "Pudim cremoso com chocolate belga e calda intensa.",
    image: "/pudim-chocolate.jpg",
    sizes: [
      { label: "Individual", price: 14 },
      { label: "Médio (500g)", price: 32 },
      { label: "Grande (1kg)", price: 55 },
    ],
  },
  {
    id: "coco",
    name: "Pudim de Coco",
    description: "Pudim tropical com coco ralado e leite de coco fresco.",
    image: "/pudim-coco.jpg",
    sizes: [
      { label: "Individual", price: 13 },
      { label: "Médio (500g)", price: 30 },
      { label: "Grande (1kg)", price: 50 },
    ],
  },
  {
    id: "doce-de-leite",
    name: "Pudim de Doce de Leite",
    description: "Pudim irresistível com doce de leite artesanal.",
    image: "/pudim-doce-de-leite.jpg",
    sizes: [
      { label: "Individual", price: 14 },
      { label: "Médio (500g)", price: 32 },
      { label: "Grande (1kg)", price: 55 },
    ],
  },
  {
    id: "ninho",
    name: "Pudim de Leite Ninho",
    description: "Pudim cremoso feito com leite Ninho, sabor da infância.",
    image: "/pudim-ninho.jpg",
    sizes: [
      { label: "Individual", price: 14 },
      { label: "Médio (500g)", price: 32 },
      { label: "Grande (1kg)", price: 55 },
    ],
  },
  {
    id: "maracuja",
    name: "Pudim de Maracujá",
    description: "Pudim refrescante com maracujá natural e calda tropical.",
    image: "/pudim-maracuja.jpg",
    sizes: [
      { label: "Individual", price: 13 },
      { label: "Médio (500g)", price: 30 },
      { label: "Grande (1kg)", price: 50 },
    ],
  },
  
  
];