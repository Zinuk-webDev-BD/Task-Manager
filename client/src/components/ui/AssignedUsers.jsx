const AssignedUsers = ({ members }) => {
  if (!users || users.length === 0) {
    return <p className="text-xs text-gray-400">No users</p>;
  }

  return (
    <div className="flex -space-x-2">
      {members?.map((user) => (
        <div
          key={user._id}
          className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs border-2 border-white"
          title={user.fullName}
        >
          {user?.avatar ? (
                        <img src= {user.avatar} alt="members" />
                     ): (
                        user?.fullName?.charAt(0)
                     )}
        </div>
      ))}
    </div>
  );
};

export default AssignedUsers;