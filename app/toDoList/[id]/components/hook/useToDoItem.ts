import { useState } from "react";
import type { IToDoItem } from "@/app/shared/models/toDo.model";

export interface ToDoItemParams {
    toDoItem: IToDoItem,
    toggleItemDone: (categoryId: string, itemId: string) => Promise<void>,
    deleteItem: (categoryId: string, itemId: string) => Promise<void>
}

export function useToDoItem({ toDoItem, toggleItemDone, deleteItem }: ToDoItemParams) {
    const [isPending, setIsPending] = useState<"toggle" | "delete" | null>(null);

    async function onToggleDone() {
        setIsPending("toggle");
        try {
            await toggleItemDone(toDoItem.categoryId, toDoItem.id);
        } finally {
            setIsPending(null);
        }
    }

    async function onDelete() {
        setIsPending("delete");
        try {
            await deleteItem(toDoItem.categoryId, toDoItem.id);
        } finally {
            setIsPending(null);
        }
    }

    const isDone = toDoItem.done;

    return { isPending, isDone, onToggleDone, onDelete };
}
