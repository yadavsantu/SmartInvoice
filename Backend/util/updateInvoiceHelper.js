const mongoose = require("mongoose");

const updateInvoiceHelper = (req, res,next) => {
  const { invoiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
    console.log("Invalid Object ID");
    return res.status(400).json({ message: "Invalid id" });
  }

  next()

};

module.exports = updateInvoiceHelper;
