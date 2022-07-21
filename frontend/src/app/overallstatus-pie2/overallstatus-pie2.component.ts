import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProjectService } from '../projectservice';

@Component({
  selector: 'app-overallstatus-pie2',
  templateUrl: './overallstatus-pie2.component.html',
  styleUrls: ['./overallstatus-pie2.component.css']
})
export class OverallstatusPie2Component implements OnInit {
  
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  // Variable and array declaration
  projectname: any[] = new Array();
  context: any;

  // Service declared inside constructor 
  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    this.getdata()
  }

// Get data function 
  getdata() {
    // Gets total number of project name from service
    this.service.getProjectTitle().subscribe(data => {
      this.projectname = data;

    //Gets individual language status for each project
      this.service.getOverallDataPie(this.projectname).subscribe(data => {
        // datas of subarray is accordingly stored inside dataset index position
        this.pielanguage.datasets[0].data = data[0]
        this.pielanguage.datasets[1].data = data[1]
        this.pielanguage.datasets[2].data = data[2]
        this.pielanguage.datasets[3].data = data[3]
        this.pielanguage.datasets[4].data = data[4]
        // Chart update
        this.chart.update();

      })

    })
  }
  // Canva data
  pielanguage: ChartData =
    {
      labels: ['Completed', 'Error', 'Locked', 'Ok', 'Unwork', 'Work_Inprogress'],
      datasets: [
        {
          label: 'HMIL-VW', data: [],
          backgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ],
          hoverBackgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ],
          tension: 0.5,
        },
        {
          label: "MIB 1", data: [],
          backgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ],
          hoverBackgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ],
          tension: 0.5
        },
        {
          label: 'Super HMIL', data: [],
          backgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ],
          hoverBackgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ], tension: 0.5
        },
        {
          label: 'SuperHMI_X', data: [],
          backgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ],
          hoverBackgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ], tension: 0.5
        },
        {
          label: 'Taul', data: [],
          backgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ],
          hoverBackgroundColor: [
            "#82C272", "#00A88F", "#0087AC", "#005FAA", "#3AA5D1",
            "#323B81"
          ], tension: 0.5
        },
      ],

    };


  // Canva Chart Options
  chartOptionspie: ChartOptions = {
    layout: {
      padding: 20
    },
    responsive: true,
    // To disable default sizing for ng2-chart
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        // To display additional label before value 
        callbacks:
        {
          title: function (context) {
            return `${context[0].dataset.label}`
          },
        }
      },
      // Title and its label description
      legend: {
        position: 'top',
        align: 'center',
        title: {
          display: true,
          text: 'Overall Status for Project',
          font: {
            size: 15,
            weight: 'bold',
          },

        },
        labels: {
          color: 'black',
        }

      },


    }
  };


}
