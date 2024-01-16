import {Directive, HostListener, Input} from "@angular/core";

@Directive({
  standalone: true,
  selector: '[allowed-charactes]'
})

export class inputAllowedCharactersDirective {
  @Input('allowedCharacters') characters: string[];

  @HostListener('keypress', ['$event'])
  onInput(event: KeyboardEvent) {
    if (!this.characters.includes(event.key)) {
      event.preventDefault();
    }
  }

}
