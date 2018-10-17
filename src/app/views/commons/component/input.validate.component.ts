import {Component, Input} from "@angular/core";

@Component({
    selector: 'input-validate',
    templateUrl: "./input.validate.component.html"
})
export class InputValidateComponent {

    @Input() model: string;
    @Input() data: any;
    @Input() isRequired: boolean;
    @Input() label: string;

}