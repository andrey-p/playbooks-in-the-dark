import { savePlaybook as savePlaybookToDb } from '@/lib/store';
import { getPlaybooks as getPlaybooksFromLocalStorage } from '@/lib/local-storage';

jest.mock('@/lib/store', () => {
  return {
    savePlaybook: jest.fn().mockImplementation((val: object) => {
      return Promise.resolve({ ...val, id: 'asdf' });
    })
  };
});

import PlaybookEditor from './playbook-editor';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const initialUserData = {
  id: undefined,
  playbookId: 'cutter',
  systemId: 'bitd',
  playbookType: 'scoundrel',
  modules: {}
};

const playbookData = {
  id: 'cutter',
  name: 'Cutter',
  description: 'a roustabout',
  modules: {}
};

const playbookDefinition = {
  id: 'scoundrel',
  name: 'Scoundrel',
  playbooks: ['cutter'],
  layout: [['name']],
  modules: {
    name: {
      id: 'name',
      label: 'Name',
      type: 'textField'
    }
  }
};

const systemData = {
  id: 'bitd',
  name: 'bitd',
  description: 'bitd',
  playbookTypes: ['scoundrel']
};

describe('PlaybookEditor', () => {
  describe('rendering', () => {
    test('renders correctly with pre-populated user data', () => {
      render(
        <PlaybookEditor
          userData={{
            ...initialUserData,
            modules: {
              name: { text: 'nigel' }
            }
          }}
          playbookData={playbookData}
          playbookDefinition={playbookDefinition}
          systemData={systemData}
        />
      );

      expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
        'Cutter'
      );
      expect(screen.getByLabelText('Name')).toHaveValue('nigel');

      expect(screen.getByLabelText('Save')).toBeTruthy();
    });
    test('renders correctly with no user data yet', () => {
      render(
        <PlaybookEditor
          userData={initialUserData}
          playbookData={playbookData}
          playbookDefinition={playbookDefinition}
          systemData={systemData}
        />
      );

      expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
        'Cutter'
      );
      expect(screen.getByLabelText('Name')).toHaveValue('');

      expect(screen.getByLabelText('Save')).toBeTruthy();
    });
  });
  describe('saving', () => {
    test('first save', async () => {
      const user = userEvent.setup();
      render(
        <PlaybookEditor
          userData={initialUserData}
          playbookData={playbookData}
          playbookDefinition={playbookDefinition}
          systemData={systemData}
        />
      );

      const saveBtn = screen.getByLabelText('Save');
      expect(saveBtn).toHaveAccessibleName('Save');

      // make change - the save button should flag that there's unsaved changes
      const nameInput = screen.getByLabelText('Name');
      await user.click(nameInput);
      await user.keyboard('beatrice');
      expect(saveBtn).toHaveAccessibleName('Save (you have unsaved changes)');

      // save
      await user.click(saveBtn);

      // button should flag no saved changes
      expect(saveBtn).toHaveAccessibleName('Save');

      // data should've been saved to DB
      expect(savePlaybookToDb).toHaveBeenCalledWith(
        expect.objectContaining({
          id: undefined,
          systemId: 'bitd',
          playbookId: 'cutter',
          playbookType: 'scoundrel',
          modules: {
            name: { text: 'beatrice' }
          }
        })
      );

      // and an entry in local storage
      expect(getPlaybooksFromLocalStorage()[0]).toMatchObject({
        id: 'asdf',
        systemId: 'bitd',
        playbookId: 'cutter',
        playbookType: 'scoundrel',
        name: 'beatrice',
        description: 'Cutter'
      });

      // test subsequent saves just to be safe
      await user.click(nameInput);
      await user.keyboard(' beatrice');
      expect(saveBtn).toHaveAccessibleName('Save (you have unsaved changes)');

      // save
      await user.click(saveBtn);
      expect(saveBtn).toHaveAccessibleName('Save');

      expect(savePlaybookToDb).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'asdf',
          systemId: 'bitd',
          playbookId: 'cutter',
          playbookType: 'scoundrel',
          modules: {
            name: { text: 'beatrice beatrice' }
          }
        })
      );

      expect(getPlaybooksFromLocalStorage()[0]).toMatchObject({
        id: 'asdf',
        systemId: 'bitd',
        playbookId: 'cutter',
        playbookType: 'scoundrel',
        name: 'beatrice beatrice',
        description: 'Cutter'
      });
    });
  });
});
