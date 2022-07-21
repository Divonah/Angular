import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ProjectService } from '../projectservice';

@Component({
  selector: 'app-overallstatus',
  templateUrl: './overallstatus.component.html',
  styleUrls: ['./overallstatus.component.css']
})
export class OverallstatusComponent implements OnInit {
  

  constructor(private service: ProjectService) {
  }

  ngOnInit(): void {
  }



}


