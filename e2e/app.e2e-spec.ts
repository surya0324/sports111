import { Sports11Page } from './app.po';

describe('sports11 App', () => {
  let page: Sports11Page;

  beforeEach(() => {
    page = new Sports11Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
