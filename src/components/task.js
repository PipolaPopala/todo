const Task = ({desc}) => {
    return (
    <ul className="todo-list">
        <div className="view">
        <input className="toggle" type="checkbox"/>
        <label>
            <span className="description">{desc}</span>
            <span className="created">created 5 minutes ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
        </div>
    </ul>
    )
};

export default Task;
