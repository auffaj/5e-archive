import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MagicItem } from './magic-item';
import { CommonModule } from '@angular/common';
import { MagicItemCardComponent } from './components/magic-item-card/magic-item-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchService } from '../shared/services/search/search.service';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';

@Component({
  selector: 'fiveE-archive-magic-items-page',
  standalone: true,
  imports: [CommonModule, MagicItemCardComponent, CardContainerComponent, SearchBarComponent],
  templateUrl: './magic-items-page.component.html',
  styleUrl:    './magic-items-page.component.scss'
})
export class MagicItemsPageComponent implements OnInit {
  constructor(private http: HttpClient, private search: SearchService){}
  public magic_items: MagicItem[] = []
  private debounce: any = null;

  public searchBarConfig = new MagicItem();

  ngOnInit(){
    this.http.get('assets/magic_items.json', {responseType: 'json'})
    .subscribe(data => {
      this.search.setData(data);
      this.setShownMagicItems(this.search.getSearchResults() as MagicItem[]);
  });
  }

  setShownMagicItems(_data_: MagicItem[]){
    this.magic_items = _data_;
  }

  /**
    Queue search with debounce
  */
  filterSearched(event: Event){
    if(this.debounce != null){
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => this.doFilterSearch(event), 150);
  }

  private doFilterSearch(event: Event){
    const nameSearchTerm: string = event.toString().toLowerCase();

    const params: {searchKey: string, searchValue: any}[] = []

    if(!!nameSearchTerm){

      params.push({
        searchKey:"name",
        searchValue: nameSearchTerm
      })
    }
    
    this.debounce = null;
    this.setShownMagicItems(this.search.getSearchResults(params) as MagicItem[]);
  }
}
