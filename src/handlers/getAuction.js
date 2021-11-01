import AWS from 'aws-sdk';
import commonMiddleware from '../libs/commonMiddleware';
import createError from 'http-errors';


const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
  
  let auctions;
  const {id} = event.pathParameters; 

    try{
        const result = await dynamoDb.get({
            TableName:'AuctionsTable',
            Key:{id}
        }).promise();

      auctions =result.Item;

      }catch(err){

        console.log(err)
        throw new createError.InternalServerError(err)
    }


  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = commonMiddleware(getAuction)