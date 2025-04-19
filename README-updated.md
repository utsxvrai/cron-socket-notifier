# Cron-Socket-Notifier Services

A Node.js-based web application that reminds users to complete daily tasks using cron jobs and Socket.IO for real-time notifications.

## Features

- **Task Management**: Create, view, and complete daily tasks
- **Scheduled Reminders**: Cron jobs check for incomplete tasks at 10 PM and reset tasks at midnight
- **Real-time Notifications**: Socket.IO provides instant updates and notifications
- **MongoDB Integration**: Persistent storage of tasks
- **Modern UI**: Bootstrap 5 with responsive design

## Tech Stack

- **Backend**: Node.js, Express, Socket.IO, node-cron
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Real-time Communication**: Socket.IO

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (for database)
- npm or yarn

## MongoDB Setup

1. **Sign up for MongoDB Atlas**:

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Create a free account

2. **Create a Cluster**:

   - Choose the FREE tier
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Set Up Database Access**:

   - Go to "Database Access" in the sidebar
   - Create a new database user with a username and password
   - Set privileges to "Atlas admin"

4. **Configure Network Access**:

   - Go to "Network Access" in the sidebar
   - Click "Add IP Address"
   - Use "Allow Access from Anywhere" (0.0.0.0/0) for development

5. **Get Connection String**:
   - Go back to "Database" in the sidebar
   - Click "Connect"
   - Select "Connect your application"
   - Copy the connection string

## Installation

1. **Clone the repository**

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory:

   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-notifier?retryWrites=true&w=majority
   NODE_ENV=development
   ```

   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials

4. **Start the application**:

   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Open your browser and go to `http://localhost:3000`

## Project Structure

```
.
├── public/
│   └── index.html       # Frontend UI
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Express middlewares
│   ├── models/          # Mongoose models
│   ├── repositories/    # Data access layer
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
│   └── index.js         # Application entry point
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
└── package.json         # NPM dependencies
```

## Usage

- **Add a task**: Enter a task title and click "Add Task"
- **Complete a task**: Click "Mark Complete" on any pending task
- **Receive notifications**: At 10 PM, you'll receive notifications for incomplete tasks
- **Task reset**: All tasks are reset to "pending" at midnight

## Cron Jobs

- **Reset Tasks**: Runs at midnight (00:00) every day
- **Check Incomplete Tasks**: Runs at 10 PM (22:00) every day

## For Development

For testing the cron jobs without waiting for specific times, you can temporarily modify the cron schedules in `src/services/cronService.js`:

```javascript
// For testing - run every minute
cron.schedule("* * * * *", async () => {
  // job code
});
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
