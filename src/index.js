
import React, {Component} from'react';
import { createRoot } from 'react-dom/client';

import './components/style.css';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';


class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      {desc: 'Completed task', completed:false, hidden:false, id: 1},
      {desc: 'Editing task', completed:false, hidden:false, id: 2},
      {desc: 'Active task', completed:false, hidden:false, id: 3},
    ],
    filter: 'All',
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

  AddItem = (e) => {
    if (e.keyCode === 13) {
      const newItem = {desc: e.target.value, completed:false, hidden:false, id: this.maxId++};
      this.setState(({todoData}) => {
        const newTodoData = [...todoData, newItem];
        return {todoData: newTodoData}
      });
      e.target.value = '';
    }
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
    })
  };

  onClearCompleted = () => {
    this.setState(({todoData}) => {
      const newTodoData = todoData.filter((el) =>!el.completed);
      return {todoData: newTodoData}
    })
  };

  filteredItems() {
    const {todoData, filter} = this.state;
    return todoData.filter(({ completed }) => {
      const all = filter === 'All';
      const complete = filter === 'Completed';
      return all ? true : complete ? completed === true : completed === false;
    });
  };

  changeFilter(data) {
    this.setState({filter: data});
  };

  render() {

    const countTodo = this.state.todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <NewTaskForm onAdded={this.AddItem} />
        <TaskList todos={this.state.todoData, this.filteredItems()}
        onDeleted={this.deleteItem}
        onToggleCompleted={this.onToggleCompleted} 
        countTodo={countTodo}
        filter={this.state.filter}
        changeFilter={this.changeFilter.bind(this)}
        onClearCompleted={this.onClearCompleted}
        />
        </section>
    );
  };
};


const root = createRoot(document.getElementById('root'));
root.render(<App />);
