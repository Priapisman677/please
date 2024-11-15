export class Tank {
    constructor(tankDetails) {
        this.isStorageOpen = false;
        this.tankMessage = "";
        this.id = tankDetails.id;
        this.drill = tankDetails.drill;
        this.engine = tankDetails.engine;
        this.fuelType = tankDetails.fuelType;
        const storedTank = JSON.parse(localStorage.getItem(this.id));
        this.fuelCapacity = storedTank
            ? storedTank.fuelCapacity
            : tankDetails.fuelType.fuelCapacity;
        this.speed = tankDetails.speed;
        this.isStorageOpen = tankDetails.isStorageOpen;
        this.movingStatus = tankDetails.movingStatus;
    }
    displayInfo() {
        console.log(`drill: ${this.drill.name}, engine: ${this.engine.name}, speed: ${this.speed}km/h, ${this.isStorageOpen === true ? "Storage is open" : "Storage is closed"}`, `movingStatus: ${this.movingStatus}`, `fuelType: ${this.fuelType}`);
    }
    go() {
        if (this.isStorageOpen === false && this.fuelCapacity > 0) {
            if (this.speed < this.engine.speedLimit) {
                this.fuelCapacity -= 10;
            }
            this.speed += 5 * this.engine.speedMultiplier;
        }
        else if (this.isStorageOpen === true && this.fuelCapacity <= 0) {
            this.tankMessage =
                "You tried moving the tank but the storage is open and there is no fuel!";
        }
        else if (this.isStorageOpen === false && this.fuelCapacity <= 0) {
            this.tankMessage = "You tried moving the tank but there is no fuel!";
        }
        else if (this.isStorageOpen === true && this.fuelCapacity > 0) {
            this.tankMessage =
                "You tried moving the tank but but the storage is open!";
        }
        if (this.speed > this.engine.speedLimit) {
            this.speed = this.engine.speedLimit;
            this.tankMessage = "The tank is already at its maximum speed";
        }
        this.checkFuelCapacity();
        this.updateMovingStatus();
    }
    break() {
        this.speed -= 5 * this.engine.breakMultiplier;
        if (this.speed < 0) {
            this.speed = 0;
            this.tankMessage =
                "The tank is already stopped, There is no purpose on using the break!";
        }
        this.updateMovingStatus();
    }
    openStorage() {
        if (this.isStorageOpen === true) {
            this.tankMessage = "storage is already open!";
        }
        if (this.speed === 0) {
            this.isStorageOpen = true;
        }
        else {
            this.tankMessage =
                "You tried opening the storage while the tank is moving!";
        }
    }
    closeStorage() {
        if (this.isStorageOpen === false) {
            this.tankMessage = "Storage is already closed!";
        }
        else {
            this.isStorageOpen = false;
        }
    }
    reFillFuel() {
        if (this.fuelCapacity === this.fuelType.fuelCapacity) {
            this.tankMessage = "The fuel is already at its maximum!";
        }
        else if (this.speed === 0) {
            this.fuelCapacity = this.fuelType.fuelCapacity;
        }
        else {
            this.tankMessage = "You need to be stopped in order to refill your fuel!";
        }
    }
    updateMovingStatus() {
        this.movingStatus = this.speed > 0 ? "moving" : "stopped";
    }
    removeMessage() {
        this.tankMessage = "";
    }
    checkFuelCapacity() {
        if (this.fuelCapacity <= 0) {
            this.speed = 0;
            this.tankMessage = "The tank has stopped due to lack of fuel!";
            this.updateMovingStatus();
        }
    }
    reserveFuelImage() {
        return "";
    }
    reserveFuelButton() {
        return "";
    }
    useReserveFuel() { }
    flyButton() {
        return "";
    }
    fanImage() {
        return "";
    }
    fly() { }
    heightStatus() {
        return "";
    }
}
//* Tier 1 tank class----------------------------------------
export class Tier1Tank extends Tank {
}
//* Tier 2 tank class----------------------------------------
export class Tier2Tank extends Tank {
    constructor(tankDetails) {
        super(tankDetails);
        this.reserveFuel = tankDetails.reserveFuel;
        const storedTank = JSON.parse(localStorage.getItem(this.id));
        this.initialAndMaxCount = storedTank
            ? storedTank.initialAndMaxCount
            : this.reserveFuel.initialAndMaxCount;
    }
    reserveFuelImage() {
        return `
      <div class="image-container">
        <p class="reserve-fuel-tanks">${this.initialAndMaxCount}<p>
        <img class="item-image" src="../images/${this.reserveFuel.name}-reserveFuel.PNG">
      </div>
    `;
    }
    reserveFuelButton() {
        return `
      <div class="button-container">
        <button class="reserve-fuel-button"
        data-tank-id="${this.id}">
        Use reserve fuel
        </button>
      </div>
    `;
    }
    useReserveFuel() {
        if (this.fuelCapacity !== this.fuelType.fuelCapacity &&
            this.initialAndMaxCount > 0) {
            this.fuelCapacity += this.reserveFuel.fuelRestoration;
            this.initialAndMaxCount -= 1;
        }
        else {
            if (this.fuelCapacity === this.fuelType.fuelCapacity) {
                this.tankMessage = "The fuel is already at its maximum!";
            }
            if (this.initialAndMaxCount === 0) {
                this.tankMessage = "You ran out of reserve fuel!";
            }
        }
        if (this.fuelCapacity > this.fuelType.fuelCapacity) {
            this.fuelCapacity = this.fuelType.fuelCapacity;
        }
    }
}
//* Tier 3 tank class----------------------------------------
export class Tier3Tank extends Tier2Tank {
    constructor(tankDetails) {
        super(tankDetails);
        this.fan = tankDetails.fan;
        const storedTank = JSON.parse(localStorage.getItem(this.id));
        this.height = storedTank ? storedTank.height : 0;
    }
    fly() {
        if (this.height < this.fan.heightLimit &&
            this.fuelCapacity > 0 &&
            this.isStorageOpen === false) {
            this.height += 10 * this.fan.flyMultiplier;
            this.fuelCapacity -= 10;
        }
        if (this.height >= this.fan.heightLimit) {
            this.height = this.fan.heightLimit;
            this.tankMessage = "The tank has reached its height limit!";
        }
    }
    fanImage() {
        return `
      <div class="image-container">
        <img class="item-image" src="../images/${this.fan.name}-fan.PNG">
      </div>
    `;
    }
    flyButton() {
        return `
      <div class="button-container">
        <button class="fly-button"
        data-tank-id="${this.id}">
        Fly
        </button>
      </div>
    `;
    }
    heightStatus() {
        return `
      <div class="status">
        <p>Height:  <br /> ${this.height}</p>
       </div>
    `;
    }
}
