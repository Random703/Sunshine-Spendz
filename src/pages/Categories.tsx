import { useState, useEffect } from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { Navigation } from '@/components/Navigation';
import { getTransactions, getSettings } from '@/lib/storage';
import { CATEGORIES, Transaction } from '@/types';

export default function Categories() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const settings = getSettings();

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  // Get current month transactions
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const monthTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
  });

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 pattern-grid">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="font-vt323 text-5xl md:text-6xl text-foreground mb-2">
            Categories 📊
          </h1>
          <p className="font-rubik text-muted-foreground">
            Track your spending by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category, index) => {
            const spent = monthTransactions
              .filter(t => t.type === 'expense' && t.category === category)
              .reduce((sum, t) => sum + t.amount, 0);
            
            const budget = settings.budgets[category];

            return (
              <div 
                key={category}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CategoryCard
                  category={category}
                  spent={spent}
                  budget={budget}
                  currency={settings.currency}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
