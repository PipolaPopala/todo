import PropTypes from 'prop-types'

function NewTaskForm({ onSubmit }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input className="new-todo" placeholder="Task" autoFocus required name="title" />
        <input className="new-todo-form__timer" placeholder="Min" type="number" name="min" min="0" max="59" required />
        <input className="new-todo-form__timer" placeholder="Sec" type="number" name="sec" min="0" max="59" required />
        <button className="visually-hidden" type="submit"></button>
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
