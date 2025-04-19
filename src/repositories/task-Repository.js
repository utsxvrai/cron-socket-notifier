const Task = require('../models/task');

class TaskRepository {
  async create(taskData) {
    try {
      const task = new Task(taskData);
      return await task.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await Task.find({});
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await Task.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, taskData) {
    try {
      return await Task.findByIdAndUpdate(id, taskData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async markAsComplete(id) {
    try {
      return await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      return await Task.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async resetAllTasks() {
    try {
      return await Task.updateMany({}, { completed: false, resetDate: Date.now() });
    } catch (error) {
      throw error;
    }
  }

  async findIncompleteTasks() {
    try {
      return await Task.find({ completed: false });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TaskRepository(); 