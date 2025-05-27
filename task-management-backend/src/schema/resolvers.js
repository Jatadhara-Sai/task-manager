const Task = require('../models/Task');

const resolvers = {
  Query: {
    tasks: async (_, { status }) => {
      const query = status ? { status } : {};
      return await Task.find(query).sort({ createdAt: -1 });
    },
    task: async (_, { id }) => {
      return await Task.findById(id);
    },
  },
  Mutation: {
    addTask: async (_, { input }) => {
      const task = new Task({
        ...input,
        status: input.status || 'Todo',
      });
      return await task.save();
    },
    addTask: async (_, { input }) => {
  const task = new Task({
    ...input,
    status: input.status || 'Todo',
    dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
  });
  return await task.save();
},


    updateTaskStatus: async (_, { id, status }) => {
      return await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;