import PropTypes from 'prop-types'

export default function TaskFilter({ filter, setFilter, filterItems }) {
  const changeFilter = (data) => {
    setFilter(data)
  }

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

TaskFilter.defaultProps = {
  filter: 'All',
  setFilter: () => {},
  filterItems: () => {},
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  filterItems: PropTypes.func,
}
