import React, { useState } from 'react';

export function Users() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const users = [
        { id: 1, name: 'Linesh Malkam' },
        { id: 2, name: 'Rithika' },
        { id: 3, name: 'Tejas Makode' },
        { id: 4, name: 'Pranav Ghante' },
        { id: 5, name: 'Shubham Rai' },
        { id: 6, name: 'Aashish Rampal' },
        // Add more users as needed
    ];

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="margin mx-3 my-7 text-3xl font-bold">
            <div>Users</div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-4 border border-gray-300 rounded w-full"
                />
            </div>

            <div>
                <ul className="mt-3">
                    {filteredUsers.map((user) => (
                        <li key={user.id} className="p-3 mb-2 border border-gray-300 flex items-center justify-between">
                            <span className="flex items-center">
                                {/* <img
                                    //  src={user.image} // Add the correct image source
                                    // alt={`${user.name}'s avatar`}
                                    className="w-8 h-8 rounded-full mr-3"
                                /> */}
                                {user.name}
                            </span>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Pay Money</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
