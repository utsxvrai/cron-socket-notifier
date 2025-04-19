const taskRepository = require('../repositories/task-Repository');

const taskController = {
  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskRepository.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ message: 'Server error while fetching tasks' });
    }
  },

  // Create a new task
  createTask: async (req, res) => {
    try {
      const { title } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: 'Task title is required' });
      }
      
      const task = await taskRepository.create({ title });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Server error while creating task' });
    }
  },

  // Get task by ID
  getTaskById: async (req, res) => {
    try {
      const task = await taskRepository.findById(req.params.id);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.status(200).json(task);
    } catch (error) {
      console.error('Error getting task by ID:', error);
      res.status(500).json({ message: 'Server error while fetching task' });
    }
  },

  // Update a task
  updateTask: async (req, res) => {
    try {
      const { title, completed } = req.body;
      const updatedTask = await taskRepository.updateById(req.params.id, { title, completed });
      
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Server error while updating task' });
    }
  },

  // Mark a task as complete
  completeTask: async (req, res) => {
    try {
      const task = await taskRepository.markAsComplete(req.params.id);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.status(200).json(task);
    } catch (error) {
      console.error('Error completing task:', error);
      res.status(500).json({ message: 'Server error while completing task' });
    }
  },

  // Delete a task
  deleteTask: async (req, res) => {
    try {
      const deleted = await taskRepository.deleteById(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Server error while deleting task' });
    }
  }
};

module.exports = taskController;
  
