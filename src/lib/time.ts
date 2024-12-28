export function getCurrent24Time() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function parseFrom12Hour(time12: string) {
  const [time, mode] = time12.split(" ");
  if (!time || !mode) return "THIS SHOULD NEVER HAPPEN";

  const [hour, minute] = time.split(":");
  if (!hour || !minute) return "THIS SHOULD NEVER HAPPEN";

  return mode === "am"
    ? `${hour}:${minute}`
    : `${String(Number(hour) + 12).padStart(2, "0")}:${minute}`;
}

export function parseFrom24Hour(time24: string) {
  const [hour, minute] = time24.split(":");
  if (!hour || !minute) return "THIS SHOULD NEVER HAPPEN";

  const mode = Number(hour) > 12 ? "pm" : "am";

  return mode === "am"
    ? `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} am`
    : `${String(Number(hour) - 12).padStart(2, "0")}:${minute.padStart(2, "0")} pm`;
}
