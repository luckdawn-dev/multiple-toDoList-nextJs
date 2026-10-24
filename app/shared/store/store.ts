import { cookies } from "next/headers";
import type { ICategory } from "../models/categories.model";
import type { IToDoItem } from "../models/toDo.model";

/**
 * Persistence layer for the app's data.
 *
 * All state lives in a single browser cookie. Server Actions read/write it via
 * the `cookies()` runtime API, which guarantees:
 *
 * 1. **True dynamic rendering** — reads go through `cookies()`, so Next.js
 *    (cacheComponents) always re-renders this data per request behind its
 *    `<Suspense>` boundaries instead of baking a build-time snapshot into the
 *    static shell.
 * 2. **Serverless compatibility** — the data travels with every request, so it
 *    survives per-invocation instances (Vercel), server restarts (self-hosted)
 *    and is naturally scoped per browser.
 * 3. **Fresh client state after mutations** — `cookies().set()` from a Server
 *    Action clears the client router cache, so `refresh()` results are applied
 *    immediately without a manual reload.
 *
 * Cookie storage imposes a ~4KB limit per cookie, which is plenty for demo
 * usage (roughly a few dozen lists/tasks).
 */

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
        // Corrupted cookie — fall through to the empty state.
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
