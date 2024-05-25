import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';

function UserForm() {

  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  if(id){
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`users/${id}`)
      .then(({data}) => {
        setLoading(false);
        setUser(data);
      })
      .catch(() => {
        setLoading(false);
      })
    }, [])
  }

  // Submit

  const onSubmit = (e) => {
    e.preventDefault();
    if(user.id){
      axiosClient.put(`/users/${user.id}`, user)
      .then(() => {
        navigate('/users');
      })
      .catch(error => {
        const response = error.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
        }
      })
    }else{
      axiosClient.post(`/users`, user)
      .then(() => {
        navigate('/users');
      })
      .catch(error => {
        const response = error.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
        }
      })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>Create User</h1>}
      <div className='card animated fadeInDown'>
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>}
        {loading && (
          <div className='text-center'>Loading...</div>
        )}

        {!loading && 
          <form onSubmit={onSubmit} action="">
            <input type="text" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder='Name'/>
            <input type="email" value={user.email} onChange={ev => setUser({...user , email: ev.target.value})} placeholder='Email'/>
            <input type="password"  onChange={ev => setUser({...user, password: ev.target.value})} placeholder='Password'/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder='Confirm  Password'/>
            <button className='btn'>Submit</button>
          </form>
        }
      </div>
    </>
  )
}

export default UserForm
