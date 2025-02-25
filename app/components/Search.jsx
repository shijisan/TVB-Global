"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form className="flex-grow flex" onSubmit={handleSubmit}>
            <input 
                className="border rounded-s flex-grow bg-neutral-100 px-4 focus-visible:outline-none"
                type="search"
                placeholder="Search admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="border border-s-0 p-4 rounded-e" type="submit">
                <FaSearch />
            </button>
        </form>
    );
}
