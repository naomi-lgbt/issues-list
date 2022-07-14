import { Component, OnInit } from '@angular/core';
import { AggregateData } from 'src/interfaces/AggregateData';
import { Issue } from 'src/interfaces/Issue';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public githubData: AggregateData = {
    "naomi-lgbt": [],
    nhcarrigan: [],
    beccalyria: [],
    beccalia: [],
    rosalianightsong: [],
    nhcommunity: [],
  };
  public dataString = '';
  public focusedOrg: keyof AggregateData = 'nhcarrigan';
  public focusedLabel = '';
  public filteredIssues: Issue[] = [];
  public loaded = false;

  public filterIssues = (org: keyof AggregateData, label: string) => {
    this.focusedOrg = org;
    this.focusedLabel = label;
    this.filteredIssues = this.githubData[this.focusedOrg].filter((el) =>
      this.focusedLabel
        ? el.labels.find((label) => label.name === this.focusedLabel)
        : el
    );
  };

  public invert = (hex: string) => {
    const validated =
      hex.length === 3
        ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        : hex;
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return this.padZero(r) + this.padZero(g) + this.padZero(b);
  };

  private padZero = (str: string) => {
    return str.padStart(2, '0');
  };

  constructor(private getDataService: GithubService) {}

  ngOnInit(): void {
    this.getDataService.getIssues().subscribe((data) => {
      this.githubData = data;
      this.dataString = JSON.stringify(data, null, 2);
      this.filterIssues(this.focusedOrg, this.focusedLabel);
      this.loaded = true;
    });
  }
}
