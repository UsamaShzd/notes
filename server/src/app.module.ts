import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { NotesModule } from "./notes/notes.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_DB_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    NotesModule,
  ],
})
export class AppModule {}
