import { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert dueDate to ISO string if provided, else null
    const isoDueDate = formData.dueDate
      ? new Date(`${formData.dueDate}T00:00:00Z`).toISOString()
      : null;

    const taskToSubmit = {
      ...formData,
      dueDate: isoDueDate,
    };

    if (onSubmit) {
      onSubmit(taskToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
        />
      </div>

      <div className="form-row">
        <div>
          <label>Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
      </div>

      <button type="submit">Save Task</button>
    </form>
  );
}
