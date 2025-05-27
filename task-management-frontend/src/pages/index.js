import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries';
import { ADD_TASK, UPDATE_TASK_STATUS } from '../graphql/mutations';
import TaskForm from '../components/tasks/TaskForm';

export default function TaskListPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: { status: statusFilter },
  });

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    onCompleted: () => refetch(),
  });

  const [addTask] = useMutation(ADD_TASK, {
    onCompleted: () => {
      setShowForm(false);
      refetch();
    },
  });

  const handleAddTask = (taskData) => {
    addTask({ variables: { input: taskData } });
  };

  const isValidDate = (dateStr) => {
    const d = new Date(dateStr);
    return d instanceof Date && !isNaN(d);
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>

      <div className="flex justify-between mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">All Tasks</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      )}

      <div className="space-y-4">
        {data?.tasks?.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">{task.title}</h3>
                <p className="text-gray-500 text-sm">
                  Status: {task.status} | Due:{" "}
                  {isValidDate(task.dueDate)
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "Invalid or missing date"}
                </p>
              </div>
              <select
                value={task.status}
                onChange={(e) =>
                  updateTaskStatus({
                    variables: { id: task.id, status: e.target.value },
                  })
                }
                className={`px-2 py-1 rounded text-sm ${
                  task.status === "Todo"
                    ? "bg-red-100 text-red-800"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
