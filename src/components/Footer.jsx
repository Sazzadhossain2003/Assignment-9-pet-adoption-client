'use client';
import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaw,
} from 'react-icons/fa';
import Link from 'next/link';

const socialLinks = [
  { Icon: FaFacebookF, color: 'hover:bg-blue-600', href: '#' },
  { Icon: FaInstagram, color: 'hover:bg-pink-600', href: '#' },
  { Icon: FaTwitter, color: 'hover:bg-sky-500', href: '#' },
  { Icon: FaYoutube, color: 'hover:bg-red-600', href: '#' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Pets', href: '/all-pets' },
  { label: 'My Requests', href: '/my-requests' },
  { label: 'Add Pet', href: '/add-pet' },
];

const contactInfo = [
  { Icon: FaMapMarkerAlt, text: 'Natore, Bangladesh', size: 14 },
  { Icon: FaPhoneAlt, text: '+880 1516-595530', size: 12 },
  { Icon: FaEnvelope, text: 'hossainmrrifad@gmail.com', size: 14 },
];

const supportLinks = [
  { label: 'FAQs', href: '/faqs' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const Footer = () => {
  return (
    <footer className="bg-[#050211] text-gray-400 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5 flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-gradient-to-br from-[#C084FC] to-[#E879F9] p-2 rounded-xl text-white shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-transform group-hover:rotate-12">
                <FaPaw size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
                PetNest
              </span>
            </Link>

            <p className="text-sm leading-relaxed opacity-80 max-w-xs text-center sm:text-left">
              Bringing pets and people together.{' '}
              <br className="hidden sm:block" />
              Adopt. Love. Repeat.
            </p>

            <div className="flex gap-3 justify-center sm:justify-start">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-transparent ${item.color}`}
                >
                  <item.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col items-center sm:items-start">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest text-center sm:text-left">
              Quick Links
            </h3>
            <ul className="space-y-3 text-center sm:text-left">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-[#C084FC] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 flex flex-col items-center sm:items-start">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest text-center sm:text-left">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 group justify-center sm:justify-start"
                >
                  <div className="text-purple-400 bg-purple-500/10 p-2 rounded-lg group-hover:bg-purple-500/20 transition-colors shrink-0 mt-0.5">
                    <item.Icon size={item.size} />
                  </div>
                  <span className="text-sm font-medium leading-tight pt-1.5 break-all">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1 flex flex-col items-center sm:items-start">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest text-center sm:text-left">
              Support
            </h3>
            <ul className="space-y-3 text-center sm:text-left">
              {supportLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-[#C084FC] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-medium opacity-60 text-center sm:text-left">
            &copy; {new Date().getFullYear()} PetNest. All rights reserved.
          </p>
          <p className="text-xs opacity-40 text-center sm:text-right">
            Made with ♥ for pets everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
