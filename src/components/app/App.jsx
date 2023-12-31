import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../newTaskForm/NewTaskForm'
import TaskList from '../taskList/TaskList'

export default class App extends Component {
  maxId = 100

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
    if (e.keyCode === 13 && e.target.value.trim().length > 0) {
      const newItem = {
        desc: e.target.value,
        completed: false,
        editing: false,
        hidden: false,
        date: new Date(),
        id: this.maxId++,
      }
      this.setState(({ todoData }) => {
        const newTodoData = [...todoData, newItem]
        return { todoData: newTodoData }
      })
      e.target.value = ''
    }
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed }
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

  render() {
    const countTodo = this.state.todoData.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <NewTaskForm onAdded={this.addItem} />
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
        />
      </section>
    )
  }
}

App.defaultProps = {
  todoData: [],
  filter: 'All',
}

App.propTypes = {
  todoData: PropTypes.array,
  filter: PropTypes.string,
}
