
import React from 'react';

function Leaderboard({ users }) {
    return (
        <div>
            <h2>Leaderboard</h2>
            <table className="leaderboard-table"> 
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td data-label="Rank">{index + 1}</td> 
                            <td data-label="Name">{user.name}</td> 
                            <td data-label="Points">{user.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
