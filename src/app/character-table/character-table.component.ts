import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StarWarsService } from '../star-wars.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.scss']
})
export class CharacterTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public starWarsService: StarWarsService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      console.log('get')
      this.fetchCharacters()
    });
    this.fetchCharacters();
    this.cd.detectChanges();
  }

  fetchCharacters(): void {
    if (!this.paginator) {
      return; // Check if paginator is initialized
    }
    this.starWarsService.getCharacters(this.paginator.pageIndex + 1).subscribe(data => {
      console.log(data.count);
      this.dataSource.data = data.results;
      console.log(this.paginator)
      this.paginator.length = data.count;
    });
  }

  getIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }
}
