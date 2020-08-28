export default (users, message) =>
  users
    .filter((user) => user.name.toLowerCase().includes(message.toLowerCase()))
    .slice(0, 7);
