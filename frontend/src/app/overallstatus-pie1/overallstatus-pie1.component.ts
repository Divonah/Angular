import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProjectService } from '../projectservice';

@Component({
  selector: 'app-overallstatus-pie1',
  templateUrl: './overallstatus-pie1.component.html',
  styleUrls: ['./overallstatus-pie1.component.css']
})
export class OverallstatusPie1Component implements OnInit {

  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  // Variable and array declaration
  projectname: any[] = new Array();
  context: any

  // Service declared inside constructor 
  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    this.getdata()
  }

  // Get data function 
  getdata() {
    // Gets number of project name from service
    this.service.getProjectTitle().subscribe(data => {
      this.projectname = data;

    //Gets individual editorial,status,translation count for each project
      this.service.getOverallTable_Pie(this.projectname).subscribe(data => {
        
        // datas of subarray is accordingly stored inside dataset index position
        this.pie_project.datasets[0].data = data[0]
        this.pie_project.datasets[1].data = data[1]
        this.pie_project.datasets[2].data = data[2]
        this.pie_project.datasets[3].data = data[3]
        this.pie_project.datasets[4].data = data[4]
        // Chart update
        setTimeout(() => {
          this.chart.update();
        }, 500)
      })


    })

  }
  // Canva data
  pie_project: ChartData =
    {
      labels: ['Editorial', 'Status', 'Translation',],
      datasets: [
        {
          label: 'HMIL', data: [],
          backgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ],
          hoverBackgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ],
          tension: 0.5,
        },
        {
          label: "MIB 1", data: [],
          backgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ],
          hoverBackgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ],
          tension: 0.5
        },
        {
          label: 'Super HMIL', data: [],
          backgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ],
          hoverBackgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ], tension: 0.5
        },
        {
          label: 'SuperHMI_X', data: [], backgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ],
          hoverBackgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ], tension: 0.5
        },
        {
          label: 'Taul', data: [], backgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ],
          hoverBackgroundColor: [
            'rgb(168,212,204)',
            "#e04c64",
            "#403c54",
          ], tension: 0.5
        },
      ],

    };

// Canva chart Options
  chartOptions: ChartOptions = {
    layout: {
      padding: 30
    },
    responsive: true,
    
    // To disable default sizing for ng2-chart
    maintainAspectRatio: false,

    plugins: {
      tooltip: {
        
        // To display additional label before value 
        callbacks:
        {
          beforeTitle: function (context) {
            return `${context[0].dataset.label}`

          },
        }
      },
      
      // Title and its label description
      legend: {
        position: 'left',
        align: 'center',
        title: {
          display: true,
          text: 'Project Details',
          font: {
            size: 18,
            weight: 'bold',
          },
          padding: {
            top: 10,
            bottom: 20,
          }

        },
        labels: {
          color: 'black',
        }

      },

    }
  };

}
