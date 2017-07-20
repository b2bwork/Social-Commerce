import { SocialCommercePage } from './app.po';

describe('social-commerce App', () => {
  let page: SocialCommercePage;

  beforeEach(() => {
    page = new SocialCommercePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
