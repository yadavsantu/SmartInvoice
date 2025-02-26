<template>
    <div class="guide-page-container">
        <!-- Navbar -->
        <NavBar />

        <!-- Guide Content -->
        <main class="main-content">
            <!-- Header Section -->
            <header class="guide-header">
                <h1>Invoice Guide</h1>
                <p>Learn how to use our Smart Invoice effectively.</p>
            </header>

            <!-- Invoice Fields Description Section -->
            <section class="fields-description-section">
                <h2>Invoice Fields Description</h2>
                <br>
                <ul>
                    <li>
                        <h3>Invoice Number</h3>
                        <p>Enter a unique invoice number for each invoice. This helps in tracking and referencing invoices easily.</p>
                    </li>
                    <li>
                        <h3>Add Your Logo</h3>
                        <p>Upload your company's logo here. Please upload a valid image file (JPEG, PNG, GIF, or SVG). File size should not exceed 2MB.</p>
                    </li>
                    <li>
                        <h3>From</h3>
                        <p>Specify the name and address of the sender (your business or personal information).</p>
                    </li>
                    <li>
                        <h3>Bill To</h3>
                        <p>Enter the name and address of the recipient (your client or customer).</p>
                    </li>
                    <li>
                        <h3>Ship To</h3>
                        <p>Specify the shipping address if it is different from the billing address.</p>
                    </li>
                    <li>
                        <h3>Date</h3>
                        <p>Enter the date when the invoice is created. This field takes input as the present date if not filled manually.</p>
                    </li>
                    <li>
                        <h3>Email</h3>
                        <p>Provide the recipient's email address to send the invoice electronically. If you are downloading pdf of invoice without <strong>Log In</strong>, then no need to fill this field.</p>
                    </li>
                    <li>
                        <h3>Due Date</h3>
                        <p>Specify the payment due date. This helps in ensuring timely payments.</p>
                    </li>
                    <li>
                        <h3>Notes</h3>
                        <p>Add any additional notes or comments for the recipient.</p>
                    </li>
                    <li>
                        <h3>Terms</h3>
                        <p>Specify the terms and conditions of the invoice, such as payment terms, late fees, etc.</p>
                    </li>
                    <li>
                        <h3>Tax Rate</h3>
                        <p>Enter the applicable tax rate for the invoice. Please enter the percentage of tax.</p>
                    </li>
                    <li>
                        <h3>Discount</h3>
                        <p>Specify any discount applicable to the invoice. Please enter the discount in amount not in %.</p>
                    </li>
                    <li>
                        <h3>Shipping</h3>
                        <p>Enter the shipping cost, if applicable.</p>
                    </li>
                    <li>
                        <h3>Amount Paid</h3>
                        <p>Enter the amount that has already been paid towards the invoice.</p>
                    </li>
                    <li>
                        <h3>Items</h3>
                        <p>List the items or services being billed. Include description, quantity and rate. The amount for each item is calculated automatically.</p>
                    </li>
                </ul>
            </section>
        </main>
        <br>

        <!-- Footer -->
        <FooterComponent />
    </div>
</template>

<script>
import NavBar from "../components/navBar.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
    name: "InvoiceGuide",
    components: {
        NavBar,
        FooterComponent,
    },
};
</script>

<style scoped>
/* General Styles */
.guide-page-container {
    font-family: "Arial", sans-serif;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px;
    background: #6474BC;
}

.main-content {
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Header Section */
.guide-header {
    text-align: center;
    margin-bottom: 30px;
}
.guide-header h1 {
    font-size: 2.5rem;
    color: #0056b3;
}
.guide-header p {
    font-size: 1.2rem;
    color: #666;
}

/* Section Titles */
.fields-description-section h2 {
    font-size: 1.8rem;
    color: #0056b3;
    margin-bottom: 20px;
}

/* Fields Description Styles */
.fields-description-section ul {
    list-style-type: none;
    padding: 0;
}
.fields-description-section li {
    margin-bottom: 20px;
}
.fields-description-section h3 {
    font-size: 1.3rem;
    color: #333;
}
.fields-description-section p {
    font-size: 1rem;
    color: #666;
}

/* Responsive Design */
@media (max-width: 600px) {
    .guide-header h1 {
        font-size: 1.8rem;
    }
}
</style>