const configuredBaseUrl = import.meta.env.VITE_ASSET_BASE_URL ?? "";

export const ASSET_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

export function assetUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${ASSET_BASE_URL}${normalizedPath}`;
}
