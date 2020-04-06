import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbAccordionModule, NbSelectModule, NbCheckboxModule, NbLayoutModule, NbDatepickerDirective, NbDatepickerModule, NbToastrModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CFTRoutingModule, routedComponents } from './cft-routing.module';
import { NbButtonModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
 import { NbMomentDateModule } from '@nebular/moment'
@NgModule({

  imports: [
    NbSelectModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    Ng2SearchPipeModule,
    NbInputModule,
    ThemeModule,
    CFTRoutingModule,
    NbDatepickerModule,
    NbToastrModule,
    NbMomentDateModule,
    NbLayoutModule,
    Ng2SmartTableModule, NbAccordionModule, ReactiveFormsModule, NbCheckboxModule, FormsModule
  ],
  declarations: [
    ...routedComponents,
  ]
  ,
})
export class CFTModule { }
