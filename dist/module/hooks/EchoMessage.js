class EchoMessage {
    static getInstance() {
        if (!EchoMessage._instance)
            EchoMessage._instance = new EchoMessage();
        return EchoMessage._instance;
    }
    async createEchoMessageHook(chatMessage) {
        var _a;
        const user = (_a = chatMessage === null || chatMessage === void 0 ? void 0 : chatMessage.user) === null || _a === void 0 ? void 0 : _a.data;
        var roll = chatMessage.roll;
        if (user && roll) {
            var message = `${user.name} rolled some dice.  `;
            roll.dice.forEach((die) => {
                message += `On ${die.number}d${die.faces} they rolled: `;
                die.results.forEach((result) => {
                    message += `${result.result} `;
                });
                var ave = die.total / die.number;
                var expected = ((die.faces + 1) / 2);
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
