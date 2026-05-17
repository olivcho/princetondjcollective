import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export interface TeamMember {
  name: string;
  role: string;
  isOfficer: boolean;
}

export async function getTeam(): Promise<TeamMember[]> {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_TEAM_ID!,
    range: 'Sheet1!A2:B',
  });
  const rows = res.data.values ?? [];
  return rows
    .filter(row => row[0])
    .map(row => {
      const role = row[1] ?? '';
      return {
        name: row[0],
        role,
        isOfficer: role.toLowerCase() !== 'dj' && role.trim() !== '',
      };
    });
}

export interface Gig {
  venue: string;
  eventName: string;
  date: string;
}

export async function getGigs(): Promise<Gig[]> {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_GIGS_ID!,
    range: 'Sheet1!A2:C',
  });
  const rows = res.data.values ?? [];
  return rows
    .filter(row => row[0] || row[1])
    .map(row => ({
      venue: row[0] ?? '',
      eventName: row[1] ?? '',
      date: row[2] ?? '',
    }));
}
