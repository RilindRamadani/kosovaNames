import React, { useState } from 'react';

interface SearchComponentProps {
    onSearch: (input: string) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        onSearch(input);
    };

    return (
        <div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};