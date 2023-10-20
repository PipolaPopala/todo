import React, { Component } from 'react'

import NewTaskForm from '../newTaskForm/NewTaskForm'
import TaskList from '../taskList/TaskList'

export default class App extends Component {
  maxId = 1

  constructor(props) {
    super(props)
    this.state = {
      todoData: [],
      filter: 'All',
    }
  }

  editItemForm = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id && !el.completed) {
          return { ...el, editing: true }
        } else {
          return el
        }
      })
      return { todoData: newTodoData }
    })
  }

  onEdit = (e, id) => {
    if (e.keyCode === 13 && e.target.value.trim().length > 0) {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((el) => {
          if (el.id === id) {
            return { ...el, desc: e.target.value, editing: false }
          }
          return el
        })
        return { todoData: newTodoData }
      })
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((el) => el.id !== id)
      return { todoData: newTodoData }
    })
  }

  addItem = (e) => {
    e.preventDefault()
    const title = e.target.elements.title.value
    const min = e.target.elements.min.value
    const sec = e.target.elements.sec.value
    if (title.trim().length > 0) {
      const newItem = {
        desc: title,
        completed: false,
        editing: false,
        hidden: false,
        date: new Date(),
        id: this.maxId++,
        minutes: min,
        seconds: sec,
        timerOn: false,
      }
      this.setState(({ todoData }) => {
        const newTodoData = [...todoData, newItem]
        return { todoData: newTodoData }
      })
      e.target.elements.title.value = ''
      e.target.elements.min.value = ''
      e.target.elements.sec.value = ''
    }
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          if (el.completed) {
            return { ...el, completed: !el.completed }
          } else {
            return { ...el, completed: !el.completed, timerOn: false }
          }
        }
        return el
      })
      return { todoData: newTodoData }
    })
    this.filterItems()
  }

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((el) => !el.completed)
      return { todoData: newTodoData }
    })
  }

  changeFilter = (data) => {
    this.setState({ filter: data })
  }

  filterItems = () => {
    const { filter } = this.state
    switch (filter) {
      case 'Active':
        this.setState(({ todoData }) => {
          const newTodoData = todoData.map((el) => {
            if (el.completed === true) {
              el.hidden = true
            } else {
              el.hidden = false
            }
            return el
          })
          return { todoData: newTodoData }
        })
        break
      case 'Completed':
        this.setState(({ todoData }) => {
          const newTodoData = todoData.map((el) => {
            if (el.completed === true) {
              el.hidden = false
            } else {
              el.hidden = true
            }
            return el
          })
          return { todoData: newTodoData }
        })
        break
      default:
        this.setState(({ todoData }) => {
          const newTodoData = todoData.map((el) => {
            el.hidden = false
            return el
          })
          return { todoData: newTodoData }
        })
    }
  }

  onPlay = (id) => {
    const [{ completed }] = this.state.todoData.filter((el) => el.id === id)
    if (!completed) {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((el) => {
          if (el.id === id) {
            return { ...el, timerOn: true }
          }
          return el
        })
        return { todoData: newTodoData }
      })
      const intervalId = setInterval(() => {
        const [{ minutes, seconds, timerOn }] = this.state.todoData.filter((el) => el.id === id)
        if (timerOn) {
          this.setState(({ todoData }) => {
            const newTodoData = todoData.map((el) => {
              if (el.id === id) {
                if (seconds > 0) {
                  return { ...el, seconds: seconds - 1 }
                } else if (minutes > 0) {
                  return { ...el, seconds: 59, minutes: minutes - 1 }
                }
              }
              return el
            })
            return { todoData: newTodoData }
          })
        } else {
          clearInterval(intervalId)
        }
      }, 1000)
    }
  }

  onPause = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          return { ...el, timerOn: false }
        }
        return el
      })
      return { todoData: newTodoData }
    })
  }

  render() {
    const countTodo = this.state.todoData.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <NewTaskForm onSubmit={this.addItem} />
        <TaskList
          todos={this.state.todoData}
          onEditForm={this.editItemForm}
          onEdit={this.onEdit}
          onDeleted={this.deleteItem}
          onToggleCompleted={this.onToggleCompleted}
          countTodo={countTodo}
          filter={this.state.filter}
          changeFilter={this.changeFilter}
          filterItems={this.filterItems}
          onClearCompleted={this.onClearCompleted}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />
      </section>
    )
  }
}
