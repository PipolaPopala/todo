import PropTypes from 'prop-types'

import Task from '../task/Task'

function TaskList({ todos, onEditForm, onEdit, onDeleted, onToggleCompleted, onPlay, onPause }) {
  const elements = todos.map((el) => {
    const { id, completed, editing, hidden, desc } = el

    return (
      <li key={id} className={completed ? 'completed' : editing ? 'editing' : null} hidden={hidden}>
        <Task
          {...el}
          onEditForm={() => onEditForm(id)}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onPlay={() => onPlay(id)}
          onPause={() => onPause(id)}
        />
        {editing ? <input type="text" className="edit" defaultValue={desc} onKeyUp={(e) => onEdit(e, id)} /> : null}
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList

TaskList.defaultProps = {
  todos: [],
  onEditForm: () => {},
  onEdit: () => {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  countTodo: 0,
  onClearCompleted: () => {},
  filter: 'All',
  changeFilter: () => {},
  filterItems: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.array,
  onEditForm: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  countTodo: PropTypes.number,
  onClearCompleted: PropTypes.func,
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
  filterItems: PropTypes.func,
}
