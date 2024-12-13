<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/smartlogo.jpg" alt="Smart Invoice Logo" class="logo" />
      <h1 class="title">Smart Invoice</h1>
    </div>

    <div class="login-container">
      <h1>Sign In</h1>
      <p>Welcome Back!</p>
      <form @submit.prevent="handleLogin" aria-labelledby="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Email" required aria-required="true" />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Password" required
            aria-required="true" />
        </div>

        <div class="check-rem">
          <label for="remember-me" class="remember-label">
            <input type="checkbox" id="remember-me" v-model="rememberMe" class="remember-checkbox" />
            Remember me
          </label>
        </div>
        <button type="submit" class="btn-primary">Login</button>
      </form>

      <div class="links">
        <a href="#">Forgot Password?</a> | <a href="#">Sign Up</a>
      </div>


    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

// import axios from 'axios';
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin() {
      const Email = this.email;
      const Password = this.password;
      // const RememberMe = this.rememberMe;
      let response = ''
      if (Password.length < 6) {
        this.errorMessage = "Password length should be at least 6 characters";
        return;
      }

      try {
        response = await axios.post('http://localhost:8080/api/v1/login',
          {
            email: Email,
            password: Password
          }
        )
        if(response.status ==200)
           alert('Login Successfull');
          this.$router.push('/DashBoard')
      }
      catch (error) {
        this.errorMessage="Login Failled Please check your credentials";
      }
    },
  },
};
</script>
<style>
body {
  background-color: #6474BC;
}
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: sans-serif;

}

.container {
  width: 100%;
  height: auto;
  max-width: 400px;
  text-align: center;
  background-color: #6474BC;

}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-bottom: 15px;
}

.logo {
  width: 20%;
  height: auto;
  margin-right: 1rem;
  margin-top: 2rem;
  border-radius: 20%;
}

.header .title {
  font-size: 2rem;
  color: black;
}

.login-container {
  background-color: #C3E3FB;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.login-container p {
  color: #717272c3;
  margin-bottom: 1.5rem;
  font-style: bold;
}

.login-container h1 {
  margin-bottom: 2px;
  color: #070885;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #6474BC;
  font-size: 1rem;
}

form input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
}

.check-rem {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.remember-checkbox {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.remember-label {
  color: #797f9a;
  font-size: 0.9rem;
}

button.btn-primary {
  width: 100%;
  background-color: #EF7A04;
  color: white;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

button.btn-primary:hover {
  background-color: #140e07;
}

.links {
  margin-top: 1rem;
}

a {
  color: #070885;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

p {
  padding: 1rem;
  color: #140e07;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}
</style>
