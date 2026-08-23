/**
 * Generates and triggers download of an .ics iCalendar file for a conference session.
 */
export function downloadSessionICS(session) {
  const isDay1 = session.day === 1;
  const dateStr = isDay1 ? "20260919" : "20260920";

  // Parse start and end times
  const formatTime = (timeStr) => {
    if (!timeStr) return "090000";
    const clean = timeStr.replace(/[^0-9:]/g, "");
    const parts = clean.split(":");
    const hours = parts[0].padStart(2, "0");
    const mins = parts[1] ? parts[1].padStart(2, "0") : "00";
    return `${hours}${mins}00`;
  };

  const dtStart = `${dateStr}T${formatTime(session.startTime)}`;
  const dtEnd = `${dateStr}T${formatTime(session.endTime || session.startTime)}`;

  let speakerDetails = "";
  if (session.speaker) {
    speakerDetails = `Speaker: ${session.speaker.name} (${session.speaker.designation}, ${session.speaker.institution})\\n`;
  }
  if (session.moderator) {
    speakerDetails += `Moderator: ${session.moderator.name} (${session.moderator.designation})\\n`;
  }
  if (session.panelists && session.panelists.length > 0) {
    speakerDetails += `Panelists: ${session.panelists.map(p => `${p.name} (${p.designation})`).join(", ")}\\n`;
  }
  if (session.chairpersons && session.chairpersons.length > 0) {
    speakerDetails += `Chairpersons: ${session.chairpersons.map(c => `${c.name} (${c.designation})`).join(", ")}\\n`;
  }

  const description = `${session.description || session.topic}\\n\\n${speakerDetails}\\nEvent: RAILMED TPJ CME 2026\\nVenue: ${session.location || "Railway Hospital Auditorium, Golden Rock / TPJ"}`;
  
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RAILMED TPJ CME 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:railmed-2026-${session.id}@railmedtpj.org`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:RAILMED 2026: ${session.topic.replace(/"/g, "'")}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${session.location || "Railway Hospital Auditorium, Golden Rock, Tiruchirappalli"}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `RAILMED_2026_${session.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download full 2-day conference calendar package (.ics)
 */
export function downloadFullConferenceICS() {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RAILMED TPJ CME 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:railmed-2026-full-day1@railmedtpj.org",
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    "DTSTART:20260919T080000",
    "DTEND:20260919T180000",
    "SUMMARY:RAILMED TPJ CME 2026 - Day 1",
    "DESCRIPTION:Day 1 of RAILMED TPJ CME 2026 - Dr Sai Dhandapani Oration, Immunotherapy in Malignancy, Cancer Management Panel, OSA Surgery, Cardiology & Industry Symposia.",
    "LOCATION:Divisional Railway Hospital Auditorium, Golden Rock (GOC), Tiruchirappalli",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "UID:railmed-2026-full-day2@railmedtpj.org",
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    "DTSTART:20260920T090000",
    "DTEND:20260920T170000",
    "SUMMARY:RAILMED TPJ CME 2026 - Day 2",
    "DESCRIPTION:Day 2 of RAILMED TPJ CME 2026 - Dr Rahulan Oration, Elevated Blood Pressure, Metabolic Renaissance, Insulin masterclass, Future Frontiers in Diabetes, OSA CPAP & Complications Panel.",
    "LOCATION:Divisional Railway Hospital Auditorium, Golden Rock (GOC), Tiruchirappalli",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "RAILMED_TPJ_CME_2026_Full_Schedule.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
