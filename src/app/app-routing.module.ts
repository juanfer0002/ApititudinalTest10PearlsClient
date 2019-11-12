import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { VisitsComponentComponent } from './components/visits-component/visits-component.component';


const routes: Routes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', component: ClientsComponent },
    { path: 'clients/:id/visits', component: VisitsComponentComponent },

    // Redirect to dashboard unkown routes
    { path: '**', redirectTo: 'clients' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
