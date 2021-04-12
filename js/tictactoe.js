// Keeps track of whose turn it is.
let activePlayer = 'X';
// Array that stores an array of moves. To determine win conditions.
let selectedSquares = [];

//This function is for placing an x or o in a square.
function placeXOrO(squareNumber) {
    //This condition ensures a square hasn't been selected already.
    //The .some() method is used to check each element of selectedSquare array
    //to see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //This var retrieves the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        //This condition checks who's turn it is.
        if (activePlayer === 'X') {
            //If activePlayer is equal to 'X', the x.png is placed in HTML.
            select.style.backgroundImage = 'url("./images/Xp.png")';
            select.style.backgroundImage = "no-repeat";
            //Active player may only be 'X' or 'O' so, if not 'X' it must bo 'O'
        } else {
            //If activePlayer is equal to 'O, the o.png is placed in HTML.
            select.style.backgroundImage = 'url("./images/Op.png")';
            select.style.backgroundImage = "no-repeat";
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions.
        checkWinConditions();
        //This condition is for changing the active player.
        if (activePlayer === 'X') {
            //If active player is 'X' change it to 'O'.
            activePlayer = 'O';
            //If active player is anything other than 'X'.
        } else {
            //Change the activePlayer to 'X'
            activePlayer = 'X';
        }

        //This function plays placement sound.
        audio('./media/placeDown.mp3');
        //This condition checks to see if it is computers turn.
        if(activePlayer === 'O') {
            //This function disables clicking for computer choice
            disableClick();
            //waits 1 second before computer places image and enables click.
            setTimeout(function() { computersTurn(); }, 1000);
        }
        return true;
    }
    function computersTurn() {
        let success = false;
        let pickASquare;
        while(!success){
            //A random number between 0 and 8 is selected.
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the random number evalated returns true, the square hasn't been selected yet.
            if (placeXOrO(pickASquare)){
                //This line calls the function.
                placeXOrO(pickASquare);
                //This changes our boolean and ends the loop.
                success = true;
            }
        }
    }
}

//This function parses the selectedSquares array to search for win conditions.
// drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
        // X 0,1,2 condition.
        if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100)}
        else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304)}
        else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508)}
        else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558)}
        else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558)}
        else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558)}
        else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90)}
        else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520)}
        // O 0, 1, 2 condition
        else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100)}
        else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304)}
        else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508)}
        else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558)}
        else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558)}
        else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558)}
        else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90)}
        else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520)}
        //This condition checks for tie. If none of the above conditions register and 9
        //squares are selected the code executes.
        else if (selectedSquares.length >= 9) {
            //This function plays the tie game sound.
        audio('./media/tieGame.mp3');
        //Sets a .3 second timmer before the resetGame is called.
        setTimeout(function () { resetGame(); }, 1000);
    }

    //Checks if an array includes 3 strings. It is used to check for
    //each win function
    function arrayIncludes(squareA, squareB, squareC) {
        // These 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)
        //If the 3 variables that pass are all included in the array true 
        // is returned and the else if con dition executes the drawWinLine func.
        if (a === true && b === true && c === true) {return true}
    }
}

//This function makes our body element temporarily unclickable.
function disableClick() {
    //This makes our body unclickable.
    body.style.pointerEvents = 'none';
    //This makes our body clickable again after 1 second.
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}
//This function takes a string parameter of the path set earlier for
//placement sound ('./media/place.mp3')
function audio(audioURL) {
    // create a new audio object and pass the path as a parameter.
    let audio = new Audio(audioURL);
    //Play method plays audio sound.
    audio.play();
}

//This function utilizes html canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //This line accesses our html canvas element.
    const canvas = document.getElementById('win-lines');
    //This line gives access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    //This line indicates where the start of a lines x axis is.
    let x1 = coordX1,
        //indicates where the start of lines y axis is.
        y1 = coordY1,
        //indicates where the end of a lines x axis is.
        x2 = coordX2,
        //indicates where the end of a lines y axis is.
        y2 = coordY2,
        //stores temporary x axis data updated in the animation loop.
        x = x1,
        //stores temporary y axis data updated in the animation loop.
        y = y1;


    //Interacts with the canvas
    function animateLineDrawing() {
        //Variable creates a loop.
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //This method clears content from last loop iteration.
        c.clearRect(0, 0, 608, 608);
        // starts a new path.
        c.beginPath();
        //Moves to a starting point for the line
        c.moveTo(x1, y1)
        //Indicates the end point of line
        c.lineTo(x, y)
        //sets width of line
        c.lineWidth = 10;
        //Color of line
        c.strokeStyle = 'rgba(70, 255, 33, .8)';
        //Draws everything laid out above.
        c.stroke();
        //Checks if endpoint was reached.
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10;}
            if (y < y2) { y += 10;}
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); } 
        }
    }

    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    //Line disallows clicking while the win sound is playing
    disableClick();
    //Plays win sound
    audio('./media/cartoonWin.mp3');
    //Calls main animation loop.
    animateLineDrawing();
    //Waits 1 second. Thn, clears canvas, resetsgame, and allows clicking again.
    setTimeout(function() { clear(); resetGame(); }, 1000);
}

//Resets the game in event of Tie or Win.
function resetGame() {
    //for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i))
        //Removes the elements backgroundImage.
        square.style.backgroundImage = ''
    }
    //Now reset array so it is empty and can start over again.
    selectedSquares = [];
}