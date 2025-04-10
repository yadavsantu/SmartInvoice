<template>
    <div class="parent">
    <div class="profile-container">
      <h2 class="title">Account Settings</h2>
      
      <!-- User Information -->
      <div class="section">
        <h3>Email Address</h3>
        <p v-if="!editing.email"><strong>{{ email }}</strong> <span class="edit" @click="editing.email = true">Change</span></p>
        <input v-else v-model="email" type="email" placeholder="Enter new email" />
      </div>
      
      <!-- Organization Details -->
      <div class="section">
        <h3>Organization Details</h3>
        <div v-for="(field, key) in organization" :key="key" class="input-group">
          <label>{{ formatLabel(key) }}</label>
          <p v-if="!editing[key]">{{ field }} <span class="edit" @click="editing[key] = true">Edit</span></p>
          <input v-else v-model="organization[key]" type="text" :placeholder="'Enter ' + formatLabel(key)" />
        </div>
      </div>
      <button class="save-btn" @click="saveOrganizationDetails">Save Changes</button>
      
      <!-- Password Change -->
      <div class="section">
        <h3 class="psw">Password</h3>
        <div class="password-fields">
          <div class="input-group">
            <label>New Password</label>
            <input v-model="newPassword" type="password" placeholder="Enter new password" />
          </div>
          <div class="input-group">
            <label>Current Password</label>
            <input v-model="confirmPassword" type="password" placeholder="Enter current password" />
          </div>
        </div>
        <p class="reset-link">Can't remember your current password? <a href="#">Reset your password</a></p>
        <button class="save-btn" @click="changePassword">Save Password</button>
      </div>
    </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "email@private.com",
        organization: {
          name: "Company Name",
          address: "123 Street, City",
          phone: "123-456-7890",
          pan: "123456789",
          vat: "123456789"
        },
        newPassword: "",
        confirmPassword: "",
        editing: {
          email: true,
          name: true,
          address: true,
          phone: true,
          pan: true,
          vat:true
        }
      };
    },
    methods: {
      saveOrganizationDetails() {
        alert("Organization details saved successfully!");
      },
      changePassword() {
        if (this.newPassword !== this.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        alert("Password changed successfully!");
      },
      formatLabel(key) {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      }
    }
  };
  </script>
  
  <style scoped>

.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  padding: 2rem; /* Use padding instead of margin */
  box-sizing: border-box;
}




.profile-container {
  margin: 2rem;
  width: auto;
  height: auto;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 25px;
}

.input-group {
  margin-bottom: 20px;
}



label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.edit {
  color: purple;
  cursor: pointer;
  margin-left: 10px;
}

.save-btn {
  background-color: #4B0082;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.psw
{
    margin: 30px 0px 10px 0px;
}

.password-fields {
  display: flex;
  justify-content: space-between;
}

.password-fields .input-group {
  width: 48%;
}

.reset-link {
  font-size: 14px;
  margin-top: 10px;
}

/* Media Queries for Responsiveness */

@media (max-width: 1200px) {
  .profile-container {
    width: 100%; /* Adjust width for medium screens */
    padding: 30px;
  }

  .title {
    font-size: 24px;
  }

  .section {
    margin-bottom: 20px;
  }

  .input-group {
    margin-bottom: 15px;
  }
}

@media (max-width: 768px) {
  .profile-container {
    width: 100%; /* Full width on smaller screens */
    padding: 20px;
  }

  .title {
    font-size: 22px;
  }

  .password-fields {
    flex-direction: column;
    align-items: stretch;
  }

  .password-fields .input-group {
    width: 100%;
    margin-bottom: 10px;
  }

  .save-btn {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .profile-container {
    width: 100%; /* Full width on very small screens */
    padding: 15px;
  }

  .title {
    font-size: 20px;
  }

  .input-group {
    margin-bottom: 10px;
  }

  .save-btn {
    padding: 8px;
  }
}

  </style>
  