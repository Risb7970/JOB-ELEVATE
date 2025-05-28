# 🚀 JobElevate – Next-Gen Job Portal Platform

![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Tech](https://img.shields.io/badge/stack-React.js%20%2B%20Spring%20Boot-blueviolet)
![Status](https://img.shields.io/badge/status-active-success)

**JobElevate** is a modern, full-stack job portal built to connect Employers with Applicants. It simplifies the hiring journey and job search process through real-time communication, secure access, and an elegant user experience.

---

## 🔑 Key Features

### 👤 Applicant Panel
- 🔍 **Smart Job Search** – Filter by title, location, experience, mode (remote/on-site/hybrid).
- 📄 **Apply to Jobs** – Upload resume and submit details in one click.
- 🧾 **Profile Management** – Manage your skills, resume, and contact details.
- 🧭 **Track Application Status** – Know where you stand: `Saved`, `Applied`, `In Progress`, `Offered`.
- 🔔 **Live Notifications** – Get alerts when employers accept/reject applications.
- 🔐 **Secure Access** – JWT-based login, OTP-based password reset via email.

### 🧑‍💼 Employer Panel
- 📢 **Post Job Openings** – Publish rich job listings with detailed requirements.
- 🔎 **Find Candidates** – Filter applicants by skills and experience.
- 📋 **Manage Applications** – View applications and resume files from a single dashboard.
- 🗓️ **Schedule Interviews** – Coordinate interviews with selected applicants.
- ✅ ❌ **Accept/Reject Applications** – Manage application flow easily.
- 📧 **Email Candidates** – Send interview details and updates through email.

---

## 🛡️ Authentication & Security
- JWT-secured login and registration.
- OTP-enabled password reset via email.
- Role-based access control (RBAC) for Applicants and Employers.
- Secure email delivery using JavaMailSender.

---

## 🧰 Tech Stack

| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| Frontend    | React.js, Mantine UI, Tailwind CSS          |
| Backend     | Spring Boot                                 |
| Database    | MongoDB                                     |
| Security    | Spring Security + JWT                       |
| Email       | JavaMailSender                              |

---

## 🚀 Getting Started

### ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)
- [Java JDK 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [MongoDB](https://www.mongodb.com/) (local or Compass/Atlas)

---

## 🛠️ Run Locally

### ✅ Frontend (React)

```bash
# Navigate to frontend folder
cd JobPortal-frontend

# Install dependencies
npm install

# Start development server
npm start

---

### ✅ Backend (Spring Boot)

```bash
# Navigate to backend folder
cd JobPortal-backend

# If using Maven wrapper (Linux/macOS)
./mvnw spring-boot:run

# If using Maven wrapper (Windows)
mvnw spring-boot:run

# Or use global Maven
mvn spring-boot:run
---



🔗 Frontend will be running at: http://localhost:5173
🔗 Backend will be running at: http://localhost:8080
