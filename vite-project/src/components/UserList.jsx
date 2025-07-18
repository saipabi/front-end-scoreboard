import React from 'react';

function UserList({ users, selectedUser, onSelectUser }) {
    return (
        <div className="user-selection-area">
            <h2>Select User</h2>
            <select value={selectedUser} onChange={(e) => onSelectUser(e.target.value)}>
                <option value="">--Select a User--</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name} ({user.totalPoints} pts)
                    </option>
                ))}
            </select>
        </div>
    );
}

export default UserList;
