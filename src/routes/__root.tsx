import {
    HeadContent,
    Scripts,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import TanStackQueryDevtools from "../lib/queries/devtools.js";
import { CmsFonts } from "../components/general/CmsFonts";
import { DeveloperHint } from "../components/general/DeveloperHint";
import { LoadingScreen } from "../components/general/LoadingScreen";
import { NotFoundPage } from "../components/general/NotFoundPage";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
    queryClient: QueryClient;
}

const INITIAL_SCROLL_SCRIPT = `
    try {
        document.documentElement.dataset.siteTheme = "brass";
    } catch {
        document.documentElement.dataset.siteTheme = "brass";
    }
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                name: "theme-color",
                content: "#171614",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {
                rel: "icon",
                href: "/favicon.ico",
            },
        ],
    }),
    notFoundComponent: NotFoundPage,
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-site-theme="brass" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{ __html: INITIAL_SCROLL_SCRIPT }}
                />
                <HeadContent/>
                <CmsFonts/>
            </head>
            <body>
                <DeveloperHint/>
                <LoadingScreen/>
                {children}
                <TanStackDevtools
                    config={{
                        position: "bottom-right",
                    }}
                    plugins={[
                        {
                            name: "Tanstack Router",
                            render: <TanStackRouterDevtoolsPanel/>,
                        },
                        TanStackQueryDevtools,
                    ]}
                />
                <Scripts/>
            </body>
        </html>
    );
}
