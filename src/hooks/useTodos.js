import { useState, useEffect, useCallback, useMemo } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage';

const getInitialTodos = () => {
    // Load data using utility function
    return getFromLocalStorage('todos') || [];
};

export const useTodos = () => {
    // Core Todo State
    const [todos, setTodos] = useState(getInitialTodos);
    
    // Filtering and Searching States
    const [filter, setFilter] = useState('All'); 
    const [categoryFilter, setCategoryFilter] = useState('all'); 
    const [searchTerm, setSearchTerm] = useState(''); 
    
    // Effect to persist data to Local Storage (REQUIRED)
    useEffect(() => {
        // Save data using utility function
        setToLocalStorage('todos', todos);
    }, [todos]);

    // CRUD Operations (Optimized with useCallback - REQUIRED)
    const addTodo = useCallback(({ title, description, category, dueDate }) => {
        const newTodo = {
            id: Date.now(),
            text: title.trim(),
            description: description.trim(),
            category: category || 'general',
            dueDate: dueDate || null,
            completed: false,
        };
        setTodos(prevTodos => [newTodo, ...prevTodos]);
    }, []);

    const toggleTodo = useCallback((id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);
    
    const editTodo = useCallback((id, updates) => {
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === id ? { ...todo, ...updates } : todo
            )
        );
    }, []);

    const deleteTodo = useCallback((id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);
    
    const clearCompleted = useCallback(() => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }, []);


    // Filtering and Searching Logic (Optimized with useMemo - REQUIRED)
    const filteredTodos = useMemo(() => {
        let currentTodos = todos;
        const normalizedSearch = searchTerm.toLowerCase();

        // 1. Apply Status Filter
        if (filter === 'Active') {
            currentTodos = currentTodos.filter(todo => !todo.completed);
        } else if (filter === 'Completed') {
            currentTodos = currentTodos.filter(todo => todo.completed);
        }
        
        // 2. Apply Category Filter
        if (categoryFilter !== 'all') {
            currentTodos = currentTodos.filter(todo => 
                todo.category.toLowerCase() === categoryFilter.toLowerCase()
            );
        }

        // 3. Apply Search Term Filter
        if (normalizedSearch) {
            currentTodos = currentTodos.filter(todo =>
                todo.text.toLowerCase().includes(normalizedSearch) ||
                (todo.description && todo.description.toLowerCase().includes(normalizedSearch))
            );
        }
        
        return currentTodos;
    }, [todos, filter, categoryFilter, searchTerm]);


    // Export all state and actions
    return {
        todos: filteredTodos, 
        filter, setFilter,
        categoryFilter, setCategoryFilter,
        searchTerm, setSearchTerm,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
    };
};