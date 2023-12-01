import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent {

  public finishModalClass: string = 'd-none';

  hideModal( value: string ){
    this.finishModalClass = value;
  }

}
