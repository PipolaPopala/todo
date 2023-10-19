import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

// function Task({ desc, id, onEditForm, onDeleted, onToggleCompleted, date, onPlay, onPause, minutes, seconds }) {
//   return (
//     <div className="view">
//       <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} />
//       <label htmlFor={id}>
//         <span className="title">{desc}</span>
//         <span className="description">
//           <button className="icon icon-play" onClick={onPlay}></button>
//           <button className="icon icon-pause" onClick={onPause}></button>
//           {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
//         </span>
//         <span className="description">
//           {`created ${formatDistanceToNow(date, {
//             includeSeconds: true,
//             locale: KG,
//             addSuffix: true,
//           })}`}
//         </span>
//       </label>
//       <button className="icon icon-edit" onClick={onEditForm}></button>
//       <button className="icon icon-destroy" onClick={onDeleted}></button>
//     </div>
//   )
// }

// export default Task

// export default class Task extends Component {
//   render() {
//     const { desc, id, onEditForm, onDeleted, onToggleCompleted, date, onPlay, onPause, minutes, seconds } = this.props
//     return (
//       <div className="view">
//         <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} />
//         <label htmlFor={id}>
//           <span className="title">{desc}</span>
//           <span className="description">
//             <button className="icon icon-play" onClick={onPlay}></button>
//             <button className="icon icon-pause" onClick={onPause}></button>
//             {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
//           </span>
//           <span className="description">
//             {`created ${formatDistanceToNow(date, {
//               includeSeconds: true,
//               locale: KG,
//               addSuffix: true,
//             })}`}
//           </span>
//         </label>
//         <button className="icon icon-edit" onClick={onEditForm}></button>
//         <button className="icon icon-destroy" onClick={onDeleted}></button>
//       </div>
//     )
//   }
// }

export default class Task extends Component {
  render() {
    const { desc, id, onEditForm, onDeleted, onToggleCompleted, date, onPlay, onPause, minutes, seconds } = this.props
    return (
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} />
        <label htmlFor={id}>
          <span className="title">{desc}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onPlay}></button>
            <button className="icon icon-pause" onClick={onPause}></button>
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </span>
          <span className="description">
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
