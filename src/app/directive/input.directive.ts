import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInput]'
})
export class InputDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let inputValue = inputElement.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Limit to 8 digits
    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8);
    }

    // Update the input value
    inputElement.value = inputValue;

    // Set the minlength and maxlength attributes
    inputElement.setAttribute('minlength', '8');
    inputElement.setAttribute('maxlength', '8');
  }

}
