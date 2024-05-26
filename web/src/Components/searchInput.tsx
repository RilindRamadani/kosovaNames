import React, { useState } from 'react';
import '../styles/button.css';
import '../styles/input.css';
interface SearchComponentProps {
    onSearch: (input: string) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        onSearch(input);
    };

    return (
        <div className='outerDiv '>
            {/* <input type="text" value={input} onChange={(e) => setInput(e.target.value)} /> */}

            <div className="card card--accent">
                <label className="input">
                    <input className="input__field" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                    {/* <span className="input__label">Some Fancy Label</span> */}
                </label>
            </div>
            {/* <button onClick={handleSearch}>Search</button> */}
            <button className="button-50" onClick={handleSearch} >Search</button>

        </div>
    );
};