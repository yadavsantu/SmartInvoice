<template>
  <div class="navbar-container">
    <nav class="navbar">
      <!-- Logo Section -->
      <div class="logo">
        <img src="@/assets/smartlogo.jpg" alt="Logo" />
        <span class="title">Smart Invoice</span>
      </div>

      <ul class="nav-links">
        <li><a href="#">Help</a></li>
        <li><a href="#">History</a></li>
        <li><a href="#">Invoicing Guide</a></li>
        <li>
          <button class="sign-in">Sign In</button>
        </li>
        <li>
          <button class="sign-up">Sign Up</button>
        </li>
        <li>
          <button class="log-out">Log Out</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #c3e3fb;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  font-size: 16px;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #070885;
  gap: 10px;
  height: 100%;
}

.logo img {
  width: 50px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 30px;
  object-fit: contain;
}

.title {
  margin-bottom: 28px;
}

/* Navigation Links Section */
.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  text-decoration: none;
  color: #070885;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ef7a04;
}

.sign-in,
.sign-up,
.log-out {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: none;
}

.sign-in {
  background-color: #070885;
}

.sign-up {
  background-color: #6474bc;
}

.log-out {
  background-color: #ef7a04;
}

button:hover {
  background-color: #555;
  transform: scale(1.05);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }

  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }

  .nav-links li {
    margin: 0;
    width: 100%;
  }

  .sign-in,
  .sign-up,
  .log-out {
    width: 100%;
    text-align: center;
  }
}
</style>
