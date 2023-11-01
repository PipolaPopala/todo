import React, { useState } from 'react'

import NewTaskForm from '../newTaskForm/NewTaskForm'
import TaskList from '../taskList/TaskList'

export default function App() {
  const [startId, setStartId] = useState(1)
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

  const editItemForm = (id) => {
    setTodoData((todoData) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id && !el.completed) {
          return { ...el, editing: true }
        } else {
          return el
        }
      })
      return newTodoData
    })
  }

  const onEdit = (e, id) => {
    if (e.keyCode === 13 && e.target.value.trim().length > 0) {
      setTodoData((todoData) => {
        const newTodoData = todoData.map((el) => {
          if (el.id === id) {
            return { ...el, desc: e.target.value, editing: false }
          }
          return el
        })
        return newTodoData
      })
    }
  }

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const newTodoData = todoData.filter((el) => el.id !== id)
      return newTodoData
    })
  }

  const addItem = (e) => {
    e.preventDefault()
    const title = e.target.elements.title.value
    const min = Number(e.target.elements.min.value)
    const sec = Number(e.target.elements.sec.value)
    const time = min * 60 + sec
    if (title.trim().length > 0) {
      const newItem = {
        desc: title,
        completed: false,
        editing: false,
        hidden: false,
        date: new Date(),
        id: startId,
        minutes: min,
        seconds: sec,
        time,
      }
      setTodoData((todoData) => {
        const newTodoData = [...todoData, newItem]
        return newTodoData
      })
      e.target.elements.title.value = ''
      e.target.elements.min.value = ''
      e.target.elements.sec.value = ''
      setStartId(startId + 1)
    }
  }

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed }
        }
        return el
      })
      return newTodoData
    })
    filterItems()
  }

  const onClearCompleted = () => {
    setTodoData((todoData) => {
      const newTodoData = todoData.filter((el) => !el.completed)
      return newTodoData
    })
  }

  const changeFilter = (data) => {
    setFilter(data)
  }

  const filterItems = () => {
    switch (filter) {
      case 'Active':
        setTodoData((todoData) => {
          const newTodoData = todoData.map((el) => {
            if (el.completed === true) {
              el.hidden = true
            } else {
              el.hidden = false
            }
            return el
          })
          return newTodoData
        })
        break
      case 'Completed':
        setTodoData((todoData) => {
          const newTodoData = todoData.map((el) => {
            if (el.completed === true) {
              el.hidden = false
            } else {
              el.hidden = true
            }
            return el
          })
          return newTodoData
        })
        break
      default:
        setTodoData((todoData) => {
          const newTodoData = todoData.map((el) => {
            el.hidden = false
            return el
          })
          return newTodoData
        })
    }
  }

  const countTodo = todoData.filter((el) => !el.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm onSubmit={addItem} />
      <TaskList
        todos={todoData}
        onEditForm={editItemForm}
        onEdit={onEdit}
        onDeleted={deleteItem}
        onToggleCompleted={onToggleCompleted}
        countTodo={countTodo}
        filter={filter}
        changeFilter={changeFilter}
        filterItems={filterItems}
        onClearCompleted={onClearCompleted}
      />
    </section>
  )
}
