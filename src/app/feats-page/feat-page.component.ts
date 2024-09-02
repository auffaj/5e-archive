import { Component, OnInit } from '@angular/core';
import { Feat } from './feat';
import { CommonModule } from '@angular/common';
import { FeatCardComponent } from './components/feat-card/feat-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchBarFeatComponent } from '../shared/search-bar/search-bar.component';
import { SearchService } from '../shared/services/search/search.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'fiveE-archive-feats-page',
  standalone: true,
  imports: [CommonModule, FeatCardComponent, CardContainerComponent, SearchBarFeatComponent, MatProgressBar],
  templateUrl: './feat-page.component.html',
  styleUrl: './feat-page.component.scss'
})
export class FeatsPageComponent implements OnInit {
  constructor(private http: HttpClient, private search: SearchService){}
  public feats: Feat[] = []
  private debounce: any = null;

  public loading: boolean = true;
  
  ngOnInit(){
    this.http.get('assets/feats.json', {responseType: 'json'})
        .subscribe(data => {
          this.search.setData(data);
          this.setShownFeats(data as Feat[]);
          setTimeout(() => this.loading = false, 500);
        });
     
  }

  setShownFeats(_data_: Feat[]){
    this.feats = JSON.parse(JSON.stringify(_data_));
  }

  /**
    Queue search with debounce
  */
    filterSearched(event: Feat){
      if(this.debounce != null){
        clearTimeout(this.debounce);
      }
  
      this.debounce = setTimeout(() => this.doFilterSearch(event), 150);
    }
  
    private doFilterSearch(event: Feat){     
      this.debounce = null;
      this.setShownFeats(this.search.getSearchResults(event) as Feat[]);
    }
}
