

import React, { useRef } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    const mailto = `mailto:shopindieindex@gmail.com?subject=Contact%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}`;
    window.location.href = mailto;
    onClose();
  };

  return (
    <div className="contact-overlay">
      <div className="contact-modal">
        <button className="contact-close-btn" onClick={onClose}>&times;</button>
        <h2>Contact Me</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" ref={nameRef} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" ref={emailRef} required />
          </label>
          <label>
            Message:
            <textarea name="message" ref={messageRef} required />
          </label>
          <button className='contact-send-btn' type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
