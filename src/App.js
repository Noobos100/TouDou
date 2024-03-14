import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newTaskText: ""
    };
  }

  componentDidMount() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.setState({ items: JSON.parse(storedTasks) });
    }
  }

  loadFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.setState({ items: JSON.parse(storedTasks) });
      alert("Tasks loaded from localStorage!");
    } else {
      alert("No tasks found in localStorage.");
    }
  };

  saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(this.state.items));
    alert("Tasks saved to localStorage!");
  };

  handleNewTaskChange = (event) => {
    this.setState({ newTaskText: event.target.value });
  };

  addTask = () => {
    const { newTaskText } = this.state;
    if (newTaskText.trim() !== "") {
      this.setState(prevState => ({
        items: [...prevState.items, { id: Date.now(), text: newTaskText, done: false, dueDate: document.getElementById('datePicker').value }],
        newTaskText: ""
      }));
    }
  };

  handleToggleDone = (itemId) => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
          item.id === itemId ? { ...item, done: !item.done } : item
      )
    }));
  };

  countTasks = () => {
    let nbTasks = this.state.items.length;
    let doneTasks = 0;
    for (let i = 0; i < nbTasks; i++) {
      if (this.state.items[i].done === true) {
        ++doneTasks;
      }
    }
    if (nbTasks === 0) {
      return "Il n'y a pas de tâches.";
    } else if (nbTasks === 1) {
      return doneTasks + "/" + nbTasks + " tâche accomplie.";
    } else {
      return doneTasks + "/" + nbTasks + " tâches accomplies.";
    }
  };

  editTask = (index) => {
    const newText = prompt("Enter new task text:");
    if (newText !== null) {
      this.setState(prevState => ({
        items: prevState.items.map((item, i) => {
          if (i === index) {
            return { ...item, text: newText };
          }
          return item;
        })
      }));
    }
  };

  removeTask = (index) => {
    let confirmDelete = window.confirm("Etes-vous sûr de vouloir supprimer la tâche?");
    if (confirmDelete) {
      this.setState(prevState => ({
        items: prevState.items.filter((_, i) => i !== index)
      }));
    }
  };

  moveTaskUp = (index) => {
    if (index === 0) return;
    this.setState((prevState) => {
      const updatedItems = [...prevState.items];
      const temp = updatedItems[index];
      updatedItems[index] = updatedItems[index - 1];
      updatedItems[index - 1] = temp;
      return { items: updatedItems };
    });
  };

  moveTaskDown = (index) => {
    if (index === this.state.items.length - 1) return;
    this.setState((prevState) => {
      const updatedItems = [...prevState.items];
      const temp = updatedItems[index];
      updatedItems[index] = updatedItems[index + 1];
      updatedItems[index + 1] = temp;
      return { items: updatedItems };
    });
  };

  render() {
    const nbTasks = this.countTasks();
    const { newTaskText } = this.state;

    return (
        <div className="App">
          <div>
            <input
                type="text"
                placeholder="Task name..."
                value={newTaskText}
                onChange={this.handleNewTaskChange}
            />
            <label for="datePicker">Due date (optional): </label>
            <input type="date" id="datePicker" name="trip-start"/>
            <button onClick={this.addTask}>Add Task</button>
            <button onClick={this.loadFromLocalStorage}>Load Tasks</button>
            <button onClick={this.saveToLocalStorage}>Save Tasks</button>
          </div>
          <ol>
            {this.state.items.map((item, index) => (
                <li key={index}>
                  <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => this.handleToggleDone(item.id)}
                  />
                  <label className={item.done ? "done" : ""}>
                    {item.text} {item.dueDate ? `(Due on: ${item.dueDate})` : ""}
                  </label>
                  <button onClick={() => this.editTask(index)}>Edit</button>
                  <button onClick={() => this.removeTask(index)}>Delete</button>
                  <button onClick={() => this.moveTaskUp(index)} disabled={index === 0}>Move Up</button>
                  <button onClick={() => this.moveTaskDown(index)} disabled={index === this.state.items.length - 1}>Move Down</button>
                </li>
            ))}
          </ol>
          <div>{nbTasks}</div>
        </div>
    );
  }
}

export default App;
