
import React, { useState } from 'react';
import ContactForm from '../ContactForm';
import './Footer.css';
import instagramIcon from '../../images/Instagram_Glyph_Gradient.png';
import tiktokIcon from '../../images/TikTok_Icon_Black_Circle.png';
import xIcon from '../../images/logo-white.png';


const socials = [
  { name: 'X.com', url: 'https://x.com/ShopIndieIndex', icon: xIcon },
  { name: 'TikTok', url: 'https://tiktok.com/shopindieindex', icon: tiktokIcon },
  { name: 'Instagram', url: 'https://instagram.com/shopindieindex', icon: instagramIcon },
];

const Footer = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer>
      <div className="footer-socials">
        {socials.map(social => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={social.icon}
              alt={social.name}
              title={social.name}
              style={{ width: '32px', height: '32px', margin: '0 10px', verticalAlign: 'middle' }}
            />
          </a>
        ))}
      </div>
      <p> 
      Want your store listed here?
      </p>
      <button
        className="footer-contact-btn"
        onClick={() => setShowContact(true)}
      >
        Contact Me
      </button>
      <ContactForm isOpen={showContact} onClose={() => setShowContact(false)} />
    </footer>
  );
};

export default Footer;
