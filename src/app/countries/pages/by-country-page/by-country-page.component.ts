import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries:Country[] = [];
  public initialValue = "";
  public isLoading:boolean = false;
  public countriesText:string ="pais";

  constructor(private CountriesService:CountriesService){}


  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byCountries.countries
    this.initialValue = this.CountriesService.cacheStore.byCountries.term
  }



  searchByCountry(term:string){
    this.isLoading = true;
    this.CountriesService.searchCountry(term)
    .subscribe(countries =>{
      this.countries = countries;
      this.isLoading = false;
      }
    )
  }

}
