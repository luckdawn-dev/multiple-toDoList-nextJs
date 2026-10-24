import type { Metadata } from "next";
import AddCategoryForm from "./components/AddCategoryForm";
import { addCategory } from "../shared/actions/category/actions";

export const metadata: Metadata = {
    title: "Create list",
};

export default async function ToDoMainPage() {
    return (
        <>
            <AddCategoryForm createCategory={addCategory}/>
        </>
    )
}
