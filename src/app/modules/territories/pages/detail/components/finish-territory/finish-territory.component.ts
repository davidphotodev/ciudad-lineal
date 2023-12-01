import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-finish-territory',
  templateUrl: './finish-territory.component.html',
  styleUrls: ['./finish-territory.component.sass']
})
export class FinishTerritoryComponent {
  @Output()
  public childEvent = new EventEmitter<string>();

  hideModal(){
    this.childEvent.emit('d-none');
  }
}
