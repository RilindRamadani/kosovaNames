import React, { useState } from 'react';
import { NameSearchService } from '../API/name-search-api-service';

export const SearchComponent: React.FC = () => {
    const [input, setInput] = useState('');
    const [data, setData] = useState(null);

    const handleSearch = async () => {
        const service = new NameSearchService();
        const response = await service.searchName(input);
        console.log(response);
        setData(response);
    };

    return (
        <div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};