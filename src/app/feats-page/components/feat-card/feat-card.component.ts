import { Component, Input } from '@angular/core';
import { Feat } from '../../feat';
import { NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-feat-card',
  standalone: true,
  imports: [NgIf, MatExpansionModule],
  templateUrl: './feat-card.component.html',
  styleUrl: './feat-card.component.scss'
})
export class FeatCardComponent {
  @Input() data: Feat;
  showDescription: boolean = false;

  public toStr(){
    return JSON.stringify(this.data);
  }
}
