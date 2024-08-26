import { Component, Input } from '@angular/core';
import { Equip } from '../../equip';
import { NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-equip-card',
  standalone: true,
  imports: [NgIf, MatExpansionModule],
  templateUrl: './equip-card.component.html',
  styleUrl: './equip-card.component.scss'
})
export class EquipCardComponent {
  @Input() data: Equip;
  showDescription: boolean = false;

  public toStr(){
    return JSON.stringify(this.data);
  }
}
