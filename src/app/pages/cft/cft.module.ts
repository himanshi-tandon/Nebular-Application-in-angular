import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbAccordionModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CFTRoutingModule, routedComponents } from './cft-routing.module';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
 
  imports: [
    NbSelectModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CFTRoutingModule,
    Ng2SmartTableModule,NbAccordionModule
  ],
  declarations: [
    ...routedComponents,
  ]
  ,
})
export class CFTModule { }
