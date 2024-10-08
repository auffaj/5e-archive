import { Component, OnInit } from '@angular/core';
import { Feat } from './feat';
import { CommonModule } from '@angular/common';
import { FeatCardComponent } from './components/feat-card/feat-card.component';
import { CardContainerComponent } from '../../../shared/card-container/card-container.component';
import { SearchBarFeatComponent } from '../../../shared/search-bar/search-bar.component';
import { SearchService } from '../../../shared/services/search/search.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DataService } from '../../../shared/services/data/data.service';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { NgScrollbarModule } from 'ngx-scrollbar';

const IMPORTS = [CommonModule,
                 FeatCardComponent,
                 CardContainerComponent,
                 SearchBarFeatComponent,
                 MatProgressBar,
                 MatButton,
                 MatTooltip,
                 NgScrollbarModule]

@Component({
  selector: 'fiveE-archive-feats-page',
  standalone: true,
  imports: IMPORTS,
  providers:[DataService],
  templateUrl: './feat-page.component.html',
  styleUrl: './feat-page.component.scss'
})
export class FeatsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public cards: Feat[] = []
  public loading: boolean = true;
  public totalItems: number = 0;
  public addMoreCount: number = 25;
  public limitCount: number = 25;
  private debounce: any = null;
  private filter: any = null;
  
  ngOnInit(){
    this.data.getFeats()
        .subscribe(data => this.initCards(data));
  }

  initCards(_data_: Feat[]){
    this.search.setData(_data_);
    this.setShownCards(_data_);
    this.totalItems = _data_.length;
    setTimeout(() => this.loading = false, 500);
  }

  setShownCards(_data_: Feat[]){
    this.cards = _data_.slice(0, this.limitCount);
  }

  
  addMore(amountToAdd: number | null = null){
    const myData: Feat[] = this.search.getSearchResults(this.filter) as Feat[];

    this.limitCount = amountToAdd  == null ?  myData.length : this.limitCount + amountToAdd;
    
    myData.slice(0, this.limitCount).forEach(feat => {
      if(this.cards.find(card => card.name == feat.name) == undefined){
        this.cards.push(feat)
      }
    })
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
      this.filter = event;
      this.setShownCards(this.search.getSearchResults(event) as Feat[]);
    }
}
