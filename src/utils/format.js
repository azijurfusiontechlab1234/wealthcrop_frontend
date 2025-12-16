export const formatRupee = (num) =>
  "₹" + num.toLocaleString("en-IN");

export const formatPercent = (num) => num + "%";

export const formatAverage = (num) => num % 5;
