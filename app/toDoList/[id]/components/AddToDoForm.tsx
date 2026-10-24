"use client"

import { useEffect, useRef } from "react";
import { PlusIcon, SpinnerIcon } from "@/app/shared/components/icons";
import { useToDoItemForm, type ToDoItemFormParams } from "./hook/useToDoItemForm";

export default function ToDoItemForm(props: ToDoItemFormParams) {
    const { itemName, setItemName, isPending, isEmpty, onCreateItem } = useToDoItemForm(props);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (window.matchMedia("(pointer: fine)").matches) {
            inputRef.current?.focus();
        }
    }, []);

    return (
        <form
            onSubmit={onCreateItem}
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white p-2 pl-4 shadow-sm shadow-slate-200/60 transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/15"
        >
            <input
                ref={inputRef}
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="What's the next task?"
                className="h-10 min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:text-sm"
            />
            <button
                type="submit"
                disabled={isPending || isEmpty}
                className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 px-3.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition touch-manipulation hover:from-indigo-600 hover:to-violet-700 hover:shadow-md hover:shadow-indigo-500/30 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
            >
                {isPending
                    ? <SpinnerIcon className="h-4 w-4 animate-spin" />
                    : <PlusIcon className="h-4 w-4" />}
                <span className="hidden sm:inline">{isPending ? "Adding" : "Add task"}</span>
            </button>
        </form>
    );
}
