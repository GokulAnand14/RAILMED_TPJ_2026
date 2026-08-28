/**
 * Generates Google Calendar web intent URLs for sessions and full conclave
 */
export function getGoogleCalendarUrl(session) {
  const isDay1 = session.day === 1;
  const dateStr = isDay1 ? "20260919" : "20260920";

  const formatTime = (timeStr) => {
    if (!timeStr) return "090000";
    const clean = timeStr.replace(/[^0-9:]/g, "");
    const parts = clean.split(":");
    const hours = parts[0].padStart(2, "0");
    const mins = parts[1] ? parts[1].padStart(2, "0") : "00";
    return `${hours}${mins}00`;
  };

  const startTime = formatTime(session.startTime);
  const endTime = formatTime(session.endTime || session.startTime);

  const startIso = `${dateStr}T${startTime}`;
  const endIso = `${dateStr}T${endTime}`;

  let speakerDetails = "";
  if (session.speaker) {
    speakerDetails = `Speaker: ${session.speaker.name} (${session.speaker.designation}, ${session.speaker.institution})\n`;
  }
  if (session.moderator) {
    speakerDetails += `Moderator: ${session.moderator.name} (${session.moderator.designation})\n`;
  }
  if (session.chairpersons && session.chairpersons.length > 0) {
    speakerDetails += `Chairpersons: ${session.chairpersons.map(c => `${c.name} (${c.designation})`).join(", ")}\n`;
  }

  const details = `${session.description || session.topic}\n\n${speakerDetails}\nEvent: RAILMED TPJ CME 2026\nVenue: ${session.location || "Cauvery Meeting Hall, DRM Office Campus, Divisional Railway Hospital, Golden Rock, Tiruchirappalli"}`;

  const title = `RAILMED 2026: ${session.topic}`;
  const location = session.location || "Cauvery Meeting Hall, Divisional Railway Hospital, Golden Rock, Tiruchirappalli";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&ctz=Asia/Kolkata&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

export function getFullConferenceGoogleCalendarUrl() {
  const title = "RAILMED TPJ CME 2026 - Southern Railway Annual Conclave";
  const startIso = "20260919T080000";
  const endIso = "20260920T170000";
  const details = "Annual Continuing Medical Education Conclave on Non-Communicable Diseases (Cancer, Diabetes, Hypertension, Cardiology) organized by Southern Railway Medical Department.\n\nAccredited by Tamil Nadu Medical Council (TNMC) with 4 Credit Hours.\nVenue: Cauvery Meeting Hall, DRM Campus, Golden Rock, Tiruchirappalli";
  const location = "Cauvery Meeting Hall, DRM Office Campus, Divisional Railway Hospital, Golden Rock, Tiruchirappalli";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&ctz=Asia/Kolkata&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

export function openGoogleCalendar(session) {
  const url = session ? getGoogleCalendarUrl(session) : getFullConferenceGoogleCalendarUrl();
  window.open(url, "_blank", "noopener,noreferrer");
}
