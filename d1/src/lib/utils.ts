import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
  let monthDiff = currentDate.getMonth() - targetDate.getMonth();
  let dayDiff = currentDate.getDate() - targetDate.getDate();

  if (dayDiff < 0) {
    monthDiff--;
    dayDiff += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }

  let timeDifference = currentDate.getTime() - targetDate.getTime();
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const pluralize = (num: number, singular: string) =>
    `${num} ${singular}${num !== 1 ? 's' : ''}`;

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${pluralize(daysAgo, 'day')} ago)`;
  } else if (yearDiff > 0) {
    if (monthDiff > 0) {
      return `${fullDate} (${pluralize(yearDiff, 'year')} ${pluralize(monthDiff, 'month')} ago)`;
    } else {
      return `${fullDate} (${pluralize(yearDiff, 'year')} ago)`;
    }
  } else if (monthDiff > 0) {
    if (daysAgo >= 14) {
      const weeksAgo = Math.floor(daysAgo / 7);
      return `${fullDate} (${pluralize(monthDiff, 'month')} ${pluralize(weeksAgo, 'week')} ago)`;
    } else {
      return `${fullDate} (${pluralize(monthDiff, 'month')} ago)`;
    }
  } else {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${pluralize(weeksAgo, 'week')} ago)`;
  }
}