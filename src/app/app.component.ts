import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'String Calculator';
  stringInput: string = '';

  add(numbers: string): number {
    console.log('input: ', numbers);
    if (!numbers.match('.*[0-9].*')) {
      return 0;
    }

    let cleanedString: string = numbers.replace(/[^0-9-]/g, ' ');

    console.log('cleanedString', cleanedString);

    let allNumbersString = cleanedString.trim().split(/\s+/);
    console.log('allNumbersString', cleanedString);

    let allNumbers: number[] = allNumbersString
      .map(Number)
      .filter((num) => !isNaN(num));

    console.log('filtered numbers : ', allNumbers);

    let negativeNumbers = allNumbers.filter((num) => num < 0);
    console.log('negative numbers : ', negativeNumbers);

    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed ${negativeNumbers.toString()}`
      );
    }

    let total = allNumbers.reduce((x, y) => x + y);

    console.log('Total : ', total);

    return total;
  }
}
