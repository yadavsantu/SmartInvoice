<template>
  <div class="dashboard-container">
    <!-- Navbar -->
    <NavBar />

    <!-- Invoice Section -->
    <main class="main-content">
      <div class="invoice-section">
        <div class="invoice-header">
          <LogoPlaceholder @logo-uploaded="handleLogoUploaded" @logo-removed="handleLogoRemoved" />

          <h1>TAX INVOICE</h1>
          <div class="invoice-number">
            <label for="invoice-number">#</label>
            <input id="invoice-number" type="text" v-model="invoiceNumber"
              :class="{ 'input-error': errors.invoiceNumber }" @blur="validateField('invoiceNumber')" />
            <div v-if="errors.invoiceNumber" class="error-message">{{ errors.invoiceNumber }}</div>
          </div>
        </div>

        <div class="invoice-body">
          <div class="form-group">
            <label>Sender</label>
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
            <div class="TaxNO">
            <label>VAT or PAN No</label>
            <input type="text" placeholder="Enter customer's VAT or PAN no" v-model="TaxNO" :class="{ 'input-error': errors.TaxNO }"
                @blur="validateField('shipTo')" />
                
          </div>
          </div>

          <div class="form-group double">
            <div>
              <label>Date</label>
              <input type="date" v-model="date" :class="{ 'input-error': errors.date }" @blur="validateField('date')" />
              <div v-if="errors.date" class="error-message">{{ errors.date }}</div>
            </div>
            <div>
  <label> Enter Email(optional)</label>
  <input 
    type="email" 
    v-model="email" 
    :class="{ 'input-error': errors.email }"
    @blur="validateField('email')" 
  />
  <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
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
          
          <div class="terms">
            <label>Terms and conditions</label>
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
        <hr />
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
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

import axios from "axios";
import {addHeaderLogo, calculateTotals} from '@/../utills/pdfUtils';


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
      date: new Date().toISOString().split('T')[0],
      email: '',
      dueDate: "",
      TaxNO: "",
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
        email: '',
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
  } else if (field === "from" && !/^[a-zA-Z0-9\s&@#,-]+$/.test(this.from)) {
    this.errors.from = "Sender's name must be a valid string";
  } else if (field === "discount" && this.discount < 0) {
    this.errors.discount = "Discount cannot be negative";
  } else if (field === "taxRate" && this.taxRate < 0) {
    this.errors.taxRate = "Tax rate cannot be negative";
  } else if (field === "email") {
    if (this.email && !this.isValidEmail(this.email)) {
      this.errors.email = "Enter a valid email address";
    } else {
      this.errors.email = false; // No error if empty or valid email
    }
  } else {
    this.errors[field] = false;
  }
},

isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
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
    async downloadInvoice() {
      try {
        const pdfBlob = await this.generatePdf();
        if (pdfBlob) {
          const fileName = `Invoice-${this.invoiceNumber || 'draft'}.pdf`;
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = fileName;
          link.click();
          Swal.fire({
  icon: 'success',
  title: 'PDF Downloaded',
  text: 'PDF generated and downloaded successfully!',
});
        }
      } catch (error) {
        console.error('PDF Download Error:', error);
        Swal.fire({
  icon: 'error',
  title: 'Error',
  text: `Error downloading PDF: ${error.message}`,
});
      }
    },

    

    async sendEmail() {
      const accessToken = localStorage.getItem("refreshToken") || localStorage.getItem("accessToken");

      if (!accessToken) {
        //SweetAlert for unauthorized access
        Swal.fire({

          icon: 'error',
          title: 'Unauthorized',
          text: 'Please LogIn First',
        });
        return;
      }
        // ✅ Check if email is empty
  if (!this.email || this.email.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Email Required',
      text: 'Please enter an email address to send the invoice.',
    });
    return;
    
  }


      const formData = new FormData();
      formData.append("invoiceNumber", this.invoiceNumber);
      formData.append("from", this.from);
      formData.append("billTo", this.billTo);
      formData.append("shipTo", this.shipTo);
      formData.append("date", this.date);
      formData.append("email", this.email || "");
      formData.append("dueDate", this.dueDate);
      formData.append("TaxNO", this.TaxNO.trim()==="" ? "NA" : this.TaxNO);
      formData.append("terms", this.terms.trim()==="" ? "NA" : this.terms);
      formData.append("taxRate", this.taxRate);
      formData.append("discount", this.discount);
      formData.append("shipping", this.shipping);
      formData.append("amountPaid", this.amountPaid);
      formData.append("currency", this.currency);
      formData.append("total", this.total);
      formData.append("items", JSON.stringify(this.items));
      formData.append("balanceDue", this.balanceDue);
     

      try {
        const pdfBlob = await this.generatePdf();
        
        formData.append("invoicePdf", pdfBlob, "invoice.pdf");
        const response = await axios.post("https://smartinvoice.onrender.com/api/v1/sendInvoice", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`
          }
        });
        if (response.status == 200) {
          // SweetAlert for successful email sending
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Invoice sent successfully!',
          });
          
          this.clearForm();
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error.map(err => err.message).join(", ");
         // SweetAlert2 error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Invoice',
        text: errorMessage,
      });
        } else {
          // SweetAlert2 error alert
      Swal.fire({
        icon: 'error',
        title: 'Unknown Error',
        text: `An unknown error occurred: ${error.message}`,
      });
        }
      }
    },

    async generatePdf() {
      // Step 1: Perform validation checks and update errors object
      this.errors = {
        invoiceNumber: this.invoiceNumber === "" || !Number.isInteger(Number(this.invoiceNumber)) ? "Invoice Number must be an integer" : false,
        from: this.from === "" || !/^[a-zA-Z0-9\s,&@-]+$/.test(this.from) ? "Sender's name must be a valid string" : false,
        billTo: this.billTo === "" ? "Receiver's name is required" : false,
        date: this.date === "" ? "Date is required" : false,
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

        // SweetAlert2 warning alert
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please fill all required fields!',
    });
        return null; // Stop execution if validation fails
      }
      
      // Step 5: PDF generation if no errors
      try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        let yPosition = margin;

        // Add header logo
        addHeaderLogo(doc, this.logoData, 10, 10); // margin = 10, yPosition = 10

       // === Center: TAX INVOICE ===
doc.setFont('helvetica', 'bold');
doc.setFontSize(24);
doc.setTextColor(0, 0, 0);
doc.text('TAX INVOICE', pageWidth / 2, yPosition + 5, { align: 'center' });

        // setting font size and font type
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        // Invoice Details
        const invoiceY = yPosition + 1; // start close to TAX INVOICE line
const rightX = pageWidth - margin;

doc.setFontSize(10); // smaller than title

doc.text(`Invoice Number: ${this.invoiceNumber}`, rightX, invoiceY, { align: 'right' });
doc.text(`Bill Date: ${this.date}`, rightX, invoiceY + 8, { align: 'right' });
doc.text(`Due Date: ${this.dueDate}`, rightX, invoiceY + 16, { align: 'right' });
// Table Data (dynamically from your component props or data)
const fromData = this.from || 'N/A';
const billToData = this.billTo || 'N/A';
const shipToData = this.shipTo || 'N/A';
const taxNumber = this.TaxNO || 'N/A'; // New field


const leftMargin = 10;
const rightMargin = 10;
// ✅ Use the global `pageWidth` (do not re-declare!)
const tableWidth = pageWidth - leftMargin - rightMargin;
const tableStartX = leftMargin; // ✅ Rename to avoid conflict

const tableHead = [
  [
    { content: 'Sender', styles: { fontStyle: 'bold', fillColor: '#4078c0', textColor: '#ffffff' } },
    { content: 'Bill To', styles: { fontStyle: 'bold', fillColor: '#4078c0', textColor: '#ffffff' } },
    { content: 'Ship To', styles: { fontStyle: 'bold', fillColor: '#4078c0', textColor: '#ffffff' } },
    { content: 'Client VAT or PAN', styles: { fontStyle: 'bold', fillColor: '#4078c0', textColor: '#ffffff' } }
  ]
];

const tableBody = [
  [
    { content: fromData },
    { content: billToData },
    { content: shipToData },
    { content: taxNumber }
  ]
];

// jsPDF-AutoTable call
autoTable(doc, {
  startY: 60,
  margin: { left: tableStartX, right: rightMargin },
  tableWidth: tableWidth,
  head: tableHead,
  body: tableBody,
  styles: {
    halign: 'left',
    valign: 'top',
    fontSize: 10,
    cellPadding: 4,
    lineWidth: 0.1,
    lineColor: [0, 0, 0]
  },
  
});
     // Define table columns (including S.NO)
const columns = [
  { header: 'S.NO', dataKey: 'sno' },
  { header: 'Description', dataKey: 'description' },
  { header: 'Quantity', dataKey: 'quantity' },
  { header: 'Rate', dataKey: 'rate' },
  { header: 'Amount', dataKey: 'amount' },
];

// Prepare table rows with S.NO
const rows = this.items.map((item, index) => ({
  sno: index + 1,
  description: item.description || '',
  quantity: item.quantity || 0,
  rate: this.formattedAmount(item.rate || 0),
  amount: this.formattedAmount(item.amount || 0),
}));

// Create the table
autoTable(doc, {
  startY: 100, // Adjusted to avoid overlap with previous content
  
  head: [columns.map(col => col.header)],
  body: rows.map(row => columns.map(col => row[col.dataKey])),
  styles: {
    fontSize: 10,
    cellPadding: 3,
  },
  headStyles: {
    fillColor: [70, 78, 95],
    textColor: 255,
    fontStyle: 'bold',
  },
  alternateRowStyles: { fillColor: [240, 240, 240] },
  margin: { left: 10, right: 10 },
  theme: 'striped',
});

// 1. Calculate totals (this can be in utils if you'd like)
const { totalQuantity, totalAmount } = calculateTotals(this.items);

// 2. Define the summary as key-value pairs
const summaryData = [
  ['Total Qty', totalQuantity],
  ['Taxable Amount', this.formattedAmount(totalAmount)],
  ['Tax (%)', `${this.taxRate || 0}%`],
  ['Discount', this.formattedAmount(this.discount || 0)],
  ['Shipping', this.formattedAmount(this.shipping || 0)],
  ['Total', this.formattedAmount(this.total || 0)],
  ['Amount Paid', this.formattedAmount(this.amountPaid || 0)],
  ['Balance Due', this.formattedAmount(this.balanceDue || 0)],
];

// 3. Render the horizontal table (2 columns)
doc.autoTable({
  startY: doc.lastAutoTable.finalY + 10,
  head: [['Label', 'Value']],
  body: summaryData,
  styles: {
    halign: 'left',
    cellPadding: { left: 10, right: 10 },
    fontSize: 10,
    textColor: 20,
  },
  headStyles: {
    fillColor: [40, 60, 100],
    textColor: 255,
    halign: 'center',
  },
  columnStyles: {
    0: { cellWidth: 60 },  // Label column
    1: { cellWidth: 60 },  // Value column
  },
});


// Terms and Conditions Section
let summaryMarginLeft = 15; // default fallback
let summaryTableWidth = 160; // default fallback

if (doc.lastAutoTable && doc.lastAutoTable.table) {
  summaryMarginLeft = doc.lastAutoTable.settings.margin.left;
  summaryTableWidth = doc.lastAutoTable.table.width;
}

const summaryBottomY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 0;
if (this.terms) {
  const splitTerms = doc.splitTextToSize(this.terms, summaryTableWidth - 20);

  doc.autoTable({
    startY: summaryBottomY + 10,
    head: [['Terms & Conditions']],
    body: splitTerms.map(line => [line]),
    margin: { left: summaryMarginLeft },
    tableWidth: summaryTableWidth,
    styles: {
      fontSize: 10,
      textColor: 20,
      cellPadding: { left: 5, right: 5 },
    },
    headStyles: {
      fillColor: [40, 60, 100],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    bodyStyles: {
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: summaryTableWidth - 20 },
    },
  });
}
        // Footer Section
        const footerY = pageHeight - 20; // Fixed position at bottom
        doc.setFontSize(10);
        doc.text("Contact Us: Smart Invoice Company Ltd.", margin, footerY - 5);
        doc.setFontSize(9);
        doc.text("Phone: +977-123456789 | Email: smartinvoicepvtltd@gmail.com", margin, footerY + 3);
        doc.text("Location: Kathmandu, Nepal", margin, footerY + 11);
        doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10); // Footer line

        // Return the PDF as a Blob
        return doc.output('blob');

      } catch (error) {
        console.error('PDF Generation Error:', error);
        // SweetAlert2 error alert
    Swal.fire({
      icon: 'error',
      title: 'PDF Generation Error',
      text: `Error generating PDF: ${error.message}`,
    });
        return null;
      }
    },


    clearForm() {
      this.invoiceNumber = "";
      this.from = "";
      this.billTo = "";
      this.shipTo = "";
      this.date = "";
      this.email = "";
      this.dueDate = "";
      this.TaxNO = "";
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
