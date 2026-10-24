import { cookies } from "next/headers";
import type { ICategory } from "../models/categories.model";
import type { IToDoItem } from "../models/toDo.model";

const STORE_COOKIE = "taskly-state";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

interface StoreState {
    categories: ICategory[];
    toDoItems: IToDoItem[];
}

const EMPTY_STATE: StoreState = { categories: [], toDoItems: [] };

function isStoreState(value: unknown): value is StoreState {
    return (
        typeof value === "object" && value !== null &&
        Array.isArray((value as StoreState).categories) &&
        Array.isArray((value as StoreState).toDoItems)
    );
}

export async function readState(): Promise<StoreState> {
    const raw = (await cookies()).get(STORE_COOKIE)?.value;
    if (!raw) return EMPTY_STATE;

    try {
        const parsed: unknown = JSON.parse(raw);
        if (isStoreState(parsed)) return parsed;
    } catch {
    }
    return EMPTY_STATE;
}

export async function writeState(state: StoreState): Promise<void> {
    (await cookies()).set(STORE_COOKIE, JSON.stringify(state), {
        path: "/",
        maxAge: ONE_YEAR_SECONDS,
        sameSite: "lax",
        httpOnly: true,
    });
}
