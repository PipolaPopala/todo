import React, {Component} from'react';

export default class Task extends Component {

    render() {

        const {desc, id, onDeleted, onToggleCompleted} = this.props;

        return (
            <div className="view">
                <input id={id} className="toggle" type="checkbox"
                onChange={onToggleCompleted}/>
                <label htmlFor={id}>
                    <span className="description">{desc}</span>
                    <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                onClick={onDeleted}></button>
            </div>
        );
    };
};