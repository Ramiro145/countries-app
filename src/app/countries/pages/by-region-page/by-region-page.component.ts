import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';




@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  public selectedRegion?:Region;
  public countries:Country[] = [];
  public region:string = "region";
  public isLoading = false;
  public regions:Region[]= ['Africa','Americas','Asia','Europe','Oceania'];


  constructor(private CountriesService:CountriesService){}

  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.CountriesService.cacheStore.byRegion.region
  }




  searchByRegion(region:Region):void{

    this.selectedRegion = region;
    this.isLoading = true;

    this.CountriesService.searchRegion(region)
    .subscribe(countries =>{
      this.countries = countries
      this.isLoading = false;
      }
    )
  }
}
