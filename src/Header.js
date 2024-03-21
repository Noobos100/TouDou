import * as React from "react";

export default function Header({ nbTasks }) {
    return (
        <div>
            <h1>TouDou: the ultimate To-do List</h1>
            <p>Progression: {nbTasks}</p>
        </div>
    );
}