import { Schema, model, models, Model as MongooseModel } from 'mongoose'
import bcrypt from 'bcrypt'

interface ModelProps {
  [key: string]: any
  _id: string
  email: string
  password: string
}
interface InstanceMethods extends Schema<ModelProps> {

}
export interface Model extends MongooseModel<ModelProps, {}, InstanceMethods> {

}

const UserSchema = new Schema<ModelProps, Model, InstanceMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: [5, 'Password is too short'],
  },
}, {
  // schema options
})

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = models.User as Model || model<ModelProps, Model>('User', UserSchema)

export default User