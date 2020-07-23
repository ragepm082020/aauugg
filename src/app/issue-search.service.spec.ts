import { TestBed } from '@angular/core/testing';

import { IssueSearchService } from './issue-search.service';

describe('IssueSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueSearchService = TestBed.get(IssueSearchService);
    expect(service).toBeTruthy();
  });
});
