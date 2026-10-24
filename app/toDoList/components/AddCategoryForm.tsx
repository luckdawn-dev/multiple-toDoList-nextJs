"use client"

import { ArrowRightIcon, PlusIcon, SpinnerIcon } from "@/app/shared/components/icons";
import { useAddCategoryForm, type AddCategoryFormParams } from "./hook/useAddCategoryForm";

const SUGGESTIONS = ["Groceries", "Studies", "Work", "Home"];

export default function AddCategoryForm(props: AddCategoryFormParams) {
    const { categoryName, setCategoryName, isPending, isEmpty, onCreateCategory } = useAddCategoryForm(props);

    return (
        <div className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center px-4 py-10 lg:min-h-screen">
            <div className="w-full max-w-md animate-fade-in-up">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/70 sm:p-9">
                    <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
                        <PlusIcon className="h-6 w-6" />
                    </div>

                    <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                        Create a new list
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        One list for what you need to do, another for what you need to buy.
                        Organize it your way.
                    </p>

                    <form onSubmit={onCreateCategory} className="mt-7 space-y-3">
                        <input
                            autoFocus
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="List name — e.g. Weekly groceries"
                            className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50/60 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
                        />
                        <button
                            type="submit"
                            disabled={isPending || isEmpty}
                            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-medium text-white shadow-sm shadow-indigo-500/25 transition hover:from-indigo-600 hover:to-violet-700 hover:shadow-md hover:shadow-indigo-500/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
                        >
                            {isPending
                                ? <SpinnerIcon className="h-4 w-4 animate-spin" />
                                : <ArrowRightIcon className="h-4 w-4" />}
                            {isPending ? "Creating..." : "Create list"}
                        </button>
                    </form>
                    <p className="mt-3 text-center text-[11px] text-slate-400">
                        Press Enter to create
                    </p>

                    <div className="mt-7 border-t border-slate-100 pt-5">
                        <p className="mb-2.5 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                            Suggestions
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTIONS.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => setCategoryName(suggestion)}
                                    className="cursor-pointer rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
