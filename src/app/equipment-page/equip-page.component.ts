import { Component, OnInit } from '@angular/core';
import { Equip } from './equip';
import { CommonModule } from '@angular/common';
import { EquipCardComponent } from './components/equip-card/equip-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';

@Component({
  selector: 'fiveE-archive-equips-page',
  standalone: true,
  imports: [CommonModule, EquipCardComponent,CardContainerComponent],
  templateUrl: './equip-page.component.html',
  styleUrl: './equip-page.component.scss'
})
export class EquipsPageComponent implements OnInit {
  constructor(private http: HttpClient){}
  public equips: Equip[] = []
  private pristineCopy: Equip[] = [];

  ngOnInit(){
    this.http.get('assets/equipment.json', {responseType: 'json'})
    .subscribe(data => {
      this.pristineCopy = JSON.parse(JSON.stringify(data));
      this.setShownEquips(data as Equip[]);
  });
  }

  setShownEquips(_data_: Equip[]){
    this.equips = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Event){

    const searchTerm: string = (event.target as HTMLInputElement).value.toLowerCase();

    if(searchTerm == ''){
      this.setShownEquips(this.pristineCopy);
    } else {
      const newEquips = this.pristineCopy.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownEquips(newEquips);
    }
  }
}
