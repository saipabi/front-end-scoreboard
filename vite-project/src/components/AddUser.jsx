import React, { useState } from 'react'; //

function AddUser({ onAddUser }) {
    const [userName, setUserName] = useState(''); //

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onAddUser(userName); 
        setUserName(''); 
    };

    return (
        <div>
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter user name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} //
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;