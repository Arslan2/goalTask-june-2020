import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class CustomValidatorsService {

    constructor() { }

    static isValidNumber(min: number): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } | null => {
            
            if (control.value && control.value >= min) {
                return null;
            }
            return { 'isValidNumber': true };
        };
    }
}
