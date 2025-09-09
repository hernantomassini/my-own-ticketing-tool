'use client'

import { useTheme } from 'next-themes'
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export default function ThemeSelector() {
  const { theme, setTheme, systemTheme } = useTheme();
  const current = theme === 'system' ? systemTheme : theme;

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, []);

  if (!mounted) {
    return null
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {current === 'dark' ? '🌙' : '☀️'}
    </Button>
  );
}
