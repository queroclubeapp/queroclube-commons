import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import stream from "stream";

export default class GoogleDriveUtil {

    private scopes: string[];
    private tokenPath: string;
    private credentialsPath: string;

    constructor(scopes: string[], tokenPath: string, credentialsPath: string) {
        this.scopes = scopes;
        this.tokenPath = tokenPath;
        this.credentialsPath = credentialsPath;
    }

    async loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
        try {
            const content: string = await fs.readFile(this.tokenPath, 'utf-8');
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials) as OAuth2Client;
        } catch {
            return null;
        }
    }

    async saveCredentials(client: OAuth2Client): Promise<void> {
        const content: string = await fs.readFile(this.credentialsPath, 'utf-8');
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;

        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });

        await fs.writeFile(this.tokenPath, payload);
    }

    async authorize(): Promise<OAuth2Client> {
        const client = await this.loadSavedCredentialsIfExist();

        if (client) return client;

        const newClient = await authenticate({
            scopes: this.scopes,
            keyfilePath: this.credentialsPath,
        });

        if (newClient.credentials) {
            await this.saveCredentials(newClient);
        }

        return newClient;
    }

    async listFiles(): Promise<void> {
        const authClient = await this.authorize();
        const drive = google.drive({ version: 'v3', auth: authClient });

        const res = await drive.files.list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        });

        const files = res.data.files;

        if (files && files.length === 0) {
            console.log('No files found.');
            return;
        }

        console.log('Files:');
        files?.forEach(file => console.log(`${file.name} (${file.id})`));
    }

    async downloadFile(fileId: string): Promise<any> {
        const authClient = await this.authorize();
        const drive = google.drive({ version: 'v3', auth: authClient });

        return drive.files.get({
            fileId,
            alt: 'media',
        });
    }

    async uploadFile(fileName: string, mimeType: string): Promise<string> {
        try {
            const authClient = await this.authorize();
            const drive = google.drive({ version: 'v3', auth: authClient });

            const fileMetadata = { name: fileName };
            const media = {
                mimeType,
                body: createReadStream(fileName),
            };

            const response = await drive.files.create({
                requestBody: fileMetadata, // Mudança aqui: 'resource' para 'requestBody'
                media,
                fields: 'id',
            });

            return response.data.id;
        } catch (error) {
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }

    async updateFile(fileId: string, fileMetadata: any, fileContent: string): Promise<any> {
        const authClient = await this.authorize();
        const drive = google.drive({ version: 'v3', auth: authClient });

        const buf = Buffer.from(fileContent, 'utf-8');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buf);

        const media = {
            mimeType: 'application/json',
            body: bufferStream,
        };

        return drive.files.update({
            fileId,
            requestBody: fileMetadata,  // Mudança aqui: 'resource' para 'requestBody'
            media,
        });
    }

}
