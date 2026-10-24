import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import type { ICategory } from "@/app/shared/models/categories.model";

export interface AddCategoryFormParams {
    createCategory: (name: string) => Promise<ICategory | null>
}

export function useAddCategoryForm({ createCategory }: AddCategoryFormParams) {
    const router = useRouter();
    const [categoryName, setCategoryName] = useState<string>('');
    const [isPending, setIsPending] = useState(false);

    const isEmpty = categoryName.trim().length === 0;

    async function onCreateCategory(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isPending || isEmpty) return;

        setIsPending(true);
        try {
            const category = await createCategory(categoryName);
            if (category) router.push(`/toDoList/${category.id}`);
        } finally {
            setIsPending(false);
        }
    }

    return { categoryName, setCategoryName, isPending, isEmpty, onCreateCategory };
}
