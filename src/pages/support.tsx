import React from 'react';
import Layout from '../components/Layout';

const contacts = [
  {
    name: 'Email',
    value: 'suporte@exemplo.com',
    href: 'mailto:suporte@exemplo.com',
    icon: (
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    bg: "bg-blue-100"
  },
  {
    name: 'WhatsApp',
    value: '(11) 99999-9999',
    href: 'https://wa.me/5511999999999',
    icon: (
      <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.68.96.98-3.58-.24-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.43.02 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 5.01 4.22.7.24 1.25.38 1.68.49.71.18 1.36.15 1.87.09.57-.07 1.75-.72 2-1.41.25-.69.25-1.28.18-1.41-.07-.13-.25-.2-.53-.34z"/>
      </svg>
    ),
    bg: "bg-green-100"
  },
  {
    name: 'Telegram',
    value: '@toptemplatesbr',
    href: 'https://t.me/toptemplatesbr',
    icon: (
      <svg className="w-7 h-7 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.04 16.62l-.39 3.47c.56 0 .8-.24 1.09-.53l2.62-2.5 5.44 3.98c1 .55 1.72.26 1.97-.92l3.58-16.8c.32-1.48-.54-2.06-1.5-1.7L1.7 9.3c-1.45.56-1.43 1.36-.25 1.72l4.6 1.44 10.7-6.74c.5-.32.96-.15.58.2"/>
      </svg>
    ),
    bg: "bg-sky-100"
  },
  {
    name: 'Instagram',
    value: '@toptemplatesbr',
    href: 'https://instagram.com/toptemplatesbr',
    icon: (
      // Instagram official gradient style
      <span className="inline-block w-7 h-7 rounded-[6px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="17" cy="7" r="1.5" fill="white" />
        </svg>
      </span>
    ),
    bg: "bg-gradient-to-tr from-yellow-400/25 via-pink-500/25 to-purple-600/25"
  },
  {
    name: 'TikTok',
    value: '@toptemplatesbr',
    href: 'https://www.tiktok.com/@toptemplatesbr',
    icon: (
      // TikTok official style: black bg, cyan and pink note
      <span className="inline-block w-7 h-7 rounded-[6px] bg-black flex items-center justify-center">
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <g>
            <path d="M33.5 7.5c.5 3.5 3.5 7 8 7.5v5.5c-3.5.2-7.2-1.1-10-3.5v13.5c0 6.1-4.9 11-11 11s-11-4.9-11-11 4.9-11 11-11c.5 0 1 .1 1.5.1v5.6c-.5-.1-1-.2-1.5-.2-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5V4h6v3.5z" fill="#fff"/>
            <path d="M33.5 7.5c.5 3.5 3.5 7 8 7.5v5.5c-3.5.2-7.2-1.1-10-3.5v13.5c0 6.1-4.9 11-11 11s-11-4.9-11-11 4.9-11 11-11c.5 0 1 .1 1.5.1v5.6c-.5-.1-1-.2-1.5-.2-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5V4h6v3.5z" fill="url(#tiktok-cyan)"/>
            <path d="M33.5 7.5c.5 3.5 3.5 7 8 7.5v5.5c-3.5.2-7.2-1.1-10-3.5v13.5c0 6.1-4.9 11-11 11s-11-4.9-11-11 4.9-11 11-11c.5 0 1 .1 1.5.1v5.6c-.5-.1-1-.2-1.5-.2-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5V4h6v3.5z" fill="url(#tiktok-pink)"/>
            <defs>
              <linearGradient id="tiktok-cyan" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#25F4EE"/>
                <stop offset="1" stopColor="#fff" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="tiktok-pink" x1="48" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FE2C55"/>
                <stop offset="1" stopColor="#fff" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </g>
        </svg>
      </span>
    ),
    bg: "bg-gradient-to-tr from-[#25F4EE]/45 via-[#FE2C55]/45 to-slate-900/45"
  },
];

const Support: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">Suporte</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Precisa de ajuda? Fale com a gente através de um dos canais abaixo!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {contacts.map((contact) => (
                <a
                  key={contact.name}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-5 rounded-xl shadow transition hover:scale-[1.03] hover:shadow-lg ${contact.bg}`}
                >
                  <div className="flex-shrink-0">
                    {contact.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{contact.name}</div>
                    <div className="text-gray-600 break-all">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 text-sm text-gray-400 text-center">
              Atendimento de segunda a sexta, das 9h às 18h.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;