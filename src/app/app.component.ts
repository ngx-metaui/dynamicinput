import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamicinput';
  value: any = 'asdf';

  @ViewChild('minput', {read: ViewContainerRef, static: false})
  inputContainer: ViewContainerRef;


  constructor(private cf: ComponentFactoryResolver, private injector: Injector) {
  }

  ngOnInit(): void {
    this.showInput();
  }


  async showInput() {
    const comp: InstanceType<any> = await import('./my-input/my-input.component');
    const factory = this.cf.resolveComponentFactory(comp['MyInputComponent']);

    const {instance} = this.inputContainer.createComponent(factory, null,
      this.injector);

    console.info('asdfas');
    console.info(instance);

    instance['value'] = 'My First text';
    instance['readonly'] = false;
    instance['disabled'] =  false;

  }

}
