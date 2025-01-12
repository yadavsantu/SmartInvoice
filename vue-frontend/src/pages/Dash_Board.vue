<template>
  <div class="dashboard-container">
    <!-- Navbar -->
    <NavBar />

    <!-- Invoice Section -->
    <main class="main-content">
      <div class="invoice-section">
        <div class="invoice-header">
          <LogoPlaceholder @logo-uploaded="handleLogoUploaded" @logo-removed="handleLogoRemoved" />

          <h1>INVOICE</h1>
          <div class="invoice-number">
            <label for="invoice-number">#</label>
            <input id="invoice-number" type="text" v-model="invoiceNumber"
              :class="{ 'input-error': errors.invoiceNumber }" @blur="validateField('invoiceNumber')" />
            <div v-if="errors.invoiceNumber" class="error-message">{{ errors.invoiceNumber }}</div>
          </div>
        </div>

        <div class="invoice-body">
          <div class="form-group">
            <label>Who is this from?</label>
            <input type="text" v-model="from" :class="{ 'input-error': errors.from }" @blur="validateField('from')" />
            <div v-if="errors.from" class="error-message">{{ errors.from }}</div>
          </div>

          <div class="form-group double">
            <div>
              <label>Bill To</label>
              <input type="text" v-model="billTo" :class="{ 'input-error': errors.billTo }"
                @blur="validateField('billTo')" />
              <div v-if="errors.billTo" class="error-message">{{ errors.billTo }}</div>
            </div>
            <div>
              <label>Ship To</label>
              <input type="text" v-model="shipTo" :class="{ 'input-error': errors.shipTo }"
                @blur="validateField('shipTo')" />
              <div v-if="errors.shipTo" class="error-message">{{ errors.shipTo }}</div>
            </div>
          </div>

          <div class="form-group double">
            <div>
              <label>Date</label>
              <input type="date" v-model="date" :class="{ 'input-error': errors.date }" @blur="validateField('date')" />
              <div v-if="errors.date" class="error-message">{{ errors.date }}</div>
            </div>
            <div>
              <label>Payment Terms</label>
              <input type="text" v-model="paymentTerms" :class="{ 'input-error': errors.paymentTerms }"
                @blur="validateField('paymentTerms')" />
              <div v-if="errors.paymentTerms" class="error-message">{{ errors.paymentTerms }}</div>
            </div>
          </div>

          <div class="form-group">
            <label for="due-date">Due Date</label>
            <input id="due-date" type="date" v-model="dueDate" :class="{ 'input-error': errors.dueDate }"
              @blur="validateField('dueDate')" />
            <div v-if="errors.dueDate" class="error-message">{{ errors.dueDate }}</div>
          </div>
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
              <tr v-for="(item, index) in items" :key="index">
                <td>
                  <input v-model="item.description" type="text" placeholder="Description of item/service..."
                    :class="{ 'input-error': errors.items[index]?.description }"
                    @blur="validateItemField(index, 'description')" />
                  <div v-if="errors.items[index]?.description" class="error-message">{{ errors.items[index]?.description
                    }}</div>
                </td>
                <td>
                  <input v-model="item.quantity" type="number" value="1"
                    :class="{ 'input-error': errors.items[index]?.quantity }"
                    @blur="validateItemField(index, 'quantity')" />
                  <div v-if="errors.items[index]?.quantity" class="error-message">{{ errors.items[index]?.quantity }}
                  </div>
                </td>
                <td>
                  <input v-model="item.rate" type="text" value="0" :class="{ 'input-error': errors.items[index]?.rate }"
                    @blur="validateItemField(index, 'rate')" />
                  <div v-if="errors.items[index]?.rate" class="error-message">{{ errors.items[index]?.rate }}</div>
                </td>
                <td>{{ formattedAmount(item.amount) }}</td>
                <td>
                  <button @click="removeItem(index)" class="remove-btn">Remove</button>
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
            <textarea v-model="notes" placeholder="Notes - any relevant information not already covered"></textarea>
          </div>
          <div class="terms">
            <label>Terms</label>
            <textarea v-model="terms"
              placeholder="Terms and conditions - late fees, payment methods, delivery schedule"></textarea>
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
              <span class="percentage-symbol">%</span>
            </div>
            <div v-if="errors.taxRate" class="error-message">{{ errors.taxRate }}</div>
          </div>
          <div>
            <label>Discount</label>
            <input v-model="discount" type="number" value="0" placeholder="Discount Amount" />
            <div v-if="errors.discount" class="error-message">{{ errors.discount }}</div>
          </div>
          <div>
            <label>Shipping</label>
            <input v-model="shipping" type="number" value="0" placeholder="Shipping Cost" />
          </div>
          <div>
            <label>Total</label>
            <input type="text" :value="formattedAmount(total)" disabled />
          </div>
          <div>
            <label>Amount Paid</label>
            <input v-model="amountPaid" type="number" value="0" placeholder="Amount Paid" />
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
        <button @click="downloadInvoice">Download Invoice</button>
        <hr />
        <label for="currency-dropdown">Currency</label>
        <select id="currency-dropdown" name="currency" v-model="currency">
          <option value="rupees">Rupees</option>
          <option value="dollars">Dollars</option>
          <option value="euro">Euro</option>
        </select>
        <button @click="createInvoice">Create Invoice</button>
        <button @click="sendEmail">Send to email</button>
        <hr />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from "../components/navBar.vue";
import FooterComponent from "../components/FooterComponent.vue";
import LogoPlaceholder from "../components/LogoPlaceholder.vue";
import "../assets/css/dashboard.css";

export default {
  name: "DashboardView",
  components: {
    NavBar,
    FooterComponent,
    LogoPlaceholder
  },
  data() {
    return {
      logoData: null,
      currency: "rupees",
      invoiceNumber: "",
      from: "",
      billTo: "",
      shipTo: "",
      date: "",
      paymentTerms: "",
      dueDate: "",
      notes: "",
      terms: "",
      taxRate: 0,
      discount: 0,
      shipping: 0,
      amountPaid: 0,
      items: [
        {
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
      errors: {
        invoiceNumber: false,
        from: false,
        billTo: false,
        date: false,
        paymentTerms: false,
        dueDate: false,
        items: [],
        discount: false,
        taxRate: false,
      },
    };
  },
  methods: {
    handleLogoUploaded(logoData) {
      this.logoData = logoData;
    },

    handleLogoRemoved() {
      this.logoData = null;
    },
    validateField(field) {
      if (field === "invoiceNumber" && !Number.isInteger(Number(this.invoiceNumber))) {
        this.errors.invoiceNumber = "Invoice Number must be an integer";
      } else if (field === "from" && !/^[a-zA-Z\s]+$/.test(this.from)) {
        this.errors.from = "Sender's name must be a valid string";
      } else if (field === "discount" && this.discount < 0) {
        this.errors.discount = "Discount cannot be negative";
      } else if (field === "taxRate" && this.taxRate < 0) {
        this.errors.taxRate = "Tax rate cannot be negative";
      } else {
        this.errors[field] = false;
      }
    },
    validateItemField(index, field) {
      if (this.items[index][field] === "") {
        this.errors.items[index] = this.errors.items[index] || {};
        this.errors.items[index][field] = `${field} is required`;
      } else {
        if (this.errors.items[index]) {
          this.errors.items[index][field] = false;
        }
      }
    },
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
    createInvoice() {
      this.errors = {
        invoiceNumber: this.invoiceNumber === "" || !Number.isInteger(Number(this.invoiceNumber)) ? "Invoice Number must be an integer" : false,
        from: this.from === "" || !/^[a-zA-Z\s]+$/.test(this.from) ? "Sender's name can only contain alphabets" : false,
        billTo: this.billTo === "" || !/^[a-zA-Z\s]+$/.test(this.from) ? "Receiver's name can only contain alphabets" : false,
        date: this.date === "" ? "Date is required" : false,
        paymentTerms: this.paymentTerms === "" ? "Payment Terms are required" : false,
        dueDate: this.dueDate === "" ? "Due Date is required" : false,
        discount: this.discount < 0 ? "Discount cannot be negative" : false,
        taxRate: this.taxRate < 0 ? "Tax rate cannot be negative" : false,
        items: this.items.map((item) => ({
          description: item.description === "" ? "Description is required" : false,
          quantity: item.quantity === "" || item.quantity <= 0 ? "Quantity must be greater than 0" : false,
          rate: item.rate === "" || item.rate <= 0 ? "Rate must be greater than 0" : false,
        })),
      };

      const isValid = !Object.values(this.errors).some(error => error !== false);
      if (isValid) {
        console.log(isValid)
        alert("Invoice created successfully!");
      } else {
        alert("Please fill all required fields!");
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
    downloadInvoice() {
      alert("Download feature coming soon!");
    },
    sendEmail() {
      alert("Email feature coming soon!");
    }
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
    }
  },
  watch: {
    items: {
      handler() {
        this.items.forEach((item) => {
          item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
        });
      },
      deep: true,
    }
  }
};
</script>

<style scoped>
.input-error {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
