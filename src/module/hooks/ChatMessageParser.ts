import Tracker from "../Tracker";

export class ChatMessageParser {

    private static _instance: ChatMessageParser;

    public static getInstance(): ChatMessageParser {
        if (!ChatMessageParser._instance) ChatMessageParser._instance = new ChatMessageParser();
        return ChatMessageParser._instance;
    }

    public async parseMessage(chatMessage: any): Promise<void> {
        const actorId = chatMessage?.data?.speaker?.actor;
        var roll = chatMessage.roll;

        if (actorId && roll)
        {
            var actor = <Actor>game.actors.get(actorId);
            
            roll.dice.forEach((die: Die): void => {
                die.results.forEach((result: any): void =>
                {
                    Tracker.AddRoll(actor.name, result.result, die.faces);
                });

            });

            return;
        }
    }
}

export default ChatMessageParser.getInstance();