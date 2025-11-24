import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  spent: number;
  budget: number;
  currency: string;
}

export const CategoryCard = ({ category, spent, budget, currency }: CategoryCardProps) => {
  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const isOverBudget = spent > budget;

  return (
    <div
      className={`border-4 ${
        isOverBudget ? 'border-destructive pulse-orange' : 'border-primary'
      } rounded-2xl p-5 retro-shadow bg-card`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-vt323 text-2xl text-foreground">{category}</h3>
        <div className="text-right">
          <p className="font-vt323 text-xl text-foreground">
            {currency}{spent.toFixed(0)}
          </p>
          <p className="text-xs text-muted-foreground font-rubik">
            of {currency}{budget}
          </p>
        </div>
      </div>

      {/* Retro progress bar */}
      <div className="h-6 bg-muted rounded-lg border-2 border-foreground overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isOverBudget ? 'bg-destructive' : 'retro-progress'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isOverBudget && (
        <p className="mt-2 text-xs font-pixel text-destructive">
          OVER BUDGET!
        </p>
      )}
    </div>
  );
};
