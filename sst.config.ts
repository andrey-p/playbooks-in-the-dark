// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "playbooks-in-the-dark",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "playbooks-project"
        }
      }
    };
  },
  async run() {
    const table = new sst.aws.Dynamo('characters', {
      fields: {
        id: "string"
      },
      primaryIndex: { hashKey: "id" }
    });

    new sst.aws.Nextjs("Playbooks", {
      link: [table]
    });
  }
});
