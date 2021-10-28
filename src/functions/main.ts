import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from '../app.module';
import { Handler, HandlerContext, HandlerCallback } from "@netlify/functions";

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: HandlerContext,
  callback: HandlerCallback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
