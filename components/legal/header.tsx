"use client";

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';

function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0] || '';

  const showSubPath = firstSegment && firstSegment.toLowerCase();

  return (
    <header
      className='sticky top-0 z-50 w-full transition-colors duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 border-b'>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <div className="flex flex-col justify-center leading-tight">
            <span className="font-bold text-lg uppercase leading-none">572</span>
            {showSubPath && (
              <span className="text-[0.65rem] text-gray-500 uppercase leading-none mt-[2px]">
                {formatSegment(firstSegment)} {/* Hier das erste Segment als Subpath anzeigen */}
              </span>
            )}
          </div>
        </Link>
        
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <span className="px-2 text-sm text-muted-foreground">•</span>
              <NavigationMenuItem>
                <NavigationMenuLink href="/legal-notice" className={navigationMenuTriggerStyle()}>
                  Legal Notice
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/terms-of-service" className="px-2 py-1 rounded-md hover:bg-muted">
                  Terms of Service
                </Link>
                <Link href="/privacy-policy" className="px-2 py-1 rounded-md hover:bg-muted">
                  Privacy Policy
                </Link>
                <Link href="/legal" className="px-2 py-1 rounded-md hover:bg-muted">
                  Legal
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
ListItem.displayName = "ListItem";
