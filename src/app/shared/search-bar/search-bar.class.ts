import { Output, EventEmitter, Directive } from "@angular/core";

@Directive()
export abstract class SearchBarComponent {
    public name: string = "";
  
    @Output() filterSubmitted = new EventEmitter();
  
  
    submit(event: Event){
      this.filterSubmitted.emit(event)
    }
  }