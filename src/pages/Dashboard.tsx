import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Plus, DollarSign, TrendingUp, TrendingDown, Coffee, Fuel } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { MemeToast } from '@/components/MemeToast';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { getTransactions, getSettings } from '@/lib/storage';
import { Transaction } from '@/types';
import { MemeEvent, getMeme } from '@/lib/memes';

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<MemeEvent | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const settings = getSettings();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    setTransactions(getTransactions());
  };

  // Get current month transactions
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const monthTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
  });

  const totalIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const foodSpent = monthTransactions
    .filter(t => t.type === 'expense' && t.category === 'Food')
    .reduce((sum, t) => sum + t.amount, 0);

  const fuelSpent = monthTransactions
    .filter(t => t.type === 'expense' && t.category === 'Fuel')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleTransactionAdded = (meme: MemeEvent | null) => {
    loadTransactions();
    if (meme) {
      setCurrentMeme(meme);
    }

    // Check for budget exceeded
    setTimeout(() => {
      const newTransactions = getTransactions();
      const newMonthTransactions = newTransactions.filter((t) => {
        const txDate = new Date(t.date);
        return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
      });

      for (const category of Object.keys(settings.budgets)) {
        const categorySpent = newMonthTransactions
          .filter(t => t.type === 'expense' && t.category === category)
          .reduce((sum, t) => sum + t.amount, 0);
        
        const budget = settings.budgets[category as keyof typeof settings.budgets];
        
        if (categorySpent > budget) {
          const budgetMeme = getMeme('budget.exceeded');
          if (budgetMeme) {
            setCurrentMeme(budgetMeme);
          }
          break;
        }
      }
    }, 100);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 pattern-dots">
      <div className="max-w-7xl mx-auto">
                {/* Top-right brand */}
        <div
          className="
            absolute top-3 right-2 sm:right-4 z-50
            flex items-center gap-2 sm:gap-3
            select-none max-w-[70vw] justify-end
          "
         >
          <img
            src="/sunshine.svg"
            alt="Sunshine Spendz logo"
            className="
              h-[clamp(40px,8vw,64px)]
              w-[clamp(40px,8vw,64px)]
              drop-shadow
            "
          />

          <div className="leading-[0.9] text-right">
            <div
              className="
                logo-font
                text-[clamp(12px,3vw,20px)]
                bg-clip-text text-transparent
                bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500
                drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]
              "
             >
              Sunshine
            </div>
             <div
              className="
                logo-font
                text-[clamp(16px,4.5vw,24px)]
                text-zinc-900 tracking-wide
                drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]
              "
              >
              Spendz
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="font-vt323 text-5xl md:text-6xl text-foreground mb-2 animate-float">
            November expense with Arusa ✨
          </h1>
          <p className="font-rubik text-muted-foreground">
            Track your sunshine spending
          </p>
        </div>

        {/* Quick Add Button */}
        <div className="flex justify-center mb-8 animate-bounce-in">
          <Button
            onClick={() => setShowAddModal(true)}
            size="lg"
            className="font-vt323 text-2xl px-8 py-6 retro-shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all hover:scale-105"
          >
            <Plus className="w-6 h-6 mr-2 animate-wiggle" />
            Add Transaction
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <StatCard
              title="Total Income"
              value={`${settings.currency}${totalIncome.toFixed(0)}`}
              icon={<TrendingUp className="w-6 h-6" />}
              color="success"
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <StatCard
              title="Total Spent"
              value={`${settings.currency}${totalExpenses.toFixed(0)}`}
              icon={<TrendingDown className="w-6 h-6" />}
              color="destructive"
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <StatCard
              title="Balance"
              value={`${settings.currency}${balance.toFixed(0)}`}
              icon={<DollarSign className="w-6 h-6" />}
              color={balance >= 0 ? 'success' : 'destructive'}
            />
          </div>
        </div>

        {/* Category Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <StatCard
              title="Food Spent"
              value={`${settings.currency}${foodSpent.toFixed(0)}`}
              icon={<Coffee className="w-6 h-6" />}
              color="secondary"
              subtitle={`Budget: ${settings.currency}${settings.budgets.Food}`}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <StatCard
              title="Fuel Spent"
              value={`${settings.currency}${fuelSpent.toFixed(0)}`}
              icon={<Fuel className="w-6 h-6" />}
              color="secondary"
              subtitle={`Budget: ${settings.currency}${settings.budgets.Fuel}`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center pb-4 animate-slide-up">
          <p className="font-caveat text-2xl text-muted-foreground">
            Made by Fawaz for You 🙃❤️
          </p>
        </div>
      </div>

      <Navigation />
      <AddTransactionModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onTransactionAdded={handleTransactionAdded}
      />
      <MemeToast meme={currentMeme} onClose={() => setCurrentMeme(null)} />
    </div>
  );
}
