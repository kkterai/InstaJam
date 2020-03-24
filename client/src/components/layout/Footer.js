import React from 'react'
import isLoggedIn from '../../validation/is-logged-in'

export default function Footer() {
  return (
    !isLoggedIn(localStorage.jwtToken) ?
    <footer className="footer mt-5 p-4 text-center">
      © 2020 INSTAJAM FROM <a className="footer" href='https://github.com/kkterai'>KKTERAI</a>
    </footer>
    : null
  ) 
}