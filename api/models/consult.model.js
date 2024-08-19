import mongoose from 'mongoose';

const consultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
     type: String,
     required: true,
    },
    mobile: {
     type: Number,
     required: true,
    },
  },
  { timestamps: true }
);

const Consult = mongoose.model('Consult', consultSchema);

export default Consult;