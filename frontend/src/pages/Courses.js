import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Courses(){
  const [courses, setCourses] = useState([]);
  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/courses`)
      .then(r=>setCourses(r.data))
      .catch(console.error);
  },[]);
  return (
    <div style={{ padding:20 }}>
      <h2>Courses</h2>
      <ul>
        {courses.map(c => (
          <li key={c._id}><a href={c.url || '#'} target="_blank" rel="noreferrer">{c.title}</a> — {c.provider} ({c.level})</li>
        ))}
      </ul>
    </div>
  );
}
