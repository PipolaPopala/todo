import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ setTodoData }) {
  const [startId, setStartId] = useState(1)
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

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={addItem}>
        <input className="new-todo" placeholder="Task" autoFocus required name="title" />
        <input className="new-todo-form__timer" placeholder="Min" type="number" name="min" min="0" max="59" required />
        <input className="new-todo-form__timer" placeholder="Sec" type="number" name="sec" min="0" max="59" required />
        <button className="visually-hidden" type="submit"></button>
      </form>
    </header>
  )
}

export default NewTaskForm

NewTaskForm.defaultProps = {
  setTodoData: () => {},
}

NewTaskForm.propTypes = {
  setTodoData: PropTypes.func,
}
