import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy{


  private deBouncer:Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;


  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue:string = "";

  @ViewChild('txtInput')
  public txtInput!:ElementRef<HTMLInputElement>;

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();
  //lo mismo
  // public onValue = new EventEmitter()<string>;

  //!cualquier subscribe devuelve una suscripcion con excepcion de los metodos
  //!de angular common, por eso se deben manejar el dejar de suscribirse
  ngOnInit(): void {

    this.debouncerSuscription = this.deBouncer.pipe(
      debounceTime(350)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    //cancelamos las sucripciones en rxjs, no es necesario con
    //lo de angular common
    this.debouncerSuscription?.unsubscribe();
  }


  public emitValue(value:string):void{
    //lo mismo
    this.onValue.emit(
      // this.txtInput.nativeElement.value
      value
    )
    // this.txtInput.nativeElement.value = '';
    //comentamos para evitar el choque con el debouncer
    // this.txtInput.nativeElement.value= '';
  }

  //un debouncer  no es mas que una forma de esperar al usuario terminar de
  //escribir y lanzar una peticion
  onKeyPress(searchTerm:string){
    this.deBouncer.next(searchTerm);
  }

}


