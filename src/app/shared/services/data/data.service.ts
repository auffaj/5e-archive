import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getFeats(){
    return this.makeRequest('assets/feats.json')
  }

  getEquipment(){
    return this.makeRequest('assets/equipment.json')
  }

  getMagicItems(){
    return this.makeRequest('assets/magic_items.json')
  }

  getSpells(){
    return this.makeRequest('assets/spells.json')
  }

  makeRequest(uri: string){
    return this.http.get(uri, {responseType: 'json'}).pipe(map(data => this.cleanAndNormalize(data)))
  }

  cleanAndNormalize(data: any){
    return data;
  }
}
