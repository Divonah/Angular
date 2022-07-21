import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProjectService } from '../projectservice';

@Component({
  selector: 'app-overallstatus-bar1',
  templateUrl: './overallstatus-bar1.component.html',
  styleUrls: ['./overallstatus-bar1.component.css']
})
export class OverallstatusBar1Component implements OnInit {

  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  // Variable and array declaration
  context: any;
  projectname: any[] = new Array();

  // Service declared inside constructor 
  constructor(private service: ProjectService) {
  }

  ngOnInit(): void {
    this.getdata()
  }

  // Get data function 
  getdata() {
    // Gets total number of project name from service
    this.service.getProjectTitle().subscribe(data => {
      this.projectname = data;

      //Gets individual editorial,status,translation count for each project
      this.service.getOverallTable_Bar().subscribe(data => {
        // datas of subarray is accordingly stored inside dataset index position
        this.bar_project.datasets[0].data = data[0]
        this.bar_project.datasets[1].data = data[1]
        this.bar_project.datasets[2].data = data[2]
        // Chart update
        this.chart.update()
      })
    })

  }

  // Canva data
  bar_project: ChartData = {
    labels: ['HMIL-VW', 'MIB 1', 'Super HMIL', 'SuperHMI_X', 'Taul'],
    datasets: [
      {
        label: 'Editorial', data: [], backgroundColor: [
          "rgb(168,212,204)",

        ],
        hoverBackgroundColor: [
          "rgb(168,212,204)",
        ], tension: 0.5
      },
      {
        label: 'Status', data: [], backgroundColor: [
          "#e04c64",
        ],
        hoverBackgroundColor: [
          "#e04c64",
        ], tension: 0.5
      },
      {
        label: 'Translation', data: [], backgroundColor: [
          "#403c54",],
        hoverBackgroundColor: [
          "#403c54",], tension: 0.5
      },

    ],

  };

  // Canva Chart options
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
