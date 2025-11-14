import React from 'react';
import { useTodos } from '../hooks/useTodos';

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useTodos();

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;