'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Contact', href: '/contact' },
    isLoggedIn
      ? { label: 'Dashboard', href: '/admin/dashboard' }
      : { label: 'Login', href: '/admin/login' },
  ];

  return (
    <nav className="bg-cyan-950 border-b border-[#333] sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/nft-logo.jpg"
              alt="nft Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white italic font-[cursive]">
            <span className="text-cyan-400">Jyoti</span>-Loops
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Navigation links */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-b-cyan-950 rounded-lg bg-cyan-950 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-cyan-950">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? 'text-cyan-700 font-semibold'
                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0033A0] dark:text-white md:dark:hover:text-[#0033A0] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            {isLoggedIn && (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    setIsLoggedIn(false);
                    setMenuOpen(false);
                    window.location.href = '/';
                  }}
                  className="block w-full text-left py-2 px-3 rounded-sm text-red-500 hover:text-red-700 md:p-0"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
