import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    if (todos.length === 0) {
        return (
            <div className="empty-message">
                No tasks found. Try adding a new one or adjusting your filters/search.
            </div>
        );
    }

    return (
        <ul className="todo-list">
            {/* Map over the filtered todos array */}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
};

export default TodoList;