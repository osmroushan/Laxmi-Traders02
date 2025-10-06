import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function FormPage(){
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function onSubmit(e){
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target)
    // education as JSON string (simple)
    const education = {
      '10th': { year: form.get('10_year'), board: form.get('10_board') },
      '12th': { year: form.get('12_year'), board: form.get('12_board') }
    }
    form.set('education', JSON.stringify(education))
    try{
      const res = await axios.post('/api/submissions', form, { headers: {'Content-Type':'multipart/form-data'} })
      if(res.data && res.data.pdf) {
        // pass pdf url to success page
        navigate('/success', { state: { pdf: res.data.pdf } })
      } else navigate('/success')
    }catch(err){ console.error(err); alert('Submit error') }
    setLoading(false)
  }
  return (
    <div className="container">
      <h2>Application Form</h2>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="row"><input name="fullname" placeholder="Full Name" required/></div>
        <div className="row"><input name="fathername" placeholder="Father/Husband" required/></div>
        <div className="row"><input type="date" name="dob" required/></div>
        <div className="row">
          <select name="gender" required><option value="">Gender</option><option>Male</option><option>Female</option></select>
          <select name="marital_status" required><option value="">Marital Status</option><option>Single</option><option>Married</option></select>
        </div>
        <div className="row"><input name="mobile" placeholder="Mobile" required/></div>
        <div className="row"><input name="email" type="email" placeholder="Email" required/></div>
        <div className="row"><input name="post" placeholder="Post Applied" required/></div>
        <div className="row"><label>Profile <input type="file" name="profile" accept="image/*"/></label></div>
        <div className="row"><label>Signature <input type="file" name="signature" accept="image/*"/></label></div>
        <div><button className="btn" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button></div>
      </form>
    </div>
  )
}