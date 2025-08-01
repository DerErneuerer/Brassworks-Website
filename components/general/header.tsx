"use client";

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { User } from 'lucide-react';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'General Plans',
    href: '/services/general-plans',
    description: 'Flexible plans for every need with our project management system.',
  },
  {
    title: 'Game Server',
    href: '/services/game-server',
    description: 'High-performance game servers for smooth online play.',
  },
  {
    title: 'Discord Bots',
    href: '/services/discord-bots',
    description: 'Custom bots to automate and enhance your Discord server.',
  },
];

export function Header() {
  const isLoggedIn = true;

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="font-bold text-lg leading-none">572</span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={navigationMenuTriggerStyle()}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/news" className={navigationMenuTriggerStyle()}>
                      News
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/support" className={navigationMenuTriggerStyle()}>
                      Support
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/docs" className={navigationMenuTriggerStyle()}>
                      Docs
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="items-center gap-4 hidden md:flex">
            {isLoggedIn ? (
              <Link href="/account">
                <Button variant="ghost" size="icon" className="rounded-full border border-neutral-600">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
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
                  <Link href="/" className="px-2 py-1 rounded-md hover:bg-muted">
                    Home
                  </Link>
                  <Link href="/services/general-plans" className="px-2 py-1 rounded-md hover:bg-muted">
                    General Plans
                  </Link>
                  <Link href="/services/game-server" className="px-2 py-1 rounded-md hover:bg-muted">
                    Game Server
                  </Link>
                  <Link href="/services/discord-bots" className="px-2 py-1 rounded-md hover:bg-muted">
                    Discord Bots
                  </Link>
                  <Link href="/news" className="px-2 py-1 rounded-md hover:bg-muted">
                    News
                  </Link>
                  <Link href="/support" className="px-2 py-1 rounded-md hover:bg-muted">
                    Support
                  </Link>
                  <Link href="/features" className="px-2 py-1 rounded-md hover:bg-muted">
                    Features
                  </Link>
                  <Link href="/docs" className="px-2 py-1 rounded-md hover:bg-muted">
                    Docs
                  </Link>
                  <div className="flex flex-col gap-2 mt-4">
                    {isLoggedIn ? (
                      <Link href="/account">
                        <Button variant="outline" className="w-full">
                          Account
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                        <Link href="/signup">
                          <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                            Get Started
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
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