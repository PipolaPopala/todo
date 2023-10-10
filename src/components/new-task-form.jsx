import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  render() {
    const { onAdded } = this.props

    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={(e) => onAdded(e)} />
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
}
