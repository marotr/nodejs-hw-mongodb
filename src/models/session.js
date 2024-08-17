import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref:'users'
      },
    accessToken: { type: String, required: true},
    refreshToken: { type: String, required: true },
    accessTokenValidUntil:{type: Date, required: true},
    refreshTokenValidUntil: {type:Date, required: true}
  },
  { timestamps: true, versionKey: false },
);

export const SessionsCollection = model('Session', sessionSchema);