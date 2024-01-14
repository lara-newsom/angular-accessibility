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
  firstProduct?: string;
}

export const LINKS: CategoryLink[] = [
  {
    category: Category.HATS,
    description: 'Animals in Hats',
    firstProduct: 'bird-in-straw-hat'
  },
  {
    category: Category.GLASSES,
    description: 'Animals in Glasses',
    firstProduct: 'cat-glasses-1'
  },
  {
    category: Category.CLOTHES,
    description: 'Animals in Clothes',
    firstProduct: 'banana-puppy'
  },
  {
    category: Category.OTHER,
    description: 'Animals Accessorizing',
    firstProduct: 'bowtie-dog'
  },
  {
    category: Category.ALL,
    description: 'Animals Doing it All',
    firstProduct: 'banana-puppy'
  },
]
