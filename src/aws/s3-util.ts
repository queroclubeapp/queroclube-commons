import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

export default class S3Util {
    private s3: S3Client;

    constructor() {}

    configureEnvironment(environment: { region: string; credentials?: any }): void {
        this.s3 = new S3Client(environment);
    }

    async loadFile(fileName: string, templatesBucket: string): Promise<string> {
        const params = { Key: fileName, Bucket: templatesBucket };

        try {
            const command = new GetObjectCommand(params);
            const response = await this.s3.send(command);

            if (!response.Body) {
                throw new Error("File not found or empty");
            }

            return await this.streamToString(response.Body);
        } catch (err) {
            console.error("Error fetching file from S3:", err);
            throw err;
        }
    }

    async headObject(bucket: string, key: string): Promise<any> {
        const params = { Bucket: bucket, Key: key };

        try {
            const command = new HeadObjectCommand(params);
            const response = await this.s3.send(command);
            return response;
        } catch (err: any) {
            // Se o objeto não existir, retorna null/undefined
            if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
                return null;
            }
            console.error("Error checking file existence in S3:", err);
            return null;
        }
    }

    private async streamToString(stream: any): Promise<string> {
        if (stream instanceof Readable) {
            return new Promise((resolve, reject) => {
                let data = "";
                stream.on("data", (chunk) => (data += chunk));
                stream.on("end", () => resolve(data));
                stream.on("error", (err) => reject(err));
            });
        }

        throw new Error("Unsupported stream type");
    }
}
