import Link from 'next/link';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';

const TaskCard = ({ task }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <Link
            href={`/task/${task.id}`}
            className="text-lg font-semibold hover:text-blue-600 transition-colors"
          >
            {task.title}
          </Link>
          <p className="text-gray-500 text-sm mt-1">
            console.log('TaskCard dueDate:', task.dueDate);

  Due:{' '}
  {task.dueDate && !isNaN(new Date(task.dueDate))
    ? format(new Date(task.dueDate), 'MMM dd, yyyy')
    : 'No due date'}
</p>

        </div>
        <StatusBadge status={task.status} />
      </div>
    </div>
  );
};

export default TaskCard;