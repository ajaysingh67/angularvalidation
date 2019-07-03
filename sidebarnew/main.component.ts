import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidebarEmitterService } from 'app/shared/services/sidebar-emitter.service';


@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height:'0',
        overflow:'hidden',
        opacity:'0'
      })),
      state('final', style({
        overflow:'hidden',
        opacity:'1'
      })),
      transition('initial=>final', animate('750ms')),
      transition('final=>initial', animate('750ms'))
    ]),
  ]
})
export class JhiMainComponent implements OnInit {

  showFiller = false;
   public isCollapsed = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private titleService: Title, private router: Router,private modalService: NgbModal,private breakpointObserver: BreakpointObserver,private sidebarEmitterService:SidebarEmitterService) {
     this.sidebarEmitterService.checksidebarEmiter.subscribe(status =>{
         this.isCollapsed = status;
     }) ;
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'tdemoApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
  }

// megaModalToggle() {
//     const body = document.getElementsByTagName('body')[0];
//     const toggleBtn = document.getElementsByClassName('toggle_btn');
//     for (var i = 0; i < toggleBtn.length; i++) {
//         if (!toggleBtn[i].classList.contains('active')) {
//             body.classList.add('megaMenuOpen');
//             toggleBtn[i].classList.add('active');
//             this.megaMenu.show();
//         } else {
//             this.megaMenu.hide();
//             toggleBtn[i].classList.remove('active');
//             body.classList.remove('megaMenuOpen');
//         }
//     }
// }



  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
}
