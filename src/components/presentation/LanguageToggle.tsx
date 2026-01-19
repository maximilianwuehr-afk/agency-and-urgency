'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  currentLang: 'en' | 'de';
}

export function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'de' : 'en';
    const newPath = pathname.replace(`/${currentLang}/`, `/${newLang}/`);
    router.push(newPath);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center
                 bg-[var(--bg-panel)]/80 backdrop-blur-sm border border-[var(--border)]
                 rounded-full hover:border-[var(--accent-finn)] hover:scale-110
                 transition-all cursor-pointer"
      title={currentLang === 'en' ? 'Switch to German' : 'Zu Englisch wechseln'}
    >
      <span className="text-xl">
        {currentLang === 'en' ? '🇬🇧' : '🇩🇪'}
      </span>
    </motion.button>
  );
}
