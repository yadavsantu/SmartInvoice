# Smart Invoice

**Smart Invoice** is a cloud-based invoicing solution built using the **MEVN stack** (MongoDB, Express.js, Vue.js, and Node.js). It simplifies the process of creating, managing, and tracking invoices for businesses and individuals. The application is designed with a user-friendly interface and cloud accessibility.

---

## Features

- **User Authentication**: Includes login and signup pages for user access control.
- **Dashboard**: A central page for managing all invoices.
- **Invoice Management**: Create, update, and manage invoices with itemized details.
- **Discounts and Shipping**: Easily add discounts and shipping charges to invoices.
- **Due Date Tracking**: Ensure timely payment tracking.
- **Customizable UI**: Built with Vue.js components for flexibility and responsiveness.
- **Cloud-Based**: Access your data anytime, anywhere.

---

## Project Structure
SmartInvoice/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── usermodel.js
│   ├── routes/
│   │   └── index.js
│   ├── usersControllers/
│   │   └── index.js
│   ├── util/
│   │   └── .env
│   ├── package.json
│   └── package-lock.json
│
├── node_modules/
│
├── vue-frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   └── smartLogo.jpg
│   │   ├── components/
│   │   │   ├── FooterComponent.vue
│   │   │   └── NavBar.vue
│   │   ├── pages/
│   │   │   ├── Dash_Board.vue
│   │   │   ├── LoginPage.vue
│   │   │   └── SignUp.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── router.js
│   ├── README.md
│   ├── package.json
│   ├── babel.config.js
│   ├── vue.config.js
│   └── jsconfig.json
│
└── README.md
---

## Prerequisites

- **Node.js** (v14+)
- **MongoDB** (for database)
- **NPM** or **Yarn**

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/SmartInvoice.git
   cd SmartInvoice 
2. Set Up Backend:
	•	Navigate to the backend folder:
   cd backend
  •	Install dependencies:
   npm install
   •	Install nodemon globally for automatic server restarts during development:
   npm install -g nodemon
   •	Configure the .env file in the util folder for database connection and other environment variables.
3.	Run the Backend with Nodemon:
	•	Start the backend server using nodemon for automatic restarts:   
  nodemon app.js
4.	Set Up Frontend:
	•	Navigate to the vue-frontend folder:
    cd ../vue-frontend
  •	Install dependencies:
    npm install
5.	Run the Frontend:
	•	Start the frontend development server:
   npm run serve
6.	Access the Application:
	•	Open your browser and navigate to:
  http://localhost:8080

## Contribution

We welcome contributions! To contribute:
	1.	Fork this repository.
	2.	Create a new branch for your feature/bug fix.
	3.	Commit your changes and push to your branch.
	4.	Submit a pull request.	
## License

This project is licensed under the MIT License. 
