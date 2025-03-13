type PlaybookDefinition = {
  id: string;
  name: string;
  playbooks: string[];
  layout: string[][];
  modules: {
    [key: string]: object;
  };
};

export default PlaybookDefinition;
