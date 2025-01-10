// LogoPlaceholder.vue
<template>
  <div class="logo-container">
    <div class="logo-placeholder" :style="logoPreviewStyle">
      <input 
        type="file" 
        id="logo-upload" 
        accept="image/*" 
        @change="handleLogoUpload" 
        ref="logoInput"
      />
      <label for="logo-upload" v-if="!logoUrl">
        <div class="placeholder-content">
          <span class="upload-icon">+</span>
          <span class="upload-text">Add Your Logo</span>
          <span class="upload-subtext">Click to upload</span>
        </div>
      </label>
      <button 
        v-if="logoUrl" 
        @click.prevent="removeLogo" 
        class="remove-logo-btn"
        type="button"
      >
        Remove Logo
      </button>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'LogoPlaceholder',
  
  data() {
    return {
      logoUrl: null,
      error: null,
      maxFileSizeInMB: 2,
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
    }
  },

  computed: {
    logoPreviewStyle() {
      if (this.logoUrl) {
        return {
          backgroundImage: `url(${this.logoUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '2px solid #ccc'
        }
      }
      return {}
    }
  },

  methods: {
    handleLogoUpload(event) {
      const file = event.target.files[0]
      this.error = null

      // Validate file
      if (!file) return

      // Check file type
      if (!this.supportedFormats.includes(file.type)) {
        this.error = 'Please upload a valid image file (JPEG, PNG, GIF, or SVG)'
        this.$refs.logoInput.value = ''
        return
      }

      // Check file size
      if (file.size > this.maxFileSizeInMB * 1024 * 1024) {
        this.error = `File size should not exceed ${this.maxFileSizeInMB}MB`
        this.$refs.logoInput.value = ''
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.logoUrl = e.target.result
        // Emit the file and base64 data to parent component
        this.$emit('logo-uploaded', {
          file: file,
          base64: e.target.result
        })
      }
      reader.onerror = () => {
        this.error = 'Error reading file'
        this.$refs.logoInput.value = ''
      }
      reader.readAsDataURL(file)
    },

    removeLogo() {
      this.logoUrl = null
      this.error = null
      this.$refs.logoInput.value = ''
      // Emit null to parent component to indicate logo removal
      this.$emit('logo-removed')
    }
  }
}
</script>

<style scoped>
.logo-container {
  margin-bottom: 1rem;
}

.logo-placeholder {
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background-color: #fff;
}

.logo-placeholder:hover {
  border-color: #4a90e2;
  background-color: #f8f9fa;
}

.logo-placeholder input[type="file"] {
  display: none;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upload-icon {
  font-size: 2rem;
  color: #666;
}

.upload-text {
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
}

.upload-subtext {
  color: #999;
  font-size: 0.8rem;
}

.logo-placeholder label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.logo-placeholder:hover .upload-icon,
.logo-placeholder:hover .upload-text {
  color: #4a90e2;
}

.remove-logo-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.remove-logo-btn:hover {
  background-color: rgba(200, 35, 51, 1);
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>