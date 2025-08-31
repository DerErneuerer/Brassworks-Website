"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, Map, MessageCircle } from "lucide-react";

export function CommunitySection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 uppercase font-bold font-minecraft">
            Stay Connected
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Whether you want to chat, support us, or explore the world – here's how you can
            join the Brassworks community beyond the game.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6 w-full">
            <Link href="https://discord.gg/neqEBnPVgY" target="_blank" className="w-full">
              <Button
                className={`
                  w-full font-minecraft inline-flex items-center justify-center gap-x-2
                  px-5 py-5 h-14 text-lg ring-2 ring-inset
                  border-blue-700 bg-blue-600 text-white
                  shadow-[0_4px_theme(colors.blue.700)]
                  ring-blue-400
                  hover:translate-y-0.5 hover:bg-blue-500
                  hover:shadow-[0_2px_theme(colors.blue.600)]
                  hover:ring-blue-300
                `}
              >
                <MessageCircle className="h-5 w-5" />
                Join our Discord
              </Button>
            </Link>

            <Link href="https://ko-fi.com/brassworks" target="_blank" className="w-full">
              <Button
                className={`
                  w-full font-minecraft inline-flex items-center justify-center gap-x-2
                  px-5 py-5 h-14 text-lg ring-2 ring-inset
                  border-amber-600 bg-amber-500 text-white
                  shadow-[0_4px_theme(colors.amber.600)]
                  ring-amber-400
                  hover:translate-y-0.5 hover:bg-amber-400
                  hover:shadow-[0_2px_theme(colors.amber.500)]
                  hover:ring-amber-300
                `}
              >
                <Coffee className="h-5 w-5" />
                Buy us a Coffee
              </Button>
            </Link>

            <Link href="/map" target="_blank" className="w-full">
              <Button
                className={`
                  w-full font-minecraft inline-flex items-center justify-center gap-x-2
                  px-5 py-5 h-14 text-lg ring-2 ring-inset
                  border-green-700 bg-green-600 text-white
                  shadow-[0_4px_theme(colors.green.700)]
                  ring-green-400
                  hover:translate-y-0.5 hover:bg-green-500
                  hover:shadow-[0_2px_theme(colors.green.600)]
                  hover:ring-green-300
                `}
              >
                <Map className="h-5 w-5" />
                Our Live Map
              </Button>
            </Link>
          </div>

          <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border">
            <iframe
              src="https://discord.com/widget?id=1346614274415398975&theme=dark"
              width="100%"
              height="100%"
              allowtransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </div>
    </section>
  );
}