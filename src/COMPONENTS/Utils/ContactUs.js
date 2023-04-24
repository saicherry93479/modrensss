import React, { useRef } from 'react'
import emailjs from 'emailjs-com'
const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_6ui7p0g', 'template_717nbe6', form.current, 'yL2x-I-bU9-IH5-aR')
        .then((result) => {
            console.log('result is ',result.text);
        }, (error) => {
            console.log('error is ',error.text);
        });
    };
  
    return (
      <form ref={form} onSubmit={sendEmail}>
        <label>username</label>
        <input type="text" name="username" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    );
}

export default ContactUs