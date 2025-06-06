import Renderer from './renderer';
import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

const playbookData = {
  id: 'cutter',
  name: 'Cutter',
  description: 'a roustabout',
  modules: {
    items: {
      custom: [{ id: 'c', name: 'cc', load: 1 }]
    }
  }
};

describe('Renderer', () => {
  it('renders modules if all data is correctly passed', async () => {
    const user = userEvent.setup();
    const dispatch = jest.fn();

    render(
      <Renderer
        layout={[[['scoundrelName', 'alias'], ['heritage']], ['items']]}
        modules={{
          scoundrelName: {
            id: 'scoundrelName',
            type: 'textField',
            label: 'Name'
          },
          alias: {
            id: 'alias',
            type: 'textField',
            label: 'Alias'
          },
          heritage: {
            id: 'heritage',
            type: 'textField',
            label: 'Heritage',
            props: {
              examples: ['Iruvia', 'Akoros']
            }
          },
          items: {
            id: 'items',
            type: 'items',
            label: 'Items',
            props: {
              common: [
                { id: 'a', name: 'aa', load: 2 },
                { id: 'b', name: 'bb', load: 0 }
              ]
            }
          }
        }}
        userData={{
          id: undefined,
          playbookType: 'scoundrel',
          systemId: 'bitd',
          playbookId: 'cutter',
          modules: {
            scoundrelName: { text: 'sss' }
          }
        }}
        playbookData={playbookData}
        dispatch={dispatch}
      />
    );

    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toBeTruthy();
    expect(nameInput).toHaveValue('sss');

    const aliasInput = screen.getByLabelText('Alias');
    expect(aliasInput).toBeTruthy();
    expect(aliasInput).toHaveValue('');

    const heritageInput = screen.getByLabelText('Heritage');
    expect(heritageInput).toBeTruthy();
    expect(heritageInput).toHaveValue('');

    expect(screen.getByText('Iruvia')).toBeTruthy();
    expect(screen.getByText('Akoros')).toBeTruthy();

    await user.click(nameInput);
    await user.keyboard('l');

    expect(dispatch).toHaveBeenCalledWith({
      type: 'set_value',
      key: 'scoundrelName',
      value: { text: 'sssl' }
    });
  });
  it('renders a playbook-specific module if the playbook matches', () => {
    const dispatch = jest.fn();

    render(
      <Renderer
        layout={[['scoundrelName', 'heritage']]}
        modules={{
          scoundrelName: {
            id: 'scoundrelName',
            type: 'textField',
            label: 'Name'
          },
          heritage: {
            id: 'heritage',
            type: 'textField',
            label: 'Heritage',
            playbooks: ['cutter'],
            props: {
              examples: ['Iruvia', 'Akoros']
            }
          }
        }}
        userData={{
          id: undefined,
          systemId: 'bitd',
          playbookType: 'scoundrel',
          playbookId: 'cutter',
          modules: {}
        }}
        playbookData={playbookData}
        dispatch={dispatch}
      />
    );

    const heritageInput = screen.getByLabelText('Heritage');
    expect(heritageInput).toBeTruthy();
  });
  it("doesn't render a playbook-specific module if the playbook doesn't match", () => {
    const dispatch = jest.fn();

    render(
      <Renderer
        layout={[['scoundrelName', 'heritage']]}
        modules={{
          scoundrelName: {
            id: 'scoundrelName',
            type: 'textField',
            label: 'Name'
          },
          heritage: {
            id: 'heritage',
            type: 'textField',
            label: 'Heritage',
            playbooks: ['cutter'],
            props: {
              examples: ['Iruvia', 'Akoros']
            }
          }
        }}
        userData={{
          id: undefined,
          systemId: 'bitd',
          playbookType: 'scoundrel',
          playbookId: 'hound',
          modules: {}
        }}
        playbookData={{
          ...playbookData,
          id: 'hound'
        }}
        dispatch={dispatch}
      />
    );

    const heritageInput = screen.queryByLabelText('Heritage');
    expect(heritageInput).toBeFalsy();
  });
  it('throws if the layout references an undefined module', () => {
    expect(() => {
      render(
        <Renderer
          layout={[['scoundrelNam']]}
          modules={{
            scoundrelName: {
              id: 'scoundrelName',
              type: 'textField',
              label: 'Name'
            }
          }}
          userData={{
            id: undefined,
            systemId: 'bitd',
            playbookType: 'scoundrel',
            playbookId: 'cutter',
            modules: {}
          }}
          playbookData={playbookData}
          dispatch={jest.fn()}
        />
      );
    }).toThrow(/missing module/);
  });
  it('throws if trying to render an unknown module', () => {
    expect(() => {
      render(
        <Renderer
          layout={[['scoundrelName']]}
          modules={{
            scoundrelName: {
              id: 'scoundrelName',
              type: 'textFeeled',
              label: 'Name'
            }
          }}
          userData={{
            id: undefined,
            systemId: 'bitd',
            playbookType: 'scoundrel',
            playbookId: 'cutter',
            modules: {}
          }}
          playbookData={playbookData}
          dispatch={jest.fn()}
        />
      );
    }).toThrow(/no schema defined/);
  });
  it('throws if any of the shared module props are incorrect', () => {
    expect(() => {
      render(
        <Renderer
          layout={[['scoundrelName']]}
          modules={{
            scoundrelName: {
              id: 'scoundrelName',
              type: 'textField',
              lable: 'Name'
            }
          }}
          userData={{
            id: undefined,
            systemId: 'bitd',
            playbookType: 'scoundrel',
            playbookId: 'cutter',
            modules: {}
          }}
          playbookData={playbookData}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
  it('throws if any of the specific module props are incorrect', () => {
    expect(() => {
      render(
        <Renderer
          layout={[['scoundrelName']]}
          modules={{
            scoundrelName: {
              id: 'scoundrelName',
              type: 'textField',
              label: 'Name',
              props: {
                examples: 123
              }
            }
          }}
          userData={{
            id: undefined,
            systemId: 'bitd',
            playbookType: 'scoundrel',
            playbookId: 'cutter',
            modules: {}
          }}
          playbookData={playbookData}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
  it('throws if default provided is in an incorrect format', () => {
    expect(() => {
      render(
        <Renderer
          layout={[['scoundrelName']]}
          modules={{
            scoundrelName: {
              id: 'scoundrelName',
              type: 'textField',
              label: 'Name',
              default: { valooooo: 123 },
              props: {
                examples: 123
              }
            }
          }}
          userData={{
            id: undefined,
            systemId: 'bitd',
            playbookId: 'cutter',
            playbookType: 'scoundrel',
            modules: {}
          }}
          playbookData={playbookData}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
  it('throws if the value passed is in an incorrect format', () => {
    expect(() => {
      render(
        <Renderer
          layout={[['scoundrelName']]}
          modules={{
            scoundrelName: {
              id: 'scoundrelName',
              type: 'textField',
              label: 'Name',
              props: {
                examples: 123
              }
            }
          }}
          userData={{
            id: undefined,
            systemId: 'bitd',
            playbookId: 'cutter',
            playbookType: 'scoundrel',
            modules: {
              scoundrelName: ['oh no']
            }
          }}
          playbookData={playbookData}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
});
