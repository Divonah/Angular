import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  ProjectService } from './projectservice';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { SplitterModule } from "primeng/splitter";
import { MegaMenuModule } from 'primeng/megamenu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {FileUploadModule} from 'primeng/fileupload';
import { StackchartComponent } from './stackchart/stackchart.component';
import { TranslateTestComponent } from './translate-test/translate-test.component';
import { OverallChartComponent } from './overallchart/overallchart.component';
import { StackpieComponent } from './stackpie/stackpie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverallstatusComponent } from './overallstatus/overallstatus.component';
import { DeTranslationChartComponent } from './de-translation-chart/de-translation-chart.component';
import { QualityTranslationChartComponent } from './quality-translation-chart/quality-translation-chart.component';
import { OverallstatusPie1Component } from './overallstatus-pie1/overallstatus-pie1.component';
import { OverallstatusPie2Component } from './overallstatus-pie2/overallstatus-pie2.component';
import { OverallstatusBar1Component } from './overallstatus-bar1/overallstatus-bar1.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
@NgModule({
  declarations: [
    AppComponent,
    StackchartComponent,
    TranslateTestComponent,
    OverallChartComponent,
    StackpieComponent,
    DashboardComponent,
    OverallstatusComponent,
    DeTranslationChartComponent,
    QualityTranslationChartComponent,
    OverallstatusPie1Component,
    OverallstatusPie2Component,
    OverallstatusBar1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    ConfirmDialogModule,
    NgChartsModule,
    SplitterModule,
    MegaMenuModule ,
    ScrollingModule,
    ScrollPanelModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [ProjectService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
