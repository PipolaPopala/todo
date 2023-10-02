import React, {Component} from'react';
import Task from './task';
import Footer from './footer';

export default class TaskList extends Component {
    
    render() {
        
        const {todos, onDeleted, onToggleCompleted, countTodo, onClearCompleted, filter, changeFilter, onActiveShow, onCompletedShow, onAllShow} = this.props;
        
        const elements = todos.map( elem => {
            
            const {id, completed, hidden} = elem;
            
            return (
                <li key={id} className={completed ? 'completed' : null} hidden={hidden}>
                <Task {...elem} 
                onDeleted={() => onDeleted(id)}
                onToggleCompleted={() => onToggleCompleted(id)}/>
                {/* {type === 'editing' ? <input type="text" class="edit" value="Editing task"/> : null} */}
            </li>
            );
        });
        
        return (
        <section className="main">
            <ul className="todo-list">{elements}</ul>
            <Footer countTodo={countTodo}
            filter={filter}
            changeFilter={changeFilter}
            onClearCompleted={onClearCompleted}
            />
        </section>
        );
    };
};
