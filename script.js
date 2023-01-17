let cards_qtd = 0;
let clicked_counter = 0;
let correct_counter = 0;

let card_imgs = 
["bobrossparrot.gif", "bobrossparrot.gif", 
"explodyparrot.gif", "explodyparrot.gif",
"fiestaparrot.gif", "fiestaparrot.gif",
"metalparrot.gif", "metalparrot.gif",
"revertitparrot.gif", "revertitparrot.gif",
"tripletsparrot.gif","tripletsparrot.gif",
"unicornparrot.gif","unicornparrot.gif"
]

let clicked_cards= [];
let end_game = false;
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
        `<div data-test="card" onclick="rotate_card(this)" class="card ">
        <div class="front-face face">
            <img data-test="face-down-image" class="parrot_back" src="./Images/back.png" />
        </div>
        <div class="back-face face">
            <img data-test="face-up-image" class="parrot_front" src='./Images/${card_imgs[i]}' />
        </div>
     </div> `
    }
}

function rotate_card(selected_card){
   selected_card.querySelector((`div:first-child`)).classList.add("front-face-rotate");
   selected_card.querySelector((`div:last-child`)).classList.add("back-face-4rotate");
   selected_card.querySelector((`div:last-child`)).classList.remove("back-face");

   if(selected_card.classList.contains('correct')){
    //se ja ta correto, nao pode mais ser clicado
   }

   else{
    if(selected_card.classList.contains('already-clicked')){

    } //se ja foi clicado, nao adiciona mais no array
    
    else{
        selected_card.classList.add('already-clicked')
        clicked_cards.push(selected_card);
        if(clicked_cards.length > 2){
            let all_cards = document.querySelectorAll(".card");
            for(let i = 0; i < all_cards.length; i++){
                all_cards[i].classList.remove('already-clicked');
                if(all_cards[i].classList.contains("correct")){
                }
                else{
                    all_cards[i].querySelector((`div:first-child`)).classList.remove("front-face-rotate");
                    all_cards[i].querySelector((`div:last-child`)).classList.remove("back-face-4rotate");
                    all_cards[i].querySelector((`div:last-child`)).classList.add("back-face");
                    clicked_cards= [];
                }
            }
        }
        game_check();
         }
    }
}


function game_check(){
        if(clicked_cards.length === 2){     //se tiver duas cartas clicadas
            clicked_counter++; clicked_counter++;
            clicked_cards[0].classList.remove('already-clicked');
            clicked_cards[1].classList.remove('already-clicked');
            let first_card = clicked_cards[0].querySelector(`.parrot_front`).src;
            let second_card = clicked_cards[1].querySelector(`.parrot_front`).src;

            if(first_card === second_card){ //acertou, adiciona classe correct para nao ser mais repetido
                clicked_cards[0].classList.add('correct');
                clicked_cards[1].classList.add('correct');
                correct_counter++; correct_counter++;
                clicked_cards= [];
                ending_check();
            }

            else{
                setTimeout(unflip, 1000);
            }
    }
}

function unflip(){
    for(let k = 0; k < clicked_cards.length; k++){ // flip de novo nas cartas erradas;
        clicked_cards[k].querySelector((`div:first-child`)).classList.remove("front-face-rotate");
        clicked_cards[k].querySelector((`div:last-child`)).classList.remove("back-face-4rotate");
        clicked_cards[k].querySelector((`div:last-child`)).classList.add("back-face");
    }
    clicked_cards= [];
}


function compare() { 
	return Math.random() - 0.5; 
}

function ending_check(){
    console.log(correct_counter);
    console.log(cards_qtd);
    setTimeout(win,100);
    
}

function win() {
    if (correct_counter == cards_qtd) {
        alert(`Você ganhou em ${clicked_counter} jogadas!`);
    }
}


