import { Component, Input } from '@angular/core';
import { Spell } from '../../spell';
import { NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-spell-card',
  standalone: true,
  imports: [NgIf, MatExpansionModule],
  templateUrl: './spell-card.component.html',
  styleUrl: './spell-card.component.scss'
})
export class SpellCardComponent {
  @Input() data: Spell;
  showDescription: boolean = false;

  public toStr(){
    return JSON.stringify(this.data);
  }
}
