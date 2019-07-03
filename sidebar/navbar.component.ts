import { Component, OnInit, ViewChild, Renderer, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { HomeModalComponent } from 'app/home/modals/home-modal.component';
import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService, UserService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ValidationMesssageServiceComponent } from 'app/entities/validation-messsage-service';


import { OtpService } from 'app/entities/otp';
import { IOtp } from 'app/shared/model/otp.model';
import { PredatasourceService } from 'app/shared/predatasource/predatasource.service';
import { StateStorageService } from 'app/core';
import {
    EMAIL_ALREADY_USED_TYPE,
    INVALID_OTP_TYPE,
    OTP_LIMIT_EXCEED_TYPE,
    OTP_EXPIRED_TYPE,
    OTP_VERIFICATION_LIMIT_EXCEED,
    EMAIL_OTP_EXPIRE
} from 'app/shared';
import { Responsecode } from 'app/shared/enums/responsecode.enum';
import * as _ from 'lodash';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { ModalLoginService } from 'app/shared/login/login.service';
import { EmailEmitterService } from 'app/shared/Service/email-emitter.service';
import { filter, map, mergeMap } from 'rxjs/operators';
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss'],
    providers: [NgbActiveModal]
    // entryComponents: [ValidationMesssageServiceComponent]
})
export class NavbarComponent implements OnInit, AfterViewInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    timeLeft = 60;
    interval;
    isEnable = false;
    @ViewChild('basicModal') basicModal: ModalDirective;
    @ViewChild('megaMenu') megaMenu: ModalDirective;
    isButnDisable = false;
    marked = false;
    msg = false;
    currentView: any = 'EmailRegister';
    _customerModel = new RegisterModel();
    _accountType: any = 'Individual';
    public customPatterns = { '0': { pattern: new RegExp('[0-9]') } };
    _value: any = 0;
    _mobileNumber: any = 0;
    _otpModel = new OtpModel();
    _otpVerificationModel = new OtpVerificationModel();
    registerModal: FormGroup; // formgroup to submit user name & email.
    emailVerificationModal: FormGroup;
    emailVerifyerror = false;
    phoneVerifyerror = false;
    otprequesterror = false;
    otpexpireerror = false;
    ad: any;
    authenticationError: boolean;
    errorEmailExists = false;
    _emailAvailabilitycheck = new EmailavailablilityModel();
    emailStatus = true;
    nameStatus = true;
    countryCodeStatus = true;
    mobileNumberStatus = true;
    passwordStatus = true;
    confirmPasswordstatus = true;
    isEmailAvailable = false;
    errorInvalidOTP = false;
    errorOtpExpired = false;
    errorInvalidOtpExceed = false;
    errorOtpLimitExceed = false;
    _operationtype: any;
    _blur = false;
    countryCodesearchStr: String = '';
    optionsSelectCountry: Array<any>;
    optionsSelectCountryHandler: Array<any>;
    // login functionality
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    showtimer = false;
    @ViewChild('loginModal') loginModal: ModalDirective;
    ESCAPE_KEYCODE = 27;
    otpverify = '';
    isRegister = false;
    navButtons = true;

    startForm: FormGroup;
    fieldEmpty: number = 0;

    showSecondaryNav: boolean;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private modalService: NgbModal,
        public preserv: PredatasourceService,
        public activeModal: NgbActiveModal,
        public fb: FormBuilder,
        private http: HttpClient,
        private otpService: OtpService,
    
        private elementRef: ElementRef,
        private renderer: Renderer,
        private modalLoginService: ModalLoginService,
      
        private toastService: ToastService,
        private route: ActivatedRoute
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;

      

       
    }
    @HostListener('document:keydown', ['$event'])
   
   
 


    megaModalToggle() {
        const body = document.getElementsByTagName('body')[0];
        const toggleBtn = document.getElementsByClassName('toggle_btn');
        for (var i = 0; i < toggleBtn.length; i++) {
            if (!toggleBtn[i].classList.contains('active')) {
                body.classList.add('megaMenuOpen');
                toggleBtn[i].classList.add('active');
                this.megaMenu.show();
            } else {
                this.megaMenu.hide();
                toggleBtn[i].classList.remove('active');
                body.classList.remove('megaMenuOpen');
            }
        }
    }
  
    startTimer() {
        this.timeLeft = 60;
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                this.showtimer = false;
            }
        }, 1000);
    }

 
}
