import {createAction, createSlice} from '@reduxjs/toolkit';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const addTaskAC = createAction<{title: string}>('task/addTask')
export const swapIsDoneAC = createAction<{id: number, isDone: boolean}>('task/swapIsDone')
export const deleteTaskAC = createAction<{id: number}>('task/deleteTask')
export const updateTitleAC = createAction<{id: number, title: string}>('task/updateTitle')

const initialState = {
    tasks: [{id: 1, title: 'HTML', isDone: true}] as TaskType[]
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addTaskAC, (state, action) => {
            const newTask: TaskType = {
                id: state.tasks.length + 1,
                title: action.payload.title,
                isDone: false
            }
            state.tasks.push(newTask)
        })
        builder.addCase(swapIsDoneAC, (state, action) => {
            const index = state.tasks.findIndex(f => f.id === action.payload.id)
            state.tasks[index].isDone = action.payload.isDone
        })
        builder.addCase(deleteTaskAC, (state, action) => {
            const index = state.tasks.findIndex(f => f.id === action.payload.id)
            state.tasks.splice(index, 1)
        })
        builder.addCase(updateTitleAC, (state, action) => {
            const index = state.tasks.findIndex(f => f.id === action.payload.id)
            state.tasks[index].title = action.payload.title
        })
    }
})

export const reducer = slice.reducer