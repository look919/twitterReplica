export default (loggedAcc, users) => {
  return users
    .filter(
      (user) =>
        user.following.length > 5 && !loggedAcc.followers.includes(user._id)
    )
    .slice(0, 3);
};
