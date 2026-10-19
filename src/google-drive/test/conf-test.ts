import path from "path";

export const SCOPES = ['https://www.googleapis.com/auth/drive'];
export const TOKEN_PATH = path.join(process.cwd(), './src/google-drive/test/token.json');
export const CREDENTIALS_PATH = path.join(process.cwd(), './src/google-drive/test/googleDriveCredentials.json');
export const FILE_ID = "1o38mT-VBVEhYmdmNga0JKOESdG_kldPY";