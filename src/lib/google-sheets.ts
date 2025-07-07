import { google } from "googleapis";

const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;

if (
  !GOOGLE_SHEETS_PRIVATE_KEY ||
  !GOOGLE_SHEETS_CLIENT_EMAIL ||
  !GOOGLE_SHEETS_SHEET_ID
) {
  throw new Error("Missing Google Sheets environment variables");
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    private_key: GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export interface NewsletterSubscription {
  name: string;
  email: string;
  date?: string;
  status?: string;
}

export async function addToNewsletterSheet(data: NewsletterSubscription) {
  try {
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    const values = [
      [
        data.name,
        data.email,
        data.date || currentDate,
        data.status || "Subscribed",
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
      range: "Sheet1!A:D", // Adjust range as needed
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    console.log(
      "Newsletter subscription added to Google Sheets:",
      response.data
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error adding to Google Sheets:", error);
    return {
      success: false,
      error: "Failed to add subscription to Google Sheets",
    };
  }
}

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
      range: "Sheet1!B:B", // Email column
    });

    const emails = response.data.values?.flat() || [];
    return emails.includes(email);
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
}

export async function getAllSubscriptions() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
      range: "Sheet1!A:D",
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return { success: true, data: [] };
    }

    // Skip header row
    const subscriptions = rows.slice(1).map((row) => ({
      name: row[0] || "",
      email: row[1] || "",
      date: row[2] || "",
      status: row[3] || "",
    }));

    return { success: true, data: subscriptions };
  } catch (error) {
    console.error("Error getting subscriptions:", error);
    return { success: false, error: "Failed to get subscriptions" };
  }
}
