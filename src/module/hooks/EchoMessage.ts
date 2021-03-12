
class EchoMessage {

    private static _instance: EchoMessage;

    public static getInstance(): EchoMessage {
        if (!EchoMessage._instance) EchoMessage._instance = new EchoMessage();
        return EchoMessage._instance;
    }

    public async createEchoMessageHook(chatMessage: any): Promise<void> {
        const user = chatMessage?.user?.data;
        var roll = chatMessage.roll;
        if (user && roll)
        {
            var message = `${user.name} rolled some dice.  `;
            roll.dice.forEach((die: Die): void => {
                message += `On ${die.number}d${die.faces} they rolled: `;
                
                die.results.forEach((result: any): void =>
                {
                    message += `${result.result} `;
                });

                var ave = die.total / die.number;
                var expected = ((die.faces +1) / 2);

                message += `for a total of ${die.total} and an average of ${ave.toFixed(2)}`;

                if (ave > expected) {
                    message += " which is above average!";
                }
                else if (ave < expected) {
                    message += " which is below average!";
                }
                else {
                    message += " which is exactly average!";
                }
            });

            console.log(message);
            return;
        }
        
    }

}

export default EchoMessage.getInstance();