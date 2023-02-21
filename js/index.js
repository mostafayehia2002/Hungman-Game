const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

//seclect letters container
let lettersContainer = document.querySelector(".letters");
lettersArray.forEach((letter) => {
    //create span
    let span = document.createElement("span");
    //create span text
    let spanText = document.createTextNode(letter);
    //add text to span
    span.appendChild(spanText);
    //add class to span
    span.classList.add("letter-box");
    //add span to letter container
    lettersContainer.appendChild(span);

});

const words = {
    programming: ["php", "javascript", "python", "java", "go"],
    countries: ["egypt", "syria", "yeman"],
    people: ["mostafa", "ali", "ahmed"]
}

// get all property and value and added to valiable(array)
let allKeys = Object.keys(words);
console.log(allKeys);
//get random number from 0 - to numbers of property
let randomPropertyNumber = Math.floor(Math.random() * allKeys.length);
console.log(randomPropertyNumber);
//get random property name from  allkeys(array)
let randomPropertyName = allKeys[randomPropertyNumber];
console.log(randomPropertyName);
//the random property name[]
let randomPropertyValue = words[randomPropertyName];
console.log(randomPropertyValue);
//get random number from the array of propertyName
let randomValueNumber = Math.floor(Math.random() * randomPropertyValue.length);
console.log(randomValueNumber);
//get random value from random property
let randomValue = randomPropertyValue[randomValueNumber];
console.log(randomValue);

//add random property name to category 
document.querySelector(".category span").innerHTML = randomPropertyName;

//select letters guess
let letterGuessContainer = document.querySelector(".letters-guess");
//convert random property value  to letters(array);
let letterArray = Array.from(randomValue);
console.log(letterArray);

//create spans 
letterArray.forEach((letter) => {
    //create span
    let span = document.createElement("span");
    //if letter is space
    if (letter === ' ') {
        span.className = "with-space";

    }
    //add span to letterGuessContainer
    letterGuessContainer.appendChild(span);
});
//select guess span
let gussSpans = document.querySelectorAll(".letters-guess span");

//set wrong attemps
let wrong = 0;
//select the drow element
let theDraw = document.querySelector(".hangman-draw");
//clicking on letters
document.addEventListener("click", (e) => {
    //set statues
    let theStatus = false;
    if (e.target.className == "letter-box") {
        e.target.classList.add("clicked");

        //get clicked letter
        let getLetter = e.target.innerHTML.toLowerCase();
        let chosenWord = Array.from(randomValue.toLowerCase());


        chosenWord.forEach((wordLetter, WordIndex) => {

            //if clicked letter == to the chosen letter
            if (getLetter == wordLetter) {
                //change  status to true 
                theStatus = true;
                //loop on all Guess spans
                gussSpans.forEach((span, spanIndex) => {
                    if (WordIndex == spanIndex) {

                        span.innerHTML = wordLetter;
                    }

                })


            }
        })

        if (theStatus !== true) {
            //increase the wrong attemps
            wrong++;
            theDraw.classList.add(`wrong-${wrong}`);
            //play fail sound
            document.getElementById("faild").play();
            if (wrong == 8) {
                setTimeout(() => { 
                    endGame();
                    lettersContainer.classList.add("finished");
                }, 3000);
              
            }

        } else {
            //play success sound
            document.getElementById("success").play();
            success();
        }


    }



});
//won function 
function success() {
    let word = "";
    gussSpans.forEach((e, i) => {
        word += e.innerHTML;
    })
    console.log(word);
    if (word == randomValue) {

        let div = document.createElement("div");
        let text = document.createTextNode(`you won, the number of wrong trying = ${wrong}`);
        div.appendChild(text);
        let button = document.createElement("button");
        let buttonText = document.createTextNode("play again");
        button.classList.add("btn");
        button.appendChild(buttonText);
        div.appendChild(button);
        div.className = "popup";
        document.body.appendChild(div);
        document.getElementById("won").play();
        button.onclick = () => {
            window.location.reload();
        }
    }
}

//end game function popup
function endGame() {
    let div = document.createElement("div");
    let text = document.createTextNode(`Game over, the word is ${randomValue}`);
    div.appendChild(text);
    let button = document.createElement("button");
    let buttonText = document.createTextNode("try again");
    button.classList.add("btn");
    button.appendChild(buttonText);
    div.appendChild(button);
    div.className = "popup";
    document.body.appendChild(div);

    button.onclick = () => {
        window.location.reload();
    }

}