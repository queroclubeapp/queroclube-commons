import { existsSync } from 'fs';
import { describe, expect, test } from '@jest/globals';
import { CREDENTIALS_PATH, FILE_ID, SCOPES, TOKEN_PATH } from './test/conf-test';
import GoogleDriveUtil from './google-drive-utils';

const hasGoogleDriveCredentials = existsSync(CREDENTIALS_PATH) && existsSync(TOKEN_PATH);
const describeIntegration = hasGoogleDriveCredentials ? describe : describe.skip;

describeIntegration("Test Google Drive Services", () => {
    test("Download Google Drive File", async () => {
        const googleDriveUtil = new GoogleDriveUtil(SCOPES, TOKEN_PATH, CREDENTIALS_PATH);
        const testFile = await googleDriveUtil.downloadFile(FILE_ID);
        expect(testFile.data.test).toEqual("OK");
    });
});