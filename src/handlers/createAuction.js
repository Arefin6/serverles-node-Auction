import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from '../libs/commonMiddleware';
import createError from 'http-errors';


const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const {title } =JSON.parse(event.body);
  const now = new Date();
  const auction ={
    id:uuid(),
    title,
    status:'Open',
    createdAt:now.toISOString()
  };

    try{
      await dynamoDb.put({
        TableName:'AuctionsTable',
        Item:auction
    }).promise();
      }catch(err){
      console.log(err)
      throw new createError.InternalServerError(err)
    }


  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(createAuction)


