import { useQuery } from '@apollo/client';
import { GET_TASK } from '../../graphql/queries';
import { useRouter } from 'next/router';
import Loading from '../../components/common/Loading';
import StatusBadge from '../../components/tasks/StatusBadge';
import Link from 'next/link';
import { format } from 'date-fns';

export default function TaskDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.task) return <p>Task not found</p>;

  const task = data.task;

  return (
    <div className="space-y-6">
      <Link href="/">
        <a className="text-blue-600 hover:underline">← Back to tasks</a>
      </Link>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <StatusBadge status={task.status} />
        </div>

        <div className="prose max-w-none mb-6">
          <p>{task.description || 'No description provided.'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Created At</p>
            <p>{format(new Date(task.createdAt), 'MMM dd, yyyy HH:mm')}</p>
          </div>
          <div>
            <p className="text-gray-500">Due Date</p>
            <p>{task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}