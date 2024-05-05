import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{

  public countries:Country[] = [];
  public isLoading:boolean = false;
  public initialValue:string = "";

  public capital:string = "capital";

  //el constructor esta destinado a la inyeccion de dependencias o cosas especificas
  constructor(private CountriesService:CountriesService){}

  //para cargar algo del servicio se usa usualmente onInit
  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byCapital.countries
    this.initialValue = this.CountriesService.cacheStore.byCapital.term
  }



  searchByCapital(term:string){
    //necesitamos suscribirnos para ver cambios
    this.isLoading = true;
    this.CountriesService.searchCapital(term)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;

    })
  }





}
