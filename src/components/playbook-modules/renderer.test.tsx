import Renderer from "./renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Renderer", () => {
  it("renders modules if all data is correctly passed", async () => {
    const user = userEvent.setup();
    const dispatch = jest.fn();

    render(
      <Renderer
        layout={[["name", "heritage"]]}
        modules={{
          name: {
            id: "name",
            type: "textField",
            label: "Name",
            default: ""
          },
          heritage: {
            id: "heritage",
            type: "textField",
            label: "Heritage",
            default: "",
            props: {
              examples: ["Iruvia", "Akoros"]
            }
          }
        }}
        userCharacterData={{
          id: undefined,
          systemId: "bitd",
          playbookId: "cutter",
          name: "sss"
        }}
        dispatch={dispatch}
      />
    );

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeTruthy();
    expect(nameInput).toHaveValue("sss");

    const heritageInput = screen.getByLabelText("Heritage");
    expect(heritageInput).toBeTruthy();
    expect(heritageInput).toHaveValue("");

    expect(screen.getByText("Iruvia")).toBeTruthy();
    expect(screen.getByText("Akoros")).toBeTruthy();

    await user.click(nameInput);
    await user.keyboard("l");

    expect(dispatch).toHaveBeenCalledWith({
      type: "set_string",
      key: "name",
      value: "sssl"
    });
  });
  it("throws if the layout references an undefined module", () => {
    expect(() => {
      render(
        <Renderer
          layout={[["nam"]]}
          modules={{
            name: {
              id: "name",
              type: "textField",
              default: "",
              label: "Name"
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter"
          }}
          dispatch={jest.fn()}
        />
      );
    }).toThrow(/missing module/);
  });
  it("throws if trying to render an unknown module", () => {
    expect(() => {
      render(
        <Renderer
          layout={[["name"]]}
          modules={{
            name: {
              id: "name",
              type: "textFeeled",
              default: "",
              label: "Name"
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter"
          }}
          dispatch={jest.fn()}
        />
      );
    }).toThrow(/no schema defined/);
  });
  it("throws if any of the shared module props are incorrect", () => {
    expect(() => {
      render(
        <Renderer
          layout={[["name"]]}
          modules={{
            name: {
              id: "name",
              type: "textField",
              default: "",
              lable: "Name"
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter"
          }}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
  it("throws if any of the specific module props are incorrect", () => {
    expect(() => {
      render(
        <Renderer
          layout={[["name"]]}
          modules={{
            name: {
              id: "name",
              type: "textField",
              label: "Name",
              default: "",
              props: {
                examples: 123
              }
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter"
          }}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
  it("throws if the value passed is in an incorrect format", () => {
    expect(() => {
      render(
        <Renderer
          layout={[["name"]]}
          modules={{
            name: {
              id: "name",
              type: "textField",
              label: "Name",
              default: "",
              props: {
                examples: 123
              }
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter",
            name: ["oh no"]
          }}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
});
