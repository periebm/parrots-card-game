let cards_qtd = 0;

let card_imgs = 
["bobrossparrot.gif", "bobrossparrot.gif", 
"explodyparrot.gif", "explodyparrot.gif",
"fiestaparrot", "fiestaparrot",
"metalparrot.gif", "metalparrot.gif",
"revertitparrot.gif", "revertitparrot.gif",
"tripletsparrot.gif","tripletsparrot.gif",
"unicornparrot.gif","unicornparrot.gif"
]

const n = card_imgs.length;

game_start();

distribute_cards();





function game_start(){
    while((cards_qtd < 4) || (cards_qtd > 14) || (cards_qtd%2 !== 0)){
        cards_qtd = prompt('Digite a quantidade de cartas');
    }
    
    
    for(let i = 0; i < (n-cards_qtd); i++){
        card_imgs.pop();
    }
    
    card_imgs.sort(compare);
}


function distribute_cards(){
    const deck = document.querySelector(".deck");

    for(let i = 0; i < cards_qtd; i++){
        deck.innerHTML +=
        `
        <div class="card ">
            <img class="parrot_back" src="./Images/back.png" />
        </div>;
        `
    }


}


function compare() { 
	return Math.random() - 0.5; 
}



