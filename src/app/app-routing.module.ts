import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes:Routes = [
  // {
  //   path:"",
  //   component:HomePageComponent
  // },
  {
    path:'about',
    component:AboutPageComponent
  },
  {
    path:'contact',
    component:ContactPageComponent
  },
  {
    path:'countries',
    //lazyLoad - carga bajo demanda la info del modulo importado y luego queda en memoria
    loadChildren: () => import('./countries/countries.module')
    .then(m => m.CountriesModule)
  },
  {
    path:'**',
    redirectTo:"countries"
  }
]


@NgModule({
  imports:[
    //como es nuestro modulo de rutas principal se usa 'forRoot'
    //solo hay un forRoot en toda la aplicacion
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule,
  ]

})
export class AppRoutingModule { }
