import PropTypes from 'prop-types'

import TaskFilter from '../taskFilter/TaskFilter'

function Footer({ countTodo, onClearCompleted, changeFilter, filter, filterItems }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countTodo} items left</span>
      <TaskFilter filter={filter} changeFilter={changeFilter} filterItems={filterItems} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

Footer.defaultProps = {
  countTodo: 0,
  onClearCompleted: () => {},
  changeFilter: () => {},
  filter: 'All',
  filterItems: () => {},
}

Footer.propTypes = {
  countTodo: PropTypes.number,
  onClearCompleted: PropTypes.func,
  changeFilter: PropTypes.func,
  filter: PropTypes.string,
  filterItems: PropTypes.func,
}
