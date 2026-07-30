import React, { useState } from 'react';
import { FaDiscord, FaFacebook, FaYoutube } from 'react-icons/fa';
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
  {
    href: 'https://youtube.com/@itzhdgr',
    label: 'YouTube',
    icon: <FaYoutube size={20} />,
    color: '#FF0000',
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
        className={`fixed inset-0 z-40 flex items-center justify-center cursor-pointer transition-opacity duration-700 ease-in-out ${entered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ background: '#0e0e0e' }}
        onClick={() => setEntered(true)}
      >
        <div className="relative flex items-center justify-center">
          <div
            className="absolute"
            style={{
              width: '480px',
              height: '120px',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
              filter: 'blur(8px)',
              transform: 'scaleX(1.4)',
            }}
          />
          <p
            className="relative text-white text-2xl font-normal animate-pulse-glow"
            style={{ letterSpacing: '0.01em' }}
          >
            click to enter...
          </p>
        </div>
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
            className="text-2xl font-bold mb-1 tracking-tight bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#E0F2FE] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(96,165,250,0.3)]"
          >
            HDGR
          </h1>

          {/* Bio */}
          <p className="text-sm mb-7 font-light tracking-wide bg-gradient-to-r from-[#93C5FD] to-white/90 bg-clip-text text-transparent italic opacity-90">
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
                className="link-btn rounded-2xl px-5 py-3.5 flex items-center gap-4 w-full transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(#18181b, #18181b) padding-box, linear-gradient(to right, #93C5FD, #FFFFFF) border-box',
                  border: '1.5px solid transparent',
                }}
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