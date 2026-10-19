import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

export default class SNSUtil {
    private sns: SNSClient;

    constructor() {}

    configureEnvironment(environment: { region: string; credentials?: any }): void {
        this.sns = new SNSClient(environment);
    }

    async sendSms(phoneNumber: string, message: string): Promise<any> {
        const params = {
            Message: message,
            PhoneNumber: phoneNumber,
            MessageAttributes: {
                "AWS.SNS.SMS.SenderID": {
                    DataType: "String",
                    StringValue: "LinkGourmet"
                }
            }
        };

        try {
            const command = new PublishCommand(params);
            const response = await this.sns.send(command);
            console.log("SMS sent successfully:", response);
            return response;
        } catch (err) {
            console.error("Error sending SMS:", err);
            throw err;
        }
    }
}
