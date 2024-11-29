<template>
  <div>
    <div class="main">
      <input type="checkbox" id="chk">

      <div class="signup">
        <form action="/" @submit.prevent="handleSignUp">

          <label for="chk">Sign up</label>
          <input type="text" id="FullName" placeholder="Full Name" required="" autocomplete="off">
          <input type="email" id="UsrEmail" placeholder="Email" required="" autocomplete="off">
          <input type="password" id="UsrPsw" placeholder="Password" required="" autocomplete="off">
          <input type="password" id="UsrCfrmPsw" placeholder="Retype Password" required="" autocomplete="off">
          <button>Sign up</button>
        </form>
        <p id="errorMessage"></p>
      </div>
    </div>
  </div>

</template>
<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: sans-serif;
}

.main {
  width: 350px;
  height: 480px;
  background: rgb(111, 128, 224);
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 30px 50px black;
}

#chk {
  display: none;
}

.signup {
  position: relative;
  width: 100%;
  height: 100%;
}

label {
  color: white;
  font-size: 35px;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: .5s ease-in-out;
  margin-bottom: 10px;
}

input {
  width: 60%;
  height: 20px;
  background: white;
  justify-content: center;
  display: flex;
  margin: 18px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 50px;
}

button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: white;
  background: rgb(43, 83, 194);
  font-size: 20px;
  font-weight: bold;
  margin-top: 18px;
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



      const FullName = document.getElementById("FullName").value;
      const Email = document.getElementById("UsrEmail").value;
      const Password = document.getElementById("UsrPsw").value;
      const Retype_password = document.getElementById("UsrCfrmPsw").value;
      const displayError = document.getElementById("errorMessage");

      if (Password.length < 6) {
        displayError.innerText = "Password length should be of minimum 6 character"
        return;
      }

      if (Password != Retype_password) {
        displayError.innerText = "Password do not match please check the password and try again"
        return;
      }

      let response = '';
      try {
        response = await axios.post('http://localhost:8080/api/v1/register', {
          fullName: FullName,
          email: Email,
          password: Password,
          repeat_password: Retype_password,
        }
        
      )
      if(response.status==201 )
        {
          alert("User Registration SucessFull")
        }
      } catch (error) {
        console.log("User Registration Failled", error, response);
        displayError.innerText = error + response;
      }


    },
  },
};
</script>