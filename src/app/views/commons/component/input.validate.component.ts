import {Component, Input} from "@angular/core";

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

    constructor() {
        console.log(this.model);
    }

    // @ts-ignore
    public capitalize():string {
        let val = this.model[this.data];
        if(val && this.capitalise && typeof (val) === 'string') {
            this.model[this.data] =  val.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }
    }

}