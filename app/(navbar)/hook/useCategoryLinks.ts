import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useCategoryLinks() {
    const pathname = usePathname();
    const activeChipRef = useRef<HTMLAnchorElement | null>(null);

    function isCategoryActive(href: string) {
        return pathname === href;
    }

    // On small screens the lists live in a horizontal, scrollable top bar.
    // Keep the active chip visible whenever the route changes.
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        activeChipRef.current?.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }, [pathname]);

    return { isCategoryActive, activeChipRef };
}
