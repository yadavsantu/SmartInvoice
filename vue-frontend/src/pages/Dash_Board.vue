<template>
  <div class="dashboard-container">
    <!-- Navbar -->
    <NavBar />

    <!-- Invoice Section -->
    <main class="main-content">
      <div class="invoice-section">
        <div class="invoice-header">
          <div class="logo-placeholder">
            <input type="file" id="logo-upload" accept="image/*" />
            <label for="logo-upload">+ Add Your Logo</label>
          </div>

          <h1>INVOICE</h1>
          <div class="invoice-number">
            <label for="invoice-number">#</label>
            <input id="invoice-number" type="text" value="4" />
          </div>
        </div>
        <div class="invoice-body">
          <div class="form-group">
            <label>Who is this from?</label>
            <input type="text" placeholder="Enter your name or business" />
          </div>
          <div class="form-group double">
            <div>
              <label>Bill To</label>
              <input type="text" placeholder="Who is this to?" />
            </div>
            <div>
              <label>Ship To</label>
              <input type="text" placeholder="(optional)" />
            </div>
          </div>
          <div class="form-group double">
            <div>
              <label>Date</label>
              <input type="date" />
            </div>
            <div>
              <label>Payment Terms</label>
              <input type="text" placeholder="Enter payment terms" />
            </div>
            <div class="form-group">
              <label for="due-date">Due Date</label>
              <input id="due-date" type="date" v-model="dueDate" />
            </div>
          </div>

          <!-- Due Date Section -->
        </div>
        <div class="invoice-items">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop over the items array to display rows -->
              <tr v-for="(item, index) in items" :key="index">
                <td>
                  <input
                    v-model="item.description"
                    type="text"
                    placeholder="Description of item/service..."
                  />
                </td>
                <td>
                  <input v-model="item.quantity" type="number" value="1" />
                </td>
                <td><input v-model="item.rate" type="text" value="0" /></td>
                <td>{{ formattedAmount(item.amount) }}</td>
                <td>
                  <button @click="removeItem(index)" class="remove-btn">
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button class="add-item" @click="addItem">+ Add Item</button>
        </div>

        <!-- Additional Fields -->
        <div class="additional-fields">
          <div class="notes">
            <label>Notes</label>
            <textarea
              placeholder="Notes - any relevant information not already covered"
            ></textarea>
          </div>
          <div class="terms">
            <label>Terms</label>
            <textarea
              placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
            ></textarea>
          </div>
        </div>

        <!-- Summary Section -->
        <div class="summary-section">
          <div>
            <label>Subtotal</label>
            <input type="text" :value="formattedAmount(subtotal)" disabled />
          </div>
          <div>
            <label>Tax</label>
            <div class="tax-input">
              <input v-model="taxRate" type="number" value="0" />
              <span>%</span>
            </div>
          </div>
          <div>
            <label>Discount</label>
            <input
              v-model="discount"
              type="number"
              value="0"
              placeholder="Discount Amount"
            />
          </div>
          <div>
            <label>Shipping</label>
            <input
              v-model="shipping"
              type="number"
              value="0"
              placeholder="Shipping Cost"
            />
          </div>
          <div>
            <label>Total</label>
            <input type="text" :value="formattedAmount(total)" disabled />
          </div>
          <div>
            <label>Amount Paid</label>
            <input
              v-model="amountPaid"
              type="text"
              value="0"
              placeholder="Amount Paid"
            />
          </div>
          <div>
            <label>Balance Due</label>
            <input type="text" :value="formattedAmount(balanceDue)" disabled />
          </div>
        </div>
      </div>

      <!-- Download Section -->
      <div class="download">
        <h3>Please proceed next step</h3>
        <button>Download</button>
        <hr />
        <label for="currency-dropdown">Currency</label>
        <select id="currency-dropdown" name="currency" v-model="currency">
          <option value="rupees">Rupees</option>
          <option value="dollars">Dollars</option>
          <option value="euro">Euro</option>
        </select>
        <button>Save as draft</button>
        <hr />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from "../components/navBar.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: "DashboardView",
  components: {
    NavBar,
    FooterComponent,
  },
  data() {
    return {
      currency: "rupees", // Default currency
      items: [
        {
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
      taxRate: 0,
      discount: 0,
      shipping: 0,
      amountPaid: 0,
    };
  },
  methods: {
    addItem() {
      this.items.push({
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      });
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    formattedAmount(amount) {
  const numericAmount = parseFloat(amount) || 0; // Ensure it's a number, default to 0 if not
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
}
,
  },
  computed: {
    subtotal() {
      return this.items.reduce((sum, item) => sum + item.amount, 0);
    },
    total() {
      const subtotal = this.subtotal;
      const tax = (subtotal * this.taxRate) / 100;
      const discountAmount = this.discount;
      const shippingCost = this.shipping;
      return subtotal + tax - discountAmount + shippingCost;
    },
    balanceDue() {
      return this.total - this.amountPaid;
    },
  },
  watch: {
  items: {
    handler() {
      this.items.forEach((item) => {
        item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
      });
    },
    deep: true,
  },
},
};
</script>

<style scoped>
/* General styles */
.dashboard-container {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 70px; /* Adjust for navbar height */
}

.main-content {
  flex: 2;
  padding: 20px;
  background-color: #6474bc;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.invoice-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: none;
  width: 100%; /* Take full width initially */
  max-width: 800px; /* For larger screens */
  margin: auto;
  font-family: Arial, sans-serif;
}

.download {
  flex: 1;
  background-color: #eef2ff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: none;
  text-align: right;
  width: 100%; /* Full width on smaller screens */
  max-width: 400px; /* Constrain width for larger screens */
}

/* Invoice Header Styles */
.invoice-header {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo-placeholder {
  width: 150px; /* Fixed size */
  height: 100px;
}

.invoice-number input {
  width: 50px;
  text-align: center;
}

/* Form Groups */
.form-group {
  margin-bottom: 15px;
}

.form-group.double {
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
}

.form-group input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Table Styling */
.invoice-items table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.invoice-items th,
.invoice-items td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.invoice-items input {
  width: 100%;
  border: none;
  outline: none;
  padding: 5px;
}

/* Responsive Buttons */
.add-item {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ef7a04;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-item:hover {
  background-color: #555; /* Updated hover color */
}

/* Additional Fields */
.additional-fields .notes,
.additional-fields .terms {
  margin-bottom: 15px;
}

/* Summary Section */
.summary-section {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.summary-section input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Remove box shadows from all buttons */
button, .add-item {
  box-shadow: none;
}

/* Hover color for all buttons */
button:hover, .add-item:hover {
  background-color: #555;
}

/* Responsive Design with Media Queries */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 10px;
  }

  .invoice-section {
    max-width: 100%; /* Full width on smaller screens */
  }

  .download {
    max-width: 100%;
    text-align: center;
  }

  .invoice-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-group.double {
    flex-direction: column;
  }

  .summary-section {
    grid-template-columns: 1fr; /* Stack the summary fields */
  }
}

@media (max-width: 480px) {
  .logo-placeholder {
    width: 100px; /* Adjust size for smaller screens */
    height: 80px;
  }

  .add-item {
    font-size: 12px;
    padding: 8px 16px;
  }

  .download button {
    font-size: 14px;
    padding: 8px 12px;
  }

  .invoice-items table {
    font-size: 14px;
  }
}

</style>
