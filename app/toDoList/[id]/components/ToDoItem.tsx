"use client"

import { CheckIcon, TrashIcon } from "@/app/shared/components/icons";
import { useToDoItem, type ToDoItemParams } from "./hook/useToDoItem";

interface ToDoItemProps extends ToDoItemParams {
    index: number
}

export default function ToDoItem({ toDoItem, index, toggleItemDone, deleteItem }: ToDoItemProps) {
    const { isPending, isDone, onToggleDone, onDelete } = useToDoItem({ toDoItem, toggleItemDone, deleteItem });

    return (
        <li
            className="group flex animate-fade-in-up items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 transition hover:border-slate-300 hover:bg-slate-50/70"
            style={{ animationDelay: `${index * 40}ms` }}
        >
            <button
                type="button"
                onClick={onToggleDone}
                disabled={isPending !== null}
                aria-pressed={isDone}
                aria-label={isDone ? "Mark as not completed" : "Mark as completed"}
                title={isDone ? "Mark as not completed" : "Mark as completed"}
                className={`grid h-[22px] w-[22px] shrink-0 cursor-pointer place-items-center rounded-full transition-all duration-200 disabled:pointer-events-none ${
                    isDone
                        ? "border border-transparent bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/30"
                        : "border-2 border-slate-300 text-transparent hover:border-indigo-500"
                } ${isPending === "toggle" ? "opacity-50" : ""}`}
            >
                <CheckIcon className="h-3 w-3" strokeWidth={3} />
            </button>

            <p
                className={`min-w-0 flex-1 text-sm transition-colors ${
                    isDone ? "text-slate-400 line-through decoration-slate-300" : "text-slate-700"
                }`}
            >
                {toDoItem.name}
            </p>

            <button
                type="button"
                onClick={onDelete}
                disabled={isPending !== null}
                aria-label={`Remove task ${toDoItem.name}`}
                title="Remove"
                className={`shrink-0 cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:pointer-events-none disabled:opacity-40 sm:opacity-0 sm:group-hover:opacity-100 ${
                    isPending === "delete" ? "opacity-40 sm:opacity-100" : ""
                }`}
            >
                <TrashIcon className="h-4 w-4" />
            </button>
        </li>
    );
}
