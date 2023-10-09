
import React, {Component} from'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';

import './components/style.css';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';


class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      {desc: 'Completed task', completed:false, editing:false, hidden:false, date:new Date(), id: 1},
      {desc: 'Editing task', completed:false, editing:false, hidden:false, date:new Date(), id: 2},
      {desc: 'Active task', completed:false, editing:false, hidden:false, date:new Date(), id: 3},
    ],
    filter: 'All',
  };

  editItemForm = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      if (!oldItem.completed) {
        const newItem = {...oldItem, editing:true};
        const newTodoData = 
        [...todoData.slice(0, idx), 
          newItem,
        ...todoData.slice(idx + 1)];
        return {todoData: newTodoData}
      }
    })
  }

  onEdit = (e, id) => {
    if (e.keyCode === 13) {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {...oldItem, desc: e.target.value, editing:false};
        const newTodoData = 
        [...todoData.slice(0, idx), 
          newItem,
        ...todoData.slice(idx + 1)];
        return {todoData: newTodoData}
      });
    };
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = 
      [...todoData.slice(0, idx), 
      ...todoData.slice(idx + 1)];
      return {todoData: newTodoData}
    });
  };

  addItem = (e) => {
    if (e.keyCode === 13) {
      const newItem = {desc: e.target.value, completed:false, editing:false, hidden:false, date:new Date(), id: this.maxId++};
      this.setState(({todoData}) => {
        const newTodoData = [...todoData, newItem];
        return {todoData: newTodoData}
      });
      e.target.value = '';
    };
  };

  onToggleCompleted = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {...oldItem, completed:!oldItem.completed};
      const newTodoData = 
      [...todoData.slice(0, idx), 
        newItem,
      ...todoData.slice(idx + 1)];
      return {todoData: newTodoData}
    });
  };

  onClearCompleted = () => {
    this.setState(({todoData}) => {
      const newTodoData = todoData.filter((el) =>!el.completed);
      return {todoData: newTodoData}
    });
  };

  changeFilter = (data) => {
    this.setState({filter: data});
  };
  
  filterItems = () => {
    const {filter} = this.state;
      switch (filter) {
        case 'Active': 
        this.setState(({todoData}) => {
          const newTodoData = todoData.map((el) => {
            if (el.completed === true) {el.hidden = true}
            else {el.hidden = false}
            return el
          });
          return {todoData: newTodoData}
        });
        break;
        case 'Completed': 
        this.setState(({todoData}) => {
          const newTodoData = todoData.map((el) => {
            if (el.completed === true) {el.hidden = false}
            else {el.hidden = true}
            return el
          });
          return {todoData: newTodoData}
        });
        break;
        default: 
        this.setState(({todoData}) => {
          const newTodoData = todoData.map((el) => {
            el.hidden = false
            return el
          });
          return {todoData: newTodoData}
        });
      }
  };

  render() {

    const countTodo = this.state.todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <NewTaskForm onAdded={this.addItem} />
        <TaskList todos={this.state.todoData}
        onEditForm={this.editItemForm}
        onEdit={this.onEdit}
        onDeleted={this.deleteItem}
        onToggleCompleted={this.onToggleCompleted} 
        countTodo={countTodo}
        filter={this.state.filter}
        changeFilter={this.changeFilter.bind(this)}
        filterItems={this.filterItems}
        onClearCompleted={this.onClearCompleted}
        />
        </section>
    );
  };
};

App.defaultProps = {
  todoData: [],
  filter: 'All',
};

App.propTypes = {
  todoData: PropTypes.array,
  filter: PropTypes.string,
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
