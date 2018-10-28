import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'input-validate',
    templateUrl: "./input.validate.component.html"
})
export class InputValidateComponent {

    @Input() model: any;
    @Input() data: string;
    @Input() isRequired: boolean;
    @Input() label: string;
    @Input() length: number;
    @Input() capitalise: boolean;
    @Input() inputType: string;
    @Input() formValid: boolean;
    @Input() position: number;
    @Output() change = new EventEmitter();

    constructor() {

    }

    // @ts-ignore
    public capitalize():string {
        console.log(this.position);
        let val = this.model[this.data];
        if(val && this.capitalise && typeof (val) === 'string') {
            this.model[this.data] =  val.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }
    }

    // @ts-ignore
    private emitEvent(status:boolean, untouched:boolean) {
        this.change.emit({status: untouched?false:!status ,position: this.position });
        return status;
    }
}