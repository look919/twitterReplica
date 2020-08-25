export default (users, message) => {
  return users
    .filter((user) => user.name.toLowerCase().includes(message.toLowerCase()))
    .slice(0, 7);
};
