<template>
  <div class="guide-page-container">
    <!-- Navbar -->
    <NavBar />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header -->
      <header class="guide-header">
        <h1>Invoice Guide</h1>
        <p>Learn how to use our Smart Invoice effectively.</p>
      </header>

      <!-- Invoice Fields Section -->
      <section class="fields-description-section">
        <h2>Invoice Fields Description</h2>
        <div class="field-card" v-for="(field, index) in fields" :key="index">
          <h3>{{ field.title }}</h3>
          <p v-html="field.description"></p>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from "../components/navBar.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: "InvoiceGuide",
  components: {
    NavBar,
    FooterComponent,
  },
  data() {
    return {
      fields: [
        { title: "Invoice Number", description: "Enter a unique invoice number for each invoice. This helps in tracking and referencing invoices easily." },
        { title: "Add Your Logo", description: "Upload your company's logo here. Please upload a valid image file (JPEG, PNG, GIF, or SVG). File size should not exceed 2MB." },
        { title: "From", description: "Specify the name and address of the sender (your business or personal information)." },
        { title: "Bill To", description: "Enter the name and address of the recipient (your client or customer)." },
        { title: "Ship To", description: "Specify the shipping address if it is different from the billing address." },
        { title: "Date", description: "Enter the date when the invoice is created. This field takes input as the present date if not filled manually." },
        { title: "Email", description: "Provide the recipient's email address to send the invoice electronically. If you are downloading pdf of invoice without <strong>Log In</strong>, then no need to fill this field." },
        { title: "Due Date", description: "Specify the payment due date. This helps in ensuring timely payments." },
        { title: "VAT or PAN No", description: "Add client's VAT No. or PAN No." },
        { title: "Terms and conditions", description: "Specify the terms and conditions of the invoice, such as payment terms, late fees, etc." },
        { title: "Tax Rate", description: "Enter the applicable tax rate for the invoice. Please enter the percentage of tax." },
        { title: "Discount", description: "Specify any discount applicable to the invoice. Please enter the discount in amount not in %." },
        { title: "Shipping", description: "Enter the shipping cost, if applicable." },
        { title: "Amount Paid", description: "Enter the amount that has already been paid towards the invoice." },
        { title: "Items", description: "List the items or services being billed. Include description, quantity and rate. The amount for each item is calculated automatically." },
      ],
    };
  },
};
</script>

<style scoped>
.guide-page-container {
  font-family: "Arial", sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 120px 20px; /* bottom padding for fixed footer */
  box-sizing: border-box;
  background-color: #6474bc;
  min-height: 100vh;
}

.main-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
}

.guide-header {
  text-align: center;
  margin-bottom: 30px;
}

.guide-header h1 {
  font-size: 2.5rem;
  color: #0056b3;
}

.guide-header p {
  font-size: 1.2rem;
  color: #555;
}

.fields-description-section h2 {
  font-size: 1.8rem;
  color: #0056b3;
  margin-bottom: 20px;
  text-align: center;
}

.field-card {
  background: #fdfdfd;
  border: 1px solid #ddd;
  border-left: 5px solid #0056b3;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.field-card:hover {
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.2);
}

.field-card h3 {
  font-size: 1.3rem;
  margin-bottom: 6px;
  color: #222;
}

.field-card p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .guide-header h1 {
    font-size: 1.8rem;
  }

  .guide-header p {
    font-size: 1rem;
  }

  .field-card {
    padding: 12px;
  }
}
</style>