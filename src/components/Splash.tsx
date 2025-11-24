import * as React from "react";

type Props = { onDone?: () => void; minDuration?: number };

export default function Splash({ onDone, minDuration = 4000 }: Props) {
  React.useEffect(() => {
    const t = setTimeout(() => onDone?.(), minDuration);
    return () => clearTimeout(t);
  }, [onDone, minDuration]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center
                 bg-[#FFF6E6] text-zinc-900"
      onClick={() => onDone?.()}
    >
      <div className="flex items-center gap-5 md:gap-7 select-none px-4">
        {/* Sunshine icon with slow spin */}
        <img
          src="/sunshine.svg"
          alt=""
          className="h-12 w-12 md:h-16 md:w-16 drop-shadow animate-spin [animation-duration:6s]"
        />

        {/* Text block */}
        <div className="leading-[1.15]">
          <div
            className="logo-font text-[14px] md:text-[18px] uppercase
                       tracking-wide text-zinc-800/80"
            style={{ letterSpacing: "0.06em" }}
          >
            expenditure tracker
          </div>

          {/* add line spacing + centered 'for Arusa' */}
          <div
            className="logo-font mt-1 text-[22px] md:text-[30px]
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500
                       drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]
                       text-center"
            style={{ lineHeight: 1.25 }}
          >
            for Arusa
          </div>

          {/* Retro pixel progress bar */}
          <div className="mt-4 w-56 md:w-64">
            <div
              className="relative h-3 md:h-3.5 overflow-hidden rounded-[3px]
                         bg-zinc-200/70 border border-zinc-300/60
                         shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]"
            >
              {/* moving gradient chunk */}
              <div
                className="absolute inset-y-0 left-0 w-1/3
                           bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500
                           animate-loader"
              />
              {/* faint stripes for pixel vibe */}
              <div
                className="[image-rendering:pixelated] pointer-events-none absolute inset-0
                           [background-image:linear-gradient(90deg,rgba(255,255,255,.28)_0,rgba(255,255,255,0)_50%)]
                           [background-size:8px_100%]"
              />
            </div>
            <div className="logo-font mt-2 text-[10px] md:text-[12px] text-zinc-700/70 text-center tracking-widest">
              loading
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
