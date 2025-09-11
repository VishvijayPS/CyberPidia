import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tools(){
  const [tools, setTools] = useState([]);

  useEffect(()=>{
    // try session search results first
    const cached = sessionStorage.getItem('cyber_search_results');
    if(cached){
      const parsed = JSON.parse(cached);
      if(parsed.tools) { setTools(parsed.tools); return; }
    }
    axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tools`)
      .then(r => setTools(r.data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Tools</h2>
      <ul>
        {tools.map(t => (
          <li key={t._id}>
            <a href={t.url || '#'} target="_blank" rel="noreferrer">{t.name}</a>
            <p>{t.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
