export default (loggedAcc, users, amount) => {
  return users
    .filter(
      (user) =>
        user.followers.length > 5 &&
        !loggedAcc.following.includes(user._id) &&
        loggedAcc._id !== user._id
    )
    .slice(0, amount);
};
