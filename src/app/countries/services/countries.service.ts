import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }


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


    return this.http.get<Country[]>(url).pipe(
      //en caso de error por parte de la peticion
      //retornamos un arreglo vacio
      catchError(() => of([]))
    );
  }

  searchCountry(term:string):Observable<Country[]>{

    const url = `${this.apiUrl}/name/${term}`;

    return this .http.get<Country[]>(url)
    .pipe(
      catchError(()=>of([]))
    );
  }


  searchRegion(term:string):Observable<Country[]>{

    const url = `${this.apiUrl}/region/${term}`;

    return this .http.get<Country[]>(url)
    .pipe(
      catchError(()=>of([]))
    );

  }



}
