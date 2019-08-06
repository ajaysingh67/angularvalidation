import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  isLinear = true;
  checkeddata:any ;
  a1 = 0 ;
  isAllChecked =false ;
  constructor() { }

  ngOnInit() {
    this.checkeddata = [
      {isselected:false,price:44 } ,
      {isselected:false,price:55 },
     ]
     console.log(this.checkeddata,'this.checkeddatathis.checkeddata');
     
  }
  onStepChange(e){
     e.stopPropagation();
     console.log('sdfsd');
     

  }
  onClickall(event){
    this.a1 = 0 ;
    let checkbtn = document.getElementsByClassName('checkbtn');
    if(event){
        for (var i = 0; i < 2; i++) {
          // select.update.emit(values);
          //  checkbtn[i].setAttribute('checked','true');
            this.checkeddata[i].isselected = true ;
            this.isAllChecked = true ;
             
           // this.checkeddata.forEach(element => {
              console.log(this.checkeddata[i].price,'000000') ;
                    this.a1 = this.a1 + parseInt(this.checkeddata[i].price) ;
           //  });
        }
      } else {
        for (var i = 0; i < 2; i++) {
          this.a1 = 0 ;
          this.isAllChecked = true ;
          this.checkeddata[i].isselected = false ;
           // checkbtn[i].setAttribute('checked','false');
        }
      } 
     
  }
  onClick1(event,data){
    console.log('9999999999999');
       if(event){
           this.a1 = this.a1 + data;
       } else {
        this.isAllChecked = false ;
           this.a1 = this.a1 - data;
       }
       console.log(event,'111',data);
      
  }
  update(){
     console.log('dddddddddddddddddddd');
     
  }
  onClick(e){
       e.stopPropagation();
       console.log('33333333333');
       
  }

}
