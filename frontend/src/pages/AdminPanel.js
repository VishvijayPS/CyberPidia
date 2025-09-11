import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AdminPanel(){
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(()=>{
    if(!user) return;
    axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/admin/users`)
      .then(r => setUsers(r.data))
      .catch(console.error);
    axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/admin/activities`)
      .then(r => setActivities(r.data))
      .catch(console.error);
  }, [user]);

  if(!user || user.role !== 'admin') return <div style={{ padding:20 }}>Admin access required</div>;

  return (
    <div style={{ padding:20 }}>
      <h2>Admin Panel</h2>
      <h3>Users</h3>
      <ul>{users.map(u => <li key={u._id}>{u.email} ({u.username}) - {u.role}</li>)}</ul>
      <h3>Recent Activities</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>Email</th><th>Page</th><th>Time</th></tr></thead>
        <tbody>
          {activities.map(a => (
            <tr key={a._id}>
              <td>{a.email || a.userId}</td>
              <td>{a.pageViewed}</td>
              <td>{new Date(a.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
