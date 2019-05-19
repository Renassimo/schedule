import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { SettingsService } from '../settings.service';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StatusService } from 'src/app/shared/status.service';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.sass']
})
export class SettingsEditComponent implements OnInit, OnDestroy {

  editMode = false;
  sets = {};
  set = [];
  showPage = false;

  setName;
  id;

  newSetItemForm: FormControl;
  editSetItemForm: FormControl;
  subscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.statusService.inside();

    this.route.params
    .subscribe(
      (params: Params) => {
        if (params['setting']) {
          this.setName = params['setting'];
        } else {
          this.setName = 'none';
        }
        this.initFormControls();
      }
    );

    this.sets = this.settingsService.settings;

    this.subscription = this.settingsService.settingsChanged.subscribe(
      (settings) => {
        this.sets = settings;
        this.detectSetting();
      }
    );

    this.detectSetting();
    this.initFormControls();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.set, event.previousIndex, event.currentIndex);
    console.log(this.set);
  }

  detectSetting() {
    if (this.isAuthenticated()) {
      if (this.sets[this.setName]) {
        console.log('exist');
        this.set = this.sets[this.setName];
        this.showPage = true;
      } else {
        console.log('not exist');
        this.set = [];
        this.showPage = false;
      }
    }
  }
  onSave() {
    this.statusService.spin();
    this.settingsService.updateSetting(this.setName, this.set);
  }
  onAdd() {
    this.set.push(this.newSetItemForm.value);
    this.initFormControls();
  }
  onStartEdit(id) {
    this.editMode = true;
    this.id = id;
    this.editSetItemForm = new FormControl(this.set[id], Validators.required);
  }
  onEdit() {
    this.set[this.id] = this.editSetItemForm.value;
    this.editMode = false;
  }
  onDelete(id) {
    this.set.splice(id, 1);
  }
  onCancel() {
    this.router.navigate(['/settings']);
  }
  onClearInput() {
    this.initFormControls();
  }

  private initFormControls() {
    this.newSetItemForm = new FormControl(null, Validators.required);
    this.editSetItemForm = new FormControl(null, Validators.required);
  }
  uLevel() {
    return this.statusService.getULevel();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
