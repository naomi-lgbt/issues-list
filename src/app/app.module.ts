import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GithubService } from "./github.service";
import { MainComponent } from "./main/main.component";

/**
 *
 */
@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule {}
