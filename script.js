let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => { 
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide")

    
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        const audioX = new Audio('tap.mp3');
        const audioO = new Audio('sound_o.mp3');
        if(turnO){
            box.innerText = "O";
            box.style.color = "#fff"; 
            box.style.textShadow = "0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px #ff7c7c, 0 0 70px #ff7c7c, 0 0 80px #ff7c7c, 0 0 100px #ff7c7c, 0 0 150px #ff7c7c"
            audioO.play(); 
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = "#fff"; 
            box.style.textShadow = " 0 0 10px blue, 0 0 20px blue, 0 0 30px blue, 0 0 40px #75aaff, 0 0 70px #75aaff, 0 0 80px #75aaff, 0 0 100px #75aaff, 0 0 150px #75aaff";
            audioX.play();
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        // checkDraw();
     });
});




const disableBoxes = () => { 
    for (let box of boxes) {
        box.disabled = true;
        
        
    }
    
 }
const enableBoxes = () => { 
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        
    }
    
 }

const showWinner = (winner) => { 
    const audiowinner = new Audio('congo.mp3');
    audiowinner.play(); 
    msg.innerText = `Congratulations, Winner is ${winner} `;
    msgContainer.classList.remove("hide");
    disableBoxes();
 };
 
 const showDraw = () => { 
     const audiodraw = new Audio('shit.mp3');
     audiodraw.play(); 
     msg.innerText = `Ahh, It's a Draw!`;
     msgContainer.classList.remove("hide");
     audiowinner.muted = true;
    disableBoxes();
};

 
const checkWinner = () => { 
    for (let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;


        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val)
                showWinner(pos1Val);
                return;
            }
        }
        
    }
    checkDraw();
 };
 const checkDraw = () => { 
    let isDraw = true;
    for (let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if (pos1Val === "" || pos2Val === "" || pos3Val === "") {
            isDraw = false;
            break; // If any box is empty, it's not a draw
        }
    }
    if (isDraw) {
        showDraw();
    }
};



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
