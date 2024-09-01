import { Component, OnInit } from '@angular/core';
import { Feat } from './feat';
import { CommonModule } from '@angular/common';
import { FeatCardComponent } from './components/feat-card/feat-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchBarFeatComponent } from '../shared/search-bar/search-bar.component';
import { SearchService } from '../shared/services/search/search.service';

@Component({
  selector: 'fiveE-archive-feats-page',
  standalone: true,
  imports: [CommonModule, FeatCardComponent, CardContainerComponent, SearchBarFeatComponent],
  templateUrl: './feat-page.component.html',
  styleUrl: './feat-page.component.scss'
})
export class FeatsPageComponent implements OnInit {
  constructor(private http: HttpClient, private search: SearchService){}
  public feats: Feat[] = []
  private debounce: any = null;
  
  ngOnInit(){
    this.http.get('assets/feats.json', {responseType: 'json'})
        .subscribe(data => {
          this.search.setData(data);
          this.setShownFeats(data as Feat[]);
        });
     
  }

  setShownFeats(_data_: Feat[]){
    this.feats = JSON.parse(JSON.stringify(_data_));
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
      this.setShownFeats(this.search.getSearchResults(params) as Feat[]);
    }
}
