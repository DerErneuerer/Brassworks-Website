import { useEffect, useState } from "react";

/**
 * Helper to track the focus state of an element, window, or document.
 *
 * @param ref The element, document, or window to track focus for. Defaults to the window.
 * @returns A boolean indicating whether the element, document, or window is focused.
 */
export function useFocused(
    ref: HTMLElement | HTMLDocument | Window | null = window,
) {
    const [isFocused, setIsFocused] = useState(true);

    useEffect(() => {
        if (!ref) {
            setIsFocused(false);
            return;
        }

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        ref.addEventListener("focus", handleFocus);
        ref.addEventListener("blur", handleBlur);

        setIsFocused(
            "matches" in ref ? ref.matches(":focus") : document.hasFocus(),
        );

        return () => {
            ref.removeEventListener("focus", handleFocus);
            ref.removeEventListener("blur", handleBlur);
        };
    }, [ref]);

    return isFocused;
}

/**
 * Helper hook to track the hover state of an element.
 *
 * @param ref The element to track hover for.
 * @returns A boolean indicating whether the element is hovered.
 */
export function useHovered(ref: HTMLElement | null) {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!ref) {
            setIsHovered(false);
            return;
        }

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        ref.addEventListener("mouseenter", handleMouseEnter);
        ref.addEventListener("mouseleave", handleMouseLeave);

        setIsHovered(ref.matches(":hover"));

        return () => {
            ref.removeEventListener("mouseenter", handleMouseEnter);
            ref.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref]);

    return isHovered;
}

/**
 * Helper hook to track the visibility of an element.
 *
 * @param ref The element to track visibility for.
 * @returns A boolean indicating whether the element is visible in the viewport.
 */
export function useVisibility(ref: HTMLElement | null) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref) {
            setIsVisible(false);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 },
        );

        observer.observe(ref);

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isVisible;
}
