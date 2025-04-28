import Page from '@/app/(selection)/page';
import { savePlaybook } from '@/lib/local-storage';
import { render, screen, addTestTranslations } from 'test-utils';

addTestTranslations({
  LOCAL_STORAGE_TEST: {
    cutter: 'Cutter',
    nameLabel: 'Name',
    cutterDescription: 'A roustabout',
    scoundrel: 'Scoundrel'
  }
});

describe('showing saved playbooks on homepage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('no saved playbooks', async () => {
    render(<Page />);

    const links = await screen.findAllByRole('link');
    expect(links.length).toEqual(1);
    expect(links[0].innerHTML).toEqual('New playbook');
  });

  test('saving a playbook without a name', async () => {
    savePlaybook({
      id: 'adsf',
      systemId: 'bitd',
      playbookType: 'scoundrel',
      playbookId: 'cutter',
      modules: {}
    });

    render(<Page />);

    const links = await screen.findAllByRole('link');
    expect(links.length).toEqual(2);

    const option = document.querySelectorAll(
      'a[href="/bitd/scoundrel/cutter/adsf"]'
    )[0];
    expect(option).toBeTruthy();
    expect(option.innerHTML).toContain('An unnamed scoundrel');
    expect(option.innerHTML).toContain('Cutter');
  });

  test('saving a playbook with a name', async () => {
    savePlaybook({
      id: 'adsf',
      systemId: 'bitd',
      playbookType: 'scoundrel',
      playbookId: 'cutter',
      modules: {
        name: {
          text: 'Nigel'
        }
      }
    });

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

  test('backwards compat - storing name and description as unstructured / untranslated data', async () => {
    window.localStorage.setItem(
      'playbooks',
      JSON.stringify([
        {
          id: 'adsf',
          systemId: 'bitd',
          playbookType: 'scoundrel',
          playbookId: 'cutter',
          name: 'An unnamed Scoundrel',
          description: 'Cutter'
        }
      ])
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
});
