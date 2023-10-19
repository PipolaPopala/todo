import PropTypes from 'prop-types'

function NewTaskForm({ onAdded }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input className="new-todo" placeholder="Task" autoFocus onKeyUp={(e) => onAdded(e)} />
        <input className="new-todo-form__timer" placeholder="Min" autoFocus />
        <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
      </form>
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
