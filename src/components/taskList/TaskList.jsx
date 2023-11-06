import PropTypes from 'prop-types'

import Task from '../task/Task'

function TaskList({ todos, setTodoData, filterItems }) {
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

  const elements = todos.map((el) => {
    const { id, completed, editing, hidden, desc } = el

    return (
      <li key={id} className={completed ? 'completed' : editing ? 'editing' : null} hidden={hidden}>
        <Task {...el} setTodoData={setTodoData} filterItems={filterItems} />
        {editing ? <input type="text" className="edit" defaultValue={desc} onKeyUp={(e) => onEdit(e, id)} /> : null}
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList

TaskList.defaultProps = {
  todos: [],
  setTodoData: () => {},
  filterItems: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.array,
  setTodoData: PropTypes.func,
  filterItems: PropTypes.func,
}
