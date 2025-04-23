import Page from '@/app/(selection)/page';
import { savePlaybook } from '@/lib/local-storage';
import { render, screen } from 'test-utils';

const scoundrel = {
  id: 'scoundrel',
  name: 'Scoundrel',
  modules: {
    name: {
      id: 'name',
      label: 'Name',
      type: 'textField'
    }
  },
  layout: [['name']],
  playbooks: ['cutter']
};

const cutter = {
  id: 'cutter',
  modules: {},
  name: 'Cutter',
  description: 'something'
};

describe('showing saved playbooks on homepage', () => {
  test('no saved playbooks', async () => {
    render(<Page />);

    const links = await screen.findAllByRole('link');
    expect(links.length).toEqual(1);
    expect(links[0].innerHTML).toEqual('New playbook');
  });

  test('saving a playbook without a name', async () => {
    savePlaybook(
      {
        id: 'adsf',
        systemId: 'bitd',
        playbookType: 'scoundrel',
        playbookId: 'cutter',
        modules: {}
      },
      cutter,
      scoundrel
    );

    render(<Page />);

    const links = await screen.findAllByRole('link');
    expect(links.length).toEqual(2);

    const option = document.querySelectorAll(
      'a[href="/bitd/scoundrel/cutter/adsf"]'
    )[0];
    expect(option).toBeTruthy();
    expect(option.innerHTML).toContain('An unnamed Scoundrel');
    expect(option.innerHTML).toContain('Cutter');
  });

  test('saving a playbook with a name', async () => {
    savePlaybook(
      {
        id: 'adsf',
        systemId: 'bitd',
        playbookType: 'scoundrel',
        playbookId: 'cutter',
        modules: {
          name: {
            text: 'Nigel'
          }
        }
      },
      cutter,
      scoundrel
    );

    render(<Page />);

    const links = await screen.findAllByRole('link');
    expect(links.length).toEqual(2);

    const option = document.querySelectorAll(
      'a[href="/bitd/scoundrel/cutter/adsf"]'
    )[0];
    expect(option).toBeTruthy();
    expect(option.innerHTML).toContain('Nigel');
    expect(option.innerHTML).toContain('Cutter');
  });
});
