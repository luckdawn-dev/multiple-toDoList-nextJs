# Taskly — a multi-list to-do app

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

A polished, fully responsive to-do app where **every task lives in its own list**: one list for what you have to *do*, another for what you need to *buy*, one for *studies*, one for *work* — as many as you want, each with its own accent color and live progress bar.

> Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4** and **Server Actions**. No client state library, no external API, no database — the whole backend is powered by one React Server Components data flow.

---

## ✨ Features

- **Unlimited named lists (categories)** — "Groceries", "Studies", "Work", "Home"… create as many as you like, straight from the sidebar.
- **Per-list to-dos** — add, complete (checkbox with strike-through) and delete tasks. Every list is isolated: tasks never leak between categories.
- **List management** — delete any list with a two-step confirm button; deleting a list also discards its tasks.
- **Live overview** — each list shows a progress bar ("3 of 5 completed"), and the sidebar shows `done/total` badges per list, both updating instantly after every mutation.
- **Straight-in navigation** — creating a list navigates you right into it; opening a list shows its name prominently with its own accent color (even in the browser tab title, via `generateMetadata`).
- **Adaptive navigation** — a fixed sidebar on desktop; a top bar with horizontally scrollable category chips plus a floating action button on mobile.
- **Deterministic identity** — each list gets a stable accent color derived from its id, consistent across the app.
- **Friendly 404** — unknown list ids render a custom "List not found" page instead of a generic error.
- **Responsive & accessible** — desktop sidebar ↔ mobile top bar with the same component tree; hover states degrade gracefully on touch (revealed delete buttons, `touch-manipulation`, 40px+ tap targets); ARIA labels on every icon button; visible focus rings; `prefers-reduced-motion` support; keyboard-friendly forms (Enter to submit).
- **Mobile-specific hardening** — phone-landscape proof (centered screens scroll instead of clipping), 16px inputs on touch so iOS never auto-zooms on focus, the keyboard only auto-opens when a mouse is present, extra bottom padding keeps the last task clear of the floating "+" button, and the top-bar chip strip auto-scrolls to the active list (`prefers-reduced-motion` aware).
- **Streaming UX** — skeleton screens for the navigation and page content powered by Partial Prerendering.

## 🧱 Tech stack

| Layer      | Choice                                            | Notes                                                             |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| Framework  | Next.js 16.4 (App Router, Turbopack)              | Server Components everywhere possible                              |
| UI runtime | React 19                                          | Server Actions + `transition`-style pending states                  |
| Styling    | Tailwind CSS 4                                    | `@theme` tokens, `bg-linear-to-*` gradients, tiny custom CSS        |
| Font       | Geist / Geist Mono (`next/font`)                  | Exposed as Tailwind `--font-sans` / `--font-mono` tokens            |
| State      | In-memory module state + Server Actions + `refresh()` | Zero-dependency persistence layer (see *Limitations*)           |

## 🚀 Getting started

```bash
# 1. install dependencies
npm install

# 2. run the dev server (http://localhost:3000)
npm run dev

# 3. production build & start
npm run build
npm start

# lint checks
npm run lint
```

## 🗂️ Project structure

```
app/
├── layout.tsx                  # root layout: fonts, metadata, <Suspense> shells
├── globals.css                 # Tailwind 4 + theme tokens + light theme base
├── page.tsx                    # "/" → redirects to /toDoList
├── not-found.tsx               # custom 404 ("List not found")
├── (navbar)/                   # navigation shell (rendered by the root layout)
│   ├── CategoriesMenu.tsx      # server component: sidebar (desktop) + top bar (mobile)
│   ├── CategoryLinks.tsx       # client component: active link highlighting
│   ├── AddNewCategoryButton.tsx# "New list" button (sidebar variant + mobile FAB)
│   └── hook/
│       └── useCategoryLinks.ts # usePathname + isCategoryActive helper
├── toDoList/
│   ├── page.tsx                # "Create a new list" screen
│   ├── components/
│   │   ├── AddCategoryForm.tsx # create-list form + suggestions
│   │   └── hook/
│   │       └── useAddCategoryForm.ts # form state, create + navigate flow
│   └── [id]/
│       ├── page.tsx            # validates the id (notFound fallback), sets tab title, renders the list UI
│       └── components/
│           ├── ToDoItem.tsx            # single task row (checkbox, delete)
│           ├── AddToDoForm.tsx         # add-task form
│           ├── DeleteListButton.tsx    # deletes the list (two-step confirm) and its tasks
│           └── hook/
│               ├── useToDoItem.ts      # per-task state (toggle/delete pending)
│               ├── useToDoItemForm.ts  # task input state + submit flow
│               └── useDeleteListButton.ts # arm-confirm state + delete flow
└── shared/
    ├── actions/
    │   ├── category/actions.ts # category CRUD (Server Actions)
    │   └── toDoItem/actions.ts # task CRUD, scoped per category (Server Actions)
    ├── models/                 # TypeScript interfaces (IToDoItem, ICategory, …)
    ├── components/icons.tsx    # inline SVG icon set (currentColor-based)
    └── color.ts                # deterministic per-category accent colors
```

## 🔄 How the data flows

There is intentionally **no database and no client state manager** — the app demonstrates the pure App Router mental model:

1. A button/form in a **Client Component** calls a **Server Action** (exported from a `"use server"` file).
2. The action mutates **in-memory state** (module-level arrays) and calls `refresh()` from `next/cache`, which re-fetches the current route on the server.
3. **Server Components** re-render with fresh data and stream the update to the client.

Two details worth noting for reviewers:

- **State is scoped per category.** Tasks never leak between lists — `getToDoItems(categoryId)` filters by category and mutating actions take the `categoryId` and validate ownership.
- **Partial Prerendering (cacheComponents).** The route shell is prerendered; dynamic parts (categories list, current path via `usePathname()`, `await params`) are wrapped in `<Suspense>` with custom skeletons and stream in. That wiring is what the Next 16 `cacheComponents` flag enforces at build time.

## 🎯 What this project demonstrates

- Designing a full App Router architecture around **Server Components and Server Actions**, with clear `client` / `server` boundaries (every interactive piece is a thin Client Component on top of server-rendered UI).
- **Feature-first, hook-driven organization**: one custom hook per interaction (form submit, arm-to-confirm delete, per-item pending) so components stay declarative.
- Next 16 specifics: `cacheComponents` / Partial Prerendering with `<Suspense>` skeletons, `refresh()` revalidation from Server Actions, `PageProps` and typed routes.
- A **responsive-first UI system** in Tailwind: sidebar ↔ top-bar navigation with the same component tree, touch-friendly targets, skeleton streaming states.
- Accessibility attention beyond the checklist: ARIA states (`aria-pressed`, `aria-label`, `role="status"`), focus-visible rings, hit areas off on hover-only affordances.

## ⚠️ Known limitations (on purpose — this is a study project)

- **Data is not persistent.** All data lives in memory, so it is wiped whenever the server restarts (hence the small note in the sidebar footer). Swapping the arrays for SQLite/Prisma or loading state from an API would be the natural next step.
- **No auth, no editing, no drag & drop reordering** — deliberately out of scope for this exercise.
- **Single instance.** In-memory state means the app must run as one server process.

## 🗺️ Roadmap ideas

- Persist lists & tasks (SQLite + Prisma / server-side KV).
- Rename categories and edit tasks inline (the `pencil` icon in `public/` is waiting for it).
- Optimistic UI with React's `useOptimistic` and animated list reordering.
- Delete/rename lists directly from the sidebar context menu.

---

Built by [luckdawn-dev](https://github.com/luckdawn-dev) as a hands-on study project — feedback is always welcome.
