import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip'

@Component({
  selector: 'fiveE-archive-sidenav',
  standalone: true,
  imports: [MatIcon, MatTooltip],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
