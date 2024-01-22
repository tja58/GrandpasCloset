export const timer = async (time) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};
