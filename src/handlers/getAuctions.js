import AWS from 'aws-sdk';
import commonMiddleware from '../libs/commonMiddleware';
import createError from 'http-errors';


const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  
  let auctions;

    try{
        const result = await dynamoDb.scan({
            TableName:'AuctionsTable',
        }).promise();

      auctions =result.Items;

      }catch(err){

        console.log(err)
        throw new createError.InternalServerError(err)
    }


  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = commonMiddleware(getAuctions)


