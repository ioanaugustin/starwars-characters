import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  characterForm: FormGroup;
  characterId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public starWarsService: StarWarsService
  ) {
    this.characterForm = this.fb.group({
      name: [''],
      height: [''],
      mass: [''],
      hair_color: [''],
      skin_color: [''],
      eye_color: [''],
      birth_year: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.characterId = this.route.snapshot.paramMap.get('id')!;
    this.starWarsService.getCharacterById(this.characterId).subscribe(data => {
      this.characterForm.patchValue(data);
    });
  }

  onSubmit(): void {
    console.log(this.characterForm.value);
  }
}
