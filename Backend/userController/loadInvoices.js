const invoices = require("./../models/InvoiceModel");
const userModel = require("./../models/usermodels");
const jwt = require("jsonwebtoken");

const loadInvoices = async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(400).json({ message: "Please Log In First" });
  }

  const token = accessToken.split(" ")[1];

  try {
    let user = jwt.verify(token, process.env.SECRET);
    user = await userModel.findOne({ email: user.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const searchQuery = req.query.search || "";

    let query = { userId: user._id };

    if (searchQuery.trim() !== "") {
      query.$or = [
        { billTo: { $regex: searchQuery, $options: "i" } }, 
        { invoiceNumber: { $regex: searchQuery, $options: "i" } },
        { status: { $regex: searchQuery, $options: "i" } }
      ];
    }

    const loadedInvoices = await invoices.find(query);

    return res.status(200).json({ invoices: loadedInvoices });
  } catch (error) {
    console.error("Error loading invoices:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loadInvoices;
