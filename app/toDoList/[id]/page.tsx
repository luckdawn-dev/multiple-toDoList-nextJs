import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getCategory, removeCategory } from "@/app/shared/actions/category/actions";
import { addToDoItem, deleteItem, getToDoItems, toggleItemDone } from "@/app/shared/actions/toDoItem/actions";
import { categoryColor } from "@/app/shared/color";
import { ListIcon } from "@/app/shared/components/icons";
import ToDoItem from "./components/ToDoItem";
import ToDoItemForm from "./components/AddToDoForm";
import DeleteListButton from "./components/DeleteListButton";

type ToDoListByIdProps = PageProps<'/toDoList/[id]'>;

export const instant = false;

export async function generateMetadata({ params }: ToDoListByIdProps): Promise<Metadata> {
    const { id } = await params;
    const category = await getCategory(id);
    return { title: category?.name ?? "List" };
}

export default function ToDoListById(props: ToDoListByIdProps) {
    return <ToDoListContent params={props.params} />;
}

async function ToDoListContent({ params }: { params: Promise<{ id: string }> }) {
    await connection();
    const { id } = await params;

    const category = await getCategory(id);
    if (!category) {
        notFound();
    }

    const toDoItems = await getToDoItems(id);
    const total = toDoItems.length;
    const done = toDoItems.filter((toDoItem) => toDoItem.done).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    const color = categoryColor(category.id);

    return (
        <div className="mx-auto w-full max-w-3xl px-4 pt-8 pb-28 lg:px-8 lg:py-10">
            <div className="animate-fade-in-up">
                <div className="flex items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-slate-200/60"
                        style={{ backgroundColor: color }}
                    />
                    <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        {category.name}
                    </h1>
                    <DeleteListButton listId={id} removeCategory={removeCategory} />
                </div>

                <p className="mt-2 text-sm text-slate-500" role="status">
                    {total === 0
                        ? "No tasks yet — the list is waiting."
                        : `${done} of ${total} ${total === 1 ? "task" : "tasks"} completed`}
                </p>

                <div className="mt-7">
                    <ToDoItemForm categoryId={id} addToDoItem={addToDoItem} />
                </div>

                {total > 0 && (
                    <div className="mt-5" aria-hidden="true">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-600 transition-all duration-500"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                )}

                {total === 0 ? (
                    <div className="mt-8 grid place-items-center gap-3 rounded-2xl border border-dashed border-slate-300/80 bg-white/60 px-6 py-16 text-center">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-400">
                            <ListIcon className="h-5 w-5" />
                        </span>
                        <p className="text-sm font-medium text-slate-600">Nothing here yet</p>
                        <p className="max-w-xs text-sm text-slate-400">
                            Add your first task above — this list is ready when you are.
                        </p>
                    </div>
                ) : (
                    <ul className="mt-6 space-y-2">
                        {toDoItems.map((toDoItem, index) => (
                            <ToDoItem
                                key={toDoItem.id}
                                toDoItem={toDoItem}
                                index={index}
                                toggleItemDone={toggleItemDone}
                                deleteItem={deleteItem}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
