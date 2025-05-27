const StatusBadge = ({ status }) => {
  const statusColors = {
    Todo: 'bg-red-100 text-red-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Done: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;