import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

function User() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get User
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('users')
    .then(({data}) => {
      setLoading(false);
      setUser(data.data)
    })
    .catch(() => {
      setLoading(false);
    })
  }

  // User Delete

  const onDelete = (data) => {
    if(!window.confirm("Are you sure to delete this user?")){
      return;
    }

    axiosClient.delete(`/users/${data.id}`)
    .then(() => {
      getUsers();
    })
  }

    return (
      <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <h1>User</h1>
            <Link to="/users/create" className="btn-add">Add New</Link>
          </div>
          <div className="card animated fadeDown">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading && 
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">Loading...</td>
                  </tr>
                </tbody>
              }
              {!loading && 
                <tbody>
                  {users.map((data) => 
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.created_at}</td>
                      <td>
                        <Link className="btn-edit" style={{ marginRight:"5px" }} to={'/users/'+data.id}>Edit</Link>
                        <button onClick={ev => onDelete(data)} className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              }
            </table>
          </div>
      </div>
    )
  }
  
  export default User
  