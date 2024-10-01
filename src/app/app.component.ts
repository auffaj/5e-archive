import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { QuickReferenceComponent } from './quick-reference/quick-reference.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SplashPageComponent } from './splash-page/splash-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            CommonModule,
            
            SidenavComponent,
            QuickReferenceComponent,
            SplashPageComponent
            ],
  providers:[CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
