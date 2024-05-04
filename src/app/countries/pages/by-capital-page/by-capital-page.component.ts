import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  constructor(private CountriesService:CountriesService){}

  public countries:Country[] = [];

  searchByCapital(term:string){
    //necesitamos suscribirnos para ver cambios
    this.CountriesService.searchCapital(term)
    .subscribe(countries => {
      this.countries = countries;
    })
  }





}
