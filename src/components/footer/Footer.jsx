import PropTypes from 'prop-types'

import TaskFilter from '../taskFilter/TaskFilter'

export default function Footer({ todos, filter, filterItems, setFilter, setTodoData }) {
  const countTodo = todos.filter((el) => !el.completed).length
  const onClearCompleted = () => {
    setTodoData((todoData) => {
      const newTodoData = todoData.filter((el) => !el.completed)
      return newTodoData
    })
  }

  return (
    <footer className="footer">
      <span className="todo-count">{countTodo} items left</span>
      <TaskFilter filter={filter} filterItems={filterItems} setFilter={setFilter} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  todos: [],
  setFilter: () => {},
  setTodoData: () => {},
  filter: 'All',
  filterItems: () => {},
}

Footer.propTypes = {
  todos: PropTypes.array,
  setFilter: PropTypes.func,
  setTodoData: PropTypes.func,
  filter: PropTypes.string,
  filterItems: PropTypes.func,
}
