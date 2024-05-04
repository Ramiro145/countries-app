import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, map } from 'rxjs';
import { Country, Translation } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [

  ]
})
export class CountryPageComponent implements OnInit{

  //tener en cuenta cuando un componente puede ser nulo
  //como al cargar la pagina
  public country?:Country;


  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService:CountriesService,
    private router:Router
   ){}

  ngOnInit(): void {
    //cuando hay suscripcion es un observable
    this.activatedRoute.params
    .pipe(
      //retorna un observable que emite items basado en la funcion
      //que se le proporciona
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe(country => {
      if(!country){
        return this.router.navigateByUrl('')
      }


      return this.country = country;
    })


      //el nombre viene desde el nombre asignado en las rutas
      // ':id'
      //decimos que puede venir con '['id']' /cla.128


  }



}
