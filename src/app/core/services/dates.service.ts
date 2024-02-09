import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  public formattedDate!: string;

  constructor() { }

  getCurrentDate(): string{
    // Get and formatting end date
    const currentDate: Date = new Date();

    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();

    const formattedDay: string = (day < 10) ? '0' + day : day.toString();
    const formattedMonth: string = (month < 10) ? '0' + month : month.toString();

    this.formattedDate = formattedDay + '-' + formattedMonth + '-' + year;

    return this.formattedDate;
  }
}
