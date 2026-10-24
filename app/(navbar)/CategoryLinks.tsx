"use client"

import Link from "next/link";
import type { ICategoryWithCount } from "@/app/shared/models/categories.model";
import { categoryColor } from "@/app/shared/color";
import { PlusIcon } from "@/app/shared/components/icons";
import { useCategoryLinks } from "./hook/useCategoryLinks";

interface CategoryLinksProps {
    categories: ICategoryWithCount[];
    variant: "row" | "chip";
}

export default function CategoryLinks({ categories, variant }: CategoryLinksProps) {
    const { isCategoryActive } = useCategoryLinks();

    if (categories.length === 0) {
        const emptyClasses =
            variant === "row"
                ? "flex w-full items-center gap-2.5 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-600"
                : "flex items-center gap-1.5 whitespace-nowrap rounded-full bg-indigo-50 px-3 py-1.5 text-[13px] font-medium text-indigo-600 transition hover:bg-indigo-100";

        return (
            <Link href="/toDoList" className={emptyClasses}>
                <PlusIcon className="h-3.5 w-3.5" />
                {variant === "row" ? "Create your first list" : "New list"}
            </Link>
        );
    }

    return categories.map((category) => {
        const href = `/toDoList/${category.id}`;
        const isActive = isCategoryActive(href);
        const color = categoryColor(category.id);

        const itemClasses =
            variant === "row"
                ? `group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition ${
                      isActive
                          ? "bg-indigo-50/80 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                : `flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition ${
                      isActive
                          ? "bg-indigo-600 font-medium text-white shadow-sm shadow-indigo-500/25"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`;

        return (
            <Link key={category.id} href={href} className={itemClasses} title={category.name}>
                <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                />
                <span className={variant === "row" ? "min-w-0 truncate" : "max-w-36 truncate"}>
                    {category.name}
                </span>
                {variant === "row" && category.total > 0 && (
                    <span className="ml-auto text-xs tabular-nums text-slate-400">
                        {category.done > 0 ? `${category.done}/${category.total}` : category.total}
                    </span>
                )}
            </Link>
        );
    });
}
