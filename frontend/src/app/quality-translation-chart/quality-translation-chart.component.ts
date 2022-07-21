
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProjectService } from '../projectservice';
import {ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quality-translation-chart',
  templateUrl: './quality-translation-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./quality-translation-chart.component.css'],
})
export class QualityTranslationChartComponent implements OnInit {
  
  //For using Chart Update.
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

 //Quality_ARRAY declaration for storing Quality status count.
  Quality_ARRAY: any[] = [];
  i: any;

  //Assign project title
  id: any;

  //To get the current Url
  private routeSub!: Subscription;

  //Service and Routing declared in constructor.
  constructor(private service: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    //Getting activated or current url. For example (http://localhost:4200/statuscheck/:SuperHMI_X)
    this.routeSub = this.route.params.subscribe((params) => {
      
       //For getting particular id from Url. For example(SuperHMI_x)
      this.id = params['id']; 

      //Function call
      this.getData();
    });
  }

  getData() {

    //Service
    //Getting Quality status count.

    this.service.getTranslationQualitycount(this.id).subscribe((data) => {
      this.Quality_ARRAY.length = 0;
      for (this.i = 0; this.i < data.length; this.i++) {

         //Pushing all the Quality status for particular project into Quality_Array.
        this.Quality_ARRAY.push(data[this.i].Quality_status);
      }

      //Pushing project title into De_ARRAY 
      this.Quality_ARRAY.push(this.id);
      setTimeout(() => {
        this.chart.update();
      }, 500);
    });
  }

  //Quality status pie chart
  piechart3: ChartData = {
    labels: [
      'Proof Reader Failed',
      'Proof Reader Ok',
      'Review Failed',
      'Review Ok',
      'Under Proof Reader',
      'Under Review',
    ],
    datasets: [
      {
        label: 'Quality Status',
        data: this.Quality_ARRAY,
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

// Canva chart option
  chartOptions3: ChartOptions = {
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
        position: 'left',
        align: 'center',
        title: {
          display: true,
          text: 'Quality Status',
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
