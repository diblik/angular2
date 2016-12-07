import {Component, OnInit, ViewChildren, ElementRef} from '@angular/core';
import {PersonDetailTemplateDrivenComponent} from "./person-detail-template-driven/person-detail-template-driven.component";
import {PersonDetailModelDrivenComponent} from "./person-detail-model-driven/person-detail-model-driven.component";
import {Subject} from "rxjs";
import {EventAggregatorService, Events} from "../../service/event-aggregator.service";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  @ViewChildren(PersonDetailTemplateDrivenComponent)
  private personDetailTemplateDrivenComponent: any;

  @ViewChildren(PersonDetailModelDrivenComponent)
  private personDetailModelDrivenComponent: any;

  constructor(private eventAggregatorService: EventAggregatorService) { }

  ngOnInit() {
  }

  canDeactivate(): Promise<boolean> | boolean {
    console.log("zavolano3", this.personDetailModelDrivenComponent);
    if (this.personDetailModelDrivenComponent._results[0].canDeactivate() && this.personDetailTemplateDrivenComponent._results[0].canDeactivate()) {
      return true;
    }

    let subject = new Subject<boolean>();
    this.eventAggregatorService.publishEvent(Events.showConfirmDialog,
      {message: "Změny nebudou uloženy. opravdu chcete odejít?", header: "Změny", acceptCallback: subject});
    return subject.asObservable().toPromise();
  }

}
