export function Logo({ className = "", href = "/" }: { className?: string; href?: string }) {
  return (
    <a href={href} className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 rounded-full bg-brand/30 blur-md animate-glow" />
        <svg viewBox="0 0 40 40" className="relative h-9 w-9" aria-hidden>
          <defs>
            <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A4FF00" />
              <stop offset="55%" stopColor="#D4FF00" />
              <stop offset="100%" stopColor="#C8FF00" />
            </linearGradient>
          </defs>
          <path
            d="M12 8.5c0-1.8 2-2.9 3.5-1.9l16.2 10.1c1.4.9 1.4 2.9 0 3.8L15.5 30.6c-1.5 1-3.5-.1-3.5-1.9V8.5z"
            fill="url(#playGrad)"
          />
          <path
            d="M14.2 10.2c0-1.1 1.2-1.8 2.1-1.2l12.2 7.7c.8.5.8 1.7 0 2.2l-12.2 7.7c-.9.6-2.1-.1-2.1-1.2V10.2z"
            fill="#050505"
            opacity="0.18"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="font-display text-[1.35rem] font-extrabold tracking-tight text-white">
          Cine<span className="text-brand-gradient">AI</span>
        </span>
        <span className="mt-0.5 block text-[0.58rem] font-medium tracking-[0.28em] text-white/70 uppercase">
          AI Filmmaking Studio
        </span>
      </span>
    </a>
  );
}
