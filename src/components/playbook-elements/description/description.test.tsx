import Description from './description';
import { render, screen } from '@testing-library/react';

describe('Description', () => {
  it('renders text with very basic markup', () => {
    render(
      <Description text='<p>Hello <em>test</em></p> <ul><li>foo</li><li>bar</li></ul>' />
    );

    const description = screen.getByText(/Hello/);
    expect(description.outerHTML).toEqual('<p>Hello <em>test</em></p>');

    const li = screen.getByText(/foo/);
    expect(li.outerHTML).toEqual('<li>foo</li>');
  });
  it('throws on any other tags', () => {
    expect(() => {
      render(<Description text='<p>Hello <script>heh</script> <img /></p>' />);
    }).toThrow();
  });
  it('throws on the normal tags if they have classes etc', () => {
    expect(() => {
      render(<Description text='<p class="oh no">Hello hi</p>' />);
    }).toThrow();
  });
});
