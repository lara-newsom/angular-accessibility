
export enum Category {
  GLASSES = 'glasses',
  HATS = 'hats',
  CLOTHES = 'clothes',
  OTHER = 'other',
  ALL = 'all'
}

export interface CategoryLink {
  category: Category;
  description: string;
}

export const LINKS: CategoryLink[] = [
  {
    category: Category.HATS,
    description: 'Animals in Hats',
  },
  {
    category: Category.GLASSES,
    description: 'Animals in Glasses',
  },
  {
    category: Category.CLOTHES,
    description: 'Animals in Clothes',
  },
  {
    category: Category.OTHER,
    description: 'Animals Accessorizing',
  },
  {
    category: Category.ALL,
    description: 'Animals Doing it All',
  },
]
