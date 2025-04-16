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
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      otp: "",
    };
  },
  methods: {
    handleInput() {
      this.otp = this.otp.replace(/[^0-9]/g, "").slice(0, 6); // Ensure only numbers and max 6 digits
    },
    async verifyOtp() {
  if (this.otp.length !== 6) {
    // SweetAlert2 error notification for invalid OTP length
    Swal.fire({
      icon: 'error',
      title: 'Invalid OTP',
      text: 'Please enter a 6-digit OTP.',
    });
    return;
  }

  try {
    const encodedEmail = localStorage.getItem("encodedEmail");
    const response = await axios.post("smart-invoice-topaz.vercel.app/api/v1/verifyOtp", {
      otp: this.otp,
      encodedEmail,
    });

    if (response.status === 201) {
      // SweetAlert2 success notification for successful OTP verification
      Swal.fire({
        icon: 'success',
        title: 'OTP Verified',
        text: 'Your OTP has been successfully verified!',
      });
      this.$router.push("LoginPage");
    } else {
      // SweetAlert2 error notification for invalid OTP
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: 'The OTP you entered is incorrect. Please try again.',
      });
      console.log("OTP Verification Unsuccessful");
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);

    // SweetAlert2 error notification for server or network errors
    Swal.fire({
      icon: 'error',
      title: 'Verification Failed',
      text: 'An error occurred while verifying the OTP. Please try again later.',
    });
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
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  background-color: #7b6dff;

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
