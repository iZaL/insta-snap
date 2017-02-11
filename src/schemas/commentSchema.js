import { schema } from 'normalizr';
import userSchema from './userSchema';
import mediaSchema from './mediaSchema';

const commentSchema = new schema.Entity('comments',{
  user:userSchema,
  media:mediaSchema
});

export default commentSchema;