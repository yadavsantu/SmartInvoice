<template>
    <div class="help-page-container">
      <!-- Navbar -->
      <NavBar />
  
      <!-- Help Content -->
      <main class="main-content">
        <!-- Header Section -->
        <header class="help-header">
          <h1>Help Center</h1>
          <p>Find answers to your questions or get in touch with us for further assistance.</p>
        </header>
  
        <!-- FAQ Section -->
        <section class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <br>
          <ul>
            <li>
              <h3>How do I reset my password?</h3>
              <p>Click the "Forgot Password" link on the login page and follow the instructions.</p>
            </li>
            <li>
              <h3>How can I contact support?</h3>
              <p>Use the Contact Us form below or email us at support@example.com.</p>
            </li>
          </ul>
        </section>
  
        <!-- Invoice Generator Section -->
        <section class="invoice-info-section">
          <h2>Invoice Generator Features</h2>
          <p>
            Create professional invoices effortlessly with our easy-to-use invoice template. 
            Generate, customize, and send invoices in just a few clicks.
          </p>
          <br>
          <h3>Why Use Invoice Generator?</h3>
          <ul>
            <li><strong>Instant Invoices:</strong> Generate and download invoices instantly without account creation.</li>
            <li><strong>Invoice from Any Device:</strong> Invoice on-the-go from any device, desktop, tablet, or smartphone.</li>
            <li><strong>Trusted by Many Users:</strong> Every month many invoices are generated on Invoice Generator.</li>
            <li><strong>100% Free:</strong> There are no limits. Use it as much as you like.</li>
          </ul>
          <p>
            Our objective at Invoice-Generator.com is to make invoicing as simple as possible. We built this invoice generator solely dedicated to this purpose. We want to give you the best possible invoicing experience, and hope it saves you from the many frustrations that come with invoicing.
          </p>
          <br>
          <h3>How to Use Invoice Generator</h3>
          <ul>
            <li><strong>Making Invoices:</strong> Fill out the invoice template with all the details you want on your invoice. The invoice editor closely matches what the resulting invoice will look like. Once you have filled in the invoice template you are ready to download or send your invoice.</li>
            <li><strong>Sending Invoices:</strong> Invoices can be sent to customers. Your invoices are stored securely.</li>
            <li><strong>Downloading Invoices:</strong> Click the Download Invoice to download a PDF of your invoice. If you made a mistake, don't worry, you can go back and update the invoice . If you do not see your invoice once you click download then you should check your Downloads folder.</li>
            <li><strong>Saving Invoices:</strong> Invoices that you download or send are auto-saved to your device's local storage. This allows you to go back and edit past invoices. You can access past invoices on the History page. Click on a previously generated invoice to open it in the invoice editor. You can also export all of your invoices to a spreadsheet file by clicking the Export button.</li>
          </ul>
  
          <h3>System Requirements</h3>
          <p>
            In order to use Invoice Generator, you must use one of the following web browsers:
          </p>
          <ul>
            <li>Google Chrome: latest two versions</li>
            <li>Mozilla Firefox: latest two versions</li>
            <li>Internet Explorer 11</li>
          </ul>
          <p>Your browser must also have the following configuration:</p>
          <ul>
            <li>Javascript enabled</li>
            <li>Local storage enabled</li>
            <li>TLS v1.2 or above</li>
          </ul>
  
          <h3>Where Does Invoice Generator Store Invoices?</h3>
          <p>
            <strong>Send Invoice feature:</strong> If you have used the Send Invoice option then you or your recipient can retrieve the invoice at any time by signing in to Invoice-Generator.com.
          </p>
          <p>
            <strong>Download Invoice feature:</strong> Invoice Generator uses your web browser's local storage to remember your invoices without requiring you to create an account with us. We do not maintain any copies of your downloaded invoice on our servers. Clearing your browser history will clear all of your invoices on Invoice Generator and they cannot be recovered.
          </p>
  
        </section>
  
        <!-- Contact Us Section -->
        <section class="contact-us-section">
          <h2>Contact Us</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                placeholder="Your name"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="Your email"
                required
              />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                placeholder="Your message"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-btn">Submit</button>
          </form>
        </section>
      </main>
      <br>
  
      <!-- Footer -->
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import NavBar from "../components/navBar.vue";
  import FooterComponent from "../components/FooterComponent.vue";
  
  export default {
    name: "HelpPage",
    components: {
      NavBar,
      FooterComponent,
    },
    data() {
      return {
        form: {
          name: "",
          email: "",
          message: "",
        },
        scriptURL: "https://script.google.com/macros/s/AKfycbzHg8W-AcH_QTQdODDKdUXlZpwnfBIl6p996HwqOxuu8sw97rf30gjW1Zf8GWaakpbmZw/exec",
      };
    },
    methods: {
      async handleSubmit() {
      try {
        const formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("email", this.form.email);
        formData.append("message", this.form.message);

        const response = await fetch(this.scriptURL, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Thank you for reaching out! We'll get back to you shortly.");
          this.form.name = "";
          this.form.email = "";
          this.form.message = "";
        } else {
          alert("Error submitting the form. Please try again.");
        }
      } catch (error) {
        console.error("Submission Error:", error);
        alert("There was an error. Please try again later.");
      }
    },
    },
  };
  </script>
  
  <style scoped>
  /* General Styles */
  .help-page-container {
    font-family: "Arial", sans-serif;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px;
  }
  
  .main-content {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Header Section */
  .help-header {
    text-align: center;
    margin-bottom: 30px;
  }
  .help-header h1 {
    font-size: 2rem;
    color: #0056b3;
  }
  .help-header p {
    font-size: 1rem;
    color: #666;
  }
  
  /* Section Titles */
  .faq-section h2,
  .invoice-info-section h2,
  .contact-us-section h2 {
    font-size: 1.5rem;
    color: #0056b3;
    margin-bottom: 15px;
  }
  
  /* FAQ Styles */
  .faq-section ul {
    list-style-type: none;
    padding: 0;
  }
  .faq-section li {
    margin-bottom: 15px;
  }
  
  /* Invoice Info Styles */
  .invoice-info-section ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  .invoice-info-section ul li {
    margin-bottom: 10px;
  }
  
  /* Contact Form Styles */
  .contact-us-section .form-group {
    margin-bottom: 30px;
  }
  .contact-us-section label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  .contact-us-section input,
  .contact-us-section textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .contact-us-section .submit-btn {
    background-color: #0056b3;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  .contact-us-section .submit-btn:hover {
    background-color: #004494;
  }
  
  /* Responsive Design */
  @media (max-width: 600px) {
    .help-header h1 {
      font-size: 1.5rem;
    }
    .contact-us-section input,
    .contact-us-section textarea {
      font-size: 0.9rem;
    }
    .contact-us-section .submit-btn {
      font-size: 0.9rem;
    }
  }
  </style>
  