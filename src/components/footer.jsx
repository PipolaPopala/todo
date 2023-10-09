import React, {Component} from'react';
import TaskFilter from './task-filter';
import PropTypes from 'prop-types';

export default class Footer extends Component  {

    render() {

        const {countTodo, onClearCompleted, changeFilter, filter, filterItems} = this.props;

        return (
        <footer className="footer">
            <span className="todo-count">{countTodo} items left</span>
            <TaskFilter 
            filter={filter}
            changeFilter={changeFilter}
            filterItems={filterItems}
            />
            <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>   
        );
    };
};

Footer.defaultProps = {
    countTodo: 0,
    onClearCompleted: () => {},
    changeFilter: () => {},
    filter: 'All',
    filterItems: () => {}
};

Footer.propTypes = {
    countTodo: PropTypes.number,
    onClearCompleted: PropTypes.func,
    changeFilter: PropTypes.func,
    filter: PropTypes.string,
    filterItems: PropTypes.func
};