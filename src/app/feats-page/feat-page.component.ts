import { Component, OnInit } from '@angular/core';
import { Feat } from './feat';
import { CommonModule } from '@angular/common';
import { FeatCardComponent } from './components/feat-card/feat-card.component';
import { HttpClient } from '@angular/common/http';
//import data from '../../assets/spells.json'

@Component({
  selector: 'fiveE-archive-feats-page',
  standalone: true,
  imports: [CommonModule, FeatCardComponent],
  templateUrl: './feats-page.component.html',
  styleUrl: './feats-page.component.scss'
})
export class FeatsPageComponent implements OnInit {
  constructor(private http: HttpClient){}
  public feats: Feat[]

  ngOnInit(){
    this.http.get('assets/spells.json', {responseType: 'json'})
    .subscribe(data => this.setShownFeats(data as Feat[]));
  }

  setShownFeats(_data_: Feat[]){
    this.feats = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Event){

    const searchTerm: string = (event.target as HTMLInputElement).value.toLowerCase();

    if(searchTerm == ''){
      this.setShownFeats(data);
    } else {
      const newFeats = data.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownFeats(newFeats);
    }
  }
}
