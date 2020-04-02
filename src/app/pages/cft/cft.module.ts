import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbAccordionModule, NbSelectModule, NbCheckboxModule, NbLayoutModule, NbDatepickerDirective, NbDatepickerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CFTRoutingModule, routedComponents } from './cft-routing.module';
import { NbButtonModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { NbMomentDateModule } from '@nebular/moment'
// import { NbDateFnsDateModule } from '@nebular/date-fns';

@NgModule({

  imports: [
    NbSelectModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    // NbMomentDateModule,
    // NbDateFnsDateModule,
   
    NbInputModule,
    ThemeModule,
    CFTRoutingModule,
    NbDatepickerModule.forRoot(),
    NbDatepickerModule,
    NbLayoutModule,
    Ng2SmartTableModule, NbAccordionModule, ReactiveFormsModule, NbCheckboxModule, FormsModule
  ],
  declarations: [
    ...routedComponents,
  ]
  ,
})
export class CFTModule { }
