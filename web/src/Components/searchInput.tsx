import React, { useState } from 'react';
import '../styles/button.css';
import '../styles/searchInput.css';

interface SearchComponentProps {
    onSearch: (input: string) => void;
    total: number;
    color: string;
    removeInput: () => void;
    isLast: boolean;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, total, color, removeInput, isLast }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        onSearch(input);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='outerDiv'>
            {/* <input type="text" value={input} onChange={(e) => setInput(e.target.value)} /> */}
            <div className='paragraph-div'>
                {total && <p className='totalParagraph' style={{ color: color }}>Total: {total}</p>}

            </div>

            <div className='search-div'>
                <div className="card card--accent">
                    <label className="input">
                        <input
                            className="input__field"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={handleKeyPress}
                        />
                        {/* <span className="input__label">Some Fancy Label</span> */}
                    </label>
                </div>
                {/* <button onClick={handleSearch}>Search</button> */}
                <button className="button-50" onClick={handleSearch} >Search</button>
                {isLast && <button className="button-50" onClick={removeInput}>X</button>}
            </div>

        </div>
    );
};