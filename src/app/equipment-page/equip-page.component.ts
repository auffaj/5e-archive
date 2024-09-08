import { Component, OnInit } from '@angular/core';
import { Equip } from './equip';
import { CommonModule } from '@angular/common';
import { EquipCardComponent } from './components/equip-card/equip-card.component';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchBarEquipComponent } from '../shared/search-bar/search-bar.component';
import { SearchService } from '../shared/services/search/search.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DataService } from '../shared/services/data/data.service';

@Component({
  selector: 'fiveE-archive-equips-page',
  standalone: true,
  imports: [CommonModule, EquipCardComponent,CardContainerComponent, SearchBarEquipComponent, MatProgressBar],
  providers:[DataService],
  templateUrl: './equip-page.component.html',
  styleUrl: './equip-page.component.scss'
})
export class EquipsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public equips: Equip[] = []

  public loading: boolean = true;

  private debounce: any = null;

  ngOnInit(){
    this.data.getEquipment()
    .subscribe(data => {
      this.search.setData(data);
      this.setShownEquips(this.search.getSearchResults() as Equip[]);

      setTimeout(() => this.loading = false, 500);
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
