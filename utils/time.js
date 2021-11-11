export const getTimeStamp = (date) => {
  if (date) {
    return new Date(date);
  }
  return new Date();
};

export default {
  getTimeStamp,
};
