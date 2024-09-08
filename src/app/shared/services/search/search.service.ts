import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private pristineCopy: any[] | null = null;

  public setData(data: any){
    this.pristineCopy = JSON.parse(JSON.stringify(data));
  }

  public getUnfilteredList(){
    return JSON.parse(JSON.stringify(this.pristineCopy));
  }

  public getSearchResults(params : any = null){
    if(this.pristineCopy == null){ return null; }

    if(params == null){ return this.getUnfilteredList(); }
    else if(Object.values(params).filter(val => !!val).length == 0){ return this.getUnfilteredList(); }

    return this.pristineCopy.filter(row => {
      let hasData: boolean = false;
      Object.keys(params).forEach(item => {
        if(hasData){ return; }
        if(!params[item]){ return; } // ignore empty filters

        if(typeof(params[item]) == 'string'){
          hasData = row[item].toLowerCase().includes(params[item].toLowerCase());
        }
      })
    
      return hasData;
    });
  }

}
