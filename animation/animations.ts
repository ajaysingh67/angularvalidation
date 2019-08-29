import { trigger, state, animate, transition, style, query } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter', [style({ opacity: 0,transform:'translateY(-100%)' })], { optional: true }),
        query(':leave', [style({ opacity: 1,transform:'translateY(-100%)' }), animate('0.3s', style({ opacity: 0 }))], { optional: true }),
        query(':enter', [style({ opacity: 0,transform:'translateY(-100%)' }), animate('0.3s', style({ opacity: 1 }))], { optional: true })
    ])
]);


// first import BrowserAnimationsModule on app.module.ts
/************* *   in app.component.html   *****************/
// <div [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
// <router-outlet  #o="outlet"></router-outlet>
// </div>
/**************   in app.component.css   *****************/
// ::ng-deep router-outlet ~ * {
//     display: block;background-color: red;
//     }
/**************   in app.component.ts   *****************/

// @Component({
//     selector: 'app-root',
//     templateUrl: './app.component.html',
//     styleUrls: ['./app.component.css'],
//     animations: [fadeAnimation]
//   })
