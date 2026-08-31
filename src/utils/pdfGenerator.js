import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { day1Schedule, day2Schedule } from "../data/scheduleData";
import { dignitariesData } from "../data/dignitariesData";
import { getTimetableUrl } from "./qrCode";

/**
 * Generates and downloads the Official 2-Day Scientific Timetable PDF
 */
export const downloadTimetablePDF = async (selectedDay = "all") => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryNavy = [4, 14, 36];
    const goldAccent = [212, 175, 55];
    const lightBg = [250, 248, 242];
    const timetableUrl = getTimetableUrl();

    // --- COVER / HEADER ---
    doc.setFillColor(...primaryNavy);
    doc.rect(0, 0, 210, 36, "F");

    // Gold decorative top line
    doc.setFillColor(...goldAccent);
    doc.rect(0, 36, 210, 1.5, "F");

    // Header Text
    doc.setTextColor(255, 215, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SOUTHERN RAILWAY • TIRUCHCHIRAPPALLI DIVISION MEDICAL DEPARTMENT", 105, 10, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("RAILMED TPJ CME 2026", 105, 19, { align: "center" });

    doc.setTextColor(220, 225, 235);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Official 2-Day Scientific Schedule & Programme Guide • TNMC 4 Credit Hours", 105, 26, { align: "center" });

    doc.setFontSize(7.5);
    doc.setTextColor(200, 205, 215);
    doc.text("19th & 20th September 2026 • Cauvery Meeting Hall, DRM Campus, TPJ", 105, 31, { align: "center" });

    let currentY = 44;

    // Helper to format table rows
    const formatScheduleRows = (scheduleList) => {
      return scheduleList.map((s) => {
        let faculty = "—";
        if (s.speaker && s.speaker.name) {
          faculty = `${s.speaker.name}${s.speaker.designation ? ` (${s.speaker.designation})` : ""}`;
        } else if (s.moderator && s.moderator.name) {
          faculty = `Mod: ${s.moderator.name}`;
        } else if (s.sponsor) {
          faculty = `Sponsored by ${s.sponsor}`;
        }

        return [
          s.slNo || "—",
          s.timeDisplay || `${s.startTime} - ${s.endTime}`,
          s.topic || "—",
          faculty
        ];
      });
    };

    // --- DAY 1 SCHEDULE ---
    if (selectedDay === "all" || selectedDay === "day1") {
      doc.setFillColor(245, 238, 220);
      doc.roundedRect(14, currentY - 4, 182, 7, 1, 1, "F");
      doc.setTextColor(140, 90, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("DAY 1: SATURDAY, 19TH SEPTEMBER 2026", 18, currentY + 1);

      const day1Rows = formatScheduleRows(day1Schedule);

      autoTable(doc, {
        startY: currentY + 5,
        head: [["#", "Time", "Session / Topic", "Faculty / Speaker"]],
        body: day1Rows,
        theme: "grid",
        headStyles: {
          fillColor: primaryNavy,
          textColor: [255, 215, 0],
          fontSize: 8,
          fontStyle: "bold",
          halign: "left"
        },
        bodyStyles: {
          fontSize: 7.5,
          textColor: [30, 30, 30],
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 8, halign: "center" },
          1: { cellWidth: 28, fontStyle: "bold", textColor: [150, 90, 0] },
          2: { cellWidth: 82 },
          3: { cellWidth: 64 }
        },
        alternateRowStyles: {
          fillColor: lightBg
        },
        margin: { left: 14, right: 14 }
      });

      currentY = doc.lastAutoTable.finalY + 10;
    }

    // --- DAY 2 SCHEDULE ---
    if (selectedDay === "all" || selectedDay === "day2") {
      if (selectedDay === "all" && currentY > 220) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(245, 238, 220);
      doc.roundedRect(14, currentY - 4, 182, 7, 1, 1, "F");
      doc.setTextColor(140, 90, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("DAY 2: SUNDAY, 20TH SEPTEMBER 2026", 18, currentY + 1);

      const day2Rows = formatScheduleRows(day2Schedule);

      autoTable(doc, {
        startY: currentY + 5,
        head: [["#", "Time", "Session / Topic", "Faculty / Speaker"]],
        body: day2Rows,
        theme: "grid",
        headStyles: {
          fillColor: primaryNavy,
          textColor: [255, 215, 0],
          fontSize: 8,
          fontStyle: "bold",
          halign: "left"
        },
        bodyStyles: {
          fontSize: 7.5,
          textColor: [30, 30, 30],
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 8, halign: "center" },
          1: { cellWidth: 28, fontStyle: "bold", textColor: [150, 90, 0] },
          2: { cellWidth: 82 },
          3: { cellWidth: 64 }
        },
        alternateRowStyles: {
          fillColor: lightBg
        },
        margin: { left: 14, right: 14 }
      });

      currentY = doc.lastAutoTable.finalY + 10;
    }

    // --- EMBED QR CODE ON LAST PAGE ---
    try {
      const qrDataUrl = await QRCode.toDataURL(timetableUrl, {
        width: 160,
        margin: 1,
        color: { dark: "#040e24", light: "#ffffff" }
      });
      if (qrDataUrl) {
        if (currentY > 245) {
          doc.addPage();
          currentY = 20;
        }
        doc.setFillColor(254, 250, 238);
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(0.4);
        doc.roundedRect(14, currentY, 182, 26, 2, 2, "FD");

        doc.addImage(qrDataUrl, "PNG", 18, currentY + 2, 22, 22);

        doc.setTextColor(140, 90, 10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text("SCAN QR CODE FOR REAL-TIME MOBILE TIMETABLE", 45, currentY + 8);

        doc.setTextColor(60, 60, 60);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.text("Open timetable on any smartphone camera • Real-time session tracker & Google Calendar sync", 45, currentY + 14);

        doc.setFontSize(7);
        doc.setTextColor(120, 120, 120);
        doc.text(`Direct Web URL: ${timetableUrl}`, 45, currentY + 20);
      }
    } catch (e) {
      console.warn("Could not append QR code to timetable PDF:", e);
    }

    // --- FOOTER NOTE ON ALL PAGES ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 287, 210, 10, "F");
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.text("RAILMED TPJ CME 2026 • Southern Railway Medical Department • TNMC 4 Credit Hours", 14, 293);
      doc.text(`Page ${i} of ${pageCount}`, 196, 293, { align: "right" });
    }

    doc.save(`RAILMED_TPJ_2026_Scientific_Schedule.pdf`);
    return true;
  } catch (err) {
    console.error("Error generating timetable PDF:", err);
    window.print();
    return false;
  }
};

/**
 * Generates and downloads the Official Executive Conclave Invitation PDF with Embedded Timetable QR Code
 */
export const downloadInvitationPDF = async () => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryNavy = [4, 14, 36];
    const goldAccent = [212, 175, 55];
    const { chiefGuest, guestsOfHonour, accreditation } = dignitariesData;
    const timetableUrl = getTimetableUrl();

    // Outer Navy Border
    doc.setDrawColor(...goldAccent);
    doc.setLineWidth(1.5);
    doc.rect(8, 8, 194, 281);

    // Inner Gold Border
    doc.setDrawColor(180, 140, 30);
    doc.setLineWidth(0.5);
    doc.rect(11, 11, 188, 275);

    // Header Background Banner
    doc.setFillColor(...primaryNavy);
    doc.rect(11.5, 11.5, 187, 44, "F");

    // Header Emblems & Typography
    doc.setTextColor(255, 215, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SOUTHERN RAILWAY", 105, 20, { align: "center" });

    doc.setFontSize(7.5);
    doc.setTextColor(220, 225, 235);
    doc.text("TIRUCHCHIRAPPALLI DIVISION MEDICAL DEPARTMENT", 105, 26, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("RAILMED TPJ CME 2026", 105, 36, { align: "center" });

    doc.setFontSize(8);
    doc.setTextColor(255, 215, 0);
    doc.text("ANNUAL CONTINUING MEDICAL EDUCATION CONCLAVE", 105, 43, { align: "center" });

    doc.setFontSize(7.5);
    doc.setTextColor(200, 210, 225);
    doc.text("Covering Modern Updates on Non-Communicable Diseases (Cancer, Diabetes & Hypertension)", 105, 49, { align: "center" });

    // Cordial Invitation Text
    let y = 64;
    doc.setTextColor(50, 50, 50);
    doc.setFont("times", "italic");
    doc.setFontSize(10.5);
    doc.text("The Organising Committee cordially invites your esteemed presence to the Inauguration of", 105, y, { align: "center" });

    y += 7;
    doc.setTextColor(...primaryNavy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("RAILMED TPJ CME 2026", 105, y, { align: "center" });

    y += 8;
    // Chief Guest Spotlight Box
    doc.setFillColor(254, 250, 238);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);
    doc.roundedRect(18, y, 174, 34, 3, 3, "FD");

    doc.setTextColor(180, 110, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("CHIEF GUEST FOR INAUGURAL ADDRESS", 105, y + 6, { align: "center" });

    doc.setTextColor(...primaryNavy);
    doc.setFontSize(13);
    doc.text(chiefGuest.name, 105, y + 15, { align: "center" });

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text(`${chiefGuest.designation}, ${chiefGuest.institution}`, 105, y + 22, { align: "center" });

    doc.setFontSize(7.5);
    doc.setTextColor(120, 80, 10);
    doc.text("Inauguration: Saturday, 19th September 2026 at 09:30 AM", 105, y + 29, { align: "center" });

    y += 39;

    // Guests of Honour
    doc.setFillColor(248, 250, 254);
    doc.setDrawColor(180, 200, 230);
    doc.setLineWidth(0.4);
    doc.roundedRect(18, y, 174, 30, 2, 2, "FD");

    doc.setTextColor(20, 50, 100);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("GUESTS OF HONOUR", 105, y + 5.5, { align: "center" });

    doc.setFontSize(8.5);
    doc.setTextColor(...primaryNavy);
    doc.text(guestsOfHonour[0].name, 24, y + 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(80, 80, 80);
    doc.text(`${guestsOfHonour[0].designation}, ${guestsOfHonour[0].institution}`, 24, y + 17.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryNavy);
    doc.text(guestsOfHonour[1].name, 24, y + 23.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(80, 80, 80);
    doc.text(`${guestsOfHonour[1].designation}, ${guestsOfHonour[1].institution}`, 24, y + 27.5);

    y += 35;

    // Conclave Details & Embedded QR Code Box
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.6);
    doc.roundedRect(18, y, 174, 38, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(140, 90, 10);
    doc.text("CONCLAVE SCHEDULE, VENUE & MOBILE TIMETABLE", 18 + 5, y + 6);

    // Left details
    doc.setFontSize(7.5);
    doc.setTextColor(...primaryNavy);
    doc.text("• Dates:", 23, y + 13);
    doc.setFont("helvetica", "normal");
    doc.text("19th & 20th September 2026 (Saturday & Sunday)", 40, y + 13);

    doc.setFont("helvetica", "bold");
    doc.text("• Venue:", 23, y + 19);
    doc.setFont("helvetica", "normal");
    doc.text("Cauvery Meeting Hall, DRM Campus, TPJ", 40, y + 19);

    doc.setFont("helvetica", "bold");
    doc.text("• Credit:", 23, y + 25);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 100, 50);
    doc.text(`${accreditation.council} — ${accreditation.creditHours}`, 40, y + 25);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(6.5);
    doc.text(`Web Portal: ${timetableUrl}`, 23, y + 32);

    // Right QR Code Embed
    try {
      const qrDataUrl = await QRCode.toDataURL(timetableUrl, {
        width: 180,
        margin: 1,
        color: { dark: "#040e24", light: "#ffffff" }
      });
      if (qrDataUrl) {
        doc.addImage(qrDataUrl, "PNG", 154, y + 4, 28, 28);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(140, 90, 10);
        doc.text("SCAN FOR TIMETABLE", 168, y + 35, { align: "center" });
      }
    } catch (e) {
      console.warn("Could not embed QR code into invitation PDF:", e);
    }

    y += 44;

    // Organising Leadership
    doc.setTextColor(...primaryNavy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("ORGANISING COMMITTEE", 105, y, { align: "center" });

    y += 5.5;
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);
    doc.text(`Dr. Vijayalakshmi R. Natarajan (CMS / TPJ) — Organising Chairman`, 105, y, { align: "center" });
    y += 4.5;
    doc.text(`Shri K M Sathiyia Rathan (ADRM / TPJ) — Organising Vice Chairman`, 105, y, { align: "center" });
    y += 4.5;
    doc.text(`Medical Department Officers & Staff — Southern Railway, TPJ Division`, 105, y, { align: "center" });

    // RSVP & Contact
    y += 8.5;
    doc.setFillColor(245, 245, 245);
    doc.rect(18, y, 174, 13, "F");
    doc.setFontSize(7);
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "bold");
    doc.text("RSVP & Delegate Assistance:", 24, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text("Divisional Railway Hospital, Golden Rock (GOC), Tiruchchirappalli - 620004", 24, y + 9.5);

    doc.save("RAILMED_TPJ_2026_Official_Invitation.pdf");
    return true;
  } catch (err) {
    console.error("Error generating invitation PDF:", err);
    window.print();
    return false;
  }
};
