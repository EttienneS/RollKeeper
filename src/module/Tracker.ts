export class Tracker {
    private static _instance: Tracker;

    public static getInstance(): Tracker {
        if (!Tracker._instance)
        Tracker._instance = new Tracker();
        return Tracker._instance;
    }

    private _journalEntry : JournalEntry;
    get journal(): JournalEntry
    {
        if (!this._journalEntry)
        {
            var name = "RollKeeper";
            this._journalEntry = game.journal.getName(name);
    
            if (!this._journalEntry)
            {
                const data = {name: name, type: "journal", content: "Current stats:<br/><br/>" };
                console.log(data);
                JournalEntry.create(data).then(function(entry:JournalEntry){
                    this._journalEntry = entry;
                    console.log('Created journal entry: ' + entry);
                });
            }
            else
            {
                console.log('Using existing journal entry: ' + this._journalEntry);
            }
        }

        return this._journalEntry;
    }

    public async AddRoll(actorId:string, roll:number, die:number):Promise<void>{
        var journal = this.journal;
        
        var current = <any>(journal.data);

        console.log(current);

        var update = {content: current.content + `${actorId} rolled ${roll} on a d${die}<br/>`};
        await journal.update(update);

        console.log(current);
    }
}

export default Tracker.getInstance();