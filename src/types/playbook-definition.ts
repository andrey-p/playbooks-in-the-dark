type PlaybookDefinition = {
  playbooks: string[];
  layout: string[][];
  modules: {
    [key: string]: object;
  };
};

export default PlaybookDefinition;
