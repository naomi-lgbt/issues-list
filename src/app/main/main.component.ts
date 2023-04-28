import { Component, OnInit } from '@angular/core';
import { AggregateData } from 'src/interfaces/AggregateData';
import { Issue } from 'src/interfaces/Issue';
import { Pull } from 'src/interfaces/Pull';
import { GithubService } from '../github.service';
import { Assignment } from 'src/interfaces/Assignment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public githubData: AggregateData = {
    'naomi-lgbt': {
      issues: [],
      pulls: [],
    },
    nhcarrigan: {
      issues: [],
      pulls: [],
    },
    beccalyria: {
      issues: [],
      pulls: [],
    },
    beccalia: {
      issues: [],
      pulls: [],
    },
    rosalianightsong: {
      issues: [],
      pulls: [],
    },
    'naomis-novas': {
      issues: [],
      pulls: [],
    },
    updatedAt: 0,
  };
  public dataString = '';
  public focusedOrg: keyof Omit<AggregateData, 'updatedAt'> = 'nhcarrigan';
  public focusedLabel = '';
  public focusedView: 'issues' | 'pulls' | 'assignments' = 'issues';
  public filteredIssues: Issue[] = [];
  public filteredPulls: Pull[] = [];
  public assignments: Assignment[] = [];
  public updatedAt: Date | null = null;
  public loaded = false;

  public filterIssues = (
    org: keyof Omit<AggregateData, 'updatedAt'>,
    label: string
  ) => {
    this.focusedView = 'issues';
    this.focusedOrg = org;
    this.focusedLabel = label;
    this.filteredIssues = this.githubData[this.focusedOrg].issues.filter((el) =>
      this.focusedLabel
        ? el.labels.find((label) => label.name === this.focusedLabel)
        : el
    );
  };

  public filterPulls = (
    org: keyof Omit<AggregateData, 'updatedAt'>,
    label: string
  ) => {
    this.focusedView = 'pulls';
    this.focusedOrg = org;
    this.focusedLabel = label;
    this.filteredPulls = this.githubData[this.focusedOrg].pulls;
  };

  public getColour = (hex: string) => {
    // https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl
    // Getting HSL from hex.
    const validated =
      hex.length === 3
        ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        : hex;
    const r = parseInt(validated.substring(0, 2), 16);
    const g = parseInt(validated.substring(2, 4), 16);
    const b = parseInt(validated.substring(4, 6), 16);
    const rcalc = r / 255;
    const gcalc = g / 255;
    const bcalc = b / 255;
    const cmax = Math.max(rcalc, gcalc, bcalc);
    const cmin = Math.min(rcalc, gcalc, bcalc);
    const delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;
    if (delta === 0) {
      h = 0;
    } else if (cmax === rcalc) {
      h = ((gcalc - bcalc) / delta) % 6;
    } else if (cmax === gcalc) {
      h = (bcalc - rcalc) / delta + 2;
    } else if (cmax === bcalc) {
      h = (rcalc - gcalc) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    // GitHub Style Label Calculations
    const perceivedLightness = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
    const lightnessThreshold = 0.6;
    const lightnessSwitch = Math.max(
      0,
      Math.min((perceivedLightness - lightnessThreshold) * -1000, 1)
    );
    const lightenBy =
      (lightnessThreshold - perceivedLightness) * 100 * lightnessSwitch;
    const backgroundAlpha = 0.18;
    const borderAlpha = 0.3;

    // This was a nightmare but it works!
    return `background:rgba(${r}, ${g}, ${b}, ${backgroundAlpha}); border: 1px solid hsla(${h}, ${s}%, ${
      l + lightenBy
    }%, ${borderAlpha}); color: hsl(${h}, ${s}%, ${l + lightenBy}%);`;
  };

  public setView = (view: 'issues' | 'pulls' | 'assignments') => {
    this.focusedView = view;
  };

  private getAssignments = () => {
    const issuesArray = [
      ...this.githubData.beccalia.issues,
      ...this.githubData.beccalyria.issues,
      ...this.githubData['naomi-lgbt'].issues,
      ...this.githubData['naomis-novas'].issues,
      ...this.githubData.nhcarrigan.issues,
      ...this.githubData.rosalianightsong.issues,
    ];
    for (const issue of issuesArray) {
      if (!issue.assignee) continue;
      const result = this.assignments.find(
        (el) => el.username === issue.assignee.login
      );
      if (!result) {
        this.assignments.push({
          username: issue.assignee.login,
          avatar: issue.assignee.avatar_url,
          issues: [issue],
        });
        continue;
      }
      result.issues.push(issue);
    }
    this.assignments.sort((a, b) => a.username.localeCompare(b.username));
  };

  constructor(private getDataService: GithubService) {}

  ngOnInit(): void {
    this.getDataService.getIssues().subscribe((data) => {
      this.githubData = data;
      this.dataString = JSON.stringify(data, null, 2);
      this.filterIssues(this.focusedOrg, this.focusedLabel);
      this.getAssignments();
      this.updatedAt = new Date(data.updatedAt);
      this.loaded = true;
    });
  }
}
