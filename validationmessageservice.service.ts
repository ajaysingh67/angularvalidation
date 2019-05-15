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
                type: 'The valid formats are PNG, JPG & PDF',
                size: 'The file size should not exceed 5 MB',
                upload: 'Document Uploaded Successfully',
                fail: 'We are unable to verify your documents. Please upload clear copy of your documents.',
                allowed: 'You should only allowed to upload front and back for ',
                fb: 'Front and back both are the required for ',
                selfie: 'Selfie Uploaded Successfully'
            }
        },
        director: {
            addressproof: {
                file: 'Please upload Directors Address document',
                type: 'The valid formats are PNG, JPEG & PDF',
                size: 'The file size should not exceed 3 MB',
                upload: 'Directors Address document uploaded successfully'
            },
            identityproof: {
                file: 'Please upload directors Identity document',
                type: 'The valid formats are PNG, JPEG & PDF',
                size: 'The file size should not exceed 3 MB',
                upload: 'Directors Identity Proof document uploaded successfully'
            },
            ShareCertificate: {
                file: 'Please upload your Share Certificate Document',
                type: 'The valid formats are PNG, JPEG & PDF',
                size: 'The file size should not exceed 3 MB',
                upload: 'Share Certificate document uploaded successfully'
            },
            kyb: {
                CertificateOfIncorp: {
                    file: 'Please upload your Certificate Of Incorporation document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Certificate Of Incorporation document uploaded successfully'
                },
                Memorandom: {
                    file: 'Please upload your Memorandom Document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Memorandum document uploaded successfully'
                },
                BANK_STATEMENT: {
                    file: 'Please upload your Business Bank Statement document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Business Bank Statement document uploaded successfully'
                },

                COMPANY_SHARE_HOLDER: {
                    file: 'Please upload your Company Share Holder document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Company Share Holder document uploaded successfully'
                },
                ARTICLES_OF_INCORPORATION: {
                    file: 'Please upload your Articles of Incorporation document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Articles of Incorporation document uploaded successfully'
                },
                DIRECTOR_PASSPORT_AND_UTILITY_BILLS: {
                    file: 'Please upload your Company Director Passport and Utility Bills document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Company Director Passport and Utility Bills document uploaded successfully'
                },
                PROOF_OF_REGISTRATION: {
                    file: 'Please upload your Company Proof of Registration document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Company Proof of Registration document uploaded successfully'
                },
                BUSINESS_ADDRESS: {
                    file: 'Please upload your Company Business Address document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Company Business Address document uploaded successfully'
                },
                BOARD_RESOLUTION: {
                    file: 'Please upload your Company Board Resolution document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Company Board Resolution document uploaded successfully'
                },
                BUSINESS_MODEL: {
                    file: 'Please upload your Company current Business Model document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Company current Business Model document uploaded successfully'
                },
                APPLICATION_FORM: {
                    file: 'Please upload application form document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Application form document uploaded successfully'
                }
                ,
                SHARE_CERTIFICATE: {
                    file: 'Please upload your share certificate document',
                    type: 'The valid formats are PNG, JPEG & PDF',
                    size: 'The file size should not exceed 3 MB',
                    upload: 'Share certificate document uploaded successfully'
                }
            }
        },
        signatory: {
            SIGNATORY_ADDRESS_PROOF: {
                file: 'Please upload Signatory Address document',
                type: 'The valid formats are PNG, JPEG & PDF',
                size: 'The file size should not exceed 3 MB',
                upload: 'Directors Address document uploaded successfully'
            },
            SIGNATORY_IDENTITY_PROOF: {
                file: 'Please upload Signatory Identity document',
                type: 'The valid formats are PNG, JPEG & PDF',
                size: 'The file size should not exceed 3 MB',
                upload: 'Directors Identity Proof document uploaded successfully'
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
                filetype: ['JPG', 'PNG', 'JPEG', 'PDF'],
                fileobj: 1,
                filefor: 'ADDRESS_PROOF'
            },
            SELFIE: {
                filelength: 5000000, // 5MB
                filetype: ['JPG', 'PNG', 'JPEG', 'PDF'],
                fileobj: 1,
                filefor: 'SELFIE'
            },
            IDENTITY_PROOF: {
                filelength: 5000000, // 5MB
                filetype: ['JPG', 'JPEG', 'PNG', 'PDF'],
                fileobj: 1,
                filefor: 'IDENTITY_PROOF'
            },
            Passport: {
                filelength: 5000000, // 10MB
                filetype: ['JPG', 'PNG', 'JPEG', 'PDF'],
                fileobj: 2,
                filefor: ['PASSPORT_FRONT', 'PASSPORT_BACK']
            },
            DriversLicense: {
                filelength: 5000000, // 10MB
                filetype: ['JPG', 'PNG', 'JPEG', 'PDF'],
                fileobj: 2,
                filefor: ['DL_FRONT', 'DL_BACK']
            },
            IDCard: {
                filelength: 5000000, // 5MB
                filetype: ['JPG', 'JPEG', 'PNG', 'PDF'],
                fileobj: 1,
                filefor: ['IDENTITY_PROOF_FRONT', 'IDENTITY_PROOF_BACK']
            }
        },
        director: {
            addressproof: {
                filelength: 5000000, // 5MB
                filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                fileobj: 1,
                filefor: 'ADDRESS_PROOF',
                for: 'Director'
            },
            identityproof: {
                filelength: 5000000, // 5MB
                filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                fileobj: 1,
                filefor: 'IDENTITY_PROOF',
                for: 'Director'
            },
            ShareCertificate: {
                filelength: 3000000, // 3MB
                filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                fileobj: 1,
                filefor: 'SHARE_CERTIFICATE',
                for: 'Director'
            },
            kyb: {
                CertificateOfIncorp: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'CERTIFICATE_OF_INCORPORATION',
                    for: 'kyc'
                },
                Memorandom: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'MEMORANDUM_AND_ARTICLES_OF_ASSOCIATION',
                    for: 'kyc'
                },
                BANK_STATEMENT: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'BANK_STATEMENT',
                    for: 'kyc'
                },

                COMPANY_SHARE_HOLDER: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'COMPANY_SHARE_HOLDER',
                    for: 'kyc'
                },
                ARTICLES_OF_INCORPORATION: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'ARTICLES_OF_INCORPORATION',
                    for: 'kyc'
                },
                DIRECTOR_PASSPORT_AND_UTILITY_BILLS: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'DIRECTOR_PASSPORT_AND_UTILITY_BILLS',
                    for: 'kyc'
                },
                PROOF_OF_REGISTRATION: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'PROOF_OF_REGISTRATION',
                    for: 'kyc'
                },
                BUSINESS_ADDRESS: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'BUSINESS_ADDRESS',
                    for: 'kyc'
                },
                BOARD_RESOLUTION: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'BOARD_RESOLUTION',
                    for: 'kyc'
                },
                BUSINESS_MODEL: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'BUSINESS_MODEL',
                    for: 'kyc'
                },

                APPLICATION_FORM: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'APPLICATION_FORM',
                    for: 'kyc'
                }
                ,

                SHARE_CERTIFICATE: {
                    filelength: 3000000, // 3MB
                    filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                    fileobj: 5,
                    filefor: 'SHARE_CERTIFICATE',
                    for: 'kyc'
                }
            }
        },
        signatory: {
            SIGNATORY_IDENTITY_PROOF: {
                filelength: 3000000, // 3MB
                filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                fileobj: 5,
                filefor: 'IDENTITY_PROOF',
                for: 'Signatory'
            },
            SIGNATORY_ADDRESS_PROOF: {
                filelength: 3000000, // 3MB
                filetype: ['PDF', 'JPG', 'JPEG', 'PNG'],
                fileobj: 5,
                filefor: 'ADDRESS_PROOF',
                for: 'Signatory'
            }
        }
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
