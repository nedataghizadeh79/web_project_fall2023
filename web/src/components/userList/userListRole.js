import React, { useState } from 'react';


function UserListRole({ users }) {
    const [selectedUser, setSelectedUser] = useState(null);

    function handleUserClick(user) {
        setSelectedUser(user);
    }

    function handleRoleChange(role) {
        //   کد  برای ارتقاء نقش کاربر  تو دیتا بیس مون
        console.log(`Change role of user ${selectedUser.name} to ${role}`);
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => handleUserClick(user)}>
                        {user.name}
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div>
                    <h3>Change role for {selectedUser.name}</h3>
                    <button onClick={() => handleRoleChange('simple')}>نقش عادی</button>
                    <button onClick={() => handleRoleChange('complex')}>نقش خفن</button>
                </div>
            )}
        </div>
    );
}

export default UserListRole;
