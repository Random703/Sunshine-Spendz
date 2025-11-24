import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { MemeEvent } from '@/lib/memes';

interface MemeToastProps {
  meme: MemeEvent | null;
  onClose: () => void;
}

export const MemeToast = ({ meme, onClose }: MemeToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (meme) {
      setIsVisible(true);
      setImageLoaded(false);
    }
  }, [meme]);

  useEffect(() => {
    if (meme && imageLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [meme, imageLoaded, onClose]);

  if (!meme) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      }`}
    >
      <div className="bg-card border-4 border-foreground rounded-2xl p-6 retro-shadow-lg max-w-lg animate-bounce-in">
        <div className="flex items-start gap-4">
          <img
            src={meme.image}
            alt="meme"
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            className="w-40 h-40 object-cover rounded-lg border-2 border-foreground animate-wiggle"
          />
          <div className="flex-1">
            <p className="font-vt323 text-2xl text-foreground leading-tight">
              {meme.message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-foreground hover:text-secondary transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
