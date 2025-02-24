import React from 'react';
import './AdminUsers.css';
import AdminNav from "../components/AdminNav";
import AdminSidebar from "../components/AdminSidebar";
import useFetch from "../hooks/useFetch";

const AdminUsers = () => {

    const {data, error, loading} = useFetch("http://localhost:3000/api/user/getallusers");

    console.log(data);


  return (
    <div className='admin--users'>
        <AdminNav />
        <div className='adminusers--wrap'>
            <AdminSidebar active="Users"/>
            <div className="adminusers-container">
                <div className="users-header">
                    <h2>Users / Patients</h2>
                    <div className="search-container">
                    <div className="search-input-wrapper">
                        <input 
                        type="text" 
                        placeholder="Search" 
                        className="search-input"
                        />
                        <span className="search-icon">
                        <img src="/src/assets/search interface.png" alt="" />
                        </span>
                    </div>
                    <div className="search-select-wrapper">
                        <select className="search-select">
                        <option value="name">Search by name</option>
                        </select>
                        <span className="down-icon">

                        </span>
                    </div>
                    </div>
                </div>


            <table className="users-table">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>contact number</th>
                    <th>Email</th>
                    <th>NIC</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {data.map((user) => {
                    return <UserTable
                        key={user._id}
                        name={user.name}
                        contact={user.contactNumber}
                        email={user.email}
                        nic={user.nic}
                    />
                })}
                </tbody>
            </table>
            </div>
        </div>
    </div>

  );
};

export default AdminUsers;

const UserTable = ({name, contact, email, nic}) => {
    return(
        <tr>
            <td>
                <div className="user-avatar">
                    <img src="/images/profile.png" alt="" />
                </div>
            </td>
            <td>{name || "No name available"}</td>
            <td>{contact || "No contact number available"}</td>
            <td>{email}</td>
            <td>{nic || "No NIC available"}</td>
            <td>
                <button className="more-options">⋮</button>
            </td>
        </tr>
    )
}