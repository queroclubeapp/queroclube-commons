import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

export default class SQSUtil {
    private sqs?: SQSClient;

    constructor() {}

    configureEnvironment(environment: { region: string; credentials?: any }): void {
        this.sqs = new SQSClient(environment);
    }

    async sendMessageToQueue(message: string, queue: string, sender: string): Promise<any> {
        if (!this.sqs) {
            throw new Error("Environment not configured");
        }

        const params = {
            DelaySeconds: 10,
            MessageAttributes: {
                Sender: {
                    DataType: "String",
                    StringValue: sender,
                },
            },
            MessageBody: message,
            QueueUrl: queue,
        };

        try {
            const command = new SendMessageCommand(params);
            const response = await this.sqs.send(command);
            console.log("Message sent successfully:", response);
            return response;
        } catch (err) {
            console.error("Error sending message to SQS:", err);
            throw err;
        }
    }

    async getMessagesFromQueue(queueURL: string): Promise<any[]> {
        if (!this.sqs) {
            throw new Error("Environment not configured");
        }

        const params = {
            MaxNumberOfMessages: 10,
            QueueUrl: queueURL,
        };

        try {
            const command = new ReceiveMessageCommand(params);
            const response = await this.sqs.send(command);
            console.log("Messages received:", response.Messages || []);
            return response.Messages || [];
        } catch (err) {
            console.error("Error receiving messages from SQS:", err);
            throw err;
        }
    }

    async removeMessageFromQueue(queueURL: string, receiptHandle: string) {
        if (!this.sqs) {
            throw new Error("Environment not configured");
        }

        const params = {
            QueueUrl: queueURL,
            ReceiptHandle: receiptHandle,
        };

        try {
            const command = new DeleteMessageCommand(params);
            const response = await this.sqs.send(command);
            console.log("Message deleted successfully:", response);
            return response;
        } catch (err) {
            console.error("Error deleting message from SQS:", err);
            throw err;
        }
    }
}
