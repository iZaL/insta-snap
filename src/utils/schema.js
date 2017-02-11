import { schema } from 'normalizr';
const userSchema = new schema.Entity('users',{
  medias:[mediaSchema],
  comments:[commentSchema],
  favorites:[mediaSchema],
  downloads:[mediaSchema],
  followers:[userSchema],
  followings:[userSchema],
});

const commentSchema = new schema.Entity('comments',{
  user:userSchema,
  media:mediaSchema
});

const mediaSchema = new schema.Entity('medias',{
  user:userSchema,
  comments:[commentSchema],
  downloads:[userSchema],
  favorites:[userSchema],
});

// mediaSchema.define({
//   user:userSchema,
//   comments:[commentSchema],
//   downloads:[userSchema],
//   favorites:[userSchema],
// });

// userSchema.define({
//   medias:[mediaSchema],
//   comments:[commentSchema],
//   favorites:[mediaSchema],
//   downloads:[mediaSchema],
//   followers:[userSchema],
//   followings:[userSchema],
// });

// commentSchema.define({
//   user:userSchema,
//   media:mediaSchema
// });

export const Schemas = {
  MEDIA:mediaSchema,
  MEDIA_ARRAY:[mediaSchema],
  USER:userSchema,
  USER_ARRAY:[userSchema],
  COMMENT:commentSchema,
  COMMENT_ARRAY:[commentSchema]
};


// import { schema } from 'normalizr';
//
// export const buffetsPackageSchema = new schema.Entity('packages');
//
// export const buffetsSchema = new schema.Entity('buffets',{
//   packages:[buffetsPackageSchema]
// });
//
// export const BUFFET_SCHEMA = {
//   BUFFET:buffetsSchema,
//   BUFFET_ARRAY:[buffetsSchema]
// };
//
// export const BUFFET_PACKAGE_SCHEMA = {
//   BUFFET_PACKAGE:buffetsPackageSchema,
//   BUFFET_PACKAGE_ARRAY:[buffetsPackageSchema]
// };