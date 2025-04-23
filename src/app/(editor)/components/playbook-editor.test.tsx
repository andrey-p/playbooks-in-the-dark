import { getPlaybooks as getPlaybooksFromLocalStorage } from '@/lib/local-storage';

import PlaybookEditor from './playbook-editor';
import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

const pushFn = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockImplementation(() => '/bitd/scoundrel/cutter'),
  useRouter: jest.fn().mockImplementation(() => ({ push: pushFn }))
}));

const spy = jest.spyOn(window.history, 'replaceState');

const saveAction = jest.fn().mockImplementation((val: object) => {
  return Promise.resolve({ ...val, id: 'asdf' });
});

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
          saveAction={saveAction}
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
          saveAction={saveAction}
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
          saveAction={saveAction}
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
      expect(saveAction).toHaveBeenCalledWith(
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

      // the URL should've updated
      expect(spy).toHaveBeenCalledWith(null, '', '/bitd/scoundrel/cutter/asdf');

      // test subsequent saves just to be safe
      await user.click(nameInput);
      await user.keyboard(' beatrice');
      expect(saveBtn).toHaveAccessibleName('Save (you have unsaved changes)');

      // save
      await user.click(saveBtn);
      expect(saveBtn).toHaveAccessibleName('Save');

      expect(saveAction).toHaveBeenCalledWith(
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
  describe('deleting', () => {
    test('allows playbooks to be deleted', async () => {
      const user = userEvent.setup();
      const deleteAction = jest.fn();

      const userData = { ...initialUserData, id: 'asdf' };

      render(
        <PlaybookEditor
          userData={userData}
          playbookData={playbookData}
          playbookDefinition={playbookDefinition}
          systemData={systemData}
          deleteAction={deleteAction}
        />
      );

      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);

      const deleteBtn = screen.getByText('Delete playbook');
      await user.click(deleteBtn);
      const confirmBtn = screen.getByText('Yes');
      await user.click(confirmBtn);

      // delete action should've been called
      expect(deleteAction).toHaveBeenCalledWith('asdf');
      // should've redirected back to homepage
      expect(pushFn).toHaveBeenCalledWith('/');
    });
  });
  describe('read only', () => {
    test("doesn't render save nor delete buttons", async () => {
      const user = userEvent.setup();
      render(
        <PlaybookEditor
          userData={initialUserData}
          playbookData={playbookData}
          playbookDefinition={playbookDefinition}
          systemData={systemData}
          readOnly
        />
      );

      const saveBtn = screen.queryByLabelText('Save');
      expect(saveBtn).toBeFalsy();

      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);

      const deleteBtn = screen.queryByLabelText('Delete playbook');
      expect(deleteBtn).toBeFalsy();
    });
    test('disables any changes when loaded in read only mode', async () => {
      const user = userEvent.setup();
      const initialData = {
        ...initialUserData,
        modules: {
          name: { text: 'steven' }
        }
      };
      render(
        <PlaybookEditor
          userData={initialData}
          playbookData={playbookData}
          playbookDefinition={playbookDefinition}
          systemData={systemData}
          readOnly
        />
      );

      const nameInput = screen.getByLabelText('Name');
      await user.click(nameInput);
      await user.keyboard('beatrice');

      expect(nameInput).toHaveValue('steven');
    });
  });
});
