
const cellDivs = document.querySelectorAll('.game-cell');
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');

let xIsNext = true;
let gameIsLive = true;


const xSymbol = '×';
const oSymbol = '○';

const letterToSymbol = (letter) => letter === 'x'? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;

    if(letter === 'x'){
        
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
    }
    else{
        
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)}</span> has won!`;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[3];
    const topMid = cellDivs[1].classList[3];
    const topRight = cellDivs[2].classList[3];
    const midLeft = cellDivs[3].classList[3];
    const midMid = cellDivs[4].classList[3];
    const midRight = cellDivs[5].classList[3];
    const bottomLeft = cellDivs[6].classList[3];
    const bottomMid = cellDivs[7].classList[3];
    const bottomRight = cellDivs[8].classList[3];

    if(topLeft && topLeft === topMid && topMid === topRight){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }

    else if(midLeft && midLeft === midMid && midMid === midRight){
        handleWin(midLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }
    else if(bottomLeft && bottomLeft === bottomMid && bottomMid === bottomRight){
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topLeft && topLeft === midLeft && midLeft === bottomLeft){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topMid && topMid === midMid && midMid === bottomMid){
        handleWin(topMid);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if(topRight && topRight === midRight && midRight === bottomRight){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topLeft && topLeft === midMid && midMid === bottomRight){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topRight && topRight === midMid && midMid === bottomLeft){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topLeft && topMid && topRight && midLeft && midMid && midRight && bottomLeft && bottomMid && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is Tied!';
    }
    else{
        xIsNext = !xIsNext;

        if(xIsNext){
            statusDiv.innerHTML = `${xSymbol} is next`;
        }
        else{
            statusDiv.innerHTML = `<span>${oSymbol}</span> is next`;
        }
    }
}



const handleCellClick = (e) => {
    const classList = e.target.classList;
    

    if(!gameIsLive || classList[3] === "x" || classList[3] === "o"){
        return;
    }

    if(xIsNext){
        classList.add('x');
        checkGameStatus();
        
    }
    else{
        classList.add('o');
        checkGameStatus();
        
    }
}

const handleReset = () =>{
    xIsNext = true;
    gameIsLive = true;

    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }

}

resetDiv.addEventListener('click', handleReset);

for(const cellDiv of cellDivs){
    
    cellDiv.addEventListener('click', handleCellClick);
}