<template>
  <div class="history-page">
    <!-- Navbar -->
    <NavBar />

    <div class="container">
      <div class="title">
        <h1>Invoice History</h1>
        <!-- Button to navigate to Dashboard -->
        <button class="new-invoice" @click="goToDashboard">New Invoice</button>
      </div>

      <!-- Content Section -->
      <div class="content">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Reference</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in invoices" :key="index">
              <td>{{ invoice.customer }}</td>
              <td>{{ index + 1 }}</td>
              <td>{{ invoice.date }}</td>
              <td>{{ invoice.dueDate }}</td>
              <td>{{ invoice.status }}</td>
              <td>{{ formattedAmount(invoice.totalAmount) }}</td>
              <td>
                <button @click="viewInvoice(index)">View</button>
                <button @click="deleteInvoice(index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="invoices.length === 0" class="no-history">
          <p>No invoices found.</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from "../components/navBar.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: "MyInvoicesPage",
  components: {
    NavBar,
    FooterComponent,
  },
  data() {
    return {
      invoices: [], 
      currency: "rupees", 
    };
  },
  methods: {
    loadInvoices() {
      const savedInvoices = localStorage.getItem("invoiceHistory");
      if (savedInvoices) {
        this.invoices = JSON.parse(savedInvoices);
      }
    },
    viewInvoice(index) {
      const selectedInvoice = this.invoices[index];
      alert(`Viewing invoice for: ${selectedInvoice.customer}`);
    },
    deleteInvoice(index) {
      if (confirm("Are you sure you want to delete this invoice?")) {
        this.invoices.splice(index, 1);
        localStorage.setItem("invoiceHistory", JSON.stringify(this.invoices));
      }
    },
    formattedAmount(amount) {
      const numericAmount = parseFloat(amount) || 0;
      switch (this.currency) {
        case "rupees":
          return `₹${numericAmount.toFixed(2)}`;
        case "dollars":
          return `$${numericAmount.toFixed(2)}`;
        case "euro":
          return `€${numericAmount.toFixed(2)}`;
        default:
          return `${numericAmount.toFixed(2)}`;
      }
    },
    goToDashboard() {
      this.$router.push({ name: "DashBoard" });  
    },
  },
  created() {
    this.loadInvoices(); 
  },
};
</script>

<style scoped>
.history-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 80px;
  box-sizing: border-box;
}

.container {
  max-width: 1000px;
  width: 150%;
  border-radius: 10px;
  background-color: #c3e3fb;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

.new-invoice {
  padding: 10px 20px;
  width: 200px;
}
button:hover {
  background-color: #bd7b01;
}
.content {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

thead th {
  background-color: #d2e9fb;
}

.no-history {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ef7a04;
  color: white;
}
</style>
