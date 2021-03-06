const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" }
];

const memoryGame = new MemoryGame(cards);

window.addEventListener("load", event => {
  let html = "";
  memoryGame.cards.forEach(pic => {
    html += `<div class="card" data-card-name="${pic.name}">`;
    html += `<div class="back" name="${pic.img}"></div>`;
    html += `<div class="front" style="background: url(img/${pic.img}) no-repeat"></div>`;
    html += `</div>`;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory_board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {

      card.classList.toggle('turned', !card.classList.contains('turned'));
      memoryGame.pickedCards.push(card.getAttribute('data-card-name'));
      if (memoryGame.pickedCards.length === 2) checkPair();

    });
  });
});

function checkPair(){
  let areTheSame = memoryGame.checkIfPair(memoryGame.pickedCards[0], memoryGame.pickedCards[1]);
  if (areTheSame){
    memoryGame.pickedCards.forEach(picked => {
      document.querySelectorAll(".card").forEach(card => {
        if (card.getAttribute('data-card-name') === picked) card.classList.replace('turned', 'blocked');
      })
    });
  } else {
    setTimeout(() => {
      document.querySelectorAll(".turned").forEach(card => {
        card.classList.remove('turned');
      });
    }, 1000);
  }
  memoryGame.pickedCards = [];
  document.querySelector('#pairs_clicked').innerHTML = memoryGame.pairsClicked;
  document.querySelector('#pairs_guessed').innerHTML = memoryGame.pairsGuessed;
  if (memoryGame.isFinished()){
    let scoreMsg = document.querySelector('#score h2');
    scoreMsg.classList.add('yellow');
    scoreMsg.innerHTML = 'YOU WON!!!';
  }
}