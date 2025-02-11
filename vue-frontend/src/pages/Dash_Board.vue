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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from "axios";

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
      date: new Date(Date.now()),
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
          quantity: 0,
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
      // Update errors object with validation results
      this.errors = {
        invoiceNumber: this.invoiceNumber === "" || !Number.isInteger(Number(this.invoiceNumber)) ? "Invoice Number must be an integer" : false,
        from: this.from === "" || !/^[a-zA-Z\s]+$/.test(this.from) ? "Sender's name can only contain alphabets" : false,
        billTo: this.billTo === "" ? "Receiver's name is required" : false,
        shipTo: this.shipTo === "" ? "Shipping address is required" : false,
        date: this.date === "" ? "Date is required" : false,
        paymentTerms: this.paymentTerms === "" ? "Payment Terms are required" : false,
        dueDate: this.dueDate === "" ? "Due Date is required" : false,
        discount: this.discount < 0 ? "Discount cannot be negative" : false,
        taxRate: this.taxRate < 0 ? "Tax rate cannot be negative" : false,
        items: this.items.map((item) => ({
          description: item.description === "" ? "Description is required" : false,
          quantity: item.quantity <= 0 ? "Quantity must be greater than 0" : false,
          rate: item.rate <= 0 ? "Rate must be greater than 0" : false,
        })),
      };

      // Check for top-level errors
      const hasTopLevelErrors = Object.values(this.errors).some(
        (error) => error && !Array.isArray(error)
      );

      // Check for item-specific errors
      const hasItemErrors = this.errors.items.some((itemErrors) =>
        Object.values(itemErrors).some((error) => error)
      );

      // Final validation check
      if (!hasTopLevelErrors && !hasItemErrors) {
        alert("Invoice created successfully!");
      } else {
        alert("Please fill all required fields!");
      }
    },


    formattedAmount(amount) {
      const numericAmount = parseFloat(amount) || 0;
      switch (this.currency) {
        case "rupees":
          return `Rs.${numericAmount.toFixed(2)}`; // For rupees
        case "dollars":
          return `$${numericAmount.toFixed(2)}`;
        case "euro":
          return `€${numericAmount.toFixed(2)}`;
        default:
          return `${numericAmount.toFixed(2)}`;
      }
    },
    downloadInvoice() {
  // Step 1: Perform validation checks and update errors object
  this.errors = {
    invoiceNumber: this.invoiceNumber === "" || !Number.isInteger(Number(this.invoiceNumber)) ? "Invoice Number must be an integer" : false,
    from: this.from === "" || !/^[a-zA-Z\s]+$/.test(this.from) ? "Sender's name can only contain alphabets" : false,
    billTo: this.billTo === "" ? "Receiver's name is required" : false,
    shipTo: this.shipTo === "" ? "Shipping address is required" : false,
    date: this.date === "" ? "Date is required" : false,
    paymentTerms: this.paymentTerms === "" ? "Payment Terms are required" : false,
    dueDate: this.dueDate === "" ? "Due Date is required" : false,
    discount: this.discount < 0 ? "Discount cannot be negative" : false,
    taxRate: this.taxRate < 0 ? "Tax rate cannot be negative" : false,
    items: this.items.map((item) => ({
      description: item.description === "" ? "Description is required" : false,
      quantity: item.quantity <= 0 ? "Quantity must be greater than 0" : false,
      rate: item.rate <= 0 ? "Rate must be greater than 0" : false,
    })),
  };

  // Step 2: Check for top-level errors (general fields)
  const hasTopLevelErrors = Object.values(this.errors).some(
    (error) => error && !Array.isArray(error)
  );

  // Step 3: Check for item-specific errors
  const hasItemErrors = this.errors.items.some((itemErrors) =>
    Object.values(itemErrors).some((error) => error)
  );

  // Step 4: If there are any errors, stop the PDF generation and alert the user
  if (hasTopLevelErrors || hasItemErrors) {
    alert("Please fill all required fields!");
    return; // Stop execution if validation fails
  }

  // Step 5: PDF generation if no errors
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Add header logo
    if (this.logoData && this.logoData.base64) {
      try {
        doc.addImage(
          this.logoData.base64,
          'JPEG',
          margin,
          yPosition,
          40,
          40,
          undefined,
          'FAST'
        );
      } catch (logoError) {
        console.warn('Logo could not be added:', logoError);
      }
    }

    // Header Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text('INVOICE', pageWidth / 2, margin + 10, { align: 'center' });

    // setting font size and font type
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Invoice Details
    yPosition = margin + 20;
    doc.text(`Invoice Number: ${this.invoiceNumber}`, pageWidth - 80, yPosition);
    doc.text(`Date: ${this.date}`, pageWidth - 80, yPosition + 10);
    doc.text(`Due Date: ${this.dueDate}`, pageWidth - 80, yPosition + 20);

    // From Section
    yPosition = 90;
    doc.setFontSize(12);
    doc.text('From:', margin, yPosition);
    doc.setFontSize(10);
    doc.text(this.from || 'N/A', margin, yPosition + 10);

    // Bill To & Ship To
    yPosition = 120;
    doc.setFontSize(12);
    doc.text('Bill To:', margin, yPosition);
    doc.text('Ship To:', pageWidth / 2, yPosition);

    doc.setFontSize(10);
    doc.text(this.billTo || 'N/A', margin, yPosition + 10);
    doc.text(this.shipTo || 'N/A', pageWidth / 2, yPosition + 10);

    // Table Section
    yPosition = 150;
    const tableTop = yPosition;
    const columns = ['Description', 'Quantity', 'Rate', 'Amount'];
    const columnWidths = [80, 30, 30, 30];
    const startX = margin;
    const rowHeight = 10;

    // Draw Table Header
    doc.setFillColor(70, 78, 95);
    doc.setTextColor(255);
    doc.rect(startX, tableTop, pageWidth - margin * 2, rowHeight, 'F');
    let xPos = startX;
    columns.forEach((col) => {
      doc.text(col, xPos + 2, tableTop + 7);
      xPos += columnWidths[columns.indexOf(col)];
    });

    // Draw Table Rows with Alternate Shading
    doc.setTextColor(0);
    yPosition = tableTop + rowHeight;

    this.items.forEach((item, index) => {
      xPos = startX;
      const isEven = index % 2 === 0;
      if (isEven) doc.setFillColor(240); // Light gray
      else doc.setFillColor(255); // White
      doc.rect(startX, yPosition, pageWidth - margin * 2, rowHeight, 'F');

      columns.forEach((_, colIndex) => {
        doc.rect(xPos, yPosition, columnWidths[colIndex], rowHeight);
        xPos += columnWidths[colIndex];
      });

      xPos = startX;
      doc.text(item.description || '', xPos + 2, yPosition + 7);
      xPos += columnWidths[0];

      doc.text(item.quantity?.toString() || '0', xPos + 2, yPosition + 7);
      xPos += columnWidths[1];

      doc.text(this.formattedAmount(item.rate || 0), xPos + 2, yPosition + 7);
      xPos += columnWidths[2];

      doc.text(this.formattedAmount(item.amount || 0), xPos + 2, yPosition + 7);

      yPosition += rowHeight;
    });

    // Summary Section
    yPosition += 20;
    const summaryXRight = pageWidth - margin;
    let summaryY = yPosition;

    const addSummaryLineRight = (label, value) => {
      const labelWidth = doc.getTextWidth(label);
      const valueWidth = doc.getTextWidth(value);
      doc.text(label, summaryXRight - labelWidth - 50, summaryY);
      doc.text(value, summaryXRight - valueWidth, summaryY);
      summaryY += 8;
    };

    doc.setFontSize(10);
    addSummaryLineRight('Subtotal:', this.formattedAmount(this.subtotal || 0));
    addSummaryLineRight('Tax:', `${this.taxRate || 0}%`);
    addSummaryLineRight('Discount:', this.formattedAmount(this.discount || 0));
    addSummaryLineRight('Shipping:', this.formattedAmount(this.shipping || 0));
    doc.setFontSize(11);
    addSummaryLineRight('Total:', this.formattedAmount(this.total || 0));
    addSummaryLineRight('Amount Paid:', this.formattedAmount(this.amountPaid || 0));
    doc.setFontSize(12);
    addSummaryLineRight('Balance Due:', this.formattedAmount(this.balanceDue || 0));

    // Notes and Terms Section
    summaryY = yPosition;
    if (this.notes) {
      doc.setFontSize(11);
      const splitNotes = doc.splitTextToSize(this.notes, pageWidth - margin * 2);
      doc.text('Notes:', margin, summaryY);
      doc.text(splitNotes, margin, summaryY + 10);
      summaryY += splitNotes.length * 5 + 10;
    }

    if (this.terms) {
      doc.setFontSize(11);
      const splitTerms = doc.splitTextToSize(this.terms, pageWidth - margin * 2);
      doc.text('Terms & Conditions:', margin, summaryY);
      doc.text(splitTerms, margin, summaryY + 10);
    }

    // Footer Section
    const footerY = pageHeight - 20; // Fixed position at bottom
    doc.setFontSize(10);
    doc.text("Contact Us: Smart Invoice Company Ltd.", margin, footerY - 5);
    doc.setFontSize(9);
    doc.text("Phone: +977-123456789 | Email: smartinvoicepvtltd@gmail.com", margin, footerY + 3);
    doc.text("Location: Kathmandu, Nepal", margin, footerY + 11);
    doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10); // Footer line

    // Save PDF
    const fileName = `Invoice-${this.invoiceNumber || 'draft'}.pdf`;
    doc.save(fileName);
    alert('PDF generated successfully!');

  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert(`Error generating PDF: ${error.message}`);
  }
}


    ,

    async sendEmail() {

      const accessToken = localStorage.getItem("refreshToken") || localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Please LogIn First");
        return;
      }

      const formData = new FormData();
      formData.append("invoiceNumber", this.invoiceNumber);
      formData.append("from", this.from);
      formData.append("billTo", this.billTo);
      formData.append("shipTo", this.shipTo);
      formData.append("date", this.date);
      formData.append("paymentTerms", this.paymentTerms);
      formData.append("dueDate", this.dueDate);
      formData.append("notes", this.notes);
      formData.append("terms", this.terms);
      formData.append("taxRate", this.taxRate);
      formData.append("discount", this.discount);
      formData.append("shipping", this.shipping);
      formData.append("amountPaid", this.amountPaid);
      formData.append("currency", this.currency);
      formData.append("total", this.total);
      formData.append("items", JSON.stringify(this.items))
      formData.append("balanceDue", this.balanceDue);
      formData.append("logo", this.logoData);
      console.log(this.logoData)
      try {
        const response = await axios.post("http://localhost:8080/api/v1/sendInvoice", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`
          }
        })
        if (response.status == 200) {
          alert("Invoice Saved to database");
          this.clearForm();
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error.map(err => err.message).join(", ");
          alert("Failed to save the invoice: " + errorMessage);
        } else {
          alert("An unknown error occurred: " + error.message);
        }

      }


    },

    clearForm() {
      this.invoiceNumber = "";
      this.from = "";
      this.billTo = "";
      this.shipTo = "";
      this.date = "";
      this.paymentTerms = "";
      this.dueDate = "";
      this.notes = "";
      this.terms = "";
      this.taxRate = 0;
      this.discount = 0;
      this.shipping = 0;
      this.items = [
        {
          description: "NA",
          quantity: 0,
          rate: 0,
          amount: 0,
        },
      ];
      this.errors = {
        invoiceNumber: false,
        from: false,
        billTo: false,
        date: false,
        paymentTerms: false,
        dueDate: false,
        items: [],
        discount: false,
        taxRate: false,
      };

      // Preserve default values
      this.currency = this.currency || "rupees";
      this.amountPaid = this.amountPaid || 0;
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
