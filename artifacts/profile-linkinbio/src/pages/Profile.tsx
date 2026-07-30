import React, { useState } from 'react';
import { FaDiscord, FaFacebook } from 'react-icons/fa';
import { AudioPlayer } from '../components/AudioPlayer';

const AVATAR_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23222"/><circle cx="50" cy="45" r="20" fill="%23555"/><path d="M20 90 Q 50 55 80 90" fill="%23555"/></svg>`;
const SMP_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23aaa"><rect width="24" height="24" rx="4" fill="%23333"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="%23aaa">S</text></svg>`;

const LINKS = [
  {
    href: 'https://discord.gg/JsRqrXqVt',
    label: 'Server Discord',
    icon: <FaDiscord size={20} />,
    color: '#5865F2',
  },
  {
    href: 'https://discord.gg/5kpHzsWt86',
    label: 'Only SMP',
    icon: (
      <img
        src={`${import.meta.env.BASE_URL}only-smp.png`}
        alt="Only SMP"
        className="w-5 h-5 object-contain"
        onError={(e) => { e.currentTarget.src = SMP_FALLBACK; }}
      />
    ),
    color: '#ff7043',
  },
  {
    href: 'https://www.facebook.com/share/1GzXi5oteo/',
    label: 'Facebook',
    icon: <FaFacebook size={20} />,
    color: '#1877F2',
  },
];

const Profile = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full bg-dark flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(80,100,200,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(100,60,180,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Landing overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 ease-in-out ${entered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ background: '#141414' }}
        onClick={() => setEntered(true)}
      >
        <div className="rounded-full overflow-hidden w-24 h-24 avatar-ring mb-5">
          <img
            src={`${import.meta.env.BASE_URL}avatar.png`}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}
          />
        </div>
        <p className="text-white/50 text-sm mb-3 tracking-wide font-light italic">
          So strange, so sweet
        </p>
        <p
          className="text-xs uppercase tracking-[0.35em] font-medium animate-pulse-glow"
          style={{ color: 'rgba(140, 180, 255, 0.7)' }}
        >
          Click to enter...
        </p>
      </div>

      {/* Main card */}
      <div
        className={`relative z-10 w-full max-w-[340px] mx-4 transition-all duration-700 ease-out ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
      >
        <div className="profile-card rounded-3xl px-6 py-8 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="rounded-full overflow-hidden w-20 h-20 avatar-ring mb-4">
            <img
              src={`${import.meta.env.BASE_URL}avatar.png`}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}
            />
          </div>

          {/* Name */}
          <h1
            className="text-2xl font-semibold mb-1 tracking-tight"
            style={{ color: '#90b8ff' }}
          >
            Huy
          </h1>

          {/* Bio */}
          <p className="text-sm mb-7 font-light" style={{ color: '#7a8faa' }}>
            So strange, so sweet
          </p>

          {/* Links */}
          <div className="w-full flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn rounded-2xl px-5 py-3.5 flex items-center gap-4 w-full"
              >
                <span
                  className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ color: link.color, background: `${link.color}18` }}
                >
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-white/80">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {entered && <AudioPlayer startPlaying={entered} />}
    </div>
  );
};

export default Profile;
