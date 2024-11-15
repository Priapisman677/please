import { tankList, t1tank} from "./tankObjectList.js";

import {
  buttonFunction,
  TankButton,
} from "./utils.js";


export function renderHTML() {
  let menuHTML: string = "";

  tankList.forEach((tank) => {
    menuHTML += `
    <div class="functions-container">
      <div class="button-container">
        <button class="speedUp-button"
        data-tank-id="${tank.id as string}">Speed Up</button>
      </div>
      <div class="button-container">
        <button class="slow-down-button"
        data-tank-id="${tank.id as string}">Slow down</button>
      </div>
      <div class="button-container">
        <button class="open-storage-button"
        data-tank-id="${tank.id as string}">Open storage</button>
      </div>
      <div class="button-container">
        <button class="close-storage-button"
        data-tank-id="${tank.id as string}">Close storage</button>
      </div>
      <div class="button-container">
        <button class="refill-fuel-button"
        data-tank-id="${tank.id}">Refill fuel</button>
      </div>
      ${tank.reserveFuelButton()}
      ${tank.flyButton()}
      
    </div>

    <div class="status-container">
      <div class="status">
        <p class="moving-status">Moving <br/>status: ${tank.movingStatus as string}</p>
      </div>
      <div class="status">
        <p>
          Storage <br />
          status: ${(tank.isStorageOpen as boolean) === true ? "Open" : "Closed"}
        </p>
      </div>
      <div class="status">
        <p>Speed: ${tank.speed as number}</p>
      </div>

       <div class="status">
        <p>Current fuel:  <br /> ${tank.fuelCapacity}</p>
       </div>
       ${tank.heightStatus()}
    </div>

    <div class="items-container">
      <div class="image-container">
        <img class="item-image " src="../images/${
          tank.drill.name as string
        }-drill.PNG">
      </div>
      <div class="image-container">
        <img class="item-image " src="../images/${
          tank.engine.name as string
        }-engine.PNG">
      </div>
      <div class="image-container">
        <img class="item-image " src="../images/${
          tank.fuelType.name as string
        }-fuel.PNG">
      </div>
      
      ${tank.reserveFuelImage()}
      ${tank.fanImage()}
    </div>
    
    <div class="message-container">
      <div class="message js-message${tank.id as string}">${
      tank.tankMessage as string
    }</div>
      <div class="remove-message-button-container">
        <button class="remove-message-button"
        data-tank-id="${tank.id as string}">Remove message</button>
      </div>
    </div>
  `;
  });
  const tankMenu: Element = document.querySelector(".tank-menu")!;
  tankMenu.innerHTML = menuHTML;

 //* Button objects

const speedUpButtons: TankButton = {
  buttonName: ".speedUp-button",
  functionName: "go",
};
const slowDownButtons: TankButton = {
  buttonName: ".slow-down-button",
  functionName: "break",
};
const openStorageButtons: TankButton = {
  buttonName: ".open-storage-button",
  functionName: "openStorage",
};
const closeStorageButtons: TankButton = {
  buttonName: ".close-storage-button",
  functionName: "closeStorage",
};
const refillFuelButtons: TankButton = {
  buttonName: ".refill-fuel-button",
  functionName: "reFillFuel",
};
const reserveFuelButtons: TankButton = {
  buttonName: ".reserve-fuel-button",
  functionName: "useReserveFuel",
};
const flyButtons: TankButton = {
  buttonName: ".fly-button",
  functionName: "fly",
};
const removeMessageButtons: TankButton = {
  buttonName: ".remove-message-button",
  functionName: "removeMessage",
};

  //*Functionality of all buttons:
  buttonFunction(speedUpButtons);
  buttonFunction(slowDownButtons);
  buttonFunction(openStorageButtons);
  buttonFunction(closeStorageButtons);
  buttonFunction(refillFuelButtons);
  buttonFunction(reserveFuelButtons);
  buttonFunction(flyButtons);
  buttonFunction(removeMessageButtons);
}
renderHTML();

console.log(`Image path: ../../images/${t1tank.drill.name}-drill.PNG`);
