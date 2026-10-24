import Link from "next/link";
import { ListIcon } from "@/app/shared/components/icons";

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100svh-3.5rem)] px-4 py-6 lg:min-h-screen">
            <div className="m-auto w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-9 text-center shadow-xl shadow-slate-200/70 animate-fade-in-up">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                    <ListIcon className="h-6 w-6 text-slate-400" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    List not found
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    This list doesn&apos;t exist or was removed by the server. Why not create a new one?
                </p>
                <Link
                    href="/toDoList"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition touch-manipulation hover:from-indigo-600 hover:to-violet-700 hover:shadow-md hover:shadow-indigo-500/30 active:scale-[0.98] sm:w-auto"
                >
                    Create new list
                </Link>
            </div>
        </div>
    );
}
