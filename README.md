# Cron-Socket-Notifier Services

The **Daily Task Notifier** is a Node.js-based web application that reminds users to complete daily tasks, such as solving a LeetCode problem. It uses cron jobs to check task completion status and sends real-time notifications via Socket.IO if tasks are incomplete. The app includes a simple web interface for task management and is deployed to Render with MongoDB Atlas for persistent storage.

## Features

- **Task Tracking**: Tracks daily tasks (e.g., LeetCode problem) with completion status.
- **Cron Jobs**: Resets tasks at midnight and checks for incomplete tasks at 10 PM.
- **Real-Time Notifications**: Sends notifications to connected clients via Socket.IO.
- **Web Interface**: Allows users to view tasks, mark them as complete, and receive notifications.
- **Production-Ready**: Uses MongoDB for persistence, Winston for logging, and environment variables for configuration.
- **Deployment**: Hosted on Render with a public URL.

## Tech Stack

- **Backend**: Node.js, Express, Socket.IO, node-cron, Mongoose (MongoDB)
- **Frontend**: HTML, JavaScript, Socket.IO client
- **Database**: MongoDB Atlas
- **Deployment**: Render (with Docker support)
- **Logging**: Winston
- **Configuration**: dotenv

## Project Structure

```
task-notifier/
├── public/
│   └── index.html        # Web interface
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── Dockerfile            # Docker configuration
├── index.js              # Main server logic
├── package.json          # Dependencies and scripts
├── error.log             # Error logs (generated)
└── combined.log          # General logs (generated)
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git
- Render account (for deployment)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/<your-username>/cron-socket-notifier.git
   cd cron-socket-notifier
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file in the root directory:

     ```env
     PORT=3000
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-notifier?retryWrites=true&w=majority
     CLIENT_URL=http://localhost:3000
     NODE_ENV=development
     ```

   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

   - Update `CLIENT_URL` to match your deployed URL (e.g., `https://your-app.onrender.com`) for production.

## MongoDB Atlas Setup

1. Sign up at MongoDB Atlas.
2. Create a free cluster.
3. Create a database named `task-notifier` with a collection named `tasks`.
4. Copy the connection string and update the `MONGODB_URI` in `.env`.
5. Whitelist your IP (or Render’s IP for deployment) in MongoDB Atlas network settings.

## Running Locally

1. **Start the Server**:

   ```bash
   npm start
   ```

2. **Access the App**:

   - Open `http://localhost:3000` in a browser.
   - View the "Solve Daily LeetCode Problem" task.
   - Click "Mark Complete" to simulate task completion.
   - Test notifications by waiting until 10 PM or temporarily changing cron schedules (e.g., `* * * * *` for every minute) in `index.js`.

## API Endpoints

- **POST /complete-task**

  - **Description**: Marks a task as complete.

  - **Request Body**:

    ```json
    {
      "taskId": "leetcode"
    }
    ```

  - **Response**:

    - Success: `200 { "status": "success", "message": "Task marked as complete" }`
    - Error: `404 { "status": "error", "message": "Task not found" }` or `500 { "status": "error", "message": "Server error" }`

## Socket.IO Events

- **Server Emits**:
  - `taskStatus`: Sends the current task list.
  - `notification`: Sends a notification for incomplete tasks.
- **Client Listens**:
  - Updates the UI with task status and displays notifications.

## Cron Jobs

- **Task Reset**: Runs at midnight (`0 0 * * *`) to reset tasks to incomplete.
- **Incomplete Task Check**: Runs at 10 PM (`0 22 * * *`) to notify about incomplete tasks.

## Deployment to Render

1. **Push to GitHub**:

   - Create a repository and push your code:

     ```bash
     git add .
     git commit -m "Initial commit"
     git push origin main
     ```

2. **Create a Render Web Service**:

   - Sign up at Render.
   - Click "New" &gt; "Web Service" and connect your GitHub repository.
   - Configure:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       - `PORT`: `3000`
       - `MONGODB_URI`: Your MongoDB Atlas connection string
       - `CLIENT_URL`: `https://your-app.onrender.com`
       - `NODE_ENV`: `production`
     - **Instance Type**: Free or Starter
   - Click "Create Web Service".

3. **Verify Deployment**:

   - Access the public URL (e.g., `https://your-app.onrender.com`).
   - Test task completion, notifications, and cron jobs.
   - Check Render logs for errors.

## Testing

- **Local Testing**:
  - Verify tasks load and can be marked complete.
  - Test notifications by modifying cron schedules.
- **Production Testing**:
  - Confirm task persistence in MongoDB Atlas.
  - Check logs for cron job execution (midnight and 10 PM).
  - Ensure notifications appear at 10 PM for incomplete tasks.

## Troubleshooting

- **Socket.IO Connection Issues**:
  - Ensure `CLIENT_URL` matches the deployed URL.
  - Check browser console for CORS errors.
- **Cron Jobs Not Running**:
  - Verify schedules in `index.js`.
  - Check Render logs for errors.
- **MongoDB Connection Errors**:
  - Confirm `MONGODB_URI` is correct.
  - Whitelist Render’s IP in MongoDB Atlas.
- **App Not Loading**:
  - Review Render build and deploy logs.
  - Ensure dependencies are installed.

## Limitations

- **LeetCode Integration**: Simulates task completion. Full integration requires LeetCode API access or a browser extension.
- **Single User**: Tracks tasks globally. User authentication is needed for per-user tasks.
- **Notifications**: Limited to browser (Socket.IO). Email or push notifications can be added.

## Future Enhancements

- Integrate LeetCode API for automatic task tracking.
- Add user authentication (e.g., Passport.js).
- Support email or push notifications (e.g., Nodemailer, Firebase).
- Use Redis for Socket.IO scalability.
- Integrate monitoring tools (e.g., New Relic).

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License.