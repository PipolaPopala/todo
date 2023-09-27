
import { createRoot } from 'react-dom/client';

import './components/style.css';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';


const App = () => {

  const todoData = [
    {desc: 'Completed task', type: 'completed'},
    {desc: 'Editing task', type: 'editing'},
    {desc: 'Active task', type: false},
]

  return (
    <section className="todoapp">
      <NewTaskForm />
      <TaskList todos={todoData}/>
      </section>
  )
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
