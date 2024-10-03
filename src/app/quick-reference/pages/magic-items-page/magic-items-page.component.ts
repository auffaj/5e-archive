import { Component, OnInit } from '@angular/core';
import { MagicItem } from './magic-item';
import { CommonModule } from '@angular/common';
import { MagicItemCardComponent } from './components/magic-item-card/magic-item-card.component';
import { CardContainerComponent } from '../../../shared/card-container/card-container.component';
import { SearchService } from '../../../shared/services/search/search.service';
import { SearchBarMagicItemComponent } from '../../../shared/search-bar/search-bar.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DataService } from '../../../shared/services/data/data.service';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { NgScrollbarModule } from 'ngx-scrollbar';

const IMPORTS = [CommonModule,
                 MagicItemCardComponent,
                 CardContainerComponent,
                 SearchBarMagicItemComponent,
                 MatProgressBar,
                 MatButton,
                 MatTooltip,
                 NgScrollbarModule]

@Component({
  selector: 'fiveE-archive-magic-items-page',
  standalone: true,
  imports: IMPORTS,
  providers:[DataService],
  templateUrl: './magic-items-page.component.html',
  styleUrl:    './magic-items-page.component.scss'
})
export class MagicItemsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public cards: MagicItem[] = []
  private debounce: any = null;
  public limitCount: number = 20;
  private filter: any;
  public totalItems: number = 0;
  public loading: boolean = true;

  ngOnInit(){
    this.data.getMagicItems()
    .subscribe(data => this.initCards(data));
  }

  initCards(data: MagicItem[]){
    this.search.setData(data);
    this.setShownCards(this.search.getSearchResults() as MagicItem[]);

    setTimeout(() => this.loading = false, 500);
  }

  setShownCards(_data_: MagicItem[]){
    this.cards = _data_.slice(0, this.limitCount);
  }

  addMore(amountToAdd: number | null = null){
    const myData: MagicItem[] = this.search.getSearchResults(this.filter) as MagicItem[];

    this.limitCount = amountToAdd  == null ?  myData.length : this.limitCount + amountToAdd;

    myData.slice(0, this.limitCount).forEach(item => {
      if(this.cards.find(card => card.name == item.name) == undefined){
        this.cards.push(item)
      }
    })
  }

  /**
    Queue search with debounce
  */
  filterSearched(event: MagicItem){
    if(this.debounce != null){
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => this.doFilterSearch(event), 150);
  }

  private doFilterSearch(event: MagicItem){
    this.debounce = null;
    this.filter = event;
    this.setShownCards(this.search.getSearchResults(event) as MagicItem[]);
  }
}
