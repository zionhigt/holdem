const makeCard = function (element, options) {
    const headerCard = element.querySelector('#headerCard');
    headerCard.setAttribute('id', `headerCard-${options.id}`);
    const headerSymbole = headerCard.querySelector('.symbole-card');
    headerSymbole.innerText = options.symbole;
    const headerValue = headerCard.querySelector('.value-card');
    headerValue.innerText = options.value;
    
    const figures = ["V", "D", "R", "A"];
    const bodyCard = element.querySelector('#bodyCard');
    bodyCard.setAttribute('id', `bodyCard-${options.id}`);
    bodyCard.innerText = options.value;
    const footerCard = element.querySelector('#footerCard');
    footerCard.setAttribute('id', `footerCard-${options.id}`);
    const footerSymbole = footerCard.querySelector('.symbole-card');
    footerSymbole.innerText = options.symbole;
    const footerValue = footerCard.querySelector('.value-card');
    footerValue.innerText = options.value;
    
    if (options.value > 10) {
        bodyCard.innerText = figures[options.value - 11];
        headerValue.innerText = figures[options.value - 11];
        footerValue.innerText = figures[options.value - 11] ;
    }

    const frameCard = element.querySelector('#frameCard');
    frameCard.setAttribute('id', `frameCard-${options.id}`);
    frameCard.classList.add(`color-${options.color}`);
    return element;
}

const showPlayer = function(player) {
    console.log(player);
}
const shuffler = function (init_array) {
    for (let i = init_array.length; i > 1; i--) {
        let rndIndex = Math.floor(Math.random() * i - 1);
        if (rndIndex < 0) {
            rndIndex = rndIndex * -1;
        }
        const newElement = init_array[rndIndex];
        const oldElement = init_array[i - 1];
        init_array[rndIndex] = oldElement;
        init_array[i - 1] = newElement;
    }
    return init_array;
}
const fillDeck = function (deckOptions, deckId) {
    const cardTemplate = document.querySelector('#cardTemplate');
    const cardsDeck = document.querySelector(`#${deckId}`);
    deckOptions.forEach(function (item) {
        const cardClone = document.importNode(cardTemplate.content, true);
        cardsDeck.appendChild(makeCard(cardClone, item));
    });
}

const showDeck = function (deck) {
    const shuffledDeck = deck;
    let [m1, m2, ...stack] = shuffledDeck;
    fillDeck([m1, m2], "cardsDeck");
    const revealButton = document.querySelector('#revealCard');
    revealButton.addEventListener("click", function (e) {
        e.preventDefault();
        revealCards([m1, m2])
        e.target.setAttribute('disabled', true);
    });

    let [r1, r2, r3, ...s] = stack;
    stack = s;
    fillDeck([r1, r2, r3], "riverDeck")

    let [t, ...st] = stack;
    stack = st;
    fillDeck([t], "turnDeck")

    let [l, ...sta] = stack;
    stack = sta;
    fillDeck([l], "leftDeck")

    const nextButton = document.querySelector("#nextButton");
    const steps = [
        [r1, r2, r3],
        [t],
        [l]
    ];
    let currentStep = 0;
    nextButton.addEventListener("click", function (e) {
        e.preventDefault();
        revealCards(steps[currentStep]);
        if (currentStep < steps.length - 1) {
            currentStep += 1;
        } else {
            nextButton.setAttribute("disabled", true);
        }

    })

    return [m1, m2, r1, r2, r3, t, l];

}
const valuesHandler = function(sameValues, hands) {
    // Value
    const pair = Object.keys(sameValues).filter(function (value) {
        return sameValues[value].length > 1;
    }).map(function (key) {
        return sameValues[key];
    });
    if (pair.length) {
        hands.pair[0] = true;
        hands.pair[1] = pair[0];

        const brelanOrMore = pair.filter(function (item) {
            return item.length > 2;
        });

        if (brelanOrMore.length > 0) {
            hands.brelan[0] = true;
            hands.brelan[1] = brelanOrMore;
            brelanOrMore.forEach(function (set) {
                if (set.length > 3) {
                    hands.square[0] = true;
                    hands.square[1] = brelanOrMore;
                }
            });
        }
        if (pair.length > 1) {
            hands.doublePair[0] = true;
            hands.doublePair[1] = pair;
            hands.full[0] = hands.brelan[0];
            hands.full[1] = hands.brelan[0] ? [...pair[0][1], ...hands.brelan[1]] : [];
        } else if (pair.length == 1) {
            hands.doublePair[0] == hands.square[0];
            hands.doublePair[1] = hands.square[0] ? [...hands.square[1]] : [];
        }
    }
    return hands;
}

const suiteHandler = function(deck, hands) {
    const sortedHand = deck.sort(function (a, b) {
        return a.value - b.value;
    });
    hands.high[0] = true;
    hands.high[1] = sortedHand[sortedHand.length - 1];
    let suiteCount = 1;
    let startIndex = 0;
    sortedHand.forEach(function (item, index) {
        if (index > 0) {
            if ((item.value - sortedHand[index - 1].value) === 1) {
                suiteCount += 1;
                if (suiteCount > 5) {
                    startIndex += 1;
                }
            } else if (item.value - sortedHand[index - 1].value !== 0){
                if (suiteCount < 5) {
                    startIndex = index;
                    suiteCount = 1;
                }
            }
        }
    });
    const isSuite = suiteCount >= 5;
    hands.quinte[0] = isSuite;
    if (isSuite) {
        let suiteHand = []
        suiteHand = suiteHand.concat(sortedHand);
        suiteHand = suiteHand.splice(startIndex, 5);
        hands.quinte[1] = suiteHand;
        hands.QFlush[0] = true;
        const colorReference = suiteHand[0].symbole;
        suiteHand.forEach(function (card) {
            if (card.symbole !== colorReference) {
                hands.QFlush[0] = false;
            }
        });
        if (hands.QFlush[0]) {
            hands.QFlush[1] = suiteHand;
            if (suiteHand[0].value === 10) {
                hands.QFlushRoyal[0] = true;
                hands.QFlushRoyal[1] = suiteHand;
            }
        }
    }
    return hands; 
}

const colorsHandler = function(sameColors, hands) {
    const colors = Object.keys(sameColors).filter(function (color) {
        return sameColors[color].length >= 5;
    }).map(function (key) {
        return sameColors[key];
    });
    if (colors.length) {
        hands.color[0] = true;
        hands.color[1] = colors;
    }
    return hands; 
}
const parseDeck = function (deck) {
    let hands = {
        QFlushRoyal: [false, []],
        QFlush: [false, []],
        square: [false, []],
        full: [false, []],
        color: [false, []],
        quinte: [false, []],
        brelan: [false, []],
        doublePair: [false, []],
        pair: [false, []],
        high: [false, []]
    }
    const sameValues = {};
    const sameColors = {};
    deck.forEach(function(card) {
        if(!sameValues.hasOwnProperty(card.value)) {
            sameValues[card.value] = [card];
        } else {
            sameValues[card.value].push(card);
        }
        if (!sameColors.hasOwnProperty(card.symbole)) {
            sameColors[card.symbole] = [card];
        } else {
            sameColors[card.symbole].push(card);
        }
    });
    hands = valuesHandler(sameValues, hands);
    hands = suiteHandler(deck, hands);
    hands = colorsHandler(sameColors, hands);    

    return hands;
}


const launcherContainer = document.querySelector('#launcherContainer');
const showLauncherButton = function () {
    launcherContainer.classList.remove('d-none');
}
const dismissLauncherButton = function () {
    launcherContainer.classList.add('d-none');
}
const refreshGame = function (otherUsers) {
    if (otherUsers !== null) {
        playersInGame.innerHTML = "";
        Object.keys(otherUsers).forEach(function (token) {
            const user = otherUsers[token];
            if (user === currentUser) {
                dismissLauncherButton();
                if (user.isPlaying) {
                    showLauncherButton();
                }
            }
            const userRowTemplate = document.querySelector('#userRowTemplate');
            const userRowClone = document.importNode(userRowTemplate.content, true);

            const userName = user.email.split('@')[0];
            const nameElement = userRowClone.querySelector(".user-name");
            nameElement.innerText = userName;

            const scoreElement = userRowClone.querySelector(".user-score");
            scoreElement.innerText = user.score;

            playersInGame.appendChild(userRowClone);

        })
    }
};

const socket = io("http://192.168.1.113:3002/");
let socketToken = null;
let otherUsers = null;
let currentUser = null;
socket.on("fromAPI", function(token) {
    socketToken = token;
});
const handsWeight = {
    QFlushRoyal: 10,
    QFlush: 9,
    square: 8,
    full: 7,
    color: 6,
    quinte: 5,
    brelan: 4,
    doublePair: 3,
    pair: 2,
    high: 1
}
socket.on("salon", function (player) {
    console.log(player)
    showPlayer(player);
    // otherUsers = users;
    // console.log(users)
    // currentUser = otherUsers[socketToken];
    // refreshGame(users);
    // showDeck(deck);

    // const hands = parseDeck(showDeck(deck));
    // const noneNullHands = Object.keys(hands).filter(function(key){
    //     if(hands[key][0] === true) {
    //         return key;
    //     };
    // });
    // const sortedBigHands = noneNullHands.sort(function(a, b) {
    //     return handsWeight[b] - handsWeight[a];
    // });
    // console.log(sortedBigHands[0], hands[sortedBigHands[0]][1]);

    // showHighHands(sortedBigHands[0]);
});

// const symboles = ["\u2665", "\u2666", "\u2663", "\u2660"];
const optionsCards = [
    {
        id: 0,
        symbole: "\u2665",
        value: 14,
        color: "red"
    },
    {
        id: 1,
        symbole: "\u2666",
        value: 13,
        color: "red"
    },
    {
        id: 2,
        symbole: "\u2663",
        value: 12,
        color: "black"
    },
    {
        id: 3,
        symbole: "\u2665",
        value: 11,
        color: "red"
    },
    {
        id: 4,
        symbole: "\u2660",
        value: 10,
        color: "black"
    },
    {
        id: 5,
        symbole: "\u2665",
        value: 8,
        color: "red"
    },
    {
        id: 6,
        symbole: "\u2663",
        value: 9,
        color: "black"
    },
]