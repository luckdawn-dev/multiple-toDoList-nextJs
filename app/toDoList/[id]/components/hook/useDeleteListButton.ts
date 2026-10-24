import { useRouter } from "next/navigation";
import { useState } from "react";

export interface DeleteListButtonParams {
    listId: string,
    removeCategory: (id: string) => Promise<void>
}

export function useDeleteListButton({ listId, removeCategory }: DeleteListButtonParams) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [isArmed, setIsArmed] = useState(false);

    async function onRemove() {
        if (isPending) return;

        if (!isArmed) {
            setIsArmed(true);
            setTimeout(() => setIsArmed(false), 4000);
            return;
        }

        setIsArmed(false);
        setIsPending(true);
        try {
            await removeCategory(listId);
            router.push("/toDoList");
        } finally {
            setIsPending(false);
        }
    }

    return { isPending, isArmed, onRemove };
}
