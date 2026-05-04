const colors = {
  low: "bg-green-100 text-green-700",
  mid: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const PriorityBadge = ({ priority }) => {
  return (
    <span className={`px-2 py-1 text-xs rounded ${colors[priority]}`}>
      {priority?.toUpperCase()}
    </span>
  );
};

export default PriorityBadge;