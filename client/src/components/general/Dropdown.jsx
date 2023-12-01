import React, { useState } from "react";

export const Dropdown = ({ categories, onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className=" appearance-none bg-dark block w-full py-2 px-4 border border-accent rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                    <option value="" disabled>
                        Select Category
                    </option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
