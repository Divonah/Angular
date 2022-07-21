import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Project } from '../project';
import { ProjectService } from '../projectservice';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overallchart',
  templateUrl: './overallchart.component.html',
  styleUrls: ['./overallchart.component.css'],
})
export class OverallChartComponent implements OnInit {
  
  //For using Chart Update.
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  //MainArray declaration for storing overall data.
  MainArray: any[] = new Array();
  
  //Columnnames declaration for storing translation language data for particular project.
  columnnames: any[] = [];

  // Variable declaration
  name: any = '';
  id: any;
  i: any;

  public counts = [
    'Locked',
    'Unworked',
    'Work InProgress',
    'Error',
    'Ok',
    'Completed',
  ];

  //To get the current Url
  private routeSub!: Subscription;

  //Service and Routing declared in constructor.
  constructor(private service: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    //Getting activated or current url. For example (http://localhost:4200/statuscheck/:SuperHMI_X)
    this.routeSub = this.route.params.subscribe((params) => {
      
      //For getting particular id from Url. For example(SuperHMI_x)
      this.id = params['id']; 
      this.name = this.id;

      //Function call
      this.getData();
      this.chartOptions;
    });
  }

  //After executing it will clear or destroy the memory
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getData() {

    //Service
    //Getting Total columns from database
    this.service.getTotalColumns(this.id).subscribe((data) => {
      this.columnnames.length = 0;
      for (this.i = 0; this.i < data.length; this.i++) {
        
        //Checking condition to get all the translation status only for particular project
        if(data[this.i].Field.endsWith('_status')) {
          
          //Pushing all the translation language for particular project into columnnames.
          this.columnnames.push(data[this.i].Field);
        }
      }

      //Service
      //Getting overall data by column names and particular project

      this.service.getOverallData(this.columnnames, this.id).subscribe((data) => {
          this.MainArray = data;

          //To Assign overall data into piechart dataset.
          //It will send the data to piechart dataset.

          this.piechart.datasets[0].data = this.MainArray;

          //It will automatically update the Chart when the page refreshing.

          this.chart.update();
        });
    });
  }

  //overall piechart
  piechart: ChartData = {
    labels: ['Completed', 'Error', 'Locked', 'Ok', 'Unwork', 'Work_Inprogress'],
    datasets: [
      {
        label: 'Overall',
        data: [],
        backgroundColor: [
          'rgb(168,212,204)',
          '#f0c44c',
          '#789ca4',
          '#f0dcd4',
          '#e04c64',
          '#403c54',
        ],
        hoverBackgroundColor: [
          'rgb(168,212,204)',
          '#f0c44c',
          '#789ca4',
          '#f0dcd4',
          '#e04c64',
          '#403c54',
        ],
        tension: 0.5,
      },
    ],
  };

//To show the Actual title and etc.

  chartOptions: ChartOptions = {
    layout: {
      padding: 20,
    },

    responsive: true,
  
    // To disable default sizing for ng2-chart
    maintainAspectRatio: false,
    plugins: {
      tooltip: {

        // To display additional label before value 
        callbacks: {
          beforeTitle: function (context) {
            var index = context[0].dataset.data.length;
            return `${context[0].dataset.data[index - 1]}`;
          },
          title: function (context) {
            return `${context[0].dataset.label}`;
          },
        },
      },
       //To display additional label before value 
      legend: {
        position: 'top',
        align: 'center',
        title: {
          display: true,
          text: this.name,
          font: {
            size: 15,
            weight: 'bold',
          },
        },
        labels: {
          color: 'black',
        },
      },
    },
  };
}
