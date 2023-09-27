import Task from './task';
import Footer from './footer';

const TaskList = ({todos}) => {

    const elements = todos.map( elem => {

        const {type, ...other} = elem;
        
        return (
        <li className={type}>
            <Task {...other} />
            {type === 'editing' ? <input type="text" class="edit" value="Editing task"/> : null}
        </li>
        )
    })
    
    return (
    <section className="main">
        <ul className="todo-list">{elements}</ul>
        <Footer />
    </section>
    )
};

export default TaskList;