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
    <nav className="bg-cyan-950 sticky top-0 z-50 border-b border-cyan-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src="/assets/jyoti-loops-logo.jpg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </span>
          <span className="text-2xl font-semibold whitespace-nowrap font-caveat text-cyan-50">
            <span className="text-cyan-400">Jyoti</span>-Loops
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          className="inline-flex items-center justify-center w-11 h-11 text-cyan-100 rounded-lg md:hidden hover:bg-cyan-900"
        >
          <span className="sr-only">{menuOpen ? 'Close main menu' : 'Open main menu'}</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" aria-hidden="true">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div id="main-nav" className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col p-4 mt-3 gap-1 rounded-lg bg-cyan-900 md:flex-row md:p-0 md:mt-0 md:gap-2 md:bg-transparent">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block py-2 px-3 rounded-md text-sm font-medium md:text-base ${
                      isActive
                        ? 'text-white bg-cyan-800 md:bg-transparent md:text-cyan-300'
                        : 'text-cyan-100 hover:bg-cyan-800 md:hover:bg-transparent md:hover:text-white'
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
                  className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-rose-300 hover:text-rose-200 hover:bg-cyan-800 md:hover:bg-transparent"
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
