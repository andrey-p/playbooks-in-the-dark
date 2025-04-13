import { Table, Entity, $get } from 'dynamodb-toolbox';
import { s } from 'dynamodb-toolbox/schema';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Resource } from 'sst';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const UserDataTable = new Table({
  name: Resource.playbookTable.name,
  partitionKey: { name: 'id', type: 'string' },
  documentClient: docClient
});

const UserDataSchema = s.item({
  id: s.string().key(),
  shareId: s.string().optional(),
  systemId: s.string(),
  playbookType: s.string(),
  playbookId: s.string(),
  modules: s.record(s.string(), s.any()),
  // explicitly setting these two as optional
  // so dynamodb-toolbox doesn't throw on items from before
  // we started using it
  created: s
    .string()
    .savedAs('_ct')
    .optional()
    .putDefault(() => new Date().toISOString())
    .updateDefault(() => $get('created', new Date().toISOString())),
  modified: s
    .string()
    .savedAs('_md')
    .optional()
    .putDefault(() => new Date().toISOString())
    .updateDefault(() => new Date().toISOString())
});

const UserDataEntity = new Entity({
  name: 'userData',
  table: UserDataTable,
  schema: UserDataSchema,
  entityAttribute: false,
  timestamps: false
});

export default UserDataEntity;
