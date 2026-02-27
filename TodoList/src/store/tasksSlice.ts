import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type TaskStatus = 'pending' | 'done'

export interface Task {
  id: string
  title: string
  status: TaskStatus
}

interface TasksState {
  items: Task[]
}

const initialState: TasksState = {
  items: [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.push(action.payload)
      },
      prepare(title: string, status: TaskStatus) {
        return {
          payload: {
            id: nanoid(),
            title,
            status,
          },
        }
      },
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
  },
})

export const { addTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer