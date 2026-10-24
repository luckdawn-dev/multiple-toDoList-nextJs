import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useCategoryLinks() {
    const pathname = usePathname();
    const activeChipRef = useRef<HTMLAnchorElement | null>(null);

    function isCategoryActive(href: string) {
        return pathname === href;
    }

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
