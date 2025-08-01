'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Book,
  DollarSign,
  ServerCog,
  Layers,
  Sliders,
  Users,
  ChevronDown,
  Menu,
  SquareChartGantt
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

interface DocGroup {
  title: string;
  icon: React.ElementType;
  items: {
    title: string;
    href: string;
  }[];
}

const docsNavigation: DocGroup[] = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      { title: 'Introduction', href: '/docs/getting-started/introduction' },
      { title: 'Management Panel', href: '/docs/getting-started/management-panel' },
    ],
  },
  {
    title: 'Subscription & Currency',
    icon: DollarSign,
    items: [
      { title: 'Subscription Models', href: '/docs/subscription-currency/subscription-model' },
      { title: 'Pricing & Credits', href: '/docs/subscription-currency/zenth-credits' },
      { title: 'Upgrades & Downgrades', href: '/docs/subscription-currency/downgrade-example' },
      { title: 'Discounts & Offers', href: '/docs/subscription-currency/discounts-offers' },
    ],
  },
  {
    title: 'Server Management',
    icon: SquareChartGantt,
    items: [
      { title: 'Dynamic Allocation', href: '/docs/server-management/dynamic-allocation' },
      { title: 'Autoscaling', href: '/docs/server-management/autoscaling' },
      { title: 'Load Balancing', href: '/docs/server-management/load-balancing' },
    ],
  },
  {
    title: 'Projects & Templates',
    icon: Layers,
    items: [
      { title: 'Project Setup', href: '/docs/projects-templates/project-setups' },
      { title: 'Templates & Examples', href: '/docs/projects-templates/templates-examples' },
    ],
  },
  {
    title: 'Scaling & Control',
    icon: Sliders,
    items: [
      { title: 'Server Splitting', href: '/docs/scaling-control/server-splitting' },
      { title: 'Autoscaling', href: '/docs/scaling-control/autoscaling' },
      { title: 'Custom Setup', href: '/docs/scaling-control/custom-setup' },
    ],
  },
  {
    title: 'Infrastructure',
    icon: ServerCog,
    items: [
      { title: 'System Architecture', href: '/docs/infrastructure/system-architecture' },
      { title: 'Core Technologies', href: '/docs/infrastructure/core-technologies' },
      { title: 'Components', href: '/docs/infrastructure/components' },
      { title: 'Security & Compliance', href: '/docs/infrastructure/security-compliance' },
    ],
  },
  {
    title: 'Community & Partners',
    icon: Users,
    items: [
      { title: 'Customer Support', href: '/docs/community-partners/customer-support' },
      { title: 'Community Features', href: '/docs/community-partners/community-features' },
      { title: 'Partnerships', href: '/docs/community-partners/partnerships' },
    ],
  },
];

function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const secondSegment = pathSegments[1] || '';
  const showSubPath = secondSegment && secondSegment.toLowerCase() !== 'docs';

  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    docsNavigation.forEach(group => {
      const isActive = group.items.some(item =>
        pathname === item.href || pathname.startsWith(item.href + '/')
      );
      initialState[group.title] = isActive;
    });
    return initialState;
  });

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 border-b">
        <div className="px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 relative">
            <Logo className="h-9 w-9" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg uppercase leading-none">Documentation</span>
              {showSubPath && (
                <span className="text-[0.65rem] text-gray-500 uppercase leading-none mt-[2px]">
                  {formatSegment(secondSegment)}
                </span>
              )}
            </div>
          </Link>

          {/* Hamburger Menu for small screens */}
          <button 
            className="block md:hidden p-2"
            onClick={() => setSidebarOpen(prev => !prev)}
          >
            <Menu className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside 
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-card/50 backdrop-blur border-r z-40 overflow-hidden transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0",
          "md:w-64",
          "transition-[width] ease-out duration-300" // Animate width transition
        )}
      >
        <nav className="flex flex-col items-start h-full space-y-1 p-4 w-64">
          {docsNavigation.map((group) => (
            <div key={group.title} className="w-full">
              <div
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between w-full p-3 text-sm font-medium rounded-sm hover:bg-accent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <group.icon className="w-5 h-5 text-muted-foreground" />
                  <span>{group.title}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-300",
                    openGroups[group.title] && "rotate-180"
                  )}
                />
              </div>
              <div
                className={cn("overflow-hidden transition-all duration-500 ease-in-out")}
                style={{
                  maxHeight: openGroups[group.title] ? `${group.items.length * 40}px` : "0px",
                }}
              >
                <div className="pl-8 space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center w-full p-2 text-sm rounded-sm transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
