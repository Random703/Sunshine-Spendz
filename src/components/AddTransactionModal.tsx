import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CATEGORIES, INCOME_CATEGORIES, FAVORITE_ITEMS, Category, IncomeCategory, TransactionType } from '@/types';
import { addTransaction } from '@/lib/storage';
import { getMemeForTransaction } from '@/lib/memes';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onTransactionAdded: (meme: ReturnType<typeof getMemeForTransaction>) => void;
}

export const AddTransactionModal = ({ open, onClose, onTransactionAdded }: AddTransactionModalProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<Category | IncomeCategory>('Food');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  // Update category when type changes
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategory(newType === 'income' ? 'Salary' : 'Food');
    setItem('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!item || !amount) return;

    const transaction = addTransaction({
      type,
      category: category as Category,
      item,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      notes,
    });

    const meme = getMemeForTransaction(type, category, item);
    onTransactionAdded(meme);

    // Reset form
    setItem('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    onClose();
  };

  const favoriteItems = FAVORITE_ITEMS.filter(f => f.category === category);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-4 border-foreground rounded-2xl p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-vt323 text-3xl text-foreground">
            Add Transaction ✨
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Type Selection */}
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => handleTypeChange('income')}
              variant={type === 'income' ? 'default' : 'outline'}
              className="flex-1 font-vt323 text-lg"
            >
              Income
            </Button>
            <Button
              type="button"
              onClick={() => handleTypeChange('expense')}
              variant={type === 'expense' ? 'default' : 'outline'}
              className="flex-1 font-vt323 text-lg"
            >
              Expense
            </Button>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="font-vt323 text-xl">{type === 'income' ? 'Source' : 'Category'}</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category | IncomeCategory)}>
              <SelectTrigger className="border-2 border-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-foreground">
                {(type === 'income' ? INCOME_CATEGORIES : CATEGORIES).map((cat) => (
                  <SelectItem key={cat} value={cat} className="font-rubik">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Item with favorites */}
          <div className="space-y-2">
            <Label className="font-vt323 text-xl">Item</Label>
            {favoriteItems.length > 0 && (
              <div className="flex gap-2 mb-2">
                {favoriteItems.map((fav) => (
                  <Button
                    key={fav.item}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setItem(fav.item)}
                    className="text-xs font-rubik"
                  >
                    ⭐ {fav.item}
                  </Button>
                ))}
              </div>
            )}
            <Input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Enter item name"
              className="border-2 border-foreground"
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label className="font-vt323 text-xl">Amount</Label>
            <Input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="border-2 border-foreground"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="font-vt323 text-xl">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-2 border-foreground"
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="font-vt323 text-xl">Notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              className="border-2 border-foreground min-h-20"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full font-vt323 text-xl" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
