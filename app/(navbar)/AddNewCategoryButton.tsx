import Link from "next/link";
import { PlusIcon } from "@/app/shared/components/icons";

interface AddNewCategoryButtonProps {
    variant?: "wide" | "fab";
}

export default function AddNewCategoryButton({ variant = "wide" }: AddNewCategoryButtonProps) {
    if (variant === "fab") {
        return (
            <Link
                href="/toDoList"
                aria-label="New list"
                title="New list"
                className="fixed right-6 bottom-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 transition touch-manipulation hover:from-indigo-600 hover:to-violet-700 hover:shadow-indigo-500/40 active:scale-95 lg:hidden"
            >
                <PlusIcon className="h-5 w-5" />
            </Link>
        );
    }

    return (
        <Link
            href="/toDoList"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition hover:from-indigo-600 hover:to-violet-700 hover:shadow-md hover:shadow-indigo-500/30 active:scale-[0.98]"
        >
            <PlusIcon className="h-4 w-4" />
            New list
        </Link>
    );
}
