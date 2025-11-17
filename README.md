# Quick Expense Tracker

A smart expense tracking application with a natural language chat interface powered by ChatGPT. Simply type your expenses in natural language (e.g., "spend food 50 from credit card") and the AI will automatically categorize and log them.

## Features

- 💬 **Natural Language Processing**: Chat with AI to log expenses naturally
- 🗄️ **MongoDB Database**: Persistent storage for all your expenses
- 📊 **Analytics Dashboard**: Comprehensive dashboard with charts and insights
- 📈 **Multiple Chart Types**: Bar charts, pie charts, and line graphs using Chart.js
- 🔍 **Advanced Filtering**: Today, Yesterday, Last 7 Days, Last Month, This Month, India FY, This Year, Custom Date
- 🏷️ **Comprehensive Categories**: Organized expense categories with unique IDs including:
  - Food & Dining
  - Home & Living
  - Health & Wellness
  - Baby Care
  - Transportation
  - Investments
  - Lifestyle
  - Debt & Loans
  - Professional
  - And more!
- 💳 **Multiple Payment Methods**: Track expenses across Credit Card, Debit Card, Cash, UPI, Net Banking, and Wallet
- ⏰ **Timestamp Tracking**: Every expense is logged with precise timestamp
- 🆔 **Category IDs**: Each expense category has a unique identifier for better organization
- 📊 **Real-time Tracking**: View your total expenses and recent transactions
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations

## Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- OpenAI API (ChatGPT)
- MongoDB with Mongoose

### Frontend
- React
- TypeScript
- SCSS
- Vite
- Axios

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API Key
- MongoDB Database (MongoDB Atlas or local instance)

## Installation

1. **Clone the repository**
   ```bash
   cd quick-expense-tool
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cd ../server
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your credentials:
   ```
   PORT=5000
   OPENAI_API_KEY=your_actual_openai_api_key_here
   DBURL=your_mongodb_connection_string_here
   ```

## Running the Application

### Option 1: Run both client and server together (from root)
```bash
npm run dev
```

### Option 2: Run separately

**Terminal 1 - Start the backend server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start the frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Pages

### Chat Interface (`/`)
- Natural language expense logging
- Real-time expense tracking
- View recent expenses
- Total expenses display

### Dashboard (`/dashboard`)
- **Total Till Now**: All-time expense total
- **Summary Cards**: Total, Average, Transaction count
- **Expenses by Category**: Bar chart visualization
- **Category Distribution**: Pie chart breakdown
- **Monthly Trend**: Line graph showing 12-month pattern
- **Category Breakdown**: Detailed list with transaction counts
- **Date Filters**:
  - Today
  - Yesterday
  - Last 7 Days
  - Last Month
  - This Month
  - India FY (April 1 - March 31)
  - This Year
  - Custom Date Range

## Usage Examples

Simply type your expenses in the chat interface:

- "spend food 50 from credit card"
- "bought groceries 200 cash"
- "paid electricity bill 1500 upi"
- "petrol 500 debit card"
- "baby toys 800 from credit card"
- "gym membership 2000 net banking"

The AI will automatically:
1. Extract the amount
2. Categorize the expense
3. Identify the payment method
4. Generate a unique category ID
5. Add timestamp
6. Log it to your MongoDB database

## Project Structure

```
quick-expense-tool/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript types
│   │   └── index.ts       # Server entry point
│   ├── package.json
│   └── tsconfig.json
└── package.json           # Root package.json
```

## Building for Production

### Build backend
```bash
cd server
npm run build
```

### Build frontend
```bash
cd client
npm run build
```

### Start production server
```bash
cd server
npm start
```

## API Endpoints

### Expenses
- `GET /api/health` - Health check
- `GET /api/categories` - Get all expense categories
- `POST /api/parse-expense` - Parse natural language expense
- `POST /api/expenses` - Create a new expense
- `GET /api/expenses` - Get all expenses

### Analytics
- `GET /api/analytics/summary` - Get summary statistics (total, average, count)
- `GET /api/analytics/by-category` - Get expenses grouped by category
- `GET /api/analytics/by-month` - Get monthly expense breakdown
- `GET /api/analytics/total` - Get all-time total expenses

## Future Enhancements

- [ ] User authentication
- [ ] Expense analytics and charts ✅ **COMPLETED**
- [ ] Export to CSV/Excel
- [ ] Budget tracking and alerts
- [ ] Multi-currency support
- [ ] Receipt photo upload
- [ ] Recurring expense tracking
- [ ] Filter expenses by date range, category, or payment method ✅ **COMPLETED**
- [ ] Monthly/yearly expense reports ✅ **COMPLETED**
- [ ] Spending predictions using ML
- [ ] Budget vs. Actual comparison

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
