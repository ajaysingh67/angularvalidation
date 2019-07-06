import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { JhiLanguageService } from 'ng-jhipster';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
*/
@Pipe({ name: 'datetime' })
export class DateTimePipe implements PipeTransform {
    allLanguage: any;
    exp: any;
    constructor(private languageService: JhiLanguageService) {
        this.allLanguage = languageService.currentLang;
        // this.transform(this.translateService.currentLang);
    }

    transform(value: any, args1: string): any {
        this.allLanguage = this.languageService.currentLang;
        if (args1 === 'day') {
            this.exp = moment(new Date(value)).format('DD');
        } else if (args1 === 'month') {
            this.exp = moment(new Date(value)).format('MMM');
        } else if (args1 === 'date') {
            if (this.languageService.currentLang === 'en') {
                this.exp = moment(new Date(value)).format('MMMM DD, YYYY');
            }
            if (this.languageService.currentLang === 'fr') {
                this.exp = moment(new Date(value)).format('YYYY-MM-DD');
            }
        } else if (args1 === 'time') {
            this.exp = moment(new Date(value)).format('HH:mm:ss');
        } else {
            if (this.languageService.currentLang === 'en') {
                this.exp = moment(new Date(value)).format('MMMM DD, YYYY @ HH:mm');
            }
            if (this.languageService.currentLang === 'fr') {
                // this.exp = moment.unix(value).format('YYYY-MM-DD');
                //  this.exp = moment(new Date(value)).format('YYYY-MM-DD');
                this.exp = moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss');
            }
        }
        return this.exp;
    }
}
