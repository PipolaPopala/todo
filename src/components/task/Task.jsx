import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

export default function Task({ setTodoData, filterItems, desc, id, completed, date, time }) {
  const [timeLeft, setTimeLeft] = useState(time)
  const [timerOn, setTimer] = useState(false)

  const editItemForm = () => {
    setTodoData((todoData) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id && !el.completed) {
          return { ...el, editing: true }
        } else {
          return el
        }
      })
      return newTodoData
    })
  }

  const onToggleCompleted = () => {
    setTodoData((todoData) => {
      const newTodoData = todoData.map((el) => {
        if (el.id === id) {
          return { ...el, completed: !el.completed }
        }
        return el
      })
      return newTodoData
    })
    filterItems()
  }

  const deleteItem = () => {
    setTodoData((todoData) => {
      const newTodoData = todoData.filter((el) => el.id !== id)
      return newTodoData
    })
  }

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
      <button className="icon icon-edit" onClick={editItemForm}></button>
      <button className="icon icon-destroy" onClick={deleteItem}></button>
    </div>
  )
}

Task.defaultProps = {
  desc: 'doing something!!!',
  id: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000),
  setTodoData: () => {},
  filterItems: () => {},
  date: new Date(),
}

Task.propTypes = {
  desc: PropTypes.string,
  id: PropTypes.number,
  setTodoData: PropTypes.func,
  filterItems: PropTypes.func,
  date: PropTypes.instanceOf(Date),
}
