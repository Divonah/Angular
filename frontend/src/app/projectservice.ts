import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,pipe,Subject } from 'rxjs';


@Injectable()
export class ProjectService {

    //to get the specified projectname
    private source = new Subject<string>();
    Message$=this.source.asObservable();
    
    private _source = new Subject<string>();
    _Message$=this._source.asObservable();


    newvalue:any;
    constructor(private http: HttpClient) { }

    sendStackvalue(data:string){
     this._source.next(data);
    }

    sendMessage(data:string){
        this.source.next(data);
    }

    sendTitle(data:string){
        this.source.next(data);
    }
    
    //Table1 editorial,status,translation for all project 
    getOverallTable_Pie(tablename:any){
        return this.http.get<any>("http://localhost:5555/overalltablepie/"+tablename)
        .pipe(map((data:any)=>{
            return data;
        }))
    }

    getOverallTable_Bar(){
        return this.http.get<any>("http://localhost:5555/overalltablebar")
        .pipe(map((data:any)=>{
            return data;
        }))
    }

    getDummyArray() {
        return this.http.get<any>("http://localhost:5555/translate1")
        .pipe(map((data:any)=>{
            return data;
        }))
    }
// To get projectname in table1
    getAllProjectDetails() {
            return this.http.get<any>("http://localhost:5555")
            .pipe(map((data:any)=>{
                return data;
            }))
        }

    // To get user logined for progress bar
    getUserLogin(data1:any){
        return this.http.get<any>("http://localhost:5555/userlogin/"+data1)
            .pipe(map((data:any)=>{
                return data;
            }))
    }

 getOverallDataPie(tablename:any){
            
        return this.http.get<any>("http://localhost:5555/overallpie/"+tablename)
        .pipe(map((data:any)=>{
            return data;
        }))

    }
    
    getEditorialDetails(){
        return this.http.get<any>("http://localhost:5555/editorial")
        .pipe(map((data:any)=>{
            return data;
        }))
    }

    getLanguageDetails(){
        return this.http.get<any>("http://localhost:5555/language")
        .pipe(map((data:any)=>{
            return data;
        }))
    }
    getProjectName(){
        return this.http.get<any>("http://localhost:5555/projectname")
        .pipe(map((data:any)=>{
            return data;
        }))
    }

    getProjectTitle(){
        return this.http.get<any>("http://localhost:5555/getProjecttitle")
        .pipe(map((data:any)=>{
            return data;
        }))
    }

   
    getOverallData(columnnames:any,tablename:any){
        
        return this.http.get<any>("http://localhost:5555/mainchart/"+columnnames+"/"+tablename)
        .pipe(map((data:any)=>{
            return data;
        }))

    }

    getStackData(columnnames:any,tablename:any){
        
        return this.http.get<any>("http://localhost:5555/stackchart/"+columnnames+"/"+tablename)
        .pipe(map((data:any)=>{
            return data;
        }))

    }

    getStackPieData(columnname:any,tablename:any){
        
        return this.http.get<any>("http://localhost:5555/stackpiechart/"+columnname+"/"+tablename)
        .pipe(map((data:any)=>{
            return data;
        }))

    }

    getTotalColumns(data:any){
        
        return this.http.get<any>("http://localhost:5555/totcolumns/"+data)
        .pipe(map((data:any)=>{
            return data;
        }))

    }

    getTranslationDEcount(data:any){
        return this.http.get<any>("http://localhost:5555/detranslate/"+data)
        .pipe(map((data:any)=>{
            return data;
        }))
    }


    getTranslationFRcount(){ 
        return this.http.get<any>("http://localhost:5555/frtranslate")
        .pipe(map((data:any)=>{
            return data;
        }))
    }

    getTranslationQualitycount(data:any){
        return this.http.get<any>("http://localhost:5555/qualitytranslate/"+data)
        .pipe(map((data:any)=>{
            return data;
        }))
    }

    getMibTranslationQualitycount(){
        return this.http.get<any>("http://localhost:5555/qualitytranslate")
        .pipe(map((data:any)=>{
            return data;
        }))
    }

    

}
