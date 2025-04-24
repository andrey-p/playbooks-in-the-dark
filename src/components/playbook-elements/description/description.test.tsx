import Description from './description';
import { render, screen, addTestTranslations } from 'test-utils';

addTestTranslations({
  DESCRIPTION_TEST: {
    basicMarkup: '<p>Hello <em>test</em></p> <ul><li>foo</li><li>bar</li></ul>',
    badTags: '<p>Hello <script>heh</script> <img /></p>',
    markupWithClasses: '<p class="oh no">Hello hi</p>'
  }
});

describe('Description', () => {
  it('renders text with very basic markup', () => {
    render(<Description text='DESCRIPTION_TEST.basicMarkup' />);

    const description = screen.getByText(/Hello/);
    expect(description.outerHTML).toEqual('<p>Hello <em>test</em></p>');

    const li = screen.getByText(/foo/);
    expect(li.outerHTML).toEqual('<li>foo</li>');
  });
  it("doesn't render bad tags in translations", () => {
    render(<Description text='DESCRIPTION_TEST.badTags' />);

    const description = screen.queryByText(/Hello/);
    expect(description).toBeFalsy();
  });
  it("doesn't render untranslated bad tags", () => {
    render(<Description text='<script>Hello</script>' />);

    const description = screen.getByText(/Hello/);
    expect(description.innerHTML).toEqual('&lt;script&gt;Hello&lt;/script&gt;');
  });
  it("doesn't render tags with anything but simple tags", () => {
    render(<Description text='DESCRIPTION_TEST.markupWithClasses' />);

    const description = screen.queryByText(/Hello/);
    expect(description).toBeFalsy();
  });
});
