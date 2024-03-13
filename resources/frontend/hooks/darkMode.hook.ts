// This React Hook offers you an interface to enable, disable, toggle and read the dark theme mode.
// The returned value (isDarkMode) is a boolean to let you be able to use with your logic.
// It uses internally useLocalStorage() to persist the value and listens the OS color scheme preferences.

import { useLocalStorage, useMediaQuery, useUpdateEffect } from 'usehooks-ts';
import { useEffect } from 'react';

// Constants
const DARK_MODE = {
  colorSchemeQuery: '(prefers-color-scheme: dark)',
  storageKey: 'dark-mode',
  tailwindClass: 'dark',
};

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
  useSystemPreference: () => void;
}

export default function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(DARK_MODE.colorSchemeQuery);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    DARK_MODE.storageKey,
    defaultValue ?? isDarkOS ?? false
  );

  // Update html class if darkMode changes
  useEffect(() => {
    const htmlClass = window.document.documentElement.classList;
    isDarkMode
      ? htmlClass.add(DARK_MODE.tailwindClass)
      : htmlClass.remove(DARK_MODE.tailwindClass);
  }, [isDarkMode]);

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
    useSystemPreference: () => setDarkMode(isDarkOS),
  };
}
