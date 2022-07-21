import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../projectservice';
import { Router} from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

// var fs = require('fs');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  // Array declaration
  projectdetails!: Project[];
  projectnamearray!: Project[];
  displayBasic!: boolean;
  uploadedFiles: any[] = [];
  status: any;
  msgs!:Message[];
  filename:any;
  isDisabled:boolean = true;
  localpath:any;


  // Declare variables
  num1:number=0;
  num2:number=0;
  total:number=0;
  message:String="";

  // Service and router declared inside constructor
  constructor(private http:HttpClient,private projectService: ProjectService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllProjectDetails();
  }

  // Sum of two values function
  sum(){
    console.log(this.num1 + this.num2);
    this.total = this.num1 + this.num2;
  }

  // For uploading project
  showDialog() {
    this.displayBasic = true;
  }

  

   // Multiple file
   upload(event: any){
    const files: FileList = event.target.files;

    // this.localpath = files.__dirname
    console.log(files)
    // To get the filename
    this.filename = "File uploaded count : " +files.length 

    if(files.length >=1){
      this.isDisabled = false;
    }

    const formdata = new FormData();
    for(let index = 0; index < files.length; index++){
      const element = files[index]
      formdata.append('files', element);
    }
    
    this.http.post('http://localhost:5555/multiplefiles', formdata).subscribe((data)=>{
      this.status= data
    }, error=>{
      console.error(error);
    })

  }


  updated(){
    this.displayBasic = false;
    if(this.status.type =="error"){
      this.messageService.add({severity:'error', summary:'Error', detail:this.status.msg,life:2000});
    }
    else{
      this.messageService.add({severity:'success', summary:'Success', detail:this.status.msg,life:2000});
     
    }
    setTimeout(() => {
      window.location.reload();
    }, 2500);

}

  // Service called for obtaining all table values and stored it inside projectdetails array
  getAllProjectDetails() {
    this.projectService.getAllProjectDetails().subscribe((data) => {
      this.projectdetails = data;
    });
  }

  //Router with projectname inside state is passed to another page
  getProjectTitle(data: any) {
    this.router.navigateByUrl('/statuscheck/:' + data.name, {
      state: { projectData: data.name },
    });
  }
}
