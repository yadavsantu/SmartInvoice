const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Invoices = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userscollections", required: true },
  invoiceNumber: { type: String, required: true },
  from: { type: String, required: true },
  billTo: { type: String, required: true },
  shipTo: { type: String, required: true },
  date: { type: Date, required: true },
  paymentTerms: { type: String, required: true },
  dueDate: { type: Date, required: true },
  notes: { type: String, default: "None" },
  terms: { type: String, default: "None" },
  taxRate: { type: String, required: true },
  discount: { type: String, required: true },
  shipping: { type: String, required: true },
  amountPaid: { type: String, required: true },
  currency: { type: String, required: true },
  total: { type: String, required: true },
  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      rate: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  balanceDue: { type: String, required: true },
  status:{type:String, default:"Unpaid"},
  logo: { type: Schema.Types.Mixed, required: true },
});

Invoices.index({ userId: 1, invoiceNumber: 1 }, { unique: true });


const invoices = mongoose.model("Invoice", Invoices);

module.exports = invoices;
