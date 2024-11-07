import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Rechercher..."
            value={query}
            onChange={handleSearch}
            className="w-full p-2 mb-4 border rounded"
        />
    );
}