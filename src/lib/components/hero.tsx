import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocused, useHovered, useVisibility } from "../hooks/interaction.js";
import type { CSSProperties, PropsWithChildren } from "react";
import { Button, Section } from "brassui-react";
import classNames from "classnames";

export interface HeroSlideLogoDef {
    source: string;
    alt: string;
    href: string;
    newTab: boolean;
    width: CSSProperties["width"];
    positionX: CSSProperties["left"];
    positionY: CSSProperties["top"];
    opacity: number;
    linkClass: string;
    imageClass: string;
}

export interface HeroSlideDef {
    title: string;
    subtitle: string;
    video: string;
    thumbnail: string | null;
    logo: HeroSlideLogoDef | null;
}

export interface HeroProps {
    slides: HeroSlideDef[];
    id?: HTMLElement["id"];
    className?: HTMLElement["className"];
}

export function Hero({ slides, id, className }: PropsWithChildren<HeroProps>) {
    const [_activeSlideIndex, setActiveSlideIndex] = useState(0);
    const activeSlideIndex = _activeSlideIndex % slides.length;

    const [containerElement, setContainerElement] =
        useState<HTMLElement | null>(null);

    const advanceSlide = useCallback(
        (index?: number) => {
            setActiveSlideIndex((prevIndex) => {
                if (index !== undefined) {
                    return index % slides.length;
                }
                return (prevIndex + 1) % slides.length;
            });
        },
        [slides.length],
    );

    const isWindowFocused = useFocused();
    const isHovering = useHovered(containerElement);
    const isVisible = useVisibility(containerElement);
    const isPaused = !isWindowFocused || !isVisible || isHovering;

    const cardElements = useMemo(
        () =>
            slides.map((slide, i) => (
                <Hero.Card
                    key={i}
                    slide={slide}
                    index={i}
                    slideCount={slides.length}
                    onActivate={() => advanceSlide(i)}
                />
            )),
        [slides],
    );
    const slideElements = useMemo(
        () =>
            slides.map((slide, i) => (
                <Hero.Slide
                    key={i}
                    slide={slide}
                    active={i === activeSlideIndex}
                    paused={isPaused}
                    onComplete={() => advanceSlide(i + 1)}
                />
            )),
        [slides, activeSlideIndex, isPaused, advanceSlide],
    );

    return (
        <div
            ref={setContainerElement}
            id={id}
            className={classNames("relative w-full", className)}
        >
            <div className="relative w-full h-full">{slideElements}</div>
            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4">
                {cardElements}
            </div>
        </div>
    );
}

export interface HeroCardProps {
    onActivate: () => void;
    index: number;
    slideCount: number;
    slide: HeroSlideDef;
}

function HeroCard({ slide, index, slideCount, onActivate }: HeroCardProps) {
    const ariaLabel = `Activate slide: ${slide.title} (${index + 1} of ${slideCount})`;

    return (
        <Button onClick={onActivate} type="button" aria-label={ariaLabel}>
            {slide.title}
        </Button>
    );
}
Hero.Card = HeroCard;

export interface HeroSlideProps {
    active: boolean;
    paused: boolean;
    slide: HeroSlideDef;
    onComplete: () => void;
}

function HeroSlide({ slide, active, paused, onComplete }: HeroSlideProps) {
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
        null,
    );

    useEffect(() => {
        if (!videoElement) return;

        if (!active) {
            // when inactive, reset to beginning
            videoElement.currentTime = 0;
        } else {
            if (!paused) {
                // when active and not paused, play the video
                void videoElement.play().catch((error) => {
                    console.error("Error playing hero video:", error);
                });
            } else {
                videoElement.pause();
            }
        }

        videoElement.addEventListener("ended", onComplete);

        return () => {
            videoElement.removeEventListener("ended", onComplete);
        };
    }, [videoElement, active, paused, onComplete]);

    return (
        <div
            className={classNames(
                "absolute w-full h-full",
                active
                    ? "z-1 opacity-100"
                    : "z-0 opacity-0 pointer-events-none",
            )}
        >
            <video
                ref={setVideoElement}
                className="w-full h-full object-cover inset-0 transition-opacity duration-1800 ease-in-out will-change-[opacity]"
                preload="auto"
                muted
                playsInline
            >
                <source src={slide.video} type="video/mp4" />
            </video>
        </div>
    );
}
Hero.Slide = HeroSlide;
