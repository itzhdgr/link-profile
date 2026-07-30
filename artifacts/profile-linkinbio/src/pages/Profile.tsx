import React, { useState } from 'react';
import { FaDiscord, FaFacebook } from 'react-icons/fa';
import { Particles } from '../components/Particles';
import { AudioPlayer } from '../components/AudioPlayer';

const AVATAR_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%2387ceeb" /><circle cx="50" cy="45" r="20" fill="%23ffffff" opacity="0.8" /><path d="M20 90 Q 50 50 80 90" stroke="%23ffffff" stroke-width="8" fill="none" opacity="0.8" /></svg>`;
const SWORD_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h5v5l-5-5Z"/><path d="m4 20 5.5-5.5"/><path d="m14.5 4-5.5 5.5"/><path d="m9 9-2 2"/><path d="m13 13 2-2"/></svg>`;

const Profile = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full bg-aurora text-white font-sans selection:bg-white/30 flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Particles />
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-1000 ease-in-out bg-transparent ${entered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={() => setEntered(true)}
      >
        <div className="mb-8 rounded-full overflow-hidden w-32 h-32 avatar-glow relative transition-transform duration-700 hover:scale-105">
          <img
            src={`${import.meta.env.BASE_URL}avatar.png`}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}
          />
        </div>
        <p className="font-serif italic text-3xl mb-16 opacity-90 tracking-wide text-shadow-sm font-light">
          So strange, so sweet
        </p>
        <p className="text-[11px] uppercase tracking-[0.4em] opacity-80 animate-pulse-slow font-medium">
          Click to enter...
        </p>
      </div>

      <div className={`relative z-10 flex-1 flex flex-col items-center justify-center p-6 sm:p-8 transition-all duration-1000 ease-out delay-200 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          <div className="mb-6 rounded-full overflow-hidden w-28 h-28 avatar-glow relative">
            <img
              src={`${import.meta.env.BASE_URL}avatar.png`}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}
            />
          </div>
          <h1 className="font-serif italic text-4xl mb-12 opacity-95 tracking-wide text-center text-shadow-sm font-light">
            So strange, so sweet
          </h1>
          <div className="w-full flex flex-col gap-5 pb-24">
            <LinkCard
              href="https://discord.gg/JsRqrXqVt"
              icon={<FaDiscord className="w-6 h-6" />}
              label="Server Discord"
            />
            <LinkCard
              href="https://discord.gg/5kpHzsWt86"
              icon={
                <img
                  src={`${import.meta.env.BASE_URL}only-smp.png`}
                  alt="Only SMP"
                  className="w-6 h-6 object-contain filter brightness-0 invert opacity-90"
                  onError={(e) => { e.currentTarget.src = SWORD_FALLBACK; }}
                />
              }
              label="Only SMP"
            />
            <LinkCard
              href="https://www.facebook.com/share/1GzXi5oteo/"
              icon={<FaFacebook className="w-6 h-6" />}
              label="Facebook"
            />
          </div>
        </div>
      </div>

      {entered && <AudioPlayer startPlaying={entered} />}
    </div>
  );
};

interface LinkCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const LinkCard = ({ href, icon, label }: LinkCardProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="glass-button w-full py-4 px-5 rounded-[2rem] flex items-center gap-5 group outline-none focus-visible:ring-2 focus-visible:ring-white/50"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-inner">
      {icon}
    </div>
    <span className="font-medium text-lg tracking-wide opacity-95 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </a>
);

export default Profile;
