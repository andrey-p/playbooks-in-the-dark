import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";

let docClient: DynamoDBDocumentClient;

const getClient = () => {
  if (docClient) {
    return docClient;
  }

  const client = new DynamoDBClient();
  docClient = DynamoDBDocumentClient.from(client);

  return docClient;
};

export async function get(
  tableName: string,
  key: object
): Promise<object | null> {
  const client = getClient();

  const response = await client.send(
    new GetCommand({
      TableName: tableName,
      Key: key
    })
  );

  return response.Item || null;
}

export async function put(tableName: string, item: object): Promise<void> {
  const client = getClient();

  await client.send(
    new PutCommand({
      TableName: tableName,
      Item: item
    })
  );
}
