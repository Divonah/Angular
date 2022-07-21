import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'table';
 
  // Declare variables
  
  total:number=0;

  constructor(public router: Router) {
  }

  items!: MegaMenuItem[];
 
  ngOnInit(): void {

    this.items = [
      {
        label: 'Global', icon: 'pi pi-fw pi-globe',
        items: [
          [
            {

              items: [{ label: 'Dashboard',routerLink:'/dashboard' },{ label: 'Overall Chart',routerLink:'/overallstatus' }]

            },
          ]
        ]
      },
      {
        label: 'Help', icon: 'pi pi-fw pi-question-circle',
        items: [
          [
            {
              label: 'User 1',
              items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
            },
            {
              label: 'User 2',
              items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
            },
          ]
        ]
      },
      {
        label: 'Settings', icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              label: 'Setting 1',
              items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
            },
            {
              label: 'Setting 2',
              items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
            },
            {
              label: 'Setting 3',
              items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
            }
          ],
          [
            {
              label: 'Technology 4',
              items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }]
            }
          ]
        ]
      }
    ]

  }

  
  
  getUrl()
  {
    
    return this.router.url === '/statuscheck';

  }
  isHomeRoute() {

    return this.router.url === '/';

  }
  getOverallUrl(){
    return this.router.url === '/overallstatus';
  }
  getDashboardUrl(){
    return this.router.url === '/dashboard';
  }

  
}
