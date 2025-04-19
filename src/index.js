require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes');
const SocketService = require('./services/socketService');
const CronService = require('./services/cronService');

// Set strictQuery to suppress deprecation warning
mongoose.set('strictQuery', false);

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Initialize services after database connection
    initializeServices();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Please check your MongoDB credentials and connection string');
    process.exit(1);
  });

// Initialize Socket.IO and Cron services
function initializeServices() {
  // Initialize Socket.IO service
  const socketService = new SocketService(io);
  
  // Initialize Cron service with Socket.IO instance
  const cronService = new CronService(io);
  cronService.initCronJobs();
  
  console.log('All services initialized');
}

// Routes
app.use('/api', apiRoutes);

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;