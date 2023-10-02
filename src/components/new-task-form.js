import React, {Component} from'react';

export default class NewTaskForm extends Component {

    state = {
        desc: ''
    };

    onChange = (e) => {
        this.setState({desc: e.target.value});
    }

    render() {

        const {onAdded} = this.props;

        return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autofocus
            onKeyUp={(e) => onAdded(e)}
            onChange={this.onChange}
            />
        </header>
        );
    };
};