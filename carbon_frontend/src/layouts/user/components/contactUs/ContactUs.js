import { Link } from 'react-router-dom'
import ContactUsForm from './ContactUsForm'

const ContactUs = () => {
  return (
    <div className='main pt-5 pb-2'>
      {/* <p className="text-center pt-3 fontFamily main fw-bold fs-5 wow animate__animated animate__fadeInUp animate__slow">
        For enquiries, please share your details, and we’ll respond within 24-48 hours. Alternatively, you can email us
        at  <Link className="text-decoration-none" style={{ color: '#ffffd9' }} to="mailto:info@sirat.earth">Sirāt</Link>
      </p> */}
      <p className="text-center pt-3 fontFamily main fw-bold fs-5 wow animate__animated animate__fadeInUp animate__slow">
        We are eager to hear what you have to say!
      </p>
      <ContactUsForm />
    </div>
  )
}

export default ContactUs
