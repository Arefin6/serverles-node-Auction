import middy  from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';

export default handler => middy(handler)
.use([
    httpErrorHandler(),
    httpEventNormalizer(),
    httpJsonBodyParser()
])