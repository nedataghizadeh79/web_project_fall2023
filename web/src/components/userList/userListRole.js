import React, { useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { ROLE } from '../../utils';
import './userList.css';


function UserListRole({ users }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const containerRef = useRef();

    function handleUserClick(user) {
        setSelectedUser(user);
    }

    function closeModal() {
        setSelectedUser(null);
    }

    function handleRoleChange(role) {
        //   کد  برای ارتقاء نقش کاربر  تو دیتا بیس مون
        console.log(`Change role of user ${selectedUser.name} to ${role}`);
    }

    return (
        <>
            <div ref={containerRef}>
                <h2>مدیریت کاربران</h2>
                <hr />
                <div className='userList'>
                    {users.map(user => (
                        <div key={user.id} className="card">
                            <div className="data_container">

                                <div className="data">
                                    <span className="mainSpan"> نام: </span>{" "}
                                    <span className="dataSpan"> {user.name} </span>
                                </div>
                                <div className="data">
                                    <span className="mainSpan"> شناسه کاربری: </span>{" "}
                                    <span className="dataSpan"> {user.username} </span>
                                </div>
                                <div className="data">
                                    <span className="mainSpan"> نقش: </span>{" "}
                                    <span className="dataSpan"> {ROLE[user.role]} </span>
                                </div>
                            </div>
                            <div className='footer_container'>
                                <button onClick={() => handleUserClick(user)}>تغییر نقش</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <ReactModal className="react_modal" isOpen={!!selectedUser} onRequestClose={closeModal}>
                {selectedUser &&
                    <div className='modal__body'>
                        <div>
                            <label value={selectedUser.role} htmlFor='newRole'>تغییر نقش به: </label>
                            <select id='newRole' name='newRole' value={selectedUser.role}>
                                {Object.entries(ROLE).map(([key, value]) =>
                                    <option key={key} value={key}>{value}</option>
                                )}
                            </select>
                        </div>
                    </div>
                }
                <div className='modal__footer'>
                    <button onClick={closeModal} className="cancel">لغو</button>
                    <button>تایید</button>
                </div>
            </ReactModal>
        </>
    );
}

export default UserListRole;
