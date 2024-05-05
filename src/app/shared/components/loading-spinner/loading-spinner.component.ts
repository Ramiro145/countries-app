import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {

  //se necesita el mismo nombre en las propiedades
  //con el nombre definido podemos usar distintos nombres
  @Input()
  public zona!: string;

}
