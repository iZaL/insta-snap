import { schema } from 'normalizr';

import mediaSchema from './mediaSchema';
import commentSchema from './commentSchema';

const userSchema = new schema.Entity('users',{
  // medias:[mediaSchema],
  // comments:[commentSchema],
  // favorites:[mediaSchema],
  // followers:[userSchema], //@fix
  // followings:[userSchema], //@fix
});

export default userSchema;