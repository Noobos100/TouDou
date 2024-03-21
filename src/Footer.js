import React from "react";

function Footer({ addTask, search }) {
    const handleClick = () => {
        addTask(); // Call the addTask function when the button is clicked
    };

    const handleSearch = (event) => {
        search(event.target.value); // Call the search function with the value of the input
    };

    return (
        <div>
        <button onClick={handleClick}>Add Task</button>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
        </div>
    );
}

export default Footer;