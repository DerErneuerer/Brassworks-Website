'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Logo } from '@/components/logo';
import {
  User,
  Grid,
  Folder,
  CreditCard,
  Headset,
  Menu,
  BookText,
  PanelsTopLeft
} from 'lucide-react';
import { Button } from '../ui/button';

const links = [
  { title: 'Account', href: '/account', icon: User },
  { title: 'Dashboard', href: '/account/dashboard', icon: Grid },
  { title: 'Projects', href: '/account/projects', icon: Folder },
  { title: 'Subscription', href: '/account/subscription', icon: CreditCard },
  { title: 'Payments', href: '/account/payments', icon: BookText },
  { title: 'Support', href: '/account/support', icon: Headset }
];

export function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const secondSegment = pathSegments[1] || '';

  const showSubPath = secondSegment && secondSegment.toLowerCase() !== 'account';

  const activeHref = links
    .map(link => link.href)
    .sort((a, b) => b.length - a.length) // längster Pfad zuerst
    .find(href => pathname === href || pathname.startsWith(href + '/'));

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 border-b">
        <div className="px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 relative">
            <Logo className="h-9 w-9" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg uppercase leading-none">Account</span>
              {showSubPath && (
                <span className="text-[0.65rem] text-gray-500 uppercase leading-none mt-[2px]">
                  {secondSegment}
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

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-0rem)] w-48 group transition-all duration-300 bg-card/50 backdrop-blur border-r z-40 overflow-hidden",
          sidebarOpen ? "w-48" : "w-0",
          "md:w-48",
          "transition-[width] ease-out duration-300" // Animate width transition
        )}
      >
        <nav className="flex flex-col items-start h-full space-y-1 p-2">
          {links.map(({ title, href, icon: Icon }) => {
            const isActive = href === activeHref;

            return (
              <Link
                key={title}
                href={href}
                className={cn(
                  "flex items-center w-full p-3 rounded-sm transition-colors text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground border-l-4 border-transparent",
                  isActive && "border-green-500 bg-accent text-accent-foreground pl-3"
                )}
              >
                <Icon className="h-5 w-5 min-w-[1.25rem]" />
                <span className="ml-3 whitespace-nowrap opacity-100 transition-opacity duration-300">
                  {title}
                </span>
              </Link>
            );
          })}
          <Link
            href="https://panel.572.host/"
            className={cn(
              "flex items-center mx-1 justify-center w-[10.5rem] h-10 rounded-sm transition-colors text-sm text-muted-foreground bg-neutral-700 hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <PanelsTopLeft className="h-5 w-5 min-w-[1.25rem]"/>
            <span className="ml-2 whitespace-nowrap opacity-100 transition-opacity h-5 leading-5 duration-300">
               Panel
            </span>
          </Link>
        </nav>
      </aside>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';