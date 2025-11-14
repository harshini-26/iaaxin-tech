import React, { useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';

const CategoryFilter = () => {
    const { todos, categoryFilter, setCategoryFilter } = useTodos();
    
    // Get unique categories from the current todos list for the filter buttons
    const availableCategories = useMemo(() => {
        const categories = new Set(todos.map(todo => todo.category));
        return ['all', ...Array.from(categories)].sort();
    }, [todos]);

    return (
        <div className="category-filter">
            <label style={{ color: 'var(--muted)', fontSize: '0.9rem', marginRight: '10px' }}>Category:</label>
            {availableCategories.map(cat => (
                <button
                    key={cat}
                    className={categoryFilter === cat ? 'active' : ''}
                    onClick={() => setCategoryFilter(cat)}
                >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;