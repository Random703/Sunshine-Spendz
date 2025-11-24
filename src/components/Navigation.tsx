import { Home, List, Settings, PieChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/categories', icon: PieChart, label: 'Categories' },
    { to: '/history', icon: List, label: 'History' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-4 border-foreground z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex flex-col items-center py-3 px-4 transition-colors ${
                  isActive
                    ? 'text-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-rubik font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
