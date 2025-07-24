# 💸 CostEclipse

**Smart Personal & Event Expense Tracker**  
[🔗 GitHub Repository](https://github.com/Abhishek2063/CostEclipse.git)

CostEclipse is a full-stack web + desktop + PWA application designed to help individuals and teams efficiently track their income, expenses, savings, and event-related finances with powerful dashboards, insightful reports, and real-time notifications.

---

## 🚀 Tech Stack

### 🔧 Backend
- **Language**: Node.js
- **Framework**: Express.js
- **Database**:
  - PostgreSQL (relational)
  - Redis (in-memory/session caching)
- **Authentication**: JWT + Refresh Token
- **Real-time Notifications**: Firebase FCM (mobile), Socket.IO (web)

### 🌐 Frontend (Web & PWA)
- **Framework**: Next.js (SSR + SEO)
- **State Management**: Zustand / Redux Toolkit
- **UI Framework**: Tailwind CSS + ShadCN/UI
- **PWA**: Service Workers, Offline Caching

### 💻 Desktop App
- **Electron.js**: Package the Next.js app for desktop (Windows/macOS/Linux)

### 🔐 Security
- HTTPS
- Helmet
- CSRF Protection
- Rate Limiting
- Password Hashing (bcrypt)
- Sensitive Field Encryption (e.g., bank info)

---

## 📦 Core Modules

### 👤 Authentication
- Register / Login / Forgot & Reset Password
- Token Refresh
- Roles: user, admin, super_admin

### 🙍‍♂️ User Profile
- Profile Management
- Profile Picture Upload
- Occupation Type & Income/Saving Goals

### 💰 Income
- Add/Edit/Delete Income
- Filter by date, category, payment method

### 💸 Expense
- Track Expenses by Category
- Monthly Limits with Alerts
- CSV/PDF Export
- Recurring Support

### 🧾 Reports
- Income vs Expense Graphs
- Savings Overview
- Category Summaries
- Export (PDF/CSV)

### 🎉 Event Management
- Create Events (e.g., Trips)
- Add Participants
- Add Shared Expenses
- Auto Split & Track Balances
- Send Payment Reminders

### 📅 Budget & Planner
- Add Upcoming Events
- Allocate Budgets
- Reminders for Budget/Events

### 🔔 Notifications
- Real-Time Alerts via Web Push / FCM
- Weekly/Monthly Email Summaries

### 🧑‍💼 Admin Panel
- View Users & App Usage
- Manage Plans & Billing (Stripe/Razorpay)
- Analytics & Reports
- Send Alerts / Notifications

### 💳 Subscriptions (SaaS-ready)
- Free/Pro Plans
- Payment Gateway Integration
- Trial Management

---

## 📊 Dashboard Sections

| Section         | Description                            |
|----------------|----------------------------------------|
| Overview        | Net Worth, Monthly Summary             |
| Income Tracker  | Salary, Business, Other Incomes        |
| Expense Tracker | Daily/Monthly Expenses by Category     |
| Savings Goals   | Add & Track Savings Targets            |
| Event Manager   | Create, Track, Split, Settle Expenses  |
| Reports         | Download Visual & Tabular Reports      |
| Notifications   | Real-time + Email Updates              |
| Settings        | Profile, Password, Preferences         |

---

## ✅ Module Overview

### 1. **Authentication**
- **Access**: Public
- Fields: `name`, `email`, `password`, `role`, `phone`, `isVerified`, `createdAt`

### 2. **User Profile**
- **Access**: User
- Fields: `occupationType`, `monthlyIncome`, `monthlySavingGoal`, `dob`, `gender`, `country`

### 3. **Income**
- **Access**: User
- Fields: `source`, `amount`, `category`, `date`, `description`, `paymentMethod`

### 4. **Expense**
- **Access**: User
- Fields: `title`, `amount`, `category`, `date`, `paymentMethod`, `recurring`, `isPersonal`

### 5. **Event Management**
- **Access**: User
- Fields: Event (`ownerId`, `participants`, `totalBudget`)  
  Event Expense (`payerId`, `splitType`, `amountOwed`, `settled`)

### 6. **Reports**
- **Access**: User
- Filtered by `userId`, `date`, `type`

### 7. **Notifications**
- **Access**: User
- Fields: `type`, `message`, `title`, `isRead`, `createdAt`

### 8. **Admin / Super Admin**
- **Access**: Admin
- Fields: `totalExpenses`, `totalEvents`, `lastLogin`, `subscriptionStatus`

### 9. **Subscription / Billing**
- **Access**: User/Admin
- Fields: `plan`, `startDate`, `endDate`, `paymentMethod`, `status`

### 10. **Static Pages**
- **Access**: Public/Admin
- Pages: Home, About, Contact, FAQ

---

## 🔤 Name Ideas

| Category        | Suggestions                     |
|----------------|----------------------------------|
| Professional    | FinSight, Trackwise, Expensely  |
| Personal        | BudgetBuddy, Savr, PocketPilot  |
| Event Oriented  | SplitStack, FairFunds, Triply   |
| Fun & Modern    | Cashly, Walleto, BrokeToBoss    |
| Indian Flavor   | PaisaTrack, KharchaGuru, UdhariSettle |

---

## 🛠️ Setup Instructions (Coming Soon)
> Clone the repo and follow the setup guide.

```bash
git clone https://github.com/Abhishek2063/CostEclipse.git
cd CostEclipse
# Follow frontend/backend README setup guides

---

## 🙏 Contributions

Open to suggestions, issues, and pull requests.  
Let’s make **expense tracking smarter and social** together!

Feel free to:
- ⭐ Star the project
- 🐛 Report issues
- 📬 Suggest features
- 🔧 Submit pull requests

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

> Made with ❤️ by **Abhishek Garg**
