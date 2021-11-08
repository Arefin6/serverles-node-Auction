import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from '../libs/commonMiddleware';
import createError from 'http-errors';


const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
   const {id} = event.pathParameters; 
   const {amount } =event.body;

   const params ={
    TableName:'AuctionsTable',
    Key:{id},
    UpdateExpression:'set highestBid.amount = :amount',
    ExpressionAttributeValues:{
        ':amount':amount,
    },
    ReturnValues:'ALL_NEW'
  };
  
   let updatedAuction;

  try {
      const result = await dynamoDb.update(params).promise();
      updatedAuction = result.Attributes;
  } catch (error) {
      console.error(error)
      throw new createError.InternalServerError(error)
  }


  return {
    statusCode: 201,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid)


