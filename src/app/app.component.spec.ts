import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'String Calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('String Calculator');
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

  it('should accepts any number', () => {
    const stringInput = debugElement.query(By.css('input[id=stringInput]'));
    stringInput.nativeElement.value = 'j5BC*&^';
    stringInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log('sendInput : ', stringInput.nativeElement.value);
      expect(stringInput.nativeElement.value).toMatch('.*[0-9].*');
    });
  });

  it('should accepts delimeters and non negative numbers', () => {
    const stringInput = debugElement.query(By.css('input[id=stringInput]'));
    stringInput.nativeElement.value = '1,\n2;//4\\2;-1,-2';
    stringInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let cleanedString: string = stringInput.nativeElement.value.replace(
        /[^0-9-]/g,
        ' '
      );

      console.log('cleanedString', cleanedString);

      let allNumbersString = cleanedString.trim().split(/\s+/);
      console.log('allNumbersString', cleanedString);

      let allNumbers: number[] = allNumbersString
        .map(Number)
        .filter((num) => !isNaN(num));

      console.log('filtered numbers : ', allNumbers);

      let negativeNumbers = allNumbers.filter((num) => num < 0);
      console.log('negative numbers : ', negativeNumbers);

      expect(negativeNumbers)
        .withContext(
          `Negative numbers not allowed ${negativeNumbers.toString()}`
        )
        .toBe([]);
    });
  });
});
