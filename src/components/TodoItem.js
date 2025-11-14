import React, { useCallback } from 'react';

const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
        return dateString;
    }
};

const TodoItem = React.memo(({ todo, onToggle, onDelete, onEdit }) => {
    // Function to check if the due date is in the past
    const isOverdue = useCallback(() => {
        if (!todo.dueDate || todo.completed) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0); 
        return dueDate < today;
    }, [todo.dueDate, todo.completed]);

    const overdue = isOverdue();
    const itemClasses = `todo-item ${todo.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`;

    return (
        <li className={itemClasses}>
            <div className="main-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <div className="text-details">
                    <span className="title">{todo.text}</span>
                    {todo.description && (
                        <p className="description">{todo.description}</p>
                    )}
                </div>
            </div>
            
            <div className="metadata">
                {overdue && (
                    <span className="overdue-text">OVERDUE</span>
                )}
                {todo.dueDate && (
                    <span className="small">Due: {formatDate(todo.dueDate)}</span>
                )}
                <span className="category-tag">{todo.category}</span>
                
                {/* Action buttons */}
                <button className="btn small" onClick={() => onEdit(todo.id)} disabled={todo.completed}>
                    Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(todo.id)} title="Delete">
                    🗑️
                </button>
            </div>
        </li>
    );
});

export default TodoItem;