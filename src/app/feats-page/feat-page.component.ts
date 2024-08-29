import { Component, OnInit } from '@angular/core';
import { Feat } from './feat';
import { CommonModule } from '@angular/common';
import { FeatCardComponent } from './components/feat-card/feat-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';

@Component({
  selector: 'fiveE-archive-feats-page',
  standalone: true,
  imports: [CommonModule, FeatCardComponent, CardContainerComponent],
  templateUrl: './feat-page.component.html',
  styleUrl: './feat-page.component.scss'
})
export class FeatsPageComponent implements OnInit {
  constructor(private http: HttpClient){}
  public feats: Feat[] = []
  private pristineFeats: Feat[] = []

  ngOnInit(){
    this.http.get('assets/feats.json', {responseType: 'json'})
        .subscribe(data => {
          this.pristineFeats = JSON.parse(JSON.stringify(data));
          this.setShownSpells(data as Feat[]);
        });
     
  }

  setShownSpells(_data_: Feat[]){
    this.feats = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Event){

    const searchTerm: string = (event.target as HTMLInputElement).value.toLowerCase();

    if(searchTerm == ''){
      this.setShownSpells(this.pristineFeats);
    } else {
      const newSpells = this.pristineFeats.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownSpells(newSpells);
    }
  }
}
