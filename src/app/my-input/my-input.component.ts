import {ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, Optional, Renderer2, Self} from '@angular/core';
import {MAT_INPUT_VALUE_ACCESSOR, MatInput} from '@angular/material/input';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {Platform} from '@angular/cdk/platform';
import {ErrorStateMatcher} from '@angular/material/core';
import {AutofillMonitor} from '@angular/cdk/text-field';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent extends MatInput implements ControlValueAccessor, OnInit {

  onChange = (_: any) => {
  };
  onTouched = () => {
  };


  constructor(protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
              protected _platform: Platform,
              private _cd: ChangeDetectorRef,
              @Optional() @Self() public _ngControl: NgControl,
              @Optional() protected parentForm: NgForm,
              @Optional() protected parentFormGroup: FormGroupDirective,
              _defaultErrorStateMatcher: ErrorStateMatcher,
              @Optional() @Self() @Inject(MAT_INPUT_VALUE_ACCESSOR) private inputValueAccessor: any,
              private autofillMonitor: AutofillMonitor,
              private _renderer: Renderer2,
              ngZone: NgZone) {
    super(_elementRef, _platform, _ngControl, parentForm, parentFormGroup,
      _defaultErrorStateMatcher, inputValueAccessor, autofillMonitor, ngZone);

    if (this._ngControl != null) {
      this._ngControl.valueAccessor = this;
    }

  }


  ngOnInit(): void {
    super.ngOnInit();

    // this.disabled = false;
    // this.readonly = false;
    // this.required = true;

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  onInput(value: string) {
    console.info('on Input= ', value)
  }


  _compositionStart(): void {

  }


  _compositionEnd(value: any): void {
    this.onChange(value);
  }
}
