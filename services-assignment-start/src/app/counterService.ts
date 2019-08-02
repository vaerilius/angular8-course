export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  countActive() {
    this.inactiveToActiveCounter++;
    console.log('active to Inactive: ' + this.inactiveToActiveCounter);
  }
  countInactive() {
    this.activeToInactiveCounter++;
    console.log('Inactive to Active: ' + this.activeToInactiveCounter);

  }

}
