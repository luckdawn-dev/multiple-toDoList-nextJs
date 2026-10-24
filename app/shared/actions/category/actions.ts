"use server"

import { refresh } from "next/cache";
import { ICategory } from "@/app/shared/models/categories.model";
import { readState, writeState } from "@/app/shared/store/store";
import { removeItemsByCategory } from "../toDoItem/actions";

export async function getCategories() {
    return (await readState()).categories;
}

export async function getCategory(id: string) {
    return (await readState()).categories.find((category) => category.id === id) ?? null;
}

export async function addCategory(name: string) {
    const trimmedName = name.trim();
    if (!trimmedName) return null;

    const category: ICategory = { id: crypto.randomUUID(), name: trimmedName };
    const state = await readState();
    await writeState({ ...state, categories: [...state.categories, category] });
    refresh();

    return category;
}

export async function removeCategory(id: string) {
    const state = await readState();
    await writeState({ ...state, categories: state.categories.filter((category) => category.id !== id) });
    await removeItemsByCategory(id);
    refresh();
}
