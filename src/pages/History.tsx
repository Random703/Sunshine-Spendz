import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { MemeToast } from '@/components/MemeToast';
import { Button } from '@/components/ui/button';
import { getTransactions, deleteTransaction, getSettings } from '@/lib/storage';
import { Transaction } from '@/types';
import { MemeEvent, getMeme } from '@/lib/memes';
import { toast } from 'sonner';

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMeme, setCurrentMeme] = useState<MemeEvent | null>(null);
  const settings = getSettings();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const allTransactions = getTransactions();
    // Sort by date, newest first
    allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(allTransactions);
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    loadTransactions();
    
    const meme = getMeme('transaction.deleted');
    if (meme) {
      setCurrentMeme(meme);
    }
    
    toast.success('Transaction deleted');
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 pattern-dots">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="font-vt323 text-5xl md:text-6xl text-foreground mb-2">
            History 📜
          </h1>
          <p className="font-rubik text-muted-foreground">
            All your transactions
          </p>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-vt323 text-2xl text-muted-foreground">
                No transactions yet!
              </p>
              <p className="font-rubik text-muted-foreground mt-2">
                Add your first transaction to get started
              </p>
            </div>
          ) : (
            transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="bg-card border-4 border-foreground rounded-xl p-4 retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-1 rounded text-xs font-pixel ${
                          transaction.type === 'income'
                            ? 'bg-success text-success-foreground'
                            : 'bg-destructive/20 text-destructive-foreground'
                        }`}
                      >
                        {transaction.type}
                      </span>
                      <span className="font-rubik text-sm text-muted-foreground">
                        {transaction.category}
                      </span>
                    </div>
                    <h3 className="font-vt323 text-2xl text-foreground">
                      {transaction.item}
                    </h3>
                    <p className="text-sm text-muted-foreground font-rubik">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </p>
                    {transaction.notes && (
                      <p className="text-sm text-muted-foreground font-rubik mt-1">
                        {transaction.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p
                      className={`font-vt323 text-3xl ${
                        transaction.type === 'income'
                          ? 'text-success'
                          : 'text-destructive'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {settings.currency}
                      {transaction.amount.toFixed(0)}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 hover:scale-110 transition-transform"
                        onClick={() => toast.info('Edit feature coming soon!')}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground hover:scale-110 transition-all"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Navigation />
      <MemeToast meme={currentMeme} onClose={() => setCurrentMeme(null)} />
    </div>
  );
}
