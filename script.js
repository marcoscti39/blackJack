const hit = document.querySelector(".hit__button")
const stand = document.querySelector(".stand__button")
const yourCards = document.querySelector(".yourCards")
const dealerCards = document.querySelector(".dealerCards")
const deal = document.querySelector(".deal__button")
const yourScore = document.querySelector(".your__score")
const dealerScore = document.querySelector(".dealer__score")
const gameSituation = document.querySelector(".game__situation")


const hitAudio = new Audio("assets/sounds/swish.m4a")
const winAudio = new Audio("assets/sounds/cash.mp3")
const lostAudio = new Audio("assets/sounds/aww.mp3")


hit.addEventListener("click", blackJackHit)
deal.addEventListener("click", blackJackDeal)
stand.addEventListener("click", dealerLogic)


const blackJackGame = {
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "K", "Q"],
    "cardPoints": {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "A":[1, 11], "J": 10, "K": 10, "Q": 10},
    "dealer": {"score": 0},
    "you": {"score": 0},
    "hitTap": true,
    "standTap": false,
    "dealTap": false,
    "wins": 0,
    "losses": 0,
    "draws": 0
    
}

let YOU = blackJackGame["you"]
let DEALER = blackJackGame["dealer"]




function blackJackHit(){
    if(blackJackGame["hitTap"]){
        let card = pickRandomCard()
        putCards(YOU, yourCards, card)
        updateScore(YOU, card)
        showScore(yourScore, YOU)
        blackJackGame["standTap"] = true
    }
    

}

function putCards(player, div, random){
    if(player["score"] <= 21){
        let img = document.createElement("img")
        img.src = `assets/images/${random}.png`
        div.appendChild(img)
        hitAudio.play()
        
    }
    
}

function blackJackDeal(){
    if (blackJackGame["dealTap"]){
        let eraseCards = document.querySelectorAll("img")
        for(let i=0; i < eraseCards.length; i++){
            eraseCards[i].remove()
        }
        
        YOU["score"] = 0
        DEALER["score"] = 0
        yourScore.innerHTML = 0
        dealerScore.innerHTML = 0
        blackJackGame["standTap"] = false
        blackJackGame["hitTap"] = true
        blackJackGame["dealTap"] = false
        yourScore.style.color = 'white'
        dealerScore.style.color = "white"
        gameSituation.textContent = "Let's play"
        gameSituation.style.color = 'black'
    }
}

function pickRandomCard(){
    let index = Math.floor(Math.random()*13)
    let random = blackJackGame["cards"][index]
    return random

}

function updateScore(player, card){
    if(card === "A"){
        if(player["score"] + 11 >= 21){
            player["score"] += blackJackGame["cardPoints"][card][0]
        } else{
            player["score"] += blackJackGame["cardPoints"][card][1]
        }

    } else if (player["score"] <= 21){
        player["score"] += blackJackGame["cardPoints"][card]
    }
}

function showScore(element, player){
    element.innerHTML = player["score"]
    if(player["score"] > 21){
        element.innerHTML = "BUSTED"
        element.style.color = 'red'
    }
}


function dealerLogic(){
    if(blackJackGame["standTap"]){
        blackJackGame["hitTap"] = false
        blackJackGame["standTap"] = false
        blackJackGame["dealTap"] = true
        let playsInRow = Math.floor(Math.random()*4)

        for(let i=0; i <= playsInRow; i++){
            card = pickRandomCard()
            putCards(DEALER, dealerCards, card)
            updateScore(DEALER, card)
            showScore(dealerScore, DEALER)
            }
            showResult(WinnerAndLoser())
    }
   
}


function WinnerAndLoser(){
    let winner ;

    if(YOU["score"] <= 21){
        if(YOU["score"] > DEALER["score"] || DEALER["score"] > 21){
            winner = YOU


        } else if (YOU["score"] < DEALER["score"]){
            winner = DEALER

        } else if (YOU["score"] == DEALER["score"]){

        }
        
    }
    else if (YOU["score"] > 21 && DEALER["score"] > 21){

    }

    else if (YOU["score"] > 21){
        winner = DEALER

    }

    
    return winner
}

function showResult(winner){
    let gameMessage
    let colorMessage
    if(winner == YOU){
        blackJackGame["wins"]++
        document.querySelector(".winPoints").textContent = blackJackGame["wins"]
        gameMessage = "You Won!!!"
        colorMessage = 'green'
        winAudio.play()

    } else if(winner == DEALER){
        blackJackGame["losses"]++
        document.querySelector(".lossesPoints").textContent = blackJackGame["losses"]

        gameMessage = "You Lost!"
        colorMessage = " red"
        lostAudio.play()

    } else {
        blackJackGame["draws"]++
        document.querySelector(".drawsPoints").textContent = blackJackGame["draws"]
        gameMessage = "You Drew!"
        colorMessage = "yellow"

    }
    gameSituation.textContent = gameMessage
    gameSituation.style.color = colorMessage

}

