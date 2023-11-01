import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

export default function Task({ desc, id, onEditForm, onDeleted, onToggleCompleted, completed, date, time }) {
  const [timeLeft, setTimeLeft] = useState(time)
  const [timerOn, setTimer] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!completed) {
        timerOn && setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1 : 0))
      } else {
        setTimer(false)
      }
    }, 1000)

    if (timeLeft === 0) setTimer(false)

    return () => {
      clearInterval(interval)
    }
  }, [timeLeft, timerOn])

  const onPlay = () => {
    timeLeft !== 0 ? setTimer(true) : null
  }

  const onPause = () => {
    setTimer(false)
  }

  const convertTime = (timestamp) => {
    const min = Math.floor(timestamp / 60)
    const sec = timestamp % 60

    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="view">
      <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} />
      <label htmlFor={id}>
        <span className="title">{desc}</span>
        <span className="description">
          <button className="icon icon-play" onClick={onPlay}></button>
          <button className="icon icon-pause" onClick={onPause}></button>
          {convertTime(timeLeft)}
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
