"use client";

import Link from "next/link";
import { Coffee, Map } from "lucide-react";

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Info Cards */}
                    <div className="flex flex-col gap-6 w-full h-[500px]">
                        {[
                            {
                                href: "/map",
                                icon: <Map className="h-5 w-5" />,
                                iconBg:
                                    "bg-green-500/20 text-green-600 dark:bg-green-400/20 dark:text-green-300",
                                title: "Our Live Map",
                                description:
                                    "Explore the Brassworks world live from your browser. See builds, terrain, and players in real-time.",
                                buttonText: "View Map",
                                buttonColor: {
                                    bg: "bg-green-600",
                                    ring: "ring-green-400",
                                    border: "border-green-700",
                                    hoverBg: "hover:bg-green-500",
                                    shadow: "shadow-[0_4px_theme(colors.green.700)]",
                                    hoverShadow: "hover:shadow-[0_2px_theme(colors.green.600)]",
                                },
                            },
                            {
                                href: "https://ko-fi.com/brassworks",
                                icon: <Coffee className="h-5 w-5" />,
                                iconBg:
                                    "bg-amber-500/25 text-amber-600 dark:bg-amber-400/20 dark:text-amber-300",
                                title: "Buy us a Coffee",
                                description:
                                    "Support the development and help keep the project alive with a small donation.",
                                buttonText: "Support Us",
                                buttonColor: {
                                    bg: "bg-amber-500",
                                    ring: "ring-amber-400",
                                    border: "border-amber-600",
                                    hoverBg: "hover:bg-amber-400",
                                    shadow: "shadow-[0_4px_theme(colors.amber.600)]",
                                    hoverShadow: "hover:shadow-[0_2px_theme(colors.amber.500)]",
                                },
                            },
                        ].map(
                            (
                                {
                                    href,
                                    icon,
                                    iconBg,
                                    title,
                                    description,
                                    buttonText,
                                    buttonColor,
                                },
                                i
                            ) => (
                                <div
                                    key={i}
                                    className={`
                    relative rounded-xl bg-white px-6 py-6 flex flex-col
                    shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)]
                    dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)]
                    dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl 
                    dark:before:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.20),0px_1px_0px_0px_rgba(255,255,255,0.06)_inset]
                  `}
                                >
                                    <div className="relative pl-14 pr-2">
                                        {/* ✅ Icon bubble stays */}
                                        <div
                                            className={`absolute top-0 left-0 flex w-10 h-10 items-center justify-center rounded-full ${iconBg}`}
                                            aria-hidden="true"
                                        >
                                            {icon}
                                        </div>

                                        {/* Title + Description */}
                                        <dt className="text-base text-zinc-800 dark:text-white font-medium">
                                            {title}
                                        </dt>
                                        <dd className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
                                            {description}
                                        </dd>
                                    </div>

                                    {/* ✅ Clean, small Button */}
                                    <div className="mt-auto flex justify-end">
                                        <Link href={href} target="_blank">
                                            <button
                                                className={`
                          font-minecraft inline-flex items-center justify-center
                          px-4 py-2 h-10 text-sm ring-2 ring-inset text-white
                          ${buttonColor.bg} ${buttonColor.ring} ${buttonColor.border}
                          ${buttonColor.shadow}
                          ${buttonColor.hoverBg} ${buttonColor.hoverShadow}
                          hover:translate-y-0.5 transition
                        `}
                                            >
                                                {buttonText}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* Discord Widget */}
                    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border">
                        <iframe
                            src="https://discord.com/widget?id=1346614274415398975&theme=dark"
                            width="100%"
                            height="100%"
                            allowTransparency={true}
                            frameBorder="0"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
