import { useState, type SubmitEvent } from "react";

export interface ToDoItemFormParams {
    categoryId: string,
    addToDoItem: (categoryId: string, itemName: string) => Promise<void>
}

export function useToDoItemForm({ categoryId, addToDoItem }: ToDoItemFormParams) {
    const [itemName, setItemName] = useState('');
    const [isPending, setIsPending] = useState(false);

    const isEmpty = itemName.trim().length === 0;

    async function onCreateItem(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isPending || isEmpty) return;

        setIsPending(true);
        try {
            await addToDoItem(categoryId, itemName);
            setItemName('');
        } finally {
            setIsPending(false);
        }
    }

    return { itemName, setItemName, isPending, isEmpty, onCreateItem };
}
