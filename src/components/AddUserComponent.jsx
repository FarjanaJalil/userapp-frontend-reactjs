import React, { useEffect, useState } from 'react'
import { addUser, getUser, updateUser } from '../services/UserService'
import { useNavigate, useParams } from 'react-router-dom'

const AddUserComponent = () => {
    {/* Define state variables */}
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
                                    firstName:'',
                                    lastName:'',
                                    emailId:''
                                })

    const navigator = useNavigate();

    useEffect( () => {
        if(id){
            getUser(id).then( (response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmailId(response.data.emailId);
            }).catch((error) => {
                console.error(error);
            })
        }
    }, [id])
    
    {/* Submit button event handler */}
    function saveOrUpdateUser (event) {
        event.preventDefault();

        if(validateForm()){
            const user = {firstName, lastName, emailId}
            console.log(user)

            if(id){
                updateUser(id, user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                }).catch((error) => {
                    console.error(error);
                })
            } else {
                addUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                }).catch((error) => {
                    console.error(error);
                })
            }
        }
    }

    {/* Check Form Submit Validation */}
    function validateForm () {
        let valid = true;

        const errorsCopy = {... errors}; {/* copy one obj to another */}

        {/* check if firstName is not null or not empty */}
        if(firstName.trim()){ 
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){ 
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(emailId.trim()){ 
            errorsCopy.emailId = '';
        } else {
            errorsCopy.emailId = 'Email ID is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function formTitle () {
        if(id){
            return <h2 className='text-center'> Update User </h2>
        } else {
            return <h2 className='text-center'> Add User </h2>   
        }
    }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                { 
                    formTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'> First Name </label>
                            <input type='text' placeholder='Enter first name' name='firstName' value={firstName} 
                                className={`form-control ${ errors.firstName ? 'is-invalid' : '' }`} 
                                onChange={(event) => setFirstName(event.target.value)}>
                            </input>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'> Last Name </label>
                            <input type='text' placeholder='Enter last name' name='lastName' value={lastName} 
                                className={`form-control ${ errors.lastName ? 'is-invalid' : '' }`} 
                                onChange={(event) => setLastName(event.target.value)}>
                            </input>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'> Email ID </label>
                            <input type='text' placeholder='Enter email id' name='emailId' value={emailId} 
                                className={`form-control ${ errors.emailId ? 'is-invalid' : '' }`} 
                                onChange={(event) => setEmailId(event.target.value)}>
                            </input>
                            {errors.emailId && <div className='invalid-feedback'> {errors.emailId} </div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateUser}> Submit </button>
                    </form>
                </div>

            </div>

        </div>

    </div>
  )
}

export default AddUserComponent