# Smart Invoice

**Smart Invoice** is a cloud-based invoicing solution built using the **MEVN stack** (MongoDB, Express.js, Vue.js, and Node.js). It simplifies the process of creating, managing, and tracking invoices for businesses and individuals. The application is designed with a user-friendly interface and cloud accessibility.

---

## Features
- **User Authentication**: Login and signup pages for user access control.
- **Dashboard**: A central page for managing all invoices.
- **Invoice Management**: Create, update, and manage invoices with itemized details.
- **Discounts and Shipping**: Easily add discounts and shipping charges to invoices.
- **Due Date Tracking**: Ensure timely payment tracking.
- **Customizable UI**: Built with Vue.js components for flexibility and responsiveness.
- **Cloud-Based**: Access your data anytime, anywhere.

---

## Project Structure

```plaintext
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
```
## Prerequisites
	•	Node.js (v14+)
	•	MongoDB (for database)
	•	NPM or Yarn
## Installation and Setup
 1.	Clone the Repository:
    ```bash
    git clone https://github.com/your-username/SmartInvoice.git
    cd SmartInvoice
2.	Set Up Backend:
	•	Navigate to the backend folder:
       ```bash
         cd backend
       ```
    •	Install dependencies:
  	 ```bash
          npm instal
    
   •	Install nodemon globally for automatic server restarts during development:
```bash
npm install -g nodemon
```        
•	Configure the .env file in the util folder for database connection and other environment variables.
3.	Run the Backend with Nodemon:
    •	Start the backend server:
```bash
          nodemon app.js
```
4.	Set Up Frontend:
    •	Navigate to the vue-frontend folder:
```bash
   cd ../vue-frontend
```
   •	Install dependencies:
```bash
npm install
```
5.	Run the Frontend:
    •	Start the frontend development server:
```bash
npm run serve
 ```
6.	Access the Application:
    •	Open your browser and navigate to:
  	  https://smartinvoice.onrender.com
## Contribution

We welcome contributions! To contribute:
	1.	Fork this repository.
	2.	Create a new branch for your feature or bug fix:
```bash
          git checkout -b feature-name
```
 3. Commit your changes and push to your branch:
```bash
git add .
git commit -m "Description of your changes"
git push origin feature-name
```
   4.	Submit a pull request.
## License
   This project is licensed under the MIT License.
  	
    
