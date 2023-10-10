import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'

var gggggggg = dfefwf

export default class Task extends Component {
  render() {
    const { desc, id, onEditForm, onDeleted, onToggleCompleted, date } = this.props

    return (
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} />
        <label htmlFor={id}>
          <span className="description">{desc}</span>
          <span className="created">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onEditForm}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}

Task.defaultProps = {
  desc: 'doing something!!!',
  id: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000),
  onEditForm: () => {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  date: new Date(),
}

Task.propTypes = {
  desc: PropTypes.string,
  id: PropTypes.number,
  onEditForm: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  date: PropTypes.instanceOf(Date),
}
