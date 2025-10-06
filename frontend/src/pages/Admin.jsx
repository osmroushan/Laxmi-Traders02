import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Admin(){
  const [list,setList] = useState([])
  useEffect(()=>{
    const key = prompt('Enter admin key:')
    if(!key) return
    axios.get('/api/submissions?admin='+encodeURIComponent(key)).then(r=> setList(r.data)).catch(e=> alert('Unauthorized or error'))
  },[])
  return (
    <div className="container">
      <h2>Admin - Submissions</h2>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>PDF</th></tr></thead>
        <tbody>
          {list.map(s=> (
            <tr key={s._id}><td>{s._id}</td><td>{s.fullname}</td><td>{s.email}</td>
              <td>{s.pdf_path ? <a href={s.pdf_path} target="_blank" rel='noreferrer'>Download</a> : '—'}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}