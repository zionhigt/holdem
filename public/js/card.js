const optionsCard = {
    id: 0,
    symbole: "\u2665",
    value: "AS",
    color: "red"
}
// let init_array = [1, 3, 5];
const launcherCB = function (event) {
    event.preventDefault();
    API.joinGame()
        .then(deck => {
            console.log(deck);
        })
}

const launcherButton = document.querySelector('#launcherButton');
launcherButton.addEventListener("click", launcherCB)
const playersInGame = document.querySelector("#playerInGame");


const revealCards = function(cards) {
    cards.forEach(function (item) {
        const element = document.querySelector(`#frameCard-${item.id}`);
        element.classList.remove('verso');
    });
}

// const verif = function() {
//     const countShuffle = {
//         "135": 0,
//         "153": 0,
//         "315": 0,
//         "351": 0,
//         "513": 0,
//         "531": 0
//     }
//     for(let i = 0; i<1000; i++){
//         const shuffle_array = shuffler(init_array);
//         countShuffle[shuffle_array.join('')] += 1;
//     }
//     console.log(countShuffle);
// }

// verif();


// let deckToCheck = game.concat([m1, m2]);

// console.log(parseDeck(deckToCheck));