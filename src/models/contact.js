// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String, required: false },
//     isFavourite: { type: Boolean, default: false },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       required: true,
//       default: 'personal',
//     },
//   },
//   { timestamps: true },
// );

// const Contact = mongoose.model('Contact', contactSchema);

// export default Contact;


import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;