import { Link } from 'react-router-dom'
export default function Landing(){
  return (
    <div className="container">
      <header>
        <h1>Laxmi Traders Application</h1>
        <p>Apply quickly and receive a professional certificate on submit.</p>
        <Link to="/form" className="btn">Visit Now</Link>
      </header>
    </div>
  )
}