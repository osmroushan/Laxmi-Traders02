import { useLocation, Link } from 'react-router-dom'
export default function Success(){
  const loc = useLocation()
  const pdf = loc.state && loc.state.pdf
  return (
    <div className="container">
      <h2>Submission Successful</h2>
      <p>Your application has been received.</p>
      {pdf ? <p><a href={pdf} target="_blank" rel="noreferrer" className="btn">Download Certificate</a></p> : null}
      <p><Link to="/">Back to Home</Link></p>
    </div>
  )
}