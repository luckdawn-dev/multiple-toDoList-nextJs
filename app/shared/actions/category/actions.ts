"use server"

import { refresh } from "next/cache";
import { ICategory } from "@/app/shared/models/categories.model";
import { removeItemsByCategory } from "../toDoItem/actions";

let categories: ICategory[] = [];

export async function getCategories() {
    return categories;
}

export async function getCategory(id: string) {
    return categories.find((category) => category.id === id) ?? null;
}

export async function addCategory(name: string) {
    const trimmedName = name.trim();
    if (!trimmedName) return null;

    const category: ICategory = { id: crypto.randomUUID(), name: trimmedName };
    categories = [...categories, category];
    refresh();

    return category;
}

export async function removeCategory(id: string) {
    categories = categories.filter((category) => category.id !== id);
    await removeItemsByCategory(id);
    refresh();
}
