import { Icons } from '@/components/Icons';

interface NavItem {
  title: string;
  to: string;
  external?: boolean;
  icon?: keyof typeof Icons;
}

interface NavConfig {
  mainNav: NavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: 'Дашборд',
      to: '/dashboard',
      icon: 'projects',
    },
    {
      title: 'Търсене',
      to: '/marketplace',
      icon: 'marketplace',
    },
    // {
    //   title: 'Местоположения',
    //   to: '/locations',
    //   icon: 'pin',
    // },
    {
      title: 'Настройки',
      to: '/settings/account',
      icon: 'settings',
    },
  ],
};
