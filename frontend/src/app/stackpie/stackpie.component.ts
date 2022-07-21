import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Project } from '../project';
import { ProjectService } from '../projectservice';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stackpie',
  templateUrl: './stackpie.component.html',
  styleUrls: ['./stackpie.component.css']
})
export class StackpieComponent implements OnInit {

  //For using Chart Update.
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  // Variable declaration
  value_stack: any;
  i: any;
  edited: boolean = false;
  pieTitle: string = '';

  //Assign project title
  id: any;

  // Column name array to store selected projectname column
  columnnames: any[] = [];

  //To get the current Url
  private routeSub!: Subscription;

  //Service and Routing declared in constructor.
  constructor(private service: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    //Getting activated or current url. For example (http://localhost:4200/statuscheck/:SuperHMI_X)
    this.routeSub = this.route.params.subscribe(params => {

      //For getting particular id from Url. For example(SuperHMI_x)
      this.id = params['id'] //log the value of id

      //Function call
      this.getData();
      this.chartChanges();
    });
  }

  getData() {

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
    })
  }



  chartChanges() {
    this.service._Message$.subscribe(data => {

      //Variable declared to show heading of pie and its canva at sametime 
      this.edited = true;
      this.value_stack = data;
      this.pieTitle = this.columnnames[this.value_stack];
      this.pieTitle.toUpperCase();
      // datas of subarray is accordingly stored inside dataset index position
      this.service.getStackPieData(this.columnnames[this.value_stack], this.id).subscribe(data => {
        this.stackpie.datasets[0].data = data;

        // Chart update
        setTimeout(() => {
          this.chart.update();
        }, 500)
      })
    })
  }

  // Canva data
  stackpie: ChartData =
    {
      labels: ['Completed', 'Error', 'Locked', 'Ok', 'Unwork', 'Work_Inprogress'],
      datasets: [
        {
          label: '',
          data: [],
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

      ],
    }

  // Canva chart option
  chartOptions_stackpie: ChartOptions = {
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
        },
      },

      //To display additional label before value 
      legend: {
        position: 'left',
        align: 'center',
        title: {
          display: true,
          text: 'Specific Language',
          font: {
            size: 15,
            weight: 'bold',

          },
        },
        labels: {
          color: 'black',
        },
      },
    }
  };
}
