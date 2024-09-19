import { Component, OnInit } from '@angular/core';
import { MagicItem } from './magic-item';
import { CommonModule } from '@angular/common';
import { MagicItemCardComponent } from './components/magic-item-card/magic-item-card.component';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchService } from '../shared/services/search/search.service';
import { SearchBarMagicItemComponent } from '../shared/search-bar/search-bar.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DataService } from '../shared/services/data/data.service';

@Component({
  selector: 'fiveE-archive-magic-items-page',
  standalone: true,
  imports: [CommonModule, MagicItemCardComponent, CardContainerComponent, SearchBarMagicItemComponent, MatProgressBar],
  providers:[DataService],
  templateUrl: './magic-items-page.component.html',
  styleUrl:    './magic-items-page.component.scss'
})
export class MagicItemsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public cards: MagicItem[] = []
  private debounce: any = null;
  private maxSize: number = 0;
  public limitCount: number = 20;

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

  addMore(){
    this.limitCount += 25;
    
    this.setShownCards(this.search.getSearchResults() as MagicItem[]);
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
    this.setShownCards(this.search.getSearchResults(event) as MagicItem[]);
  }
}
