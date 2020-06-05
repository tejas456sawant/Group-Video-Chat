/** @format */

import React from "react";

const Footer = () => (
  <footer
    className='page-footer font-small text-white'
    style={{
      backgroundColor: "#343a40",
      bottom: "0px",
      position: "fixed",
      width: "100%",
    }}>
    <div className='footer-copyright text-center py-3'>
      © {new Date().getFullYear()}{" "}
      <a
        href='https://tejassawant.ml/'
        target='_blank'
        style={{ color: "rgba(255, 255, 255, 0.5)" }}>
        Tejas Sawant
      </a>
    </div>
  </footer>
);

export default Footer;
