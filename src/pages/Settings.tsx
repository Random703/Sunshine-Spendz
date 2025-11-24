import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSettings, saveSettings } from '@/lib/storage';
import { CATEGORIES, Settings as SettingsType } from '@/types';
import { toast } from 'sonner';

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType>(getSettings());

  const handleSave = () => {
    saveSettings(settings);
    toast.success('Settings saved! ✨');
  };

  const handleBudgetChange = (category: string, value: string) => {
    setSettings({
      ...settings,
      budgets: {
        ...settings.budgets,
        [category]: parseFloat(value) || 0,
      },
    });
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 pattern-dots">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="font-vt323 text-5xl md:text-6xl text-foreground mb-2">
            Settings ⚙️
          </h1>
          <p className="font-rubik text-muted-foreground">
            Customize your experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Currency */}
          <div className="bg-card border-4 border-foreground rounded-2xl p-6 retro-shadow">
            <h2 className="font-vt323 text-3xl text-foreground mb-4">Currency</h2>
            <div className="space-y-2">
              <Label className="font-rubik">Symbol</Label>
              <Input
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="border-2 border-foreground max-w-xs"
                placeholder="$"
              />
            </div>
          </div>

          {/* Category Budgets */}
          <div className="bg-card border-4 border-foreground rounded-2xl p-6 retro-shadow">
            <h2 className="font-vt323 text-3xl text-foreground mb-4">
              Monthly Budgets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map((category) => (
                <div key={category} className="space-y-2">
                  <Label className="font-rubik">{category}</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">{settings.currency}</span>
                    <Input
                      type="number"
                      step="1"
                      value={settings.budgets[category]}
                      onChange={(e) => handleBudgetChange(category, e.target.value)}
                      className="border-2 border-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="bg-card border-4 border-foreground rounded-2xl p-6 retro-shadow animate-slide-up">
            <h2 className="font-vt323 text-3xl text-foreground mb-4">About</h2>
            <p className="font-rubik text-foreground mb-2">
              <strong className="font-vt323 text-xl">Sunshine Spendz</strong>
            </p>
            <p className="font-rubik text-muted-foreground text-sm mb-3">
              Track your finances with sunshine and memes!☀️
            </p>
            <div className="border-t-2 border-dashed border-foreground/20 pt-3 mt-3">
              <p className="font-vt323 text-lg text-foreground/60 italic text-center">
                Made for broke Arusa by Fawaz👉👈💛
              </p>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            size="lg"
            className="w-full font-vt323 text-2xl py-6 retro-shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Save Settings
          </Button>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
