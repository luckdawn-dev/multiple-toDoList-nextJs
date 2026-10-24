import { usePathname } from "next/navigation";

export function useCategoryLinks() {
    const pathname = usePathname();

    function isCategoryActive(href: string) {
        return pathname === href;
    }

    return { isCategoryActive };
}
