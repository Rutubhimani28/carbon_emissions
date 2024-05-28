import { Link } from 'react-router-dom'
import ContactUsForm from './ContactUsForm'

const ContactUs = () => {
  return (
    <div className='main py-5'>
      <p className="text-center pt-3 fontFamily main fw-bold fs-5">
        For enquiries, please share your details, and we’ll respond within 24-48 hours. Alternatively, you can email us
        at  <Link className=" text-decoration-none" style={{ color: '#4edceb' }}>askme@gosustainable.ai. </Link>
      </p>
      <ContactUsForm />
    </div>
  )
}

export default ContactUs
