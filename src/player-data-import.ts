class Player {
    constructor(
        private name: string,
        private rating: number,
        private version: string,
        private futbinId: number,
        private priceId: number
    ) {}

    getExcelString(): string {
        return `${this.futbinId};${this.priceId};${this.version};${this.rating};${this.name}`
    }
}

function getPlayers(): Player[] {
    const rows: NodeListOf<any> = document.querySelectorAll("#repTb tbody tr");
    let players: Player[] = [];

    rows.forEach(row => {
        const name = row.querySelector(".player_name_players_table").innerText;
        const rating = row.querySelector("td:nth-child(2)").innerText;
        const version = row.querySelector("td:nth-child(4)").innerText;
        const futbinId = +row.querySelector("a").href.split("/")[5];

        const src = row.querySelector("img").src;
        const index = src.indexOf(".png");
        const priceId = +src.substr(0, index).split("/")[7].replace("p", "");

        players.push(new Player(name, rating, version, futbinId, priceId))
    })

    return players;
}

let playersString: string = '';
getPlayers().forEach(player => {
    playersString = playersString + player.getExcelString() + '\n';
})
console.log(playersString);