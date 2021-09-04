class Deck {
    card = [];
    shuffleOrder = [];
    constructor() {
       this.card = [];
       this.shuffleOrder = [];
        var suits = ["Spade", "Club", "Heart", "Diamonds"];
        for(const suit in suits) {
            for(let i = 2; i < 15; i++) {
                if(i == 11) {
                    this.card.push(`${"Jack of "}${suits[suit]}`);
                }
                else if(i == 12) {
                    this.card.push(`${"Queen of "}${suits[suit]}`);
                } 
                else if(i == 13) {
                    this.card.push(`${"King of "}${suits[suit]}`);
                }  else if(i == 14) {
                    this.card.push(`${"Ace of "}${suits[suit]}`);
                } else 
                this.card.push(`${i}${" of "}${suits[suit]}`);
            } 
        } 
        for(let i = 0; i < 52; i++) {
            this.shuffleOrder.push(i);
        }
    }
    shuffle() {
        let curId = this.shuffleOrder.length;
        // There remain elements to shuffle
        while (0 !== curId) {
          // Pick a remaining element
          let randId = Math.floor(Math.random() * curId);
          curId -= 1;
          // Swap it with the current element.
          let tmp = this.shuffleOrder[curId];
          this.shuffleOrder[curId] = this.shuffleOrder[randId];
          this.shuffleOrder[randId] = tmp;
        }
    }
    test() {
        for(let i = 0; i < 52; i++) {
            console.log(this.card[this.shuffleOrder[i]]);
        }
    }
    distribute(a,b) {
        let turn = 1; 
        let curId = this.shuffleOrder.length;
        while(0 != curId) {
            curId -= 1;
            if(turn == 1) {
             a.push(this.shuffleOrder[curId]);
            //  console.log(this.shuffleOrder[curId]);
             turn = 2;
            } else if(turn == 2) {
                b.push(this.shuffleOrder[curId]);
                // console.log(this.shuffleOrder[curId]);
                turn = 1;
            } 
        }
    }
    getCard(x) {
        return this.card[x];
    }
}

class War {
    constructor() {
        this.deck = new Deck();
     this.p1 = [];
     this.p2 = [];
     // console.log(a.getCard(p1[5]));
     // a.getCard(p1[5]);
    }
    compareCard(x,y) {
        let a = (x) % 13;
        let b = (y) % 13;
        if(a > b) {
            return 1;
        } else if(a < b) {
            return -1;
        } else
        return 0;
    }
    gamePlay() {
        this.deck.shuffle();
        this.deck.distribute(this.p1, this.p2);
        let p1score = 0;
        let p2score = 0;
        let round = 0;
        while(round < 26) {
            round += 1;
            let p1index = this.p1.shift();
            let p2index = this.p2.shift();
            let p1card = this.deck.getCard(p1index);
            let p2card = this.deck.getCard(p2index);
    
            let result = this.compareCard(p1index, p2index);
            if(result > 0) {
                p1score += 1;
                console.log("Player 1 wins this round because " + p1card + " beats " + p2card);
            } else if(result < 0) {
                p2score += 1;
                console.log("Player 2 wins this round because " + p2card + " beats " + p1card);
            } else {
                console.log("Tie because " + p1card + " is equal to " + p2card);
            }
        }
        console.log("Player 1 final score : " + p1score);
        console.log("Player 2 final score : " + p2score);
    }
}

let game = new War();
game.gamePlay();