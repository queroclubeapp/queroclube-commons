import SQSUtil from "./sqs-util";
import { describe, expect, beforeAll, test } from "@jest/globals";

const hasAwsCredentials = Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.SQS_QUEUE_URL);
const describeIntegration = hasAwsCredentials ? describe : describe.skip;

describeIntegration("SqsUtil - Integration Tests", () => {
    let sqsUtil: SQSUtil;

    const QUEUE_URL = process.env.SQS_QUEUE_URL as string;
    const environment = {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
        },
        region: process.env.AWS_REGION || "us-west-1"
    };

    beforeAll(async () => {
        sqsUtil = new SQSUtil();
        sqsUtil.configureEnvironment(environment);
    });

    test("teste send message", async () => {
        const message = "Test Message";
        const sender = "Test Sender";

        const sendResult = await sqsUtil.sendMessageToQueue(message, QUEUE_URL, sender);
        expect(sendResult.MessageId).toBeDefined();
    });

    test("teste receive message", async () => {
        const messages = await sqsUtil.getMessagesFromQueue(QUEUE_URL);
        expect(messages.length).toBeGreaterThan(0);
    });

    test("teste delete message", async () => {
        const messages = await sqsUtil.getMessagesFromQueue(QUEUE_URL);
        if (!messages || messages.length === 0) {
            throw new Error("No messages retrieved from the queue");
        }
        await expect(sqsUtil.removeMessageFromQueue(QUEUE_URL, messages[0].ReceiptHandle!)).resolves.toHaveProperty("ResponseMetadata.RequestId");
    });
});
