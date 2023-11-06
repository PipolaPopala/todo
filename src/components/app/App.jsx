import React, { useState } from 'react'

import NewTaskForm from '../newTaskForm/NewTaskForm'
import TaskList from '../taskList/TaskList'
import Footer from '../footer/Footer'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

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

  return (
    <section className="todoapp">
      <NewTaskForm setTodoData={setTodoData} />
      <section className="main">
        <TaskList todos={todoData} setTodoData={setTodoData} filterItems={filterItems} />
        <Footer
          todos={todoData}
          setTodoData={setTodoData}
          filter={filter}
          setFilter={setFilter}
          filterItems={filterItems}
        />
      </section>
    </section>
  )
}
