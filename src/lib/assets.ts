const configuredBaseUrl = import.meta.env.VITE_ASSET_BASE_URL ?? "";

export const ASSET_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

function isExternalUrl(path: string) {
    return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path);
}

export function assetUrl(path: string): string {
    if (!path || isExternalUrl(path)) return path;

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${ASSET_BASE_URL}${normalizedPath}`;
}
