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

          <label for="full-name" style="display: flex;">Full Name</label>
          <input type="text" id="full-name" placeholder="Full Name" required autocomplete="off" v-model="FullName">


          <label for="UsrEmail">Email</label>
          <input type="email" id="UsrEmail" placeholder="Email" required="" autocomplete="off" v-model="Email">

          
          <label for="UsrPsw">Password</label>
          <div style="position: relative;">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="UsrPsw"
              placeholder="Password"
              required
              autocomplete="off"
              v-model="Password"
            />
            <button
              type="button"
              @click="togglePassword"
              class="eye-btn"
              aria-label="Toggle Password Visibility"
            >
              <img
                :src="showPassword ? eyeOpenImage : eyeClosedImage"
                alt="Toggle Password Visibility"
                 width="15px"
                height="auto"
              />
            </button>
          </div>

          <label for="UsrCfrmPsw">Confirm Password</label>
          <div style="position: relative;">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="UsrCfrmPsw"
              placeholder="Confirm Password"
              required
              autocomplete="off"
              v-model="repeat_password"
            />
            <button
              type="button"
              @click="toggleConfirmPassword"
              class="eye-btn"
              aria-label="Toggle Confirm Password Visibility"
            >
              <img
                :src="showConfirmPassword ? eyeOpenImage : eyeClosedImage"
                alt="Toggle Confirm Password Visibility"
                width="15px"
                height="auto"
              />
            </button>
          </div>
        
        </div>
        <button>Sign up</button>
      </form>
      <p v-if="errorMessage"> {{ errorMessage }} </p>
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
  font-family: sans-serif;
  box-sizing: content-box;
}

.container {
  width: 100%;
  height: fit-content;
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
  display: block;
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
  border-radius: 10px;
  margin-bottom: 1rem;

}


.eye-btn {
  position:absolute;
  justify-items: center;
  margin-left: 90%;
  margin-top: -16%;
  background: none;
  cursor: pointer;
  width: 5px;

}

.eye-btn:hover {
  background: none; 
  border: none; 
  box-shadow: none; 
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
@media (max-width:360px)
{
 .eye-btn{
  margin-top: -18%;
 }
}

@media (max-width:240px)

{
 .eye-btn{
  margin-top: -31%;
  
 }
 .eye-btn img {
  width: 10px;
 }
}
</style>

<script>
import axios from 'axios';

export default {
  name: "SignUp",
  data() {
    return {
      FullName: "",
      Email: "",
      Password: "",
      repeat_password: "",
      errorMessage: "",
      showPassword: false,
      showConfirmPassword: false,
      eyeOpenImage: require('@/assets/eye-open.png'),
      eyeClosedImage: require('@/assets/eye-closed.png'),
      
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async handleSignUp() {
      console.log("signUp")
      const FullName = this.FullName;
      const Email = this.Email;
      const Password = this.Password;
      const Retype_password = this.repeat_password;
      this.errorMessage= ""
      if (Password.length < 6) {
        this.errorMessage = "Password length should be at least 6 characters"
        return;
      }

      if (Password != Retype_password) {
        this.errorMessage = "Password Do not match. Please check your password";
        return;
      }

      try {
        const response = await axios.post("http://localhst:8080/api/v1/register", {
          fullName: FullName,
          email: Email,
          password: Password,
          repeat_password: Retype_password,
        }

        )

        if (response.status == 201) {
          {
            const encodedEmail = response.data.signedEmail;
            console.log(encodedEmail)
            localStorage.setItem("encodedEmail",encodedEmail);
            alert("User Registration SucessFull")
            this.$router.push('/verifyOtp')
          }


        }
      } catch (error) {

        if (error.response && error.response.status === 409) { this.errorMessage = "Email already exist Please Use Different Email Address" }

        else {
          console.log(error)
          this.errorMessage = "User Registration Failled ";
        }


      }
    },
  },
}

</script>