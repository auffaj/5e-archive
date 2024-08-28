import { Component, OnInit } from '@angular/core';
import { MagicItem } from './magic-item';
import { CommonModule } from '@angular/common';
import { MagicItemCardComponent } from './components/magic-item-card/magic-item-card.component';
import { HttpClient } from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'; 

@Component({
  selector: 'fiveE-archive-magic-items-page',
  standalone: true,
  imports: [CommonModule, MagicItemCardComponent, ScrollingModule],
  providers:[CdkVirtualScrollViewport],
  templateUrl: './magic-items-page.component.html',
  styleUrl:    './magic-items-page.component.scss'
})
export class MagicItemsPageComponent implements OnInit {
  constructor(private http: HttpClient){}
  public magic_items: MagicItem[] = []
  private pristineCopy: MagicItem[] = [];

  private debounce: any = null;

  ngOnInit(){
    this.http.get('assets/magic_items.json', {responseType: 'json'})
    .subscribe(data => {
      this.pristineCopy = JSON.parse(JSON.stringify(data));
      this.setShownMagicItems(data as MagicItem[]);
  });
  }

  setShownMagicItems(_data_: MagicItem[]){
    this.magic_items = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Event){

    const searchTerm: string = (event.target as HTMLInputElement).value.toLowerCase();

    // manual debounce function
    if(this.debounce != null){
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => this.doFilterSearch(searchTerm), 500);
  }

  private doFilterSearch(searchTerm: string){
    if(searchTerm == ''){
      this.setShownMagicItems(this.pristineCopy);
    } else {
      const newMagicItems = this.pristineCopy.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownMagicItems(newMagicItems);
    }
  }
}
