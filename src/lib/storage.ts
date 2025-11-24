import type { Transaction, Settings, Category } from '@/types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'sunshine-spendz-transactions',
  SETTINGS: 'sunshine-spendz-settings',
};

export const DEFAULT_BUDGETS: Record<Category, number> = {
  Food: 500,
  Drinks: 200,
  Car: 300,
  Fuel: 200,
  Groceries: 400,
  "For Siblings": 500,
  Fun: 300,
  Other: 200,
};

export const DEFAULT_SETTINGS: Settings = {
  currency: 'Rs',
  budgets: DEFAULT_BUDGETS,
  fontChoice: 'vt323',
  soundOn: false,
};

// Initialize with November income
const initializeDefaultData = () => {
  const transactions = getTransactions();
  if (transactions.length === 0) {
    const novemberIncome: Transaction = {
      id: `txn_${Date.now()}_initial`,
      type: 'income',
      category: 'Other',
      item: 'Salary',
      amount: 100000,
      date: new Date(2024, 10, 1).toISOString(), // November 1, 2024
      notes: 'Initial income',
    };
    saveTransactions([novemberIncome]);
  }
};

export const getTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!data) {
      // Initialize with November income on first load
      const novemberIncome: Transaction = {
        id: `txn_${Date.now()}_initial`,
        type: 'income',
        category: 'Other',
        item: 'Salary',
        amount: 100000,
        date: new Date(2024, 10, 1).toISOString(), // November 1, 2024
        notes: 'Initial income',
      };
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify([novemberIncome]));
      return [novemberIncome];
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

export const addTransaction = (transaction: Omit<Transaction, 'id'>): Transaction => {
  const transactions = getTransactions();
  const newTransaction: Transaction = {
    ...transaction,
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  transactions.push(newTransaction);
  saveTransactions(transactions);
  return newTransaction;
};

export const updateTransaction = (id: string, updates: Partial<Transaction>): void => {
  const transactions = getTransactions();
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updates };
    saveTransactions(transactions);
  }
};

export const deleteTransaction = (id: string): void => {
  const transactions = getTransactions();
  const filtered = transactions.filter(t => t.id !== id);
  saveTransactions(filtered);
};

export const getSettings = (): Settings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};
