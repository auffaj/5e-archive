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

  public getSearchResults(params : {searchKey: string, searchValue: any}[] = []){
    if(this.pristineCopy == null){ return null; }
    if(params.length == 0){ return this.pristineCopy.filter(row => true); }

    return this.pristineCopy.filter(row => {
      return !!params.find(param => {
        const searchType = typeof(row[param.searchKey])
        if(searchType == "string"){
          return (row[param.searchKey] as string).toLowerCase().includes(param.searchValue.toLowerCase());
        }
        
        return false;
      })
    });
  }

}
