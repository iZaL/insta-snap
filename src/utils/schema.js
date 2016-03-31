import { normalize, Schema, arrayOf } from 'normalizr';
const mediaSchema = new Schema('medias');
const userSchema = new Schema('users');
const commentSchema = new Schema('comments');

mediaSchema.define({
  user:userSchema,
  comments:arrayOf(commentSchema),
  downloads:arrayOf(userSchema),
  favorites:arrayOf(userSchema),
});

userSchema.define({
  medias:arrayOf(mediaSchema),
  comments:arrayOf(commentSchema),
  favorites:arrayOf(mediaSchema),
  downloads:arrayOf(mediaSchema),
  followers:arrayOf(userSchema),
  followings:arrayOf(userSchema),
});

commentSchema.define({
  user:userSchema,
  media:mediaSchema
});

export const Schemas = {
  MEDIA:mediaSchema,
  MEDIA_ARRAY:arrayOf(mediaSchema),
  USER:userSchema,
  USER_ARRAY:arrayOf(userSchema),
  COMMENT:commentSchema,
  COMMENT_ARRAY:arrayOf(commentSchema)
};