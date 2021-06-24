const X_CLASS = 'x';
const O_CLASS = 'circle'
    //امكانيات الفوز
    //تتم بحسب موضع العناصر في ال arrays
const WINNING_COMBINATIONS = [
    //بشكل افقي
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //بشكل عمودي
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 9],
    //بشكل مائل
    [0, 4, 8],
    [2, 4, 6]

]
const cellElements = document.querySelectorAll('[data-cell]')
const boardElements = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartBTN')
const winningMessageText = document.querySelector('[data-winning-message-text]')
let circleTurn


startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS
        //place mark
    placeMark(cell, currentClass)

    //check for win
    if (checkWin(currentClass)) {
        endGame(false)
    }
    //check for draw
    else if (is_Draw()) {
        endGame(true)
    }

    //switch turns
    else {
        swapTurns()
        setBoardHoverClass()
    }

}

//وضع العنصر في الخلية cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

//التبديل بين الادوار 
function swapTurns() {
    circleTurn = !circleTurn
}

//تحديد العنصر الئاهر حسب دوره
function setBoardHoverClass() {
    boardElements.classList.remove(X_CLASS)
    boardElements.classList.remove(O_CLASS)

    if (circleTurn) {
        boardElements.classList.add(O_CLASS)
    } else {
        boardElements.classList.add(X_CLASS)

    }
}

//التأكد من الفوز
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//نهاية اللعبة
function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = ' تعادل !'
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} فاز !`
    }
    winningMessageElement.classList.add('show')
}

// في حالة التعادل
function is_Draw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS)
    })
}