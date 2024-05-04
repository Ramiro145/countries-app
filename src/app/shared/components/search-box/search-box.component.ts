import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @ViewChild('txtInput')
  public txtInput!:ElementRef<HTMLInputElement>;

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();
  //lo mismo
  // public onValue = new EventEmitter()<string>;

  public emitValue(value:string):void{
    //lo mismo
    this.onValue.emit(
      // this.txtInput.nativeElement.value
      value
    )
    // this.txtInput.nativeElement.value = '';
    this.txtInput.nativeElement.value= '';
  }

}
