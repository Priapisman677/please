import { tankList } from "./tankObjectList.js";
import { renderHTML } from "./mainHTML.js";
export function buttonFunction(buttonObject) {
    const buttonList = document.querySelectorAll(buttonObject.buttonName);
    buttonList.forEach((button) => {
        button.addEventListener("click", () => {
            const tankId = button.dataset.tankId;
            const matchingTank = tankList.find((tank) => {
                return tank.id === tankId;
            });
            matchingTank[buttonObject.functionName]();
            setToLocalStorage(matchingTank.id, matchingTank);
            renderHTML();
            issueMessage(matchingTank);
            startRemoveMessageTimer(matchingTank);
        });
    });
}
//*Function to set to local storage:
export function setToLocalStorage(tankId, matchingTank) {
    localStorage.setItem(tankId, JSON.stringify(matchingTank));
}
//*Function to issue a message to the correct tank:
export function issueMessage(matchingTank) {
    let message = document.querySelector(`.js-message${matchingTank.id}`);
    message.innerHTML = matchingTank.tankMessage;
}
//* Function to remove message after three seconds;
//*Includes the declaration for timeOutId1 outside of the function:
let timeOutId1 = 0;
export function startRemoveMessageTimer(matchingTank) {
    //I need to be careful and think about where I am going to initialize the "timeOutId" And where I am going to run the "clearTimeOut".
    clearTimeout(timeOutId1);
    timeOutId1 = setTimeout(() => {
        console.log(" timer Test");
        let message = document.querySelector(`.js-message${matchingTank.id}`);
        message.innerHTML = "";
        //! I could put this function below inside of issue message instead.
        matchingTank.tankMessage = "";
    }, 5000);
}
