import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export default class SESUtil {
    private ses: SESClient;

    constructor() {}

    configureEnvironment(environment: { region: string; credentials?: any }): void {
        this.ses = new SESClient(environment);
    }

    async sendEmail(receiverEmail: string, senderEmail: string, subject: string, htmlBody: string): Promise<any> {
        const params = {
            Destination: {
                ToAddresses: [receiverEmail]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: htmlBody
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject
                }
            },
            Source: senderEmail
        };

        try {
            const command = new SendEmailCommand(params);
            const response = await this.ses.send(command);
            console.log("Email sent successfully:", response);
            return response;
        } catch (err) {
            console.error("Error sending email:", err);
            throw err;
        }
    }
}
