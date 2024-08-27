import { Component, OnInit } from '@angular/core';
import { MagicItem } from './magic-item';
import { CommonModule } from '@angular/common';
import { MagicItemCardComponent } from './components/magic-item-card/magic-item-card.component';
import { HttpClient } from '@angular/common/http';
//import data from '../../../public/assets/magic_items.json'

@Component({
  selector: 'fiveE-archive-magic-items-page',
  standalone: true,
  imports: [CommonModule, MagicItemCardComponent],
  templateUrl: './magic-items-page.component.html',
  styleUrl:    './magic-items-page.component.scss'
})
export class MagicItemsPageComponent implements OnInit {
  constructor(private http: HttpClient){}
  public magic_items: MagicItem[]
  private pristineCopy: MagicItem[];

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

    if(searchTerm == ''){
      this.setShownMagicItems(this.pristineCopy);
    } else {
      const newMagicItems = this.pristineCopy.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownMagicItems(newMagicItems);
    }
  }
}
