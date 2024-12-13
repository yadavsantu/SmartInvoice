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
      switch (this.currency) {
        case "rupees":
          return `₹${amount.toFixed(2)}`;
        case "dollars":
          return `$${amount.toFixed(2)}`;
        case "euro":
          return `€${amount.toFixed(2)}`;
        default:
          return `${amount.toFixed(2)}`;
      }
    },
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
          item.amount = item.quantity * item.rate;
        });
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.download label {
  font-size: 16px;
  margin-right: 10px;
  color: black;
}
.download hr {
  margin-bottom: 30px;
}

.download select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #1c1b1b;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: pointer;
}

.download select:focus {
  border-color: #007bff;
  outline: none;
}

.download option {
  padding: 10px;
}
.download button {
  background-color: #ef7a04;
  box-shadow: none;
  cursor: pointer;
}
.download button:hover {
  background-color: #555;
}

.dashboard-container {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 2;
  padding: 100px 20px;
  background-color: #6474bc;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

/* Invoice Section Styles */
.invoice-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: none;
  max-width: 1200px;
  margin: auto;
  margin-left: -10px;
  font-family: Arial, sans-serif;
}
.download {
  flex: 1; /* Adjust width as needed */
  background-color: #eef2ff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: none;
  text-align: right;
}
.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo-placeholder {
  display: inline-block;
  text-align: center;
  padding: 20px;
  border: 2px dashed #ccc;
  background-color: #f8f8f8;
  width: 150px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
  position: relative;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  border-radius: 20px;
}

.logo-placeholder input[type="file"] {
  display: none;
  /* Hide the default file input */
}

.logo-placeholder label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.invoice-number input {
  width: 50px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.double {
  display: flex;
  gap: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

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

.add-item {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ef7a04;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: none;
}

.add-item:hover {
  background-color: #555;
}
.discount-ship button {
  margin-top: 10px;
  padding: 10px 20px;

  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: none;
}
.discount-ship button:hover {
  background-color: #555;
}

.additional-fields {
  margin-top: 20px;
}

.additional-fields .notes,
.additional-fields .terms {
  margin-bottom: 15px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
}

.summary-section {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.summary-section label {
  font-weight: bold;
}

.summary-section input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tax-input {
  display: flex;
  align-items: center;
}

.tax-input span {
  margin-left: 5px;
}
</style>
