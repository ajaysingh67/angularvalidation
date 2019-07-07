import { Pipe, PipeTransform } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'amount' })
export class AmountPipe implements PipeTransform {
    allLanguage: any;
    exp: any;
    constructor(private languageService: JhiLanguageService, private number: DecimalPipe) {
        this.allLanguage = languageService.currentLang;
    }

    transform(value: any, decimalPoint: number): any {
        this.allLanguage = this.languageService.currentLang;
        let finalAmount = value;
        value = this.number.transform(value, '1.0-18');
        if (value !== null && value > 0) {
            let amount = value.toString();
            amount = amount.split('.');
            let DecimalAmount = '0';
            let beforeDecimalAmount = amount[0];
            if (amount.length > 1) {
                DecimalAmount = amount[1];
                if (DecimalAmount.length > decimalPoint) {
                    DecimalAmount = DecimalAmount.substring(0, decimalPoint);
                }
            }
            finalAmount = beforeDecimalAmount + '.' + DecimalAmount;
        }
        return finalAmount;
    }
}
