<template>
  <div class="history-page">
    <!-- Navbar -->
    <NavBar />
    <main class="main-content">
      <div class="container">
        <div class="title">
          <h1>Invoice History</h1>
          <button class="new-invoice" @click="goToDashboard">New Invoice</button>
        </div>
         <!-- Search Bar -->
         <div class="search-bar">
          <input v-model="searchQuery" placeholder="Search invoices..." />
        </div>
          

        <!-- Content Section -->
        <div class="content">
          <!-- Mobile view: Card layout -->
          <div class="mobile-cards" v-if="isMobileView">
            <div v-for="(invoice, index) in filteredInvoices" :key="invoice._id" class="invoice-card">
              <div class="card-row">
                <strong>Customer:</strong> {{ invoice.billTo }}
              </div>
              <div class="card-row">
                <strong>Invoice Number:</strong> {{ invoice.invoiceNumber }}
              </div>
              <div class="card-row">
                <strong>Date:</strong> {{ formatDate(invoice.date) }}
              </div>
              <div class="card-row">
                <strong>Due Date:</strong> {{ formatDate(invoice.dueDate) }}
              </div>
              <div class="card-row">
                <strong>Status:</strong> {{ invoice.status }}
              </div>
              <div class="card-row">
                <strong>Amount:</strong> {{ formattedAmount(invoice.total) }}
              </div>
              <div class="card-actions">
                <button @click="updateInvoice(index)">Update</button>
                <button @click="downloadInvoice(index)">Download</button>
              </div>
            </div>
          </div>


          <!-- Desktop view: Table layout -->
          <div class="table-container" v-else>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Invoice Number</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(invoice, index) in filteredInvoices" :key="invoice._id">
                  <td>{{ invoice.billTo }}</td>
                  <td>{{ invoice.invoiceNumber }}</td>
                  <td>{{ formatDate(invoice.date) }}</td>
                  <td>{{ formatDate(invoice.dueDate) }}</td>
                  <td>{{ invoice.status }}</td>
                  <td>{{ formattedAmount(invoice.total) }}</td>
                  <td>
                    <button @click="updateInvoice(index)">Update</button>
                    <button @click="downloadInvoice(index)">Download</button>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

          <div v-if="invoices.length === 0" class="no-history">
            <p>No invoices found.</p>
          </div>
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from "../components/navBar.vue";
import FooterComponent from "../components/FooterComponent.vue";
import axios from "axios";

export default {
  name: "LoginDashboard",
  components: {
    NavBar,
    FooterComponent,
  },
  data() {
    return {
      invoices: [],
      searchQuery: "",
      currency: "rupees",
      isMobileView: false,
    };
  },
  computed: {
    filteredInvoices() {
      return this.invoices.filter(invoice =>
        invoice.billTo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        invoice.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async loadInvoices() {
      try {
        const accessToken = localStorage.getItem("refreshToken") || localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/api/v1/loadInvoice", {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        if (response.data && response.data.invoices) {
          this.invoices = response.data.invoices.map(invoice => ({
            ...invoice,
            date: invoice.date ? new Date(invoice.date).toISOString().split("T")[0] : "N/A",
            dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split("T")[0] : "N/A",
          }));
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error loading invoices:", error);
      }
    }
    ,
    async updateInvoice(index) {
      const selectedInvoice = this.invoices[index];

      if (!selectedInvoice || !selectedInvoice.invoiceNumber) {
        alert("Invalid invoice selection");
        return;
      }

      if (selectedInvoice.status === "Paid") {
        alert("Invoice is already paid");
        return;
      }


      if (!confirm(`Are you sure you want to update the status for invoice no ${selectedInvoice.invoiceNumber}?`)) {
        return;
      }

      try {
        const invoiceId = selectedInvoice._id;
        const accessToken = localStorage.getItem("refreshToken") || localStorage.getItem("accessToken");

        if (!accessToken) {
          alert("User is not authenticated. Please log in.");
          return;
        }

        const response = await axios.put(
          `http://localhost:8080/api/v1/updateInvoice/${invoiceId}`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (response.status === 200) {
          alert("Invoice status successfully updated!");
          await this.loadInvoices(); // Refresh invoice list
        }
      } catch (error) {
        console.error("Error updating invoice:", error);
        if (error.response) {
          if (error.response.status === 400) {
            alert("Invalid Invoice ID. Please check again.");
          } else if (error.response.status === 403) {
            alert("Authentication failed. Please log in again.");
          } else if (error.response.status === 500) {
            alert("Server error. Please try again later.");
          } else {
            alert(`Error: ${error.response.data.message || "Failed to update invoice"}`);
          }
        } else if (error.request) {
          alert("No response from server. Please check your internet connection.");
        } else {
          alert("Unexpected error occurred. Please try again.");
        }
      }
    },


    async downloadInvoice(index) {
  const selectedInvoice = this.invoices[index];
  const invoiceId = selectedInvoice._id;

  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/download/${invoiceId}`,
      { responseType: 'blob' }  // Ensures response is a file (blob)
    );

    // ✅ Correct status check
    if (response.status !== 200) {
      console.error("Download failed with status", response.status);
      throw new Error("Failed to download invoice");
    }

    // ✅ Use response.data instead of await response.blob()
    const blob = response.data; 
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoiceId}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // ✅ Release memory after download
    setTimeout(() => window.URL.revokeObjectURL(url), 100);

  } catch (error) {
    console.error("Download Error:", error);
  }
}
,
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

    formatDate(date) {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
    },

    goToDashboard() {
      this.$router.push({ name: "DashBoard" });
    },
    checkScreenSize() {
      this.isMobileView = window.innerWidth < 768;
    },
  },
  created() {
    this.loadInvoices();
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  BeforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style scoped>
.history-page {
  display: flex;
  flex: 2;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #6474bc;
  width: 100%;
  margin-top: 80px;
  box-sizing: border-box;

}

.container {
  background-color: #c3e3fb;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}
.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.title {
  flex: 2;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
}

h1 {
  margin: 0;
  font-size: 1.8rem;
}

.new-invoice {
  padding: 10px 20px;
  min-width: 120px;
}

.content {
  width: 100%;
  overflow-x: auto;
}

/* Table Styles */
.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 10px;
  background-color: #cedfed;
}

th,
td {
  padding: 10px;
  text-align: center;
}

td:last-child {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* Mobile Card Styles */
.mobile-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.invoice-card {
  background-color: #cedfed;
  padding: 15px;
  border-radius: 8px;
}

.card-row {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.card-row:last-child {
  border-bottom: none;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

button {
  margin: 0;
  padding: 0px 10px;
  border: none;
  width: fit-content;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ef7a04;
  color: white;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #bd7b01;
}

.no-history {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}

/* Responsive Media Queries */
@media screen and (max-width: 768px) {
  .history-page {
    padding: 10px;
  }

  .container {
    padding: 15px;
  }

  .title {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .new-invoice {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .main-content {
    padding: 10px;
  }

  .container {
    padding: 10px;
  }

  button {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>   