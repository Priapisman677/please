import { Engine, Drill, FuelType, ReserveFuel, FanType } from "./itemsList.js";

interface TankDetails {
  drill: Drill;
  engine: Engine;
  fuelType: FuelType;
  speed: number;
  isStorageOpen: boolean;
  movingStatus: string;
  id: string;
  reserveFuel?: ReserveFuel;
  fan?: FanType;
}

export class Tank {
  drill: Drill;
  engine: Engine;
  fuelType: FuelType;
  fuelCapacity: number;
  speed: number;
  isStorageOpen: boolean = false;
  movingStatus: string;
  tankMessage: string = "";
  id: string;

  constructor(tankDetails: TankDetails) {
    this.id = tankDetails.id;
    this.drill = tankDetails.drill;
    this.engine = tankDetails.engine;
    this.fuelType = tankDetails.fuelType;
    
    const storedTank: Tank = JSON.parse(
      localStorage.getItem(this.id) as string
    ) as Tank;
    this.fuelCapacity = storedTank
      ? storedTank.fuelCapacity
      : tankDetails.fuelType.fuelCapacity;

    this.speed = tankDetails.speed;
    this.isStorageOpen = tankDetails.isStorageOpen;
    this.movingStatus = tankDetails.movingStatus;
  }

  displayInfo(): void {
    console.log(
      `drill: ${this.drill.name}, engine: ${this.engine.name}, speed: ${
        this.speed
      }km/h, ${this.isStorageOpen ? "Storage is open" : "Storage is closed"}`,
      `movingStatus: ${this.movingStatus}`,
      `fuelType: ${this.fuelType}`
    );
  }

  private setMessage(message: string): void {
    this.tankMessage = message;
  }

  private isStorageClosed(): boolean {
    return !this.isStorageOpen;
  }

  go(): void {
    if (this.isStorageClosed() && this.fuelCapacity > 0) {
      if (this.speed < this.engine.speedLimit) {
        this.fuelCapacity -= 10;
        this.speed = Math.min(this.speed + 5 * this.engine.speedMultiplier, this.engine.speedLimit);
        this.setMessage(this.speed === this.engine.speedLimit ? "The tank is already at its maximum speed" : "");
      }
    } else {
      if (this.isStorageOpen && this.fuelCapacity <= 0) this.setMessage("You tried moving the tank but the storage is open and there is no fuel!");
      else if (this.isStorageClosed() && this.fuelCapacity <= 0) this.setMessage("You tried moving the tank but there is no fuel!");
      else if (this.isStorageOpen) this.setMessage("You tried moving the tank but the storage is open!");
    }
    this.checkFuelCapacity();
    this.updateMovingStatus();
  }

  break(): void {
    this.speed = Math.max(0, this.speed - 5 * this.engine.breakMultiplier);
    if (this.speed === 0) {
      this.setMessage("The tank is already stopped, There is no purpose on using the break!");
    }
    this.updateMovingStatus();
  }

  openStorage(): void {
    if (this.isStorageOpen) {
      this.setMessage("Storage is already open!");
    } else if (this.speed === 0) {
      this.isStorageOpen = true;
    } else {
      this.setMessage("You tried opening the storage while the tank is moving!");
    }
  }

  closeStorage(): void {
    if (this.isStorageClosed()) {
      this.setMessage("Storage is already closed!");
    } else {
      this.isStorageOpen = false;
    }
  }

  reFillFuel(): void {
    if (this.fuelCapacity === this.fuelType.fuelCapacity) {
      this.setMessage("The fuel is already at its maximum!");
    } else if (this.speed === 0) {
      this.fuelCapacity = this.fuelType.fuelCapacity;
    } else {
      this.setMessage("You need to be stopped in order to refill your fuel!");
    }
  }

  updateMovingStatus(): void {
    this.movingStatus = this.speed > 0 ? "moving" : "stopped";
  }

  removeMessage(): void {
    this.setMessage("");
  }

  checkFuelCapacity(): void {
    if (this.fuelCapacity <= 0) {
      this.speed = 0;
      this.setMessage("The tank has stopped due to lack of fuel!");
      this.updateMovingStatus();
    }
  }
  
  reserveFuelImage(): string {
    return "";
  }
  
  reserveFuelButton(): string {
    return "";
  }
  
  useReserveFuel(): void {}
  
  flyButton(): string {
    return "";
  }
  
  fanImage(): string {
    return "";
  }
  
  fly(): void {}
  
  heightStatus(): string {
    return "";
  }
}

//* Tier 1 tank class----------------------------------------
export class Tier1Tank extends Tank {}

//* Tier 2 tank class----------------------------------------
export class Tier2Tank extends Tank {
  reserveFuel: ReserveFuel;
  initialAndMaxCount: number;

  constructor(tankDetails: TankDetails) {
    super(tankDetails);
    this.reserveFuel = tankDetails.reserveFuel as ReserveFuel;
    const storedTank: Tier2Tank = JSON.parse(
      localStorage.getItem(this.id) as string
    ) as Tier2Tank;
    this.initialAndMaxCount = storedTank
      ? storedTank.initialAndMaxCount
      : this.reserveFuel.initialAndMaxCount;
  }

  reserveFuelImage(): string {
    return `
      <div class="image-container">
        <p class="reserve-fuel-tanks">${this.initialAndMaxCount}</p>
        <img class="item-image" src="../../images/${this.reserveFuel.name as string}-reserveFuel.PNG">
      </div>
    `;
  }

  reserveFuelButton(): string {
    return `
      <div class="button-container">
        <button class="reserve-fuel-button" data-tank-id="${this.id}">
          Use reserve fuel
        </button>
      </div>
    `;
  }

  useReserveFuel(): void {
    if (this.fuelCapacity < this.fuelType.fuelCapacity && this.initialAndMaxCount > 0) {
      this.fuelCapacity = Math.min(this.fuelCapacity + this.reserveFuel.fuelRestoration, this.fuelType.fuelCapacity);
      this.initialAndMaxCount -= 1;
    } else {
      this.setMessage(this.fuelCapacity === this.fuelType.fuelCapacity
        ? "The fuel is already at its maximum!"
        : "You ran out of reserve fuel!"
      );
    }
  }
}

//* Tier 3 tank class----------------------------------------
export class Tier3Tank extends Tier2Tank {
  fan: FanType;
  height: number;

  constructor(tankDetails: TankDetails) {
    super(tankDetails);
    this.fan = tankDetails.fan as FanType;
    const storedTank: Tier3Tank = JSON.parse(
      localStorage.getItem(this.id) as string
    ) as Tier3Tank;
    this.height = storedTank ? storedTank.height : 0;
  }

  fly(): void {
    if (this.height < this.fan.heightLimit && this.fuelCapacity > 0 && this.isStorageClosed()) {
      this.height += 10 * this.fan.flyMultiplier;
      this.fuelCapacity -= 10;
      if (this.height >= this.fan.heightLimit) {
        this.height = this.fan.heightLimit;
        this.setMessage("The tank has reached its height limit!");
      }
    }
  }

  fanImage(): string {
    return `
      <div class="image-container">
        <img class="item-image" src="../../images/${this.fan.name as string}-fan.PNG">
      </div>
    `;
  }

  flyButton(): string {
    return `
      <div class="button-container">
        <button class="fly-button" data-tank-id="${this.id}">
          Fly
        </button>
      </div>
    `;
  }

  heightStatus(): string {
    return `
      <div class="status">
        <p>Height: <br /> ${this.height}</p>
      </div>
    `;
  }
}