import { startOfMonth, endOfMonth } from "date-fns";

export const getMonthRange = () => {
  const today = new Date();
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);

  return {
    startDate: startOfCurrentMonth,
    endDate: endOfCurrentMonth,
  };
};
