<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="header">
          <img src="@/assets/smartlogo.jpg" alt="Smart Invoice Logo" class="logo" />
          <h1 class="title">Smart Invoice</h1>
        </div>
        <div class="content-box">
          <h2>Reset your password</h2>
          <p>"Forgot your password? No worries!"</p>

          <form @submit.prevent>
            <div class="contain-email">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" v-model="email" placeholder="Enter your email address"
                :disabled="isOtpEnabled" required />
            </div>
            <div class="contain-bottom">
              <button type="submit" class="btn" @click="verifyEmail" :disabled="isOtpEnabled">Send Recovery
                Email</button>
            </div>
            <p v-if="message" class="message">{{ message }}</p>

            <!-- OTP Input Field -->
            <div class="otp-input-wrapper">
              <input type="number" maxlength="6" class="otp-input" v-model="otp" placeholder="******"
                @input="handleInput" pattern="\d*" inputmode="numeric" :disabled="!isOtpEnabled" />
            </div>

            <!-- Password Reset Fields -->
            <div class="reset">
              <label for="n_password">New password</label>
              <div class="password-container">
                <input :type="showNewPassword ? 'text' : 'password'" minlength="6" id="n_password" class="n_password"
                  placeholder="Enter a new password (min. 6 characters)" v-model="newPassword"
                  :disabled="!isOtpEnabled" />
                <button type="button" @click="toggleNewPassword" class="eye-btn">
                  <img :src="showNewPassword ? eyeOpenImage : eyeClosedImage" alt="Toggle Password Visibility"
                    width="50px" height="auto" />
                </button>
              </div>
              <label for="c_password">Confirm password</label>
              <div class="password-container">
                <input :type="showConfirmPassword ? 'text' : 'password'" minlength="6" id="c_password"
                  class="c_password" placeholder="Confirm password" v-model="confirmPassword"
                  :disabled="!isOtpEnabled" />
                <button type="button" @click="toggleConfirmPassword" class="eye-btn">
                  <img :src="showConfirmPassword ? eyeOpenImage : eyeClosedImage" alt="Toggle Password Visibility"
                    width="50px" height="auto" />
                </button>
              </div>
              <button class="reset-button" @click="resetPassword" :disabled="!isOtpEnabled">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      email: '',
      message: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      eyeOpenImage: require('@/assets/eye-open.png'),
      eyeClosedImage: require('@/assets/eye-closed.png'),
      isOtpEnabled: false, // Initially disabled
    };
  },
  methods: {
    async verifyEmail() {
      try {
        const response = await axios.post('https://smartinvoice.onrender.com/api/v1/verifyEmail', { email: this.email });

        if (response.status === 200) {
           // SweetAlert2 success notification
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent!',
        text: 'OTP has been sent to your email. Please check your inbox.',
      });
          this.isOtpEnabled = true; // Enable OTP and password fields
        } else {
          // SweetAlert2 error notification
      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: 'An unexpected error occurred. Please try again.',
      });
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          this.isOtpEnabled = true;

           // SweetAlert2 info notification
      Swal.fire({
        icon: 'info',
        title: 'OTP Already Sent',
        text: 'An OTP has already been sent to your email. Please check your inbox.',
      });
        } else {
          console.error("Error during OTP request:", error);
          // SweetAlert2 error notification
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to send OTP. Please try again.',
      });
        }
      }
    },

    toggleNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async resetPassword() {
      this.message = "";
      if (this.newPassword !== this.confirmPassword) {
         // SweetAlert2 error notification
    Swal.fire({
      icon: 'error',
      title: 'Password Mismatch',
      text: 'Passwords do not match. Please try again.',
    });
        return;
      }

      try {
        const response = await axios.post('https://smartinvoice.onrender.com/api/v1/ResetPassword', {
          otp: this.otp,
          password: this.newPassword,
          email: this.email,
        });
        if (response.status === 200) {
          // SweetAlert2 success notification
      Swal.fire({
        icon: 'success',
        title: 'Password Changed!',
        text: 'Your password has been changed successfully. You can now log in.',
      });
          this.$router.push('LoginPage');
        }


      } catch (error) {
        alert("An error occurred while changing the password.");
        // SweetAlert2 error notification
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'An error occurred while changing the password. Please try again.',
    });
        console.error("Error during password reset:", error);
      }
    },
  },
};
</script>



<style scoped>
/* General Styles */
.container-fluid {
  padding: 40px 20px;
  max-width: 400px;


}

.logo {
  width: 20%;
  height: auto;
  margin-right: 1rem;
  margin-top: 1rem;
  border-radius: 20%;
  display: flex;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 1.8rem;
  margin-top: 10px;
  font-weight: bold;
}

.content-box {
  background-color: #c3e3fb;
  padding: 20px;
  border-radius: 10px;



}

.content-box h2 {
  text-align: center;
  padding: 10px;
}

.content-box p {
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  color: #100f0f;
}

.contain-email {
  margin: 15px 0;
}

.contain-email label {
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
  font-weight: bold;
}

.contain-email input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.contain-bottom {
  text-align: center;
  margin-bottom: 0px;

}

.contain-bottom .btn {
  width: 12rem;
  padding: 10px 20px;
  margin-top: 0px;
  margin-bottom: 50px;
  font-size: 1rem;
  background-color: #EF7A04;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}

.contain-bottom .btn:hover {
  background-color: #ee9d51;
}

.otp-input-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.otp-input {
  width: 200px;
  height: 45px;
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.n_password:focus,
.c_password:focus,
.contain-email input:focus,
.otp-input:focus {

  border-color: #ef7a04;
}

.verify-button {
  background-color: #ef7a04;
  color: #fff;
  border: none;
  margin-top: 0px;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 12rem;
  margin-bottom: 60px;
}

.verify-button:hover {
  background-color: #d46903;
}

.password-container {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}

.reset label {
  font-weight: bold;
}

.password-container input {

  width: 100%;
  height: 45px;
  border-radius: 20px;
  padding: 10px;
  font-size: 1rem;
}

.eye-btn {
  position: absolute;
  background: none;
  margin-top: -5px;
  cursor: pointer;
  width: 10%;
  margin-left: 0%;


}


.reset-button {
  margin-top: 0px;
  width: 12rem;
  border-radius: 10px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .logo {
    width: 8%;
  }
}

.title {
  font-size: 1.5rem;
}

.content-box {
  padding: 15px;
}

.contain-email input {
  font-size: 0.9rem;
}

.password-container input,
.contain-bottom .btn {
  font-size: 0.9rem;
}

.password-container input {
  font-size: 0.9rem;
}

.eye-btn img {
  margin-left: 19rem;
  width: 15px;
}

@media (max-width: 576px) {
  .logo {
    width: 10%;
  }

  .title {
    font-size: 1.2rem;
  }

  .content-box {
    padding: 10px;
  }

  .password-container input,
  .contain-email label,
  .contain-email input {
    font-size: 0.8rem;
  }

  .contain-bottom .btn {
    font-size: 0.8rem;
    padding: 12px 15px;
  }

  .eye-btn img {
    margin-left: 15rem;

    width: 15px;
  }
}

@media (max-width: 540px) {
  .eye-btn img {
    margin-left: 20rem;
  }
}

@media (max-width: 480px) {
  .eye-btn img {
    margin-left: 20rem;
  }
}

@media (max-width: 420px) {
  .eye-btn img {
    margin-left: 18rem;

    width: 15px;
  }

  .password-container input {
    font-size: 0.7rem;
  }
}

@media(max-width:360px) {
  .eye-btn img {
    margin-left: 17rem;
    width: 15px;
  }

}

@media(max-width: 344px) {
  .eye-btn img {
    margin-left: 16rem;
    width: 15px;
  }
}

@media (max-width:320px) {
  .eye-btn img {
    margin-left: 15rem;
    width: 15px;
  }
}

@media (max-width: 240px) {
  .eye-btn img {
    margin-left: -8rem;
    width: 15px;
  }

  .password-container input {
    font-size: 8px;
  }
}
</style>