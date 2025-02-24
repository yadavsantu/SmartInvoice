const mongoose = require('mongoose');
const invoices = require('../models/InvoiceModel');  

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected');
        return invoices.syncIndexes();  
    })
    .then(() => console.log('Indexes synchronized'))
    .catch(err => console.error('Error:', err));
