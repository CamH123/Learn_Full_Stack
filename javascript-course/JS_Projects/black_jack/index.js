// References to text
let playerHandText = document.getElementById("player-hand");
let playerSumText = document.getElementById("player-sum");
let dealerHandText = document.getElementById("dealer-hand");
let dealerSumText = document.getElementById("dealer-sum");
let messageText = document.getElementById("message-el");

let playerCards = [];
let dealerCards = [];
let playerSum = 0;
let dealerSum = 0;
let isAlive = true;

function startGame(){
    if (isAlive == false){
        // reset to blank
        playerCards = [];
        dealerCards = [];
        playerSum = 0;
        dealerSum = 0;
        updatePlayerHandText();
        updatePlayerSumText();
        updateDealerHandText();
        updateDealerSumText();
        messageText.style.color = "white";
        messageText.textContent = "Want to play another round?";
        isAlive = true;

    }
    else{
        // Set up players 2 cards
        let card1 = getNewCard();
        let card2 = getNewCard();
        playerCards.push(card1);
        playerCards.push(card2);
        playerSum += card1 + card2;
        updatePlayerHandText();
        updatePlayerSumText();

        // set up dealer's card
        let card3 = getNewCard();
        dealerCards.push(card3);
        dealerSum = card3;
        updateDealerHandText();
        updateDealerSumText();

        // Update Message
        messageText.textContent = "Hit or Stand?";
    }
}

function hitMe(){
    if (isAlive && playerSum != 0){
        let newCard = getNewCard();
        playerCards.push(newCard);
        playerSum += newCard;
        updatePlayerHandText();
        updatePlayerSumText();

        if (playerSum > 21){
            isAlive = false;
            messageText.textContent = "You lose!"
            messageText.style.color = "red";
        }
    }
}

function stand(){
    while (dealerSum < 21){
        let newCard = getNewCard();
        dealerCards.push(newCard);
        dealerSum += newCard;
        updateDealerHandText();
        updateDealerSumText();
    }
    // Check results
    // 1. Both player and dealer > 21
    if (dealerSum > 21){
        if (playerSum > 21){
            messageText.textContent = "Want to play another round?";
        }
        else{
            messageText.textContent = "You win!";
            messageText.style.color = "pink";
        }
    }
    else{
        if (playerSum > dealerSum){
            messageText.textContent = "You WIN!"
            messageText.style.color = "green";
        }
        else{
            messageText.textContent = "You lose!"
            messageText.style.color = "red";
        }
    }
    isAlive = false;

}

function getNewCard(){
    let value = Math.floor(Math.random() * 10 + 2)
    return value
}

// Update Text Functions //
function updatePlayerHandText(){
    let newText = "Your Hand: "
    for (let i = 0; i < playerCards.length; i++){
        newText += playerCards[i] + " ";
    }
    playerHandText.textContent = newText
}

function updatePlayerSumText(){
    playerSumText.textContent = "Your sum: " + playerSum;
}

function updateDealerHandText(){
    let newText = "Dealer's Hand: "
    for (let i = 0; i < dealerCards.length; i++){
        newText += dealerCards[i] + " ";
    }
    dealerHandText.textContent = newText
}

function updateDealerSumText(){
    dealerSumText.textContent = "Dealer's sum: " + dealerSum;
}