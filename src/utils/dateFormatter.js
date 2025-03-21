export const formattedDate = (date) => {
//       Create a new Date object from the input date
//   The input date can be a string (e.g., "2025-03-18") or a timestamp (e.g., 1647282920000)
    return new Date(date).toLocaleDateStrin
    g("en-US", {
        // Format the month as full name (e.g., "March")
      month: "long",
        // Format the day as a numeric value without leading zeros (e.g., "18")
      day: "numeric",
      // Format the year as a full numeric value (e.g., "2025")
      year: "numeric",
    })
  }