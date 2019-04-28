import { Component } from '@angular/core';

import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

// Chips - Input
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

// Chips - Input
export interface Skill {
  name: string;
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass']
})
export class ProfileEditComponent {
  positions = [
    'Director', 'HR', 'Jr BDA', 'BDA', 'Sr BDA', 'Jr TA', 'TA'
  ];
  teams = [
    'HEAD', 'TA Team KZN', 'BDA Team 1 KZN', 'BDA Team 2 KZN', 'BDA Team 3 KZN', 'BDA Team 4 KZN', 'BDA Team 5 KZN'
  ];
  rooms = [
    '400', '401', '402', '405 (Central Perk)'
  ];
  startDate = new Date(1998, 0, 1);
  eduTypes = [
    'Graduated', 'Full time', 'Extramural', 'Part time', 'Unfinished'
  ];
  engLevels = [
    'A1 (Beginner)', 'A2 (Elementary English)',
    'B1 (Intermediate English)', 'B2 (Upper-Intermediate English)',
    'C1 (Advanced English)', 'C2 (Proficiency English)'
  ];
  accessLevels = [
    '0 (God)', '1 (Admin)', '2 (Superviser)', '3 (User)',
  ];

// Chips - Input
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: Skill[] = [
    {name: 'HTML'},
    {name: 'CSS'},
    {name: 'JS'},
    {name: 'Python'},
    {name: 'MySQL'}
  ];

  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(ImageDownloadOptionsSheetComponent);
  }


// Chips - Input
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

// Chips - Input
  remove(fruit: Skill): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

}

@Component({
  selector: 'image-download-options-sheet',
  templateUrl: './image-download-options-sheet.html',
})
export class ImageDownloadOptionsSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<ImageDownloadOptionsSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
