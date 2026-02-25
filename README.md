# 🎓 Learning Management System (LMS) – Frontend

This is the **frontend application** for the **Learning Management System (LMS)**.  
It provides a user-friendly interface for **Super Admin**, **Admin**, **Instructors**, and **Students** to manage courses, lessons, enrollments, and payments.  
The frontend interacts seamlessly with the backend API to deliver a smooth and interactive learning experience.

---

## 🚀 Project Overview

The frontend is built with **Next.js 16**, offering a modern, performant, and SEO-friendly framework for server-side rendering and client-side interactivity.  
Users can register, login, browse courses, enroll, watch lessons, and track progress according to their roles.

Key highlights:

- **Dynamic role-based interface** for Super Admin, Admin, Instructor, and Student  
- **Secure JWT-based authentication**  
- **Responsive design** for desktop and mobile  
- **Real-time interaction** with backend API  

---

## 🔍 Features Overview

### 🔐 Authentication & User Roles
- Login, logout, and token refresh  
- Role-based routing and component rendering  
- Protected routes for Super Admin, Admin, Instructor, and Student  

### 👤 User Management
- Profile viewing and editing  
- Profile avatar upload  
- Super Admin/Admin user management interface  

### 📚 Course & Lesson Management
- Instructors can create, update, delete, and publish courses  
- Upload course thumbnails and lesson videos  
- View lessons by course  
- Students can view enrolled courses and lesson content  

### 📖 Enrollment & Payment
- Students can enroll in courses  
- Secure payment flow for course enrollment  
- Track lesson completion and course progress  

### 📊 Dashboard & Analytics
- **Super Admin Dashboard:** system-wide metrics and user stats  
- **Admin Dashboard:** manage categories, courses, and users  
- **Instructor Dashboard:** course performance, enrollments, and earnings  
- **Student Dashboard:** enrolled courses and progress  

---

## 🧰 Technology Stack

- **Next.js 16** – React framework for server-side rendering and routing  
- **TypeScript** – Strong typing for better code quality and maintainability  
- **Tailwind CSS** – Utility-first CSS framework for responsive styling  
- **ShadCN UI** – Accessible prebuilt component library  
- **JWT Authentication** – Secure login and session management  

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mustakim-rafid/Learning-management-system-frontend.git
cd Learning-management-system-frontend
```

### 2. Install dependencies
```
npm install
# or if using pnpm
pnpm install
# or bun
bun add
```

### 3. Create a .env file in the root directory:
```
NEXT_PUBLIC_BASE_API_URL=

# jwt secrets
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

### 4. Run the development server
```
npm run dev
# or
pnpm dev
# or
bun dev
```

### 5. Build for production
```
npm run build
npm start
```
---
## Thanks.




