"use client"

import { SpinnerIcon, TrashIcon } from "@/app/shared/components/icons";
import { useDeleteListButton, type DeleteListButtonParams } from "./hook/useDeleteListButton";

export default function DeleteListButton(props: DeleteListButtonParams) {
    const { isPending, isArmed, onRemove } = useDeleteListButton(props);

    return (
        <button
            type="button"
            onClick={onRemove}
            disabled={isPending}
            aria-label={isArmed ? "Confirm deleting this list" : "Delete list"}
            title={isArmed ? "Click again to confirm the deletion" : "Delete this list and all of its tasks"}
            className={`flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-3 text-sm font-medium transition touch-manipulation active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ${
                isArmed || isPending
                    ? "border-transparent bg-linear-to-br from-rose-500 to-rose-600 text-white shadow-sm shadow-rose-500/25"
                    : "border-slate-200 bg-white text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            }`}
        >
            {isPending ? <SpinnerIcon className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
            <span className="hidden sm:inline">{isPending ? "Deleting" : isArmed ? "Confirm?" : "Delete list"}</span>
        </button>
    );
}
