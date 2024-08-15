import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'String Calculator' title`, () => {
    expect(component.title).toEqual('String Calculator');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, String Calculator'
    );
  });

  it('should render input and label', () => {
    fixture.detectChanges();
    let inputLabel = debugElement.query(By.css('label[for=stringInput]'));

    const stringInput = debugElement.query(By.css('input[id=stringInput]'));
    expect(stringInput.nativeElement).toBeTruthy();
    expect(inputLabel.nativeElement).toBeTruthy();
  });

  // it('should accepts delimeters and non negative numbers', () => {
  //   const stringInput = debugElement.query(By.css('input[id=stringInput]'));
  //   stringInput.nativeElement.value = '1,\n2;//4\\2;-1,-2';
  //   stringInput.nativeElement.dispatchEvent(new Event('input'));

  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();

  //     let cleanedString: string = stringInput.nativeElement.value.replace(
  //       /[^0-9-]/g,
  //       ' '
  //     );

  //     console.log('cleanedString', cleanedString);

  //     let allNumbersString = cleanedString.trim().split(/\s+/);
  //     console.log('allNumbersString', cleanedString);

  //     let allNumbers: number[] = allNumbersString
  //       .map(Number)
  //       .filter((num) => !isNaN(num));

  //     console.log('filtered numbers : ', allNumbers);

  //     let negativeNumbers = allNumbers.filter((num) => num < 0);
  //     console.log('negative numbers : ', negativeNumbers);

  //     expect(negativeNumbers)
  //       .withContext(
  //         `Negative numbers not allowed ${negativeNumbers.toString()}`
  //       )
  //       .toBe([]);
  //   });
  // });

  it('should return 0 for an empty string', () => {
    const result = component.add('');
    expect(result).toBe(0);
  });

  it('should return the number for a single number string', () => {
    const result = component.add('1');
    expect(result).toBe(1);
  });

  it('should return the sum of two numbers separated by a comma', () => {
    const result = component.add('1,5');
    expect(result).toBe(6);
  });

  it('should accept newline delimiter', () => {
    const result = component.add('1\n2,3');
    expect(result).toBe(6);
  });

  it('should accept any delimiter //;\n1;2', () => {
    const result = component.add('//;\n1;2');
    expect(result).toBe(3);
  });

  it('should accept any delimiter //&\n1&3', () => {
    const result = component.add('//&\n1&3');
    expect(result).toBe(4);
  });

  it('should accept any delimiter //$\n1$4', () => {
    const result = component.add('//$\n1$4');
    expect(result).toBe(5);
  });

  it('should not accept negative numbers', () => {
    try {
      component.add('//;\n1;-2');
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Negative numbers not allowed');
    }
  });
});
