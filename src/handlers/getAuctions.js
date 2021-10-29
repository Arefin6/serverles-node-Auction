import AWS from 'aws-sdk';
import middy  from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
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

export const handler = 
middy(getAuctions)
.use(httpErrorHandler())
.use(httpEventNormalizer())
.use(httpJsonBodyParser())


