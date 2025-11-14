import React, { forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // REQUIRED for form validation

const CATEGORIES = ["work", "personal", "shopping", "health", "general"];

// Uses forwardRef for the Ctrl+A keyboard shortcut focus feature (REQUIRED)
const AddTodoForm = forwardRef(({ onAdd }, ref) => {
    // 1. Use react-hook-form
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: CATEGORIES[0],
            dueDate: ''
        }
    });

    // 2. Keyboard shortcut logic (Ctrl + A or Cmd + A)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                e.preventDefault();
                if (ref.current) {
                    ref.current.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [ref]);

    // 3. Form submission handler
    const onSubmit = (data) => {
        onAdd({
            title: data.title.trim(),
            description: data.description.trim(),
            category: data.category,
            dueDate: data.dueDate || null, 
        });
        reset();
    };

    return (
        <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
            <h3>Add New Task</h3>
            <div className="row">
                {/* Title Input (Required min 2 chars validation) */}
                <input
                    type="text"
                    placeholder="Task Title (min 2 chars)"
                    ref={ref} 
                    {...register("title", { required: "Title is required", minLength: { value: 2, message: "Title must be at least 2 characters" } })}
                />
                
                {/* Category Select */}
                <select {...register("category", { required: true })}>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                </select>
                
                {/* Due Date Input */}
                <input 
                    type="date" 
                    title="Due Date"
                    {...register("dueDate")}
                />
            </div>
            
            {/* Validation Errors */}
            {(errors.title || errors.category) && (
                <div className="error">{errors.title?.message || errors.category?.message}</div>
            )}
            
            {/* Description Textarea */}
            <div className="row">
                <textarea
                    placeholder="Optional description"
                    {...register("description")}
                />
            </div>

            <div className="row">
                <button type="submit" className="btn" style={{ flex: '1' }}>Add Task (Ctrl+A to focus)</button>
            </div>
        </form>
    );
});

export default AddTodoForm;