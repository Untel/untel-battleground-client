import { Component, Input } from '@angular/core';

@Component({
  selector: 'af-health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.scss']
})
export class HealthBarComponent {

  public _hp = 0;
  public _hpPercent = 0;
  public _healthColor = 'green';
  
  @Input() hpMax = 0;
  @Input() set hp (data: number) {
    if (data < 0) {
      this._hp = 0;
    } else {
      this._hp = data;
      this._hpPercent = this.hpMax / this._hp * 100;
      this._healthColor = this.getHealthColor(this._hpPercent);
    }
  };

  getHealthColor(hp) {
    switch (true) {
      case hp >= 75:
        return 'green';
      case hp >= 50 && hp < 75:
        return 'yellow';
      case hp >= 25 && hp < 50:
        return 'orange';
      case hp < 50:
        return 'red';
      default:
        return 'blue';
    }
  }

}
