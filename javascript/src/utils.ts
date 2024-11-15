import { Tank } from "./tankClass.js";
import { tankList } from "./tankObjectList.js";
import { renderHTML } from "./mainHTML.js";




//*Function to add functionalities to buttons:

//! Ideally this interface should be placed in the mainHTML.ts file: But we would need to do it outside of the function renderHTML() And it could get lost easily.
export interface TankButton {
  buttonName: string;
  functionName: keyof Tank;
}

export function buttonFunction(buttonObject: TankButton): void {
  const buttonList: NodeListOf<HTMLElement> = document.querySelectorAll(
    buttonObject.buttonName
  );
  buttonList.forEach((button) => {
    button.addEventListener("click", () => {
      const tankId: string = button.dataset.tankId as string;
      const matchingTank: Tank = tankList.find((tank: Tank): boolean => {
        return (tank.id as string) === (tankId as string);
      }) as Tank;
      (matchingTank[buttonObject.functionName] as Function)();
      setToLocalStorage(matchingTank.id, matchingTank);
      renderHTML();
      issueMessage(matchingTank);
      startRemoveMessageTimer(matchingTank);
    });
  });
}



//*Function to set to local storage:
export function setToLocalStorage(tankId: string, matchingTank: Tank): void {
  localStorage.setItem(tankId, JSON.stringify(matchingTank));
}

//*Function to issue a message to the correct tank:
export function issueMessage(matchingTank: Tank): void {
  let message: Element = document.querySelector(
    `.js-message${matchingTank.id as string}`
  ) as Element;
  message.innerHTML = matchingTank.tankMessage;
}

//* Function to remove message after three seconds;
//*Includes the declaration for timeOutId1 outside of the function:
let timeOutId1: number = 0;
export function startRemoveMessageTimer(matchingTank: Tank): void {
  //I need to be careful and think about where I am going to initialize the "timeOutId" And where I am going to run the "clearTimeOut".
  clearTimeout(timeOutId1);
  timeOutId1 = setTimeout(() => {
    console.log(" timer Test");
    let message: Element = document.querySelector(
      `.js-message${matchingTank.id}`
    )!;
    message.innerHTML = "";
    //! I could put this function below inside of issue message instead.
    matchingTank.tankMessage = "";
  }, 5000);
}




