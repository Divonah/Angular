const express = require("express");
const multer = require("multer");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const decompress = require("decompress");
const fs = require('fs');
const path = require('path');

app.use(cors());

const mysql = require("mysql");
var XLSX = require("xlsx");
app.use(bodyparser.json());

// Credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "project",
});

// Db connection
db.connect((err) => {
  if (err) {
    console.log("Database Error!");
  } else {
    console.log("Database connected!...");
  }
});

// To provide destination and filename
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

// To get single file 
// app.post("/singlefile", upload.single("file"), (req, res) => {
//     var file;
  
//     // To get the filename
//     console.log(req.file,'indicate');

//     // To store file details that are uploaded 
//     fs.readFile("./details/filedetails.txt", 'utf8', (err, data) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//       let filedetails ="Filename - "+ req.file.originalname + ", Size - "+req.file.size +", Destination - "+ req.file.path+"\n"
//       console.log(filedetails)

//         // let qry = `insert into filedetail (id,filename,filepath,localpath) values (${id},'${req.file.originalname}','${req.file.path}','${translationstatus}','${name}')`;
//         // db.query(qry,(err,rows)=>{
//         //     if(err){
//         //         console.log("No Data!");
//         //     }else{
//         //         res.send([rows[0].user])
//         //     }
//         // })
//       fs.appendFile("./details/filedetails.txt", filedetails, err2 => {
//         if (err2) {
//           console.log(err2);
//           return;
//         }   
//       });
//     });
    
      
  
//     //To decompress
//     (async () => {
//       try {
//         let index=0;
//         file = await decompress("./uploads/" + req.file.filename, "./extracted");
      
//         // To loop the number of file in one zip
//         for(let j = 0; j < file.length ; j++){
//         // To read the workbook
//         var workbook = XLSX.readFile("./extracted/" + file[j].path);
  
//         // To read first worksheet
//         let worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
//         let tablename=worksheet[`A${1}`].v        

        
//         // Values should start from 3rd index
//         index=3;
//         // Starting from index 3 to directly extract its value
//         while(index>=3){
            
//           const id = worksheet[`A${index}`].v;
//           const languagecode = worksheet[`B${index}`].v;
//           const translation = worksheet[`C${index}`].v;
//           const translationstatus = worksheet[`D${index}`].v;
//           const name = worksheet[`E${index}`].v;
  
//           let qry = `insert into ${tablename} (id,languagecode,translation,translationstatus,name) values (${id},'${languagecode}',${translation},'${translationstatus}','${name}')`;
//           db.query(qry, (err, rows) => {
//             if (err) {
//               console.log(err);
//             }
//           });
//           if((worksheet[`A${index+1}`])==null)
//           {
//             break;
//           }
//           index++;
//         }
       
//       }
//        // to initialize index 0 for next zip file
//        index=0
//       } 
//       catch (error) {
//         console.log(error);
//       }
//     })();
  
//   });
  
 // To get multiple file 
app.post("/multiplefiles", upload.array("files"), (req, res) => {
  
    // To get the filename
    // console.log(req.files,'indicate');

    //To decompress
    (async () => {
    
      try {
        let index=0;
        
        // To loop the number of zip file
        for(let a = 0; a < req.files.length; a++){
        file = await decompress("./uploads/" + req.files[a].filename, "./extracted");
       
        if(file[0].path.split('.').pop() === 'xlsx'){
            
          // To store file details that are uploaded 
            fs.readFile("./details/filedetails.txt", 'utf8', (err, data) => {
                if (err) {
                console.log(err);
                return;
                }
            let filedetails ="Filename - "+ req.files[0].originalname + ", Destination - "+ req.files[0].path +", Size - "+req.files[0].size +"\n"
            let qry = `insert into filedetail (filename,filepath,size,localpath) values ('${req.files[0].originalname}','${req.files[0].path}','${req.files[0].size}','${req.files[0].path}')`;
            db.query(qry,(err,rows)=>{
                if(err){
                    console.log(err);
                }
            })

            fs.appendFile("./details/filedetails.txt", filedetails, err2 => {
                if (err2) {
                console.log(err2);
                return;
                }   
            });
            });
    

        // To loop the number of file in one zip
        for(let b = 0; b < file.length ; b++){
            // To read the workbook
            var workbook = XLSX.readFile("./extracted/" + file[b].path);
      
            // To read first worksheet
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      
            // Index starts from 3 to obtain value in excel
            index = 3;
    
            while(index>=3){
              const id = worksheet[`A${index}`].v;
              const languagecode = worksheet[`B${index}`].v;
              const translation = worksheet[`C${index}`].v;
              const translationstatus = worksheet[`D${index}`].v;
              const name = worksheet[`E${index}`].v;
      
      
              let qry = `insert into languagedetails(id,languagecode,translation,translationstatus,name) values (${id},'${languagecode}',${translation},'${translationstatus}','${name}')`;
              db.query(qry, (err, rows) => {
                if (err) {
                    console.log(err)
                }            
                
              });
    
              if((worksheet[`A${index+1}`])==null)
                {
                break;
                }
                index++;
            }
            res.send({ "type":"success","msg" : "Files are uploaded successfully"});
          }

        }
        else {
           res.send({ "type":"error","msg" : "Files cannot be uploaded"});
        }

        
      index = 0;
      } 
    }
    catch (error) {
        console.log(error)
    }
    
    }
  )();
  
  });

// To get all table1 details
app.get('/',(req,res)=>{
    let qry = "select * from projectdetails1";
    db.query(qry,(err,rows)=>{
        if(err){
            console.log("No Data!");
        }else{
            res.send(rows);
        }
    })
});

// To get projectname in table1
app.get('/projectname',(req,res)=>{
    let qry = "select name from projectdetails1";
    db.query(qry,(err,rows)=>{
        if(err){
            console.log("No Data!");
        }else{
            res.send(rows);
        }
    })
});

//Table1 editorial,status,translation for all project 
app.get('/overalltablepie/:name',(req,res)=>{
    var tnames = req.params.name;
    arr=[];
    count=0;
    var values =tnames.split(",")
    for(i=0;i<values.length;i++){
    var editorial=0,status=0,translation=0
    let qry = "select editorial,status,translation from projectdetails1 where name="+"'"+values[i]+"'";
    db.query(qry,(err,rows)=>{
        count++;
        if(err){
            console.log("No Data!");
        }else{
                editorial = rows[0].editorial
                status = rows[0].status
                translation = rows[0].translation
                arr.push([editorial,status,translation])
            if(count==values.length)
            {
                res.send(arr);
            }
        }
    })
}
});

// To get userlogin
app.get('/userlogin/:tablename',(req,res)=>{
    var tname= req.params.tablename
    let qry = "select user from projectdetails1 where name='"+tname+"'";
    db.query(qry,(err,rows)=>{
        if(err){
            console.log("No Data!");
        }else{
            res.send([rows[0].user])
        }
    })
});


app.get('/overalltablebar',(req,res)=>{
    arr1=[],arr2=[],arr3=[],arr=[];
        let qry = "select * from projectdetails1";

        db.query(qry,(err,rows)=>{
            if(err){
                console.log("No Data!");
            }else{
                rows.forEach(function (result){
                    arr1.push(result.editorial)
                    arr2.push(result.status)
                    arr3.push(result.translation)

                })
            //    arr.push(arr1)
            //    arr.push(arr2)
            //    arr.push(arr3)
               res.send([arr1,arr2,arr3])
            }
            
        })
    })
app.get('/getProjecttitle',(req,res)=>{
    let qry = "select name from projectdetails1";

    db.query(qry,(err,rows)=>{
        if(err){
            console.log("No Data!");
        }else{
            arr=[];
            rows.forEach(function (result) {
               arr.push(result.name)
            });
        res.send(arr)
        }})
});

app.get("/detranslate/:name", (req, res) => {

    var data = req.params.name;
    var re = /[-, ]/gi;
    var re1 = /[:, ]/gi;
     
    var str = data.replace(re, "_").toLowerCase();
    var newstr = str.replace(re1, "").toLowerCase();
    
    let qry =
      "SELECT COUNT(de_DE_status) as DE_status FROM "+newstr+" group by de_DE_status order by de_DE_status asc;";
  
    db.query(qry, (err, rows) => {
      if (err) {
        console.log("No Data!");
      } else {
        res.send(rows);
      }
    });
  });

app.get('/frtranslate',(req,res)=>{
    let qry = "SELECT COUNT(fr_FR_status) as FR_status FROM project.hmil_vw group by fr_FR_status  order by fr_FR_status asc;";
    db.query(qry,(err,rows)=>{
        
        if(err){
            console.log("No Data!");
        }else{
            res.send(rows);
        }
    })
});

app.get('/qualitytranslate/:name',(req,res)=>{
    var data = req.params.name;
    var re = /[-, ]/gi;
    var re1 = /[:, ]/gi;
     
    var str = data.replace(re, "_").toLowerCase();
    var newstr =str.replace(re1, "");
    let qry = "SELECT COUNT(qualitystatus) as Quality_status FROM "+newstr+" group by qualitystatus order by qualitystatus asc;";
    db.query(qry,(err,rows)=>{
        if(err){
            console.log("No Data!");
        }else{
            res.send(rows);
        }
    })
});

app.get('/mainchart/:columnnames/:tablename',(req,res)=>{
    var tname = req.params.tablename;

    var columnnames = req.params.columnnames;

    var cnames = columnnames.split(',')

    let completed = 0
    let error = 0,locked = 0,unwork = 0,work_inprogress = 0,ok = 0, i = 0

    var re = /[-, ]/gi;
    var re1 = /[:, ]/gi;
    
    var table = tname.replace(re, "_").toLowerCase();
    var tablename = table.replace(re1, "");
    var projectname = tablename.toUpperCase();
    var text = 0;

    for(i=0;i<cnames.length;i++){
        let qry = "SELECT SUM(IF("+cnames[i]+"='Locked','1','0')) as Locked,SUM(IF("+cnames[i]+"='Work_Inprogress','1','0')) as Work_Inprogress,SUM(IF("+cnames[i]+"='Ok','1','0')) as Ok,SUM(IF("+cnames[i]+"='Unworked','1','0')) as Unworked,SUM(IF("+cnames[i]+"='Error','1','0')) as Error,SUM(IF("+cnames[i]+"='Completed','1','0')) as Completed FROM project."+tablename;

        db.query(qry,(err,rows)=>{
            if(err){
                console.log("No Data!");
            }else{
                text++;
                rows.forEach(function (result) {
                    completed += result.Completed
                    error += result.Error
                    locked += result.Locked
                    ok += result.Ok
                    unwork += result.Unworked
                    work_inprogress += result.Work_Inprogress
                });
            }
            if(text == cnames.length){
                res.send([completed,error,locked,ok,unwork,work_inprogress,projectname]);
            }
        })
    }
});

app.get('/stackchart/:columnnames/:tablename',(req,res)=>{
    var tname = req.params.tablename;

    var columnnames = req.params.columnnames;

    var cnames = columnnames.split(',')

    let completed = [],error = [],locked = [],unwork = [],work_inprogress = [],ok = [], i = 0


    var re = /[-, ]/gi;
    var re1 = /[:, ]/gi;
    
    var table = tname.replace(re, "_").toLowerCase();
    var tablename = table.replace(re1, "")

    var text = 0;

    for(i=0;i<cnames.length;i++){
        let qry = "SELECT SUM(IF("+cnames[i]+"='Locked','1','0')) as Locked,SUM(IF("+cnames[i]+"='Work_Inprogress','1','0')) as Work_Inprogress,SUM(IF("+cnames[i]+"='Ok','1','0')) as Ok,SUM(IF("+cnames[i]+"='Unworked','1','0')) as Unworked,SUM(IF("+cnames[i]+"='Error','1','0')) as Error,SUM(IF("+cnames[i]+"='Completed','1','0')) as Completed FROM project."+tablename;

        db.query(qry,(err,rows)=>{
            if(err){
                console.log("No Data!");
            }else{
                text++;
                rows.forEach(function (result) {
                    completed.push(result.Completed)
                    error.push(result.Error)
                    locked.push(result.Locked)
                    ok.push(result.Ok)
                    unwork.push(result.Unworked)
                    work_inprogress.push(result.Work_Inprogress)
                });
            }
            if(text == cnames.length){
                res.send([completed,error,locked,ok,unwork,work_inprogress]);
            }
        })
    }
});

app.get('/stackpiechart/:columnname/:tablename',(req,res)=>{
    var tname = req.params.tablename;

    var columnname = req.params.columnname;

    let completed = 0,error = 0,locked = 0,unwork = 0,work_inprogress = 0,ok = 0, i = 0

    var re = /[-, ]/gi;
    var re1 = /[:, ]/gi;
    
    var table = tname.replace(re, "_").toLowerCase();
    var tablename = table.replace(re1, "")
        
    let qry = "SELECT SUM(IF("+columnname+"='Locked','1','0')) as Locked,SUM(IF("+columnname+"='Work_Inprogress','1','0')) as Work_Inprogress,SUM(IF("+columnname+"='Ok','1','0')) as Ok,SUM(IF("+columnname+"='Unworked','1','0')) as Unworked,SUM(IF("+columnname+"='Error','1','0')) as Error,SUM(IF("+columnname+"='Completed','1','0')) as Completed FROM project."+tablename;

        db.query(qry,(err,rows)=>{
            if(err){
                console.log("No Data!");
            }else{
                rows.forEach(function (result) {
                    completed += result.Completed
                    error += result.Error
                    locked += result.Locked
                    ok += result.Ok
                    unwork += result.Unworked
                    work_inprogress += result.Work_Inprogress
                });
            }
            res.send([completed,error,locked,ok,unwork,work_inprogress]);
        })
});

app.get('/totcolumns/:data',(req,res)=>{
    var newstr = req.params.data;

    var re = /[-, ]/gi;
    var re1 = /[:, ]/gi;
    
    var data = newstr.replace(re, "_").toLowerCase();
    var data1 = data.replace(re1, "");
    let qry = "DESC project."+data1;
    db.query(qry,(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            res.send(rows);
        }
    })
});

app.get('/overallpie/:tablename',(req,res)=>{
    var tnames = req.params.tablename;

    var re = /[- ]/gi;
    var tablename = tnames.replace(re, "_").toLowerCase();
    var values =tablename.split(",")
    const final=[];
    let test=0;
    for(i=0;i<values.length;i++){

        let qry="desc "+values[i]
        db.query(qry,(err,rows)=>{

            if(err){
                console.log("No Data!");
            }
            else{
                temp=[];
                test++;
                rows.forEach(function(result){
                    if(result.Field.endsWith('_status')){
                       temp.push(result.Field)
                    }
                })
                final.push(temp)
                if(test==values.length){
                    let count=0;
                    for(x=0;x<final.length;x++){
                        for(y=0;y<final[x].length;y++){
                            count++
                        }
                    }
                    final1=[];
                    let test2=0;

                    for(j=0;j<final.length;j++){

                        let test1=0;
                        let completed=0,error=0,locked =0,ok=0,unwork =0,work_inprogress=0
                        let len=final[j].length
                        for(k=0;k<final[j].length;k++){
                            let qry = "SELECT SUM(IF("+final[j][k]+"='Locked','1','0')) as Locked,SUM(IF("+final[j][k]+"='Work_Inprogress','1','0')) as Work_Inprogress,SUM(IF("+final[j][k]+"='Ok','1','0')) as Ok,SUM(IF("+final[j][k]+"='Unworked','1','0')) as Unworked,SUM(IF("+final[j][k]+"='Error','1','0')) as Error,SUM(IF("+final[j][k]+"='Completed','1','0')) as Completed FROM project."+values[j];
                            db.query(qry,(err,rows)=>{
                                if(err){
                                    console.log("No Data!");
                                }else{
                                    test2++
                                    completed+=rows[0].Completed;
                                    error += rows[0].Error;
                                    locked += rows[0].Locked;
                                    ok += rows[0].Ok
                                    unwork += rows[0].Unworked
                                    work_inprogress += rows[0].Work_Inprogress
                                    test1++
                                }
                                
                                if(test1==len){
                                    final1.push([completed,error,locked,ok,unwork,work_inprogress]);
                                    //  test1=0
                                }
                                
                                if(test2==count){
                                    res.send(final1)
                                    
                                }
                            })
            
                          
                        }
                        
                       
                    }

                
            }
        }
    })
    }

   
});

app.get('/translate1',(req,res)=>{

    let qry = "SELECT SUM(IF(fr_FR_status='Locked','1','0')) as Locked,SUM(IF(fr_FR_status='Work_Inprogress','1','0')) as Work_Inprogress,SUM(IF(fr_FR_status='Ok','1','0')) as Ok,SUM(IF(fr_FR_status='Unworked','1','0')) as Unworked,SUM(IF(fr_FR_status='Error','1','0')) as Error,SUM(IF(fr_FR_status='Completed','1','0')) as Completed FROM project.hmil_vw";

    db.query(qry,(err,rows)=>{
        if(err){
            console.log("No Data!");
        }else{
            a = []
            rows.forEach(function (result) {
                res.send([result.Completed,result.Error,result.Locked,result.Ok,result.Unworked,result.Work_Inprogress]);
            });
        }
    })
});



//specified host and port
app.listen(5555,()=>{
    console.log("Server Running...");
});
