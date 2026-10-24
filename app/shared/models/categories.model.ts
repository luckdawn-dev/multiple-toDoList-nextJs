import type { IToDoCount } from "./toDo.model";

export interface ICategory {
    id: string,
    name: string
}

export type ICategoryWithCount = ICategory & IToDoCount;
