import { Component, OnInit } from '@angular/core';
import { Equip } from './equip';
import { CommonModule } from '@angular/common';
import { EquipCardComponent } from './components/equip-card/equip-card.component';
import { CardContainerComponent } from '../../../shared/card-container/card-container.component';
import { SearchBarEquipComponent } from '../../../shared/search-bar/search-bar.component';
import { SearchService } from '../../../shared/services/search/search.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DataService } from '../../../shared/services/data/data.service';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'fiveE-archive-equips-page',
  standalone: true,
  imports: [CommonModule, EquipCardComponent,CardContainerComponent, SearchBarEquipComponent, MatProgressBar, MatButton, MatTooltip],
  providers:[DataService],
  templateUrl: './equip-page.component.html',
  styleUrl: './equip-page.component.scss'
})
export class EquipsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public cards: Equip[] = []

  public loading: boolean = true;

  public limitCount: number = 20;

  private debounce: any = null;

  private filter: any = null;

  ngOnInit(){
    this.data
        .getEquipment()
        .subscribe(data => this.initCards(data));
  }

  initCards(_data_: Equip[]){
    this.search.setData(_data_);
    this.setShownCards(_data_);
    setTimeout(() => this.loading = false, 500);
  }

  setShownCards(_data_: Equip[]){
    this.cards = _data_.slice(0, this.limitCount);
  }

  addMore(amountToAdd: number | null = null){

    const myData: Equip[] = this.search.getSearchResults(this.filter) as Equip[];

    this.limitCount = amountToAdd  == null ?  myData.length : this.limitCount + amountToAdd;
        
    myData.slice(0, this.limitCount).forEach(equip => {
      if(this.cards.find(card => card.name == equip.name) == undefined){
        this.cards.push(equip)
      }
    })
  }

  filterSearched(event: Equip){
    if(this.debounce != null){
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => this.doFilterSearch(event), 150);
  }

  private doFilterSearch(event: Equip){
    this.debounce = null;
    this.filter = event;  
    this.setShownCards(this.search.getSearchResults(event) as Equip[]);
  }
}
