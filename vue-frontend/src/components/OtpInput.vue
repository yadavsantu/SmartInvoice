<template>
  <div class="otp-container">
    <h1 class="title">OTP Code Verification</h1>
    <p class="subtitle">Enter the OTP code sent to your Email:</p>
    <div class="otp-input-wrapper">
      <input type="text" maxlength="6" class="otp-input" v-model="otp" placeholder="------" @input="handleInput"
        pattern="\d*" inputmode="numeric" />
    </div>
    <button class="verify-button" @click="verifyOtp">Verify OTP Code</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      otp: "", // Single string for the OTP
    };
  },
  methods: {
    handleInput() { // Removed 'event' parameter
      this.otp = this.otp.replace(/[^0-9]/g, "").slice(0, 6); // Ensure only numbers and max 6 digits
    },
    async verifyOtp() {
      if (this.otp.length === 6) {

        try {
          const encodedEmail = localStorage.getItem("encodedEmail");
          const response = await axios.post("http://localhost:8080/api/v1/verifyOtp", {
            otp: this.otp, encodedEmail
          })
          if (response.status === 201) {
            alert("Otp Verified Success");
            this.$router.push("LoginPage");
          }
          else {
            console.log("Otp Verification UnsucessFull")
          }

        } catch (error) {
          console.log(error)
        }


      } else {
        alert("Please enter a 6-digit OTP.");
      }
    },
  },
};
</script>
<style scoped>
.otp-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  /* Full width of the viewport */
  height: 100vh;
  /* Full height of the viewport */
  background-color: #f9f9f9;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  /* Include padding in width/height calculation */
  background-color: #7b6dff;
  /* Match the purple background from the image */
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  /* White text to contrast with purple background */
}

.subtitle {
  font-size: 16px;
  color: #ddd;
  /* Slightly lighter text for better readability */
  margin-bottom: 20px;
}

.otp-input-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.otp-input {
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.otp-input:focus {
  border-color: #ef7a04;
}

.verify-button {
  background-color: #ef7a04;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 12rem;
}

.verify-button:hover {
  background-color: #d46903;
}

@media (max-width: 600px) {
  .otp-input {
    width: 100%;
    font-size: 16px;
  }

  .verify-button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>
