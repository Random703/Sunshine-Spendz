export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Food' 
  | 'Drinks' 
  | 'Car' 
  | 'Fuel' 
  | 'Groceries' 
  | 'For Siblings' 
  | 'Fun' 
  | 'Other';

export type IncomeCategory = 
  | 'Salary' 
  | 'Money from Aba' 
  | 'Gift from Fawaz';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  item: string;
  amount: number;
  date: string; // ISO string
  notes?: string;
}

export interface Settings {
  currency: string;
  budgets: Record<Category, number>;
  fontChoice: 'vt323' | 'rubik';
  soundOn: boolean;
}

export interface FavoriteItem {
  category: Category;
  item: string;
  pinned: boolean;
}

export const CATEGORIES: Category[] = [
  'Food',
  'Drinks',
  'Car',
  'Fuel',
  'Groceries',
  'For Siblings',
  'Fun',
  'Other'
];

export const INCOME_CATEGORIES: IncomeCategory[] = [
  'Salary',
  'Money from Aba',
  'Gift from Fawaz'
];

export const FAVORITE_ITEMS: FavoriteItem[] = [
  { category: 'Food', item: 'Loaded Fries', pinned: true },
  { category: 'Drinks', item: 'Matcha from CBTL', pinned: true }
];
