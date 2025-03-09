import { toggleArrayEntry } from "./utils";

describe("utils", () => {
  describe("toggleArrayEntry", () => {
    test("it should add or remove entries based on whether they're selected", () => {
      let array = ["foo", "bar"];

      array = toggleArrayEntry("baz", true, array);
      expect(array).toContain("foo");
      expect(array).toContain("bar");
      expect(array).toContain("baz");

      array = toggleArrayEntry("baz", true, array);
      expect(array).toContain("foo");
      expect(array).toContain("bar");
      expect(array).toContain("baz");

      array = toggleArrayEntry("baz", false, array);
      expect(array).toContain("foo");
      expect(array).toContain("bar");
      expect(array).not.toContain("baz");
    });
    test("array passed should not be modified", () => {
      const array = ["foo", "bar"];
      toggleArrayEntry("baz", true, array);
      expect(array).toContain("foo");
      expect(array).toContain("bar");
      expect(array).not.toContain("baz");
    });
  });
});
