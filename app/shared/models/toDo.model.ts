export interface IToDoItem {
    id: string,
    categoryId: string,
    name: string,
    done: boolean
}

export interface IToDoCount {
    total: number,
    done: number
}
