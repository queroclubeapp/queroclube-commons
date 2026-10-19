import { PinpointClient, SendMessagesCommand, AddressConfiguration } from "@aws-sdk/client-pinpoint";

export default class PinPointUtil {
    private pinpointClient: PinpointClient;

    constructor() {}

    configureEnvironment(config: { region: string; credentials?: any }): void {
        this.pinpointClient = new PinpointClient(config);
    }

    async callWithMessage(originPhoneNumber: string, destinationPhoneNumber: string, message: string): Promise<any> {
        const params = {
            ApplicationId: process.env.AWS_PINPOINT_APPLICATION_ID,
            MessageRequest: {
                Addresses: {
                    [destinationPhoneNumber]: <AddressConfiguration>{
                        ChannelType: "VOICE",
                    },
                },
                MessageConfiguration: {
                    VoiceMessage: {
                        LanguageCode: "pt-BR",
                        VoiceId: process.env.AWS_PINPOINT_VOICE!,
                        Body: message,
                    },
                },
            },
        };

        console.log("Call Parameters: ", JSON.stringify(params));

        try {
            const command = new SendMessagesCommand(params);
            const response = await this.pinpointClient.send(command);
            console.log(response);
            return response;
        } catch (err) {
            console.error("Error: ", err);
            throw err;
        }
    }
}
