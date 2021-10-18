window.addEventListener('load', init);

//global variables

//available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}
//to change levels
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

//DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'hat',
    'river',
    'lucky',
    'statue'
];

//initialize Game

function init() {
    //show number of seconds
    seconds.innerHTML = currentLevel;
    //load word from array
    showWord(words);
    //start maching on word input
    wordInput.addEventListener('input', startMatch);
    //call countdown every seconds
    setInterval(countdown, 1000);
    //check statues of the game
    setInterval(checkStatues, 50);
}

//start Match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    //if score is -1 display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

//match current word to the word input
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

//pick & show a random word
function showWord(words) {
    //generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    //output random word
    currentWord.innerHTML = words[randIndex];
}

//countdown timer

function countdown() {
    //make sure time is not run out
    if (time > 0) {
        time--;
    } else if(time === 0){
        //game over
        isPlaying = false;
    }
    //SHOW TIME
    timeDisplay.innerHTML= time
}

//check game statues
function checkStatues() {
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over !!!'
        score = -1;
    }
}