import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export async function get(tableName: string, key: object): Promise<object | null> {
  const response = await docClient.send(
    new GetCommand({
      TableName: tableName,
      Key: key
    })
  );

  return response.Item || null;
}

export async function put(tableName: string, item: object): Promise<object | null> {
  const putResponse = await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: item
    })
  );

  // TODO what should happen on failure?

  if (putResponse.$metadata.httpStatusCode === 200) {
    const getResponse = await docClient.send(new GetCommand({
      TableName: tableName,
      // TODO fix err
      Key: { id: item.id }
    }));
    return getResponse.Item || null;
  }

  return null;
}
