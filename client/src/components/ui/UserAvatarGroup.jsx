const UserAvatarGroup = ({ members }) => {
  console.log("members", members);

  return (
    <div className="flex -space-x-2 border-t border-t-gray-300 pt-2">
      {members?.map((user, i) => (
        <div
          key={user._id}
          className="w-8 h-8 rounded-full text-blue-600 bg-gray-300 border-2 border-white flex items-center justify-center font-bold"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="members" />
          ) : (
            user?.fullName?.charAt(0)
          )}
        </div>
      ))}
    </div>
  );
};

export default UserAvatarGroup;