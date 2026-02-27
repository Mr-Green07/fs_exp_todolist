import { useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, type TaskStatus } from './store/tasksSlice'
import type { AppDispatch, RootState } from './store'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<TaskStatus>('pending')
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.items)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    dispatch(addTask(trimmedTitle, status))
    setTitle('')
    setStatus('pending')
  }

  return (
    <main className="todo-page">
      <h1>Redux Todo List</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as TaskStatus)}
        >
          <option value="pending">pending</option>
          <option value="done">done</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && <li className="empty">No tasks yet.</li>}

        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div>
              <p className="task-title">{task.title}</p>
              <p className="task-status">Status: {task.status}</p>
            </div>
            <button type="button" onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
