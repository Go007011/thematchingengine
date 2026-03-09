export interface GoogleSheetsConfig {
  spreadsheetId: string
  serviceAccountJson: string
}

export async function loadGoogleSheetRows(_config: GoogleSheetsConfig): Promise<unknown[]> {
  return []
}
