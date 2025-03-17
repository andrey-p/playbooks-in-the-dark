// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'playbooks-in-the-dark',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: input?.stage === 'production' ?
            'playbooks-project' : 'playbooks-project-dev'
        }
      }
    };
  },
  async run() {
    const certArn = new sst.Secret('CertArn');

    const table = new sst.aws.Dynamo('playbookTable', {
      fields: {
        id: 'string'
      },
      primaryIndex: { hashKey: 'id' }
    });

    new sst.aws.Nextjs('Playbooks', {
      link: [table],
      domain: {
        name: 'thedark.iswhywecanthavenicethings.fyi',
        dns: false,
        cert: certArn.value
      },
      environment: {
        PLAYBOOKS_APP_URL: $dev
          ? 'http://localhost:3000'
          : 'https://thedark.iswhywecanthavenicethings.fyi'
      }
    });
  }
});
