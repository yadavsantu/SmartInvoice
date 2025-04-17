<template>
  <footer class="footer">
    <!-- Developed By Section -->
    <div class="footer-section">
      <h4>Developed By</h4>
      <ul>
        <li><a href="https://www.linkedin.com/in/santu-yadav-77b5b6138/" target="_blank">Santu Yadav</a></li>
        <li><a href="https://www.linkedin.com/in/shivchandar-sah-394250296/" target="_blank">Shivchandar Kumar Sah</a></li>
        <li><a href="https://www.linkedin.com/in/sandesh-prasai-6bb875333/" target="_blank">Sandesh Prasai</a></li>
        <li><a href="https://www.facebook.com/shaurabh.ghimire.5" target="_blank">Saurab Ghimire</a></li>
      </ul>
    </div>

    <!-- Resources Section -->
    <div class="footer-section">
      <h4>Resources</h4>
      <ul>
        <li><router-link to="/HelpPage">Help</router-link></li>
        <li><router-link to="/LoginDashboard">My Invoices</router-link></li>
        <li><a href="InvoiceGuide">Invoice Guide</a></li>
        <li><router-link to="/LoginPage">Sign In</router-link></li>
        <li><router-link to="/Signup">Sign Up</router-link></li>
      </ul>
    </div>

    <!-- Copyright -->
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
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  flex-wrap: wrap;
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

/* All links style */
.footer-section a {
  text-decoration: none;
  color: #007bff;
  transition: all 0.2s ease;
}

.footer-section a:hover {
  text-decoration: underline;
  color: #ef7a04;
}

/* Hover effect for developer LinkedIn links specifically */
.footer-section:first-of-type ul li a {
  color: #070885;
}

.footer-section:first-of-type ul li a:hover {
  color: #ef7a04;
  transform: scale(1.05);
  text-decoration: underline;
}

/* Copyright section */
.footer-section.footer-copyright {
  text-align: center;
  font-size: 14px;
  color: #555;
  margin-top: 10px;
  flex-basis: 100%;
  margin-top: 20px;
}

/* Responsive design */
@media screen and (max-width: 768px) {
  .footer {
    padding: 10px;
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    flex: 1 1 100%;
    margin-bottom: 20px;
    text-align: center;
  }

  .footer-section h4 {
    font-size: 18px;
  }

  .footer-section ul {
    padding-left: 20px;
  }

  .footer-section li {
    margin: 5px 0;
  }

  .footer-section li a {
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  .footer {
    padding: 10px;
  }

  .footer-section h4 {
    font-size: 14px;
  }

  .footer-section li {
    font-size: 12px;
  }

  .footer-section li a {
    font-size: 12px;
  }

  .footer-section.footer-copyright {
    font-size: 12px;
  }
}
</style>