import PropTypes from 'prop-types'

import Task from '../task/Task'
import Footer from '../footer/Footer'

function TaskList({
  todos,
  onEditForm,
  onEdit,
  onDeleted,
  onToggleCompleted,
  countTodo,
  onClearCompleted,
  filter,
  changeFilter,
  filterItems,
}) {
  const elements = todos.map((el) => {
    const { id, completed, editing, hidden, desc } = el

    return (
      <li key={id} className={completed ? 'completed' : editing ? 'editing' : null} hidden={hidden}>
        <Task
          {...el}
          onEditForm={() => onEditForm(id)}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
        />
        {editing ? <input type="text" className="edit" defaultValue={desc} onKeyUp={(e) => onEdit(e, id)} /> : null}
      </li>
    )
  })

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
      <Footer
        countTodo={countTodo}
        filter={filter}
        changeFilter={changeFilter}
        filterItems={filterItems}
        onClearCompleted={onClearCompleted}
      />
    </section>
  )
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
