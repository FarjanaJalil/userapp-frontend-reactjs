import React, { useEffect, useState } from 'react'
import { deleteUser, listUsers } from '../services/UserService'
import { useNavigate } from 'react-router-dom'

const ListUserComponent = () => {
    /*const sampleData = [
        {
            "id": 1,
            "firstName": "Pink",
            "lastName": "Lady",
            "email": "pink@gmail.com"
        },

        {
            "id": 2,
            "firstName": "Michael",
            "lastName": "John",
            "email": "michael@gmail.com"
        },

        {
            "id": 3,
            "firstName": "Emily",
            "lastName": "Rose",
            "email": "emily@gmail.com"
        }

    ]*/

    const [users, setUsers] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, [])

    function getAllUsers () {
        listUsers().then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }

    function addNewUser () {
        navigator('/add-user');
    }

    function updateUser (id) {
        navigator(`/update-user/${id}`);
    }

    function removeUser (id) {
        console.log(id);

        deleteUser(id).then((response) => {
            getAllUsers();    
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
      <div className='container'>
        <h2 className='text-center'> List of Users </h2>

        <button className='btn btn-primary mb-2' onClick={addNewUser}> Add User </button>

        <table className='table table-striped table-bordered'>
            <thead className='table-success'>
                <tr>
                    <th> User ID </th>
                    <th> First Name </th>
                    <th> Last Name </th>
                    <th> Email ID </th>
                    <th> Actions </th>
                </tr>
            </thead>

            <tbody>
                {
                    // iterate and display each value of the array as an html table.
                    //sampleData.map(user => 
                    users.map(user =>
                        <tr key={user.id}>
                            <td> {user.id} </td>
                            <td> {user.firstName} </td>
                            <td> {user.lastName} </td>
                            <td> {user.emailId} </td>
                            <td> 
                                <button className='btn btn-info' onClick={() => updateUser(user.id)}> Update </button>
                            
                                <button className='btn btn-danger' onClick={() => removeUser(user.id)} style={{marginLeft: '10px'}}> Delete </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
      </div>
    )
}

export default ListUserComponent