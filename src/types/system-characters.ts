type SystemCharacters = {
  playbooks: string[];
  layout: string[][];
  modules: {
    [key: string]: object;
  };
};

export default SystemCharacters;
