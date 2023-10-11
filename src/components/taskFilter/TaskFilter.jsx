import PropTypes from 'prop-types'

function TaskFilter({ filter, changeFilter, filterItems }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'All' ? 'selected' : null}
          onMouseDown={() => changeFilter('All')}
          onMouseUp={filterItems}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'Active' ? 'selected' : null}
          onMouseDown={() => changeFilter('Active')}
          onMouseUp={filterItems}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'Completed' ? 'selected' : null}
          onMouseDown={() => changeFilter('Completed')}
          onMouseUp={filterItems}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter

TaskFilter.defaultProps = {
  filter: 'All',
  changeFilter: () => {},
  filterItems: () => {},
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
  filterItems: PropTypes.func,
}
