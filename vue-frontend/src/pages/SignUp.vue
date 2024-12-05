<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/smartlogo.jpg" alt="Smart Invoice Logo" class="logo" />
      <h1 class="title">Smart Invoice</h1>
    </div>
    <div class="main">
      <form action="/" @submit.prevent="handleSignUp">
        <h1>Create a free account</h1>
        <p>Welcome to our Smart Invoice generator</p>
        <div class="name-container">

          <label for="full-name">Full Name</label>
          <input type="text" id="full-name" placeholder="Full Name" required autocomplete="off">



          <label for="UsrEmail">Email</label>
          <input type="email" id="UsrEmail" placeholder="Email" required="" autocomplete="off">

          <label for="UsrPsw">Password</label>
          <input type="password" id="UsrPsw" placeholder="Password" required="" autocomplete="off">

          <label for="UsrCfrmPsw">Confirm Password</label>
          <input type="password" id="UsrCfrmPsw" placeholder="Confirm Password" required="" autocomplete="off">
        </div>
        <button>Sign up</button>
      </form>
      <p id="errorMessage" style="color: red;"></p>
    </div>
  </div>

</template>
<style>
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
  box-sizing: content-box;
}

.container {
  width: 200%;
  height: 900px;
  max-width: 400px;
  text-align: center;
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
  margin-top: 2rem;
  margin-right: 0.5rem;
  border-radius: 20%;
}

.header .title {
  font-size: 2rem;
  color: black;
  margin-top: 2rem;
}


.main {
  max-width: 600px;
  max-height: auto;
  text-align: center;
  background: #C3E3FB;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 40px 20px 20px rgba(0, 0, 0, 0.1);
}

.main h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: #070885;
}

.main p {
  margin-bottom: 3rem;
  color: #767778;

}

.name-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #6474BC;
  text-align: justify;
  font-weight: bold;
 
}
label {
  margin-bottom: 10px;
}


input:focus {
  border-color: #007BFF;
  outline: none;
}


input {
  width: 100%;
  background: white;
  height: auto;
  padding: 10px;
  border-radius: 10px ;
  
  margin-bottom: 1rem;

}

button {
  width: 100%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: white;
  background: #EF7A04;
  font-size: 20px;
  font-weight: bold;
  margin-top: 2rem;
  outline: none;
  border: none;
  border-radius: 10px;
  transition: .3s ease-in;
  cursor: pointer;
  box-shadow: 5px 20px 40px black;
}

button:hover {
  background: rgb(20, 57, 105);
}

#chk:checked~.signup label {
  transform: scale(.3);
}
</style>

<script>
import axios from 'axios';

export default {
  methods: {
    async handleSignUp() {
      const FullName = document.getElementById("full-name").value;
      const Email = document.getElementById("UsrEmail").value;
      const Password = document.getElementById("UsrPsw").value;
      const Retype_password = document.getElementById("UsrCfrmPsw").value;
      const displayError = document.getElementById("errorMessage");

      if (Password.length < 6) {
        displayError.innerText = "Password length should be at least 6 characters.";
        return;
      }

      if (Password !== Retype_password) {
        displayError.innerText = "Passwords do not match. Please check and try again.";
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/api/v1/register", {
          fullName: FullName,
          email: Email,
          password: Password,
          repeat_password: Retype_password,
        });

        if (response.status === 201) {
          alert("User Registration Successful");
          displayError.innerText = " "; 
        }
      } catch (error) {
        console.log("User Registration Failed", error);
        displayError.innerText = "User Registration Failed. Please try again.";
      }
    },
  },
};
</script>
