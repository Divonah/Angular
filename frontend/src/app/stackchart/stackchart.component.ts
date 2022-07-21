import { ChangeDetectionStrategy, Component,OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Project } from '../project';
import { ProjectService } from '../projectservice';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stackchart',
  templateUrl: './StackChart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./StackChart.component.css']
})

export class StackchartComponent implements OnInit{
  
  //For using Chart Update.
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  // Column name array to store selected projectname column
  columnnames:any[]=[];

  //Assign project title
  id:any;
  
  // Variable declaration
  value_stack:any;
  i:any;
  pieTitle:string='';  

  //To get the current Url
  private routeSub!: Subscription;

  //Service and Routing declared in constructor.
  constructor(private service: ProjectService,private route: ActivatedRoute) {
    
  }
  
  ngOnInit(): void {
    
    //Getting activated or current url. For example (http://localhost:4200/statuscheck/:SuperHMI_X)
    this.routeSub = this.route.params.subscribe(params => {
             
      //For getting particular id from Url. For example(SuperHMI_x)
      this.id =params['id'] //log the value of id
      
      //Function call
      this.getData();
      this.chartClicked('fr_FR-status');
    });     
  }
    
  getData(){
    
    //Service
    //Getting Column name for specified projectname.
      this.service.getTotalColumns(this.id).subscribe(data => {
        this.columnnames.length = 0;
        for (this.i = 0; this.i < data.length; this.i++) {
          
          if (data[this.i].Field.endsWith('_status')) {
            //Pushing all the  respective columnname for particular project into array name columname.
            this.columnnames.push(data[this.i].Field);
          }
        }

        // datas of subarray is accordingly stored inside dataset index position
        this.service.getStackData(this.columnnames,this.id,).subscribe(data => {
          this.stacked_bar_project.datasets[0].data = data[0];
          this.stacked_bar_project.datasets[1].data = data[1];
          this.stacked_bar_project.datasets[2].data = data[2];
          this.stacked_bar_project.datasets[3].data = data[3];
          this.stacked_bar_project.datasets[4].data = data[4];
          this.stacked_bar_project.datasets[5].data = data[5];

           // Chart update
          this.chart.update()
          
          })
        })
    }

// Event handler function to pass its valuestack index position to respective component
public chartClicked(e: any): void {
  this.value_stack = e.active[0].index;

  // Value stack passed inside service
  this.service.sendStackvalue(this.value_stack);

  this.pieTitle=this.columnnames[this.value_stack];
  this.pieTitle.toUpperCase();
}
    
// Canva data
  stacked_bar_project: ChartData = {
    labels: this.columnnames,      
    datasets: [
      { label: 'Completed', data:[],stack:"a", backgroundColor: [
        "#82C272",
    ],
    hoverBackgroundColor: [
      "#82C272",
    ], tension: 0.5 },
    { label: 'Error', data:[],stack:"a", backgroundColor: [
      "#00A88F",
  ],
  hoverBackgroundColor: [
    "#00A88F",
  ], tension: 0.5 },
        { label: 'Locked', data:[],stack:"a", backgroundColor: [
          "#0087AC",
      ],
      hoverBackgroundColor: [
        "#0087AC",
      ], tension: 0.5 },

        { label: 'Ok', data:[] ,stack:"a",backgroundColor: [
          "#005FAA",
      ],
      hoverBackgroundColor: [
        "#005FAA",
      ], tension: 0.5 },
      { label: 'Unworked', data:[],stack:"a", backgroundColor: [
        "#3AA5D1",
    ],
    hoverBackgroundColor: [
      "#3AA5D1",
    ], tension: 0.5 },
        { label: 'Work_Inprogress', data:[],stack:"a",backgroundColor: [
          "#323B81",
      ],
      hoverBackgroundColor: [
        "#323B81",
      ], tension: 0.5 },
       
      ],
     
    };

// Canva chart option
    chartOptions_stack: ChartOptions = {
      layout: {
        padding: 30
      },
      events: ['mouseover','click'],
      responsive: true,

      // To disable default sizing for ng2-chart
      maintainAspectRatio: false,
      
      plugins: {
        tooltip:{

          // To display additional label before value 
          callbacks:
          {
            title:function(context){
              return `${context[0].label}`
            },
          }
          
        },
         // To display additional label before value 
        legend:{
          position: 'top',
          align:'center',
            title: {
              display: true,
              text: 'Language Translation',
              font:{
                  size:15,
                  weight:'bold',
              },
              
            },
            labels: {
              color: 'black',
            }
        },
  
      }
    };

    
}
