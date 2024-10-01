import { Component, Input } from '@angular/core';
import { MagicItem } from '../../magic-item';
import { NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-magic-item-card',
  standalone: true,
  imports: [NgIf, MatExpansionModule],
  templateUrl: './magic-item-card.component.html',
  styleUrl: './magic-item-card.component.scss'
})
export class MagicItemCardComponent {
  @Input() data: MagicItem;
  showDescription: boolean = false;

  public toStr(){
    return JSON.stringify(this.data);
  }
}
