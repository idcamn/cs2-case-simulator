/* 
  Item Odds:                              Item Rarities:                    Wear Rating:
  Mil-Spec (Blue): 66%                    0: Mil-Spec (Blue)                0: Battle-Scared
  Restricted (Purple): 20%                1: Restricted (Purple)            1: Well-Worn
  Classified (Pink): 8%                   2: Classified (Pink)              2: Field-Tested
  Covert (Red): 4%                        3: Covert (Red)                   3: Minimal Wear
  Exceedingly Rare (Gold): 2%             4: Exceedingly Rare (Gold)        4: Factory New
  ----------------
  StatTrak: 10%
*/

let request = new XMLHttpRequest();
request.open("GET", "../data/cases.json", false);
request.send(null)
let cases = JSON.parse(request.responseText);

const containerList = document.querySelector('#container-list');
const dropPopup = document.querySelector('#drop-popup');
const popupImage = document.querySelector('#popup-img');
const popupName = document.querySelector('#popup-name');
const popupCloseBtn = document.querySelector('#popup-close');

popupCloseBtn.addEventListener('click', function() {
  dropPopup.classList.add('hidden');
});

console.log(cases.cases);

for(let current of cases.cases) {
  let card = document.createElement('li');
  card.classList.add('container-list__card');
  let caseImg = document.createElement('img');
  caseImg.classList.add('card-img');
  caseImg.src = current.img;
  card.appendChild(caseImg);
  let caseName = document.createElement('p');
  caseName.classList.add('card-name');
  caseName.innerText = current.name;
  card.appendChild(caseName);
  let caseBtn = document.createElement('button');
  caseBtn.classList.add('card-btn');
  caseBtn.innerText = "Open";
  caseBtn.addEventListener('click', function(e) {
    dropPopup.classList.remove('hidden');
    openCase(current.id);
  });
  card.appendChild(caseBtn);
  containerList.appendChild(card);
}

function openCase(caseid) {
  let winner = Math.floor(Math.random() * 1000);
  let rarity = undefined;
  if(winner < 660) {
    rarity = 0;
  } else if(winner < 860 && winner >= 660) {
    rarity = 1;
  } else if(winner < 940 && winner >= 860) {
    rarity = 2;
  } else if(winner < 980 && winner >= 940) {
    rarity = 3;
  } else if(winner < 1000 && winner >= 980) {
    rarity = 4;
  }
  let droppedItem = dropItem(caseid, rarity);

  popupImage.src = droppedItem.img;
  popupName.innerText = droppedItem.weapon + " | " + droppedItem.skin;
}

function dropItem(caseid, rarity) {
  let arrOfItems = [];
  for(let obj of cases.cases[caseid].contains) {
    if(obj.rarity === rarity) {
      arrOfItems.push(obj);
    }
  }
  let num = Math.floor(Math.random() * arrOfItems.length);
  return arrOfItems[num];
}