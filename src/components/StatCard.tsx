import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  color?: 'primary' | 'success' | 'destructive' | 'secondary';
  subtitle?: string;
}

export const StatCard = ({ title, value, icon, color = 'primary', subtitle }: StatCardProps) => {
  const colorClasses = {
    primary: 'border-primary bg-primary/5',
    success: 'border-success bg-success/10',
    destructive: 'border-destructive bg-destructive/10',
    secondary: 'border-secondary bg-secondary/10',
  };

  return (
    <div
      className={`${colorClasses[color]} border-4 rounded-2xl p-6 retro-shadow transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:scale-105 cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-vt323 text-2xl text-foreground">{title}</h3>
        {icon && <div className="text-foreground animate-float">{icon}</div>}
      </div>
      <p className="font-vt323 text-4xl text-foreground mb-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-muted-foreground font-rubik">{subtitle}</p>
      )}
    </div>
  );
};
