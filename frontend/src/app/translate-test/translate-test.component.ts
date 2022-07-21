import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ProjectService } from '../projectservice';

@Component({
  selector: 'app-translate-test',
  templateUrl: './translate-test.component.html',
  styleUrls: ['./translate-test.component.css'],
})
export class TranslateTestComponent implements OnInit {

  //For using Chart Update.
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  //MainArray declaration for storing overall data.
  MainArray: any[] = [];
  //Columnnames declaration for storing translation language data for particular project.
  columnnames: any[] = []
  // Array for projectname
  projectname: any[] = [];

  // Variable declaration
  id: any;
  i: any;
  max: number = 0;
  index: number = 0;

  valuePie: any;
  public orderStatus: any;
 
  public counts = ["Supplier","Editor","Project Manager","Translation Manager","Translator","Proof Reader","Completed"];
  name: any[] = [];

  //To get the current Url
  private routeSub!: Subscription;
  
  //Service and Routing declared in constructor.
  constructor(private service: ProjectService, private router: Router, private route: ActivatedRoute) {
  }

  // Event handler function for projectname dropdown
  select_pie(event: any) {
    this.valuePie = event.target.value;
    this.router.navigateByUrl('/statuscheck/:' + this.valuePie, { state: { projectData: this.valuePie } });
  }


  ngOnInit(): void {
    // Maximum value index is assigned to counts array to show 
    this.orderStatus = this.counts[this.index]
    
    //Getting activated or current url. For example (http://localhost:4200/statuscheck/:SuperHMI_X)
    this.routeSub = this.route.params.subscribe(params => {
      
       //For getting particular id from Url. For example(SuperHMI_x)
       this.id = params['id']; 
        var re = /[:,]/gi;
        var data = this.id.replace(re, "")
        this.valuePie = data;

      //Function call
      this.getData();
    });

    // Service called to get all project title
    this.service.getProjectTitle().subscribe(data => {
      this.projectname = data;

      // ForEach loop identifies the element and its index to hide its repetitive option in dropdown
      this.projectname.forEach((element, index) => {
        if (element == this.valuePie) this.projectname.splice(index, 1);
      });
    })
  }

  getData() {

    
    //Service
    //Getting Total columns from database
    this.service.getTotalColumns(this.id).subscribe(data => {
      this.columnnames.length = 0;
      for (this.i = 0; this.i < data.length; this.i++) {
                
        //Checking condition to get all the translation status only for particular project
        if (data[this.i].Field.endsWith('_status')) {
          
        //Pushing all the translation language for particular project into columnnames.
        this.columnnames.push(data[this.i].Field);
        }
      }

      //Service
      //Getting logined user for progress bar
      this.service.getUserLogin(this.valuePie).subscribe(data => {
      
        // Store value in orderstatus 
        this.orderStatus = data[0]
      })
    })


    // Service called to get all project title
    this.service.getProjectTitle().subscribe(data => {
      this.projectname = data;
     // ForEach loop identifies the element and its index to hide its repetitive option in dropdown
      this.projectname.forEach((element, index) => {
        if (element == this.valuePie)
          this.projectname.splice(index, 1);
      });
    })
  }
}
