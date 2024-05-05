import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService{

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: {term:'', countries: []},
    byCountries: {term:'', countries: []},
    byRegion:{region:'', countries: []},
  }


  constructor(private http: HttpClient) {
    this.LoadFromLocalStorage();

  }



  private saveToLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
  }

  private LoadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore'))return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);

  }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(()=>of([])),
      //el debouncer ahora tiene el delay
      delay(350)
    );
  }


  searchCountryByAlphaCode(code:string):Observable<Country | null>{

    const url = `${this.apiUrl}/alpha/${code}`;

    return this .http.get<Country[]>(url).pipe(
      //van en secuencia lo que haya dentro de aqui, null es procesado
      //despues por catchError y se retorna null
      map(countries => countries.length > 0 ? countries[0] : null),

      catchError((errorResponse)=>{
        return of(null)})
    );

  }

  //!el observable es como una promesa
  searchCapital(term:string):Observable<Country[]>{
    //sin subscribe no se ejecuta
    const url = `${this.apiUrl}/capital/${term}`;

    //metodo de observable pipe
    //! el subscribe viene al final del pipe
    return this.getCountriesRequest(url)
    .pipe(
      tap( (countries) => this.cacheStore.byCapital = {term:term, countries: countries}),
      //aqui ya se actualizo el cache y solo falta guardar en localstorage
      tap(()=>this.saveToLocalStorage())
    );
  }

  searchCountry(term:string):Observable<Country[]>{

    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap( (countries) => this.cacheStore.byCountries = {term:term, countries: countries}),
      //no es conveniente llamar la funcion asi tap(this.saveToLocalStorage())
      //debido a que se rompe la relacion a lo que apunta this
      tap(()=>this.saveToLocalStorage())
    );

  }


  searchRegion(region:Region):Observable<Country[]>{

    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap( (countries) => this.cacheStore.byRegion = {region:region, countries: countries}),
      tap(()=>this.saveToLocalStorage())
    );

  }



}
