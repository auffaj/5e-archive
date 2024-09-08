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
  public magic_items: MagicItem[] = []
  private debounce: any = null;

  public loading: boolean = true;

  ngOnInit(){
    this.data.getMagicItems()
    .subscribe(data => {
      this.search.setData(data);
      this.setShownMagicItems(this.search.getSearchResults() as MagicItem[]);

      setTimeout(() => this.loading = false, 500);
  });
  }

  setShownMagicItems(_data_: MagicItem[]){
    this.magic_items = _data_;
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
    this.setShownMagicItems(this.search.getSearchResults(event) as MagicItem[]);
  }
}
