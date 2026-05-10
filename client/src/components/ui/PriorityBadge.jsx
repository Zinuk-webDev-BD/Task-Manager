const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-red-500 text-white",
    mid: "bg-yellow-400 text-black",
    low: "bg-green-500 text-white",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[priority]}`}>
      {priority?.toUpperCase()}
    </span>
  );
};

export default PriorityBadge;