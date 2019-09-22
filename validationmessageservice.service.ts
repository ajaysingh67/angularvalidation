import { Http} from '@angular/http';
// import 'rxjs/Rx';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Injectable, ReflectiveInjector } from '@angular/core';

@Injectable()
export class ValidationmessageserviceService {
    static messages = 0;
    static newval = 0;
    formgroupparents: FormGroup;
    //public static message:any=0; 
    constructor() { }

    public Msgs: any = {
        Chat_IMAGE: {
            attachments: {
                file: 'Service Temporary unavailable. Please try again later.',
                type: 'The valid formats are PNG & JPG',
                size: 'The file size should not exceed 3 MB',
                upload: 'Document Uploaded Successfully',
                fail: 'We are unable to verify your documents. Please upload clear copy of your documents.'
            }
        },
        kyc_varification: {
            attachments: {
                file: 'Unable to upload file. Please try again later.',
                type: 'The valid formats are PDF',
                size: 'The file size should not exceed 5 MB',
                upload: 'Document Uploaded Successfully',
                fail: 'We are unable to verify your documents. Please upload clear copy of your documents.',
            }
        },
    };
    public fileProperties = {
        Chat_IMAGE: {
            chat: {
                filelength: 3000000, // 10MB
                filetype: ['JPG', 'PNG'],
                fileobj: 1,
                filefor: 'PASSPORT'
            }
        },
        kyc_varification: {
            ADDRESS_PROOF: {
                filelength: 5000000, // 5MB
                filetype: ['PDF'],
                fileobj: 1,
                filefor: 'ADDRESS_PROOF'
            },
        },
    };
   

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any, confirmpassword?: string, controlname?: string) {
        
        let config = {
            'required': `${controlname} Required`,
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'EmailInuse': `This Email Id Already taken.`,
            'passwordnotmatch': `Password does not match`,
            'onlynumber': `${controlname} must be a number .`,
            'balanceCheck': `Not enough USD balance`,
            'bitcoinaddress': `Enter a valid  bitcoin address`,
            'ethaddress': `Enter a valid ethereum address`,
            'validpassword': `Enter a valid password.`,
            'privacyPolicy': `Please checked privacy policy.`,
            'nonzeroamount': `Amount must be greater then zero`,
            'isEmailUnique':"User with this email already registered. Use another email id",
            'invalidmessagelength': `${controlname} should only contain 1000 characters`,
        };

        return config[validatorName];
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if(control.value){
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }
    }

    static bitcoinAddressValidator(control) {
    
        if (control.value.match(/^[a-zA-Z0-9]{31,42}$/)) {
            return null;
        } else {
            return { 'bitcoinaddress': true };
        }
    }
    static ethAddressValidator(control) {
      
        if (control.value.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
            return null;
        } else {
            return { 'ethaddress': true };
        }
    }
    static validpasswordValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/)) {
            return null;
        } else {
            return {
                'validpassword': true
            };
        }

    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static passwordMatchValidator(g: FormGroup) {

        if (g.get('Password').value === g.get('ConfirmPassword').value) {
            return null;
        } else {
            return { 'passwordnotmatch': true };
        }
    }


    static onlynumber(control) {
        try {
            if (control.value.match(/^-?\d*\.?\d+$/)) {
                return null;
            } else {
                return { 'onlynumber': true };
            }
        }
        catch (error) {
            return null;
        }

    }

    static nonzeroamount(control) {
        const amount = parseFloat(control.value);
        if (amount > 0) {
            return null;
        } else {
            return { nonzeroamount: true };
        }
    }

    static valueCheck(control) {

        try {
            if (control.value > 0) {
                return null;
            } else {
                return { 'valueCheck': true };
            }
        }
        catch (error) {
            return null;
        }

    }

    static privacyService(control) {
        try {
            if (control.value ==true) {
                return null;
            } else {
                return { 'privacyPolicy': true };
            }
        }
        catch (error) {
            return null;
        }

    }

    // static ConfirmpasswordValidator(control: FormControl) {

    //     if (control.value.length > 0) {
    //         let formgroup: FormGroup = control._parent;
    //         let password: string = formgroup.controls["Password"].value;
    //         if (password === control.value) {
    //             return null;

    //         } else {

    //             return { 'passwordnotmatch': true };
    //         }
    //     }

    // }

    static FiatprecisionValidation(control) { ///\.\d{0,4}$/  
                // /^[0-9]+(\.[0-9]{1,8})?$/
        try {      
            if (control.value.match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,8})?\s*$/)) {
                return null;
            } else {
                return { 'Fiatprecision': true };
            }
        }
        catch (error) {
            return null;
        }
    }

    static messageValidator(control) {
        if (control.value) {
            // RFC 2822 compliant regex
            if (control.value.match(/^[ A-Za-z0-9_@.#+-:(),$!'"?\n]*$/)) {
                return null;
            } else {
                return { invalidmessage: true };
            }
        } else {
            // return { invalidmessage: true };
        }
    }

    static messageLengthValidator(control) {
        if (control.value) {
            // RFC 2822 compliant regex
            if (control.value.length <= 1000) {
                return null;
            } else {
                return { invalidmessagelength: true };
            }
        } else {
            // return { invalidmessagelength: true };
        }
    }
    static spacevalidation(control) {
        let str = control.value;
        if (str !== null) {
            if (str.trim().length <= 0) {
                return { required: true };
            } else {
                return null;
            }
        }
    }


}
