import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Injectable()
export class SidebarEmitterService {
    @Output() checksidebarEmiter: EventEmitter<any>;
   
    constructor() {
        this.checksidebarEmiter = new EventEmitter();
    }

    public sidebarstatus(status: any): void {
        this.checksidebarEmiter.emit(status);
    }
   
}
