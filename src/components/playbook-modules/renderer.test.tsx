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
            label: "Name"
          },
          heritage: {
            id: "heritage",
            type: "textField",
            label: "Heritage",
            props: {
              examples: ["Iruvia", "Akoros"]
            }
          }
        }}
        userCharacterData={{
          id: undefined,
          systemId: "bitd",
          playbookId: "cutter",
          name: "sss",
          heritage: ""
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
              label: "Name"
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter",
            name: "sss"
          }}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
  });
  it("throws if trying to render an undefined module", () => {
    expect(() => {
      render(
        <Renderer
          layout={[["name"]]}
          modules={{
            name: {
              id: "name",
              type: "textFeeled",
              label: "Name"
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter",
            name: "sss"
          }}
          dispatch={jest.fn()}
        />
      );
    }).toThrow();
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
              // @ts-expect-error - yes, I know, TS, this is the point of the test
              lable: "Name"
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter",
            name: "sss"
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
              props: {
                examples: 123
              }
            }
          }}
          userCharacterData={{
            id: undefined,
            systemId: "bitd",
            playbookId: "cutter",
            name: "sss"
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
