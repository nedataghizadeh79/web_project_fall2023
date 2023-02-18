import React, { useState } from 'react';
import './profile.css';
import PdfViewer from "../pdfViewer/pdfViewer";

function Profile() {
    const [name, setName] = useState('ندا تقی زاده');
    const [email, setEmail] = useState('Nedath1378@gmail.com');
    const [role, setRole] = useState('Student');
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');
    const [isEditing, setIsEditing] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const renderForm = () => {
        return (
            <form className='form' onSubmit={handleSubmit} dir='rtl'>
                <div >
                    <label htmlFor="name-input">  نام :   </label>
                    <input id="name-input" type="text" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="email-input">ایمیل : </label>
                    <input id="email-input" type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="role-input">نقش کاربر :  </label>
                    <select id="role-input" value={role} onChange={handleRoleChange}>
                        <option value="Master">User</option>
                        <option value="Student">Admin</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="image-input"> عکس کاربر :  </label>
                    <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <button className='save' type="submit">Save</button>
            </form>
        );
    };

    return (
        <section>
            <div className="profile" dir='rtl'>
                <img className='img' src={imageUrl} alt="Profile" />
                {isEditing ? (
                    renderForm()
                ) : (
                    <div className='info'>
                        <h2> نام و نام خانوادگی : {name}</h2>
                        <p>  ایمیل  : {email}</p>
                        <p>نقش کاربر : {role}</p>


                        <PdfViewer/>

                        <button onClick={handleEditClick}>Edit</button>
                    </div>
                )}
            </div>
        </section>

    );
}

export default Profile;