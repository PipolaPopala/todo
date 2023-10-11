import PropTypes from 'prop-types'

function NewTaskForm({ onAdded }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={(e) => onAdded(e)} />
    </header>
  )
}

export default NewTaskForm

NewTaskForm.defaultProps = {
  onAdded: () => {},
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
}
