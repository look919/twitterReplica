export default (numOfTweets, loadedTweets) => {
  return loadedTweets
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, numOfTweets);
};
