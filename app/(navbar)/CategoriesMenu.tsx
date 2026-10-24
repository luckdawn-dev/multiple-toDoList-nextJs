import Link from "next/link";
import { getCategories } from "../shared/actions/category/actions";
import type { ICategoryWithCount } from "@/app/shared/models/categories.model";
import { ListIcon } from "@/app/shared/components/icons";
import CategoryLinks from "./CategoryLinks";
import AddNewCategoryButton from "./AddNewCategoryButton";
import { getToDoCounts } from "../shared/actions/toDoItem/actions";

function Brand({ layout }: { layout: "sidebar" | "topbar" }) {
    const isSidebar = layout === "sidebar";

    return (
        <Link href="/" className="flex shrink-0 items-center gap-3">
            <span
                className={`grid place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/30 ${
                    isSidebar ? "h-10 w-10" : "h-8 w-8 rounded-lg"
                }`}
            >
                <ListIcon className={isSidebar ? "h-5 w-5" : "h-4 w-4"} />
            </span>
            <span>
                <span
                    className={`block font-semibold tracking-tight text-slate-900 ${
                        isSidebar ? "text-[17px]" : "text-[15px]"
                    }`}
                >
                    Taskly
                </span>
                {isSidebar && (
                    <span className="block text-xs text-slate-400">your tasks, organized</span>
                )}
            </span>
        </Link>
    );
}

export default async function CategoriesMenu() {
    const [categories, counts] = await Promise.all([getCategories(), getToDoCounts()]);

    const categoriesWithCount: ICategoryWithCount[] = categories.map((category) => ({
        ...category,
        ...(counts[category.id] ?? { total: 0, done: 0 }),
    }));

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl lg:hidden">
                <Brand layout="topbar" />
                <nav aria-label="My lists" className="no-scrollbar min-w-0 flex-1 overflow-x-auto">
                    <div className="flex items-center gap-1.5">
                        <CategoryLinks categories={categoriesWithCount} variant="chip" />
                    </div>
                </nav>
            </header>

            <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl lg:flex">
                <div className="px-5 pt-6">
                    <Brand layout="sidebar" />
                </div>

                <p className="px-5 pb-2 pt-8 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                    My lists
                </p>
                <nav aria-label="My lists" className="no-scrollbar flex-1 overflow-y-auto px-2.5 pb-2">
                    <div className="space-y-0.5">
                        <CategoryLinks categories={categoriesWithCount} variant="row" />
                    </div>
                </nav>

                <div className="space-y-3 border-t border-slate-200/70 p-4">
                    <AddNewCategoryButton variant="wide" />
                    <p className="text-center text-[11px] leading-relaxed text-slate-400">
                        Data is stored in this browser · stays until you clear it
                    </p>
                </div>
            </aside>

            <AddNewCategoryButton variant="fab" />
        </>
    );
}
