import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TestService } from '../services/test.service';
import { HttpClient } from '@angular/common/http';
import { tap, startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { ValidationMesssageServiceService } from '../validation-messsage-service.service';
import { ValidationmessageserviceService } from '../validationmessageservice.service';
import * as _ from 'lodash';
// import 'rxjs/add/operator/debounceTime';
@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    return  this.http.get<any>('https://jsonplaceholder.typicode.com/users').pipe(tap(data => this.opts = data))
  }
}
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  labelupdateForm:FormGroup;
  result: string = '';
  myControl = new FormControl();
  options = [];
  filteredOptions:any;
  fileProperties: any;
	validatorMessages: any;
  constructor(private fb:FormBuilder,private dialog: MatDialog,private testServices:TestService,private service: Service,public onboardValidator: ValidationmessageserviceService) {
    this.labelupdateForm = this.fb.group({
      label: [''],
      useremail: ['',[ValidationmessageserviceService.emailValidator]]
  });
   }

  ngOnInit() {
    this.validatorMessages = this.onboardValidator.Msgs;
    this.fileProperties = this.onboardValidator.fileProperties;
   
     this.labelupdateForm.get('label').valueChanges.pipe(
      debounceTime(600)).subscribe(
      (value: string) => {
          this.filteredOptions =  this.doFilter(value) ;
          
      });
  }

  documentUpload($event, forwhom, forerrormsg) {
    try {
        console.log($event,'=======',forwhom);
        
        const fileProperty = forwhom;
        const fileList: FileList = $event.target.files;
        const formData: FormData = new FormData();
        let fileData = false;
        if (fileList.length > 0 && fileList.length <= fileProperty.fileobj) {
            for (let $item = 0; $item < fileList.length; $item++) {
                const file: File = fileList[$item];
                const fileSize: Number = fileList[$item].size;
                const fileType: any = fileList[$item].name.split('.').reverse()[0].toUpperCase();

                if (fileSize <= fileProperty.filelength) {
                    if (
                        _.find(fileProperty.filetype, (o: any) => {
                            if (o === fileType) {
                                return o;
                            }
                        })
                    ) {
                        fileData = true;
                        formData.append('files', file);
        
                       console.log(formData,'formDataformData');
                    } else {
          console.log("errorerwerwe",forerrormsg.type);

                      //  this.showAlert(forerrormsg.type, 'error');
                        fileData = false;
                        break;
                    }
                } else {
                  //  this.showAlert(forerrormsg.size, 'error');
                    fileData = false;
                    break;
                }
            }
        } else {
          //  this.showAlert(forerrormsg.file, 'error');
            fileData = false;
        }
        if (fileData === true) {
            // this.Servicename.ticketUpload(formData).subscribe(
            //     result => {
                 
            //         this.showAlert(forerrormsg.upload, 'success');
            //     },
            //     error => {
            //        // this.showAlert(forerrormsg.fail, 'error');
            //     }
            // );
        }
    } catch (e) {
         console.log(e,'eeee');
         
       // this.showAlert(forerrormsg.file, 'warning');
    }
}
  ConfirmpasswordValidator(frm: FormGroup) {
    if (!frm.pristine) {
        if (frm.value.length > 0) {
            const parent = frm.parent;
            if (parent.value.newPassword === frm.value) {
                return null;
            } else {
                return { passwordnotmatch: true };
            }
        }
    }
}
  
  doFilter(value) {
    console.log("fffffff");
    
    return this.service.getData()
      .pipe(
        map(response => response.filter(option => {
         // console.log("optionoptionoption",option);
          
          return option.name.toLowerCase().indexOf(value.toLowerCase()) === 0
        }))
      )
  }
  submit(data){
       console.log(data,'datadatadata');
       
  }
  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;
 
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
 
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

}
