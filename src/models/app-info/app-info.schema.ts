import mongoose from 'mongoose';
// import 'mongoose-schema-jsonschema'(mongoose);

const appInfoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.model('appInfoSchema', appInfoSchema);
