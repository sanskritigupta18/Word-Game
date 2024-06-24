const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const container = document.querySelector(".container");
const wordDisplay = document.querySelector(".word-display");
const inputContainer = document.querySelector(".input-container");
const validwords = document.querySelector(".valid-words");
const submitButton = document.querySelector("#submit");
const errorMessage = document.getElementById("err-message");

let wordsObj = {
  BOAT: [
    "AT",
    "TO",
    "BAT",
    "BOT",
    "OAT",
    "TAB",
    "BOAT",
  ],
  CARD: [
    "ARC","CAR","CARD",
  ],
  NHEW: [
    "NEW" ,"WHEN"
  ]
};

let randomWord = "";
let currentWord = "";
let inputWord = "";
let foundWords = [];
let count = 0;

const randomValue = (arr,obj = false) => {
  if(obj)
  {
    let keysArr = Object.keys(arr);
    return keysArr[Math.floor(Math.random() * keysArr.length)];
  }
  else
  {
    return arr[Math.floor(Math.random() * arr.length)]
  }
};

submitButton.addEventListener("click", async ()=> {
  errorMessage.innerText = "";
  inputContainer.innerText = "";

let expectedOutputs = wordsObj[currentWord];

let expectedSection = document.querySelectorAll(".expected-section");

if(expectedOutputs.includes(inputWord) && !foundWords.includes(inputWord))
{
  count += 1;
  foundWords.push(inputWord);

  let index = expectedOutputs.indexOf(inputWord);

expectedSection[index].innerHTML = inputWord;
}
else
{
  if(foundWords.includes(inputWord))
  {
    errorMessage.innerText = "Already Entered";
  }
  else
  {
    errorMessage.innerText = "Invalid Word";
  }
}

if(count == expectedOutputs.length)
{
  coverScreen.classList.remove("hide");
  container.classList.add("hide");
  result.classList.remove("hide");
  startButton.innerText = "Restart";
  submitButton.disabled = true;
}

let letterrs = document.querySelectorAll(".letters");
letterrs.forEach((button) => {
  button.classList.remove("active1");
  button.disabled = false;
});

  inputWord = "";

});

const selectLetter = (event) => {
  errorMessage.innerText = "";
  inputWord += event.target.innerText;
  event.target.classList.add("active1");
  event.target.disabled = true;
  inputContainer.innerHTML += event.target.innerText;
}

const displayDashes = () => {
  let expectedOutputs = wordsObj[currentWord];

  expectedOutputs.forEach((element) => {
    let displayItem = element.replace(/./g,
    `<span class="dashes">_ </span>`);
    validwords.innerHTML += `<div class="expected-section">${displayItem}</div>`
  })
}

startButton.addEventListener("click",() => {
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  errorMessage.classList.add("hide");
  errorMessage.innerText = "";
  inputContainer.innerText = "";
  wordDisplay.innerHTML = "";
  inputWord = "";
  count = 0;
  submitButton.disabled = false;
  validwords.innerHTML = "";
  currentWord = randomValue(wordsObj,true);

  randomWord = currentWord.split("").sort(() => {
    0.5 -
     Math.random()
  })

  displayDashes();

  randomWord.forEach((letter) => {
    wordDisplay.innerHTML += `<button class="letters" onclick="selectLetter(event)">${letter}</button>`;
  })
  

})

window.onload = () => {
  coverScreen.classList.remove("hide");
  container.classList.add("hide");
  result.classList.add("hide")
}