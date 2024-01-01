import { Component, OnInit } from '@angular/core';
import { PublishersService } from '../../services/publishers.service';
import { Publisher } from '../../models/publisher.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  public displayCount = 9;

  public publishers: Publisher[] = [];

  constructor( private publishersService: PublishersService ){}

  ngOnInit(): void {
    this.publishersService.getPublisher()
      .subscribe(
        publishers => {
          this.publishers = publishers;
        }
      )
  }

  viewMore(){
    this.displayCount = this.displayCount + 9;
  }

}
