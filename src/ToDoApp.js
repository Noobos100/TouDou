import React from 'react';
import './App.css';
import Header from './Header';
import Footer from "./Footer";
import Modal from "./Modal";

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newTaskText: "",
            showAddPostModal: false
        };
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const loadTasksOnStart = window.confirm("Tasks found in localStorage. Would you like to load them?");
            if (loadTasksOnStart) {
                this.setState({items: JSON.parse(storedTasks)});
            }
        }
    }

    loadFromLocalStorage = () => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            this.setState({items: JSON.parse(storedTasks)});
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
        this.setState({newTaskText: event.target.value});
    };

    addTask = () => {
        const {newTaskText} = this.state;
        if (newTaskText.trim() !== "") {
            this.setState(prevState => ({
                items: [...prevState.items, {
                    id: Date.now(),
                    text: newTaskText,
                    done: false,
                    dueDate: document.getElementById('datePicker').value,
                    category: document.getElementById('category').value
                }],
                newTaskText: ""
            }));
        }
    };

    handleToggleDone = (itemId) => {
        this.setState((prevState) => ({
            items: prevState.items.map((item) =>
                item.id === itemId ? {...item, done: !item.done} : item
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
                        return {...item, text: newText};
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

    removeAllTasks = () => {
        let confirmDelete = window.confirm("Etes-vous sûr de vouloir supprimer toutes les tâches?");
        if (confirmDelete) {
            this.setState({items: []})
        }
    }

    moveTaskUp = (index) => {
        if (index === 0) return;
        this.setState((prevState) => {
            const updatedItems = [...prevState.items];
            const temp = updatedItems[index];
            updatedItems[index] = updatedItems[index - 1];
            updatedItems[index - 1] = temp;
            return {items: updatedItems};
        });
    };

    moveTaskDown = (index) => {
        if (index === this.state.items.length - 1) return;
        this.setState((prevState) => {
            const updatedItems = [...prevState.items];
            const temp = updatedItems[index];
            updatedItems[index] = updatedItems[index + 1];
            updatedItems[index + 1] = temp;
            return {items: updatedItems};
        });
    };

    sortTasks = (order) => {
        if (order === "asc") {
            this.setState((prevState) => {
                const updatedItems = [...prevState.items];
                updatedItems.sort((a, b) => a.text.localeCompare(b.text));
                return {items: updatedItems};
            });
        } else if (order === "desc") {
            this.setState((prevState) => {
                const updatedItems = [...prevState.items];
                updatedItems.sort((a, b) => b.text.localeCompare(a.text));
                return {items: updatedItems};
            });
        } else if (order === "dueDateAsc") {
            this.setState((prevState) => {
                const updatedItems = [...prevState.items];
                updatedItems.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
                return {items: updatedItems};
            });
        } else if (order === "dueDateDesc") {
            this.setState((prevState) => {
                const updatedItems = [...prevState.items];
                updatedItems.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
                return {items: updatedItems};
            });
        } else if (order === "categoryAsc") {
            this.setState((prevState) => {
                const updatedItems = [...prevState.items];
                updatedItems.sort((a, b) => a.category.localeCompare(b.category));
                return {items: updatedItems};
            });
        } else if (order === "categoryDesc") {
            this.setState((prevState) => {
                const updatedItems = [...prevState.items];
                updatedItems.sort((a, b) => b.category.localeCompare(a.category));
                return {items: updatedItems};
            });
        }
    }

    openAddPostModal = () => { // Step 2
        this.setState({showAddPostModal: true});
    };

    closeAddPostModal = () => { // Step 3
        this.setState({showAddPostModal: false});
    };

    // TODO: clean up structure (move functions to separate file)
    // TODO: add search bar
    render() {
        const nbTasks = this.countTasks();
        const {newTaskText, showAddPostModal} = this.state;
        return (
            <div className="App">
                <Header nbTasks={nbTasks}/>
                <Modal closeModal={this.closeAddPostModal} show={showAddPostModal}>
                    <div>
                        <input
                            type="text"
                            placeholder="Task name..."
                            value={newTaskText}
                            onChange={this.handleNewTaskChange}
                        />
                        <label htmlFor="datePicker">Due date (optional): </label>
                        <input type="date" id="datePicker" name="datePicker"/>

                        <form action="#">Category: &nbsp;
                            <select name="category" id="category">
                                <option value="none">None</option>
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="school">School</option>
                                <option value="other">Other</option>
                            </select>
                        </form>

                        <button onClick={this.addTask}>Add Task</button>
                    </div>
                </Modal>
                <button onClick={this.loadFromLocalStorage}>Load Tasks</button>
                <br></br>
                <button onClick={this.saveToLocalStorage}>Save Tasks</button>
                <br></br>
                <input type="button" id="deletetasks" value="Delete All Tasks" onClick={() => this.removeAllTasks()}/>
                <br></br>
                <select name="sort" id="sort" onChange={(e) => this.sortTasks(e.target.value)}>
                    <option value="">Sort by...</option>
                    <option value="asc">Name (A-Z)</option>
                    <option value="desc">Name (Z-A)</option>
                    <option value="dueDateAsc">Due Date (Earliest to latest)</option>
                    <option value="dueDateDesc">Due Date Descending (Latest to earliest)</option>
                    <option value="categoryAsc">Category (A-Z)</option>
                    <option value="categoryDesc">Category (Z-A)</option>
                </select>

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
                                {item.category ? `(Category: ${item.category})` : ""}
                            </label>
                            <img
                                id="edit"
                                src="https://logowik.com/content/uploads/images/888_edit.jpg"
                                alt="edit"
                                onClick={() => this.editTask(index)}
                            />
                            <img
                                id="delete"
                                src="https://static.vecteezy.com/system/resources/previews/010/366/194/original/bin-icon-transparent-bin-clipart-free-png.png"
                                alt="delete"
                                onClick={() => this.removeTask(index)}
                            />
                            <button onClick={() => this.moveTaskUp(index)}
                                    disabled={index === 0}>↑
                            </button>
                            <button onClick={() => this.moveTaskDown(index)}
                                    disabled={index === this.state.items.length - 1}>↓
                            </button>
                        </li>
                    ))}
                </ol>
                <Footer openAddPostModal={this.openAddPostModal} search={this.search}/>
            </div>
        );
    }
}

export default ToDoApp;
