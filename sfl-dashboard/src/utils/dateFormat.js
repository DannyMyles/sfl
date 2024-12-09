import dayjs from "dayjs";

export const formatDate = (date) => {
  try {
    return dayjs(date).format("MM/DD/YYYY HH:mm:ss");
  } catch (e) {
    return "";
  }
};
