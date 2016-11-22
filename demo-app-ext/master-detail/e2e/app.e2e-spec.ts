import { MasterDetailPage } from './app.po';

describe('master-detail App', function() {
  let page: MasterDetailPage;

  beforeEach(() => {
    page = new MasterDetailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
