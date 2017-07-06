import { SpotifyappPage } from './app.po';

describe('spotifyapp App', () => {
  let page: SpotifyappPage;

  beforeEach(() => {
    page = new SpotifyappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
