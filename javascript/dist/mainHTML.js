import { tankList, t1tank } from "./tankObjectList.js";
import { buttonFunction, } from "./utils.js";
export function renderHTML() {
    let menuHTML = "";
    tankList.forEach((tank) => {
        menuHTML += `
    <div class="functions-container">
      <div class="button-container">
        <button class="speedUp-button"
        data-tank-id="${tank.id}">Speed Up</button>
      </div>
      <div class="button-container">
        <button class="slow-down-button"
        data-tank-id="${tank.id}">Slow down</button>
      </div>
      <div class="button-container">
        <button class="open-storage-button"
        data-tank-id="${tank.id}">Open storage</button>
      </div>
      <div class="button-container">
        <button class="close-storage-button"
        data-tank-id="${tank.id}">Close storage</button>
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
        <p class="moving-status">Moving <br/>status: ${tank.movingStatus}</p>
      </div>
      <div class="status">
        <p>
          Storage <br />
          status: ${tank.isStorageOpen === true ? "Open" : "Closed"}
        </p>
      </div>
      <div class="status">
        <p>Speed: ${tank.speed}</p>
      </div>

       <div class="status">
        <p>Current fuel:  <br /> ${tank.fuelCapacity}</p>
       </div>
       ${tank.heightStatus()}
    </div>

    <div class="items-container">
      <div class="image-container">
        <img class="item-image " src="../images/${tank.drill.name}-drill.PNG">
      </div>
      <div class="image-container">
        <img class="item-image " src="../images/${tank.engine.name}-engine.PNG">
      </div>
      <div class="image-container">
        <img class="item-image " src="../images/${tank.fuelType.name}-fuel.PNG">
      </div>
      
      ${tank.reserveFuelImage()}
      ${tank.fanImage()}
    </div>
    
    <div class="message-container">
      <div class="message js-message${tank.id}">${tank.tankMessage}</div>
      <div class="remove-message-button-container">
        <button class="remove-message-button"
        data-tank-id="${tank.id}">Remove message</button>
      </div>
    </div>
  `;
    });
    const tankMenu = document.querySelector(".tank-menu");
    tankMenu.innerHTML = menuHTML;
    //* Button objects
    const speedUpButtons = {
        buttonName: ".speedUp-button",
        functionName: "go",
    };
    const slowDownButtons = {
        buttonName: ".slow-down-button",
        functionName: "break",
    };
    const openStorageButtons = {
        buttonName: ".open-storage-button",
        functionName: "openStorage",
    };
    const closeStorageButtons = {
        buttonName: ".close-storage-button",
        functionName: "closeStorage",
    };
    const refillFuelButtons = {
        buttonName: ".refill-fuel-button",
        functionName: "reFillFuel",
    };
    const reserveFuelButtons = {
        buttonName: ".reserve-fuel-button",
        functionName: "useReserveFuel",
    };
    const flyButtons = {
        buttonName: ".fly-button",
        functionName: "fly",
    };
    const removeMessageButtons = {
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
