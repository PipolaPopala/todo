import React, {Component} from'react';
import TaskFilter from './task-filter';

export default class Footer extends Component  {

    render() {

        const {countTodo, onClearCompleted, changeFilter, filter} = this.props;

        return (
        <footer className="footer">
            <span className="todo-count">{countTodo} items left</span>
            <TaskFilter 
            filter={filter}
            changeFilter={changeFilter}
            />
            <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>   
        );
    };
};