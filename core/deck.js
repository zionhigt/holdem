class Deck{
    constructor(){
        this.deck = this.generateCardsOptions();
    }
    shuffler(){
        for (let i = this.deck.length; i > 1; i--) {
            let rndIndex = Math.floor(Math.random() * i - 1);
            if (rndIndex < 0) {
                rndIndex = rndIndex * -1;
            }
            const newElement = this.deck[rndIndex];
            const oldElement = this.deck[i - 1];
            this.deck[rndIndex] = oldElement;
            this.deck[i - 1] = newElement;
        }
        return this.deck;
    }
    generateCardFamily(symbole, color, index) {
        const family = []
        for (let i = 0; i < 13; i++) {
            let value = i + 2;
            const options = {
                id: `${i}${index + 1}`,
                symbole: symbole,
                value: value,
                color: color
            }
            family.push(options);
        }
        return family;
    }

    generateCardsOptions() {
        const symboles = ["\u2665", "\u2666", "\u2663", "\u2660"];
        let cardsOptions = [];
        symboles.forEach(function (symbole, index) {
            let color = "red";
            if (index > 1) {
                color = 'black';
            }
            const cardFamily = this.generateCardFamily(symbole, color, index);
            cardsOptions = cardsOptions.concat(cardFamily);
        }.bind(this))
        return cardsOptions;
    }

}

module.exports = Deck;