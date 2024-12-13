<template>
    <footer class="footer">
      <div class="footer-section">
        <h4>Developed By</h4>
        <ul>
          <li>Santu Yadav</li>
          <li>Shivchandar Kumar Sah</li>
          <li>Sandesh Prasai</li>
          <li>Saurab Ghimire</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Invoicing Guide</a></li>
          <li><a href="#">Help</a></li>
          <li><a href="#">Sign In</a></li>
          <li><a href="#">Sign Up</a></li>
        </ul>
      </div>
      <div class="footer-section footer-copyright">
        <p>&copy; 2024 All rights reserved. Smart Invoice.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterComponent",
  };
  </script>
  
  <style scoped>

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #c3e3fb;
  color: #070885;
  border-top: 1px solid #ddd;

  /* Fix footer to the bottom */
  position: static;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 2000; /* Ensure it stays above other content */
}

  .footer-section {
    flex: 1;
    margin: 0 10px;
    text-align: left;
    
  }
  .footer-section h4 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  .footer-section li {
    margin: 5px 0;
  }
  .footer-section a {
    text-decoration: none;
    color: #007bff;
  }
  .footer-section a:hover {
    text-decoration: underline;
    color:#ef7a04;
  }
  .footer-copyright {
    text-align: center;
    font-size: 14px;
    color: #555;
    margin-top: 10px;
  }
  </style>
  