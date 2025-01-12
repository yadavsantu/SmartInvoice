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
            <p>
              "Forgot your password? No worries! Enter your email, and we’ll send you a link to quickly reset it and get you back on track."
            </p>
  
            <form @submit.prevent="handleSubmit">
              <div class="contain-email">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div class="contain-bottom">
                <button type="submit" class="btn">Send Recovery Email</button>
              </div>
            </form>
  
            <p v-if="message" class="message">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '', // Bound to the input field using v-model
        message: '', // To display success or error messages
      };
    },
    methods: {
      handleSubmit() {
        if (this.email) {
          // Simulate form submission (you can replace this with an actual API call)
          this.message = `A recovery link has been sent to ${this.email}. Please check your inbox.`;
          this.email = ''; // Clear the input field after submission
        } else {
          this.message = 'Please enter a valid email address.';
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* General Styles */
  .container-fluid {
    padding: 40px 20px;
    max-width: 800px;
  }
  
  .logo {
    width: 8%;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .contain-bottom {
    text-align: center;
    margin-top: 20px;
  }
  
  .contain-bottom .btn {
    width: 30%;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #EF7A04;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .contain-bottom .btn:hover {
    background-color: #ee9d51;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .logo {
      width: 8%;
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
  
    .contain-bottom .btn {
      font-size: 0.9rem;
    }
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
  
    .contain-email label,
    .contain-email input {
      font-size: 0.8rem;
    }
  
    .contain-bottom .btn {
      font-size: 0.8rem;
      padding: 8px 15px;
    }
  }
  </style>
  