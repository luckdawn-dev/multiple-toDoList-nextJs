"use server"

import { refresh } from "next/cache";
import { IToDoItem, IToDoCount } from "@/app/shared/models/toDo.model"

let toDoItems: IToDoItem[] = [];

export async function getToDoItems(categoryId: string) {
    return toDoItems.filter((toDoItem) => toDoItem.categoryId === categoryId);
}

export async function getToDoCounts(): Promise<Record<string, IToDoCount>> {
    return toDoItems.reduce<Record<string, IToDoCount>>((counts, toDoItem) => {
        const count = counts[toDoItem.categoryId] ?? { total: 0, done: 0 };
        count.total += 1;
        if (toDoItem.done) count.done += 1;
        counts[toDoItem.categoryId] = count;
        return counts;
    }, {});
}

export async function addToDoItem(categoryId: string, itemName: string) {
    const trimmedName = itemName.trim();
    if (!trimmedName) return;

    toDoItems = [
        ...toDoItems,
        { id: crypto.randomUUID(), categoryId, name: trimmedName, done: false },
    ];
    refresh();
}

export async function toggleItemDone(categoryId: string, itemId: string) {
    toDoItems = toDoItems.map((toDoItem) =>
        toDoItem.id === itemId && toDoItem.categoryId === categoryId
            ? { ...toDoItem, done: !toDoItem.done }
            : toDoItem,
    );
    refresh();
}

export async function deleteItem(categoryId: string, itemId: string) {
    toDoItems = toDoItems.filter(
        (toDoItem) => toDoItem.categoryId !== categoryId || toDoItem.id !== itemId,
    );
    refresh();
}

export async function removeItemsByCategory(categoryId: string) {
    toDoItems = toDoItems.filter((toDoItem) => toDoItem.categoryId !== categoryId);
}
