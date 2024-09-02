import { Component, OnInit } from '@angular/core';
import { Equip } from './equip';
import { CommonModule } from '@angular/common';
import { EquipCardComponent } from './components/equip-card/equip-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchBarEquipComponent } from '../shared/search-bar/search-bar.component';
import { SearchService } from '../shared/services/search/search.service';

@Component({
  selector: 'fiveE-archive-equips-page',
  standalone: true,
  imports: [CommonModule, EquipCardComponent,CardContainerComponent, SearchBarEquipComponent],
  templateUrl: './equip-page.component.html',
  styleUrl: './equip-page.component.scss'
})
export class EquipsPageComponent implements OnInit {
  constructor(private http: HttpClient, private search: SearchService){}
  public equips: Equip[] = []

  private debounce: any = null;

  ngOnInit(){
    this.http.get('assets/equipment.json', {responseType: 'json'})
    .subscribe(data => {
      this.search.setData(data);
      this.setShownEquips(this.search.getSearchResults() as Equip[]);
  });
  }

  setShownEquips(_data_: Equip[]){
    this.equips = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Equip){
    if(this.debounce != null){
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => this.doFilterSearch(event), 150);
  }

  private doFilterSearch(event: Equip){
    this.debounce = null;
    this.setShownEquips(this.search.getSearchResults(event) as Equip[]);
  }
}
