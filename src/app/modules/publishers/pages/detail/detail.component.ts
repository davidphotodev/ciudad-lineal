import { Component, OnInit } from '@angular/core';
import { PublishersService } from '../../services/publishers.service';
import { Publisher } from '../../models/publisher.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  
  public finishModalClass: string = 'd-none';
  public publisher!: Publisher;
  public slug: string = '';

  constructor( private publishersService: PublishersService,
               private activatedRoute: ActivatedRoute ){}
  
  async ngOnInit(): Promise<void> {
    this.activatedRoute.params
      .subscribe(
        async ({ id }) => {
          const getPublisher = await this.publishersService.getPublisherById( id );
          this.publisher = getPublisher;
        }
      );
  }

  hideModal( value: string ){
    this.finishModalClass = value;
  }

}
