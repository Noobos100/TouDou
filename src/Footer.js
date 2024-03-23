import React from "react";

function Footer({ openAddPostModal, search }) {
    const handleClick = () => {
        openAddPostModal(); // Call the addTask function when the button is clicked
    };

    const handleSearch = (event) => {
        // if input size > 3, call search function
        if (event.target.value.length > 3) {
            search(event.target.value);
        }
    };

    return (
        <div>
        <button onClick={handleClick}>Add Task</button>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
        </div>
    );
}

export default Footer;