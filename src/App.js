import React, { useCallback, useRef } from "react";
import { Routes, Route } from "react-router-dom";

// REQUIRED Imports
import { ThemeProvider } from "./context/ThemeContext"; 
import { useTodos } from "./hooks/useTodos"; 

// Component Imports
import Header from "./components/Header";
import AddTodoForm from "./components/AddTodoForm";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import TodoList from "./components/TodoList"; 

export default function App() {
    // Centralized State Management (REQUIRED)
    const { 
      todos, filter, setFilter, setSearchTerm, // searchTerm is now ignored by the linter
      addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted 
    } = useTodos();
    
    // Ref for the keyboard shortcut focus
    const addFocusRef = useRef(null);
    
    // Performance optimization for action handler (REQUIRED)
    const handleAdd = useCallback(
        (payload) => {
            addTodo(payload);
            setFilter("All"); 
            setSearchTerm("");
        },
        [addTodo, setFilter, setSearchTerm]
    );

    // Performance optimization for edit handler (REQUIRED)
    const handleEdit = useCallback(
        (id) => {
            const t = todos.find((x) => x.id === id);
            if (!t) return;
            const newTitle = prompt("Edit title", t.text); // Use text property for the title
            if (newTitle && newTitle.trim().length >= 2) {
                editTodo(id, { text: newTitle.trim() }); // Update the text property
            }
        },
        [todos, editTodo]
    );

    const remaining = todos.filter((t) => !t.completed).length;

    return (
        <ThemeProvider> 
            <Header addFocusRef={addFocusRef} /> 
            
            <div className="container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <section className="top">
                                    <AddTodoForm onAdd={handleAdd} ref={addFocusRef} />

                                    <div className="controls">
                                        <SearchBar /> 

                                        <div className="filters status-filter-group">
                                            {/* Status Filters */}
                                            <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>
                                                All
                                            </button>
                                            <button className={filter === "Active" ? "active" : ""} onClick={() => setFilter("Active")}>
                                                Active
                                            </button>
                                            <button className={filter === "Completed" ? "active" : ""} onClick={() => setFilter("Completed")}>
                                                Completed
                                            </button>
                                        </div>

                                        <CategoryFilter /> 
                                    </div>
                                </section>

                                <section className="content">
                                    <div className="meta-row">
                                        <div>{remaining} remaining</div>
                                        <div>
                                            <button
                                                className="btn"
                                                onClick={() => {
                                                    if (window.confirm("Clear all completed?")) clearCompleted();
                                                }}
                                            >
                                                Clear Completed
                                            </button>
                                        </div>
                                    </div>

                                    <TodoList 
                                        todos={todos} 
                                        onToggle={toggleTodo} 
                                        onDelete={deleteTodo} 
                                        onEdit={handleEdit}
                                    />
                                </section>

                                {/* REQUIRED Footer with Name and GitHub URL */}
                                <footer className="footer">
                                    <div>
                                        Built by <strong>Harshini S</strong> —
                                        <a
                                            href="https://github.com/harshini-26/iaaxin-tech"
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ marginLeft: "6px" }}
                                        >
                                            GitHub Project
                                        </a>
                                    </div>
                                    <div>Submit to: kirubhakaran@iaaxin.com</div>
                                </footer>
                            </>
                        }
                    />
                </Routes>
            </div>
        </ThemeProvider>
    );
}