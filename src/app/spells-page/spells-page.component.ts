import { Component, OnInit } from '@angular/core';
import { Spell } from './spell';
import { CommonModule } from '@angular/common';
import { SpellCardComponent } from './components/spell-card/spell-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';

@Component({
  selector: 'fiveE-archive-spells-page',
  standalone: true,
  imports: [CommonModule, SpellCardComponent, CardContainerComponent],
  providers:[HttpClient],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss'
})
export class SpellsPageComponent implements OnInit {
  constructor(private http: HttpClient){}
  public spells: Spell[] = []
  private pristineSpells: Spell[] = []

  ngOnInit(){
    this.http.get('assets/spells.json', {responseType: 'json'})
        .subscribe(data => {
          this.pristineSpells = JSON.parse(JSON.stringify(data));
          this.setShownSpells(data as Spell[]);
        });
     
  }

  setShownSpells(_data_: Spell[]){
    this.spells = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Event){

    const searchTerm: string = (event.target as HTMLInputElement).value.toLowerCase();

    if(searchTerm == ''){
      this.setShownSpells(this.pristineSpells);
    } else {
      const newSpells = this.pristineSpells.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownSpells(newSpells);
    }
  }
}
