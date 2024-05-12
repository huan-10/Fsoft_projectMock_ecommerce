import { ObjectId } from "mongodb";
import mongoose, { Schema, model, Document } from "mongoose";

// Interface for User document type
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
  emailVerified: boolean;
  defaultPaymentMethod: string;
  address: IAddress[];
  wishlist: IWishlist[];
}

// Interface for address subdocument
interface IAddress {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  country?: string;
  active?: boolean;
}

// Interface for wishlist subdocument
interface IWishlist {
  product: ObjectId;
  style?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: "Please enter your full name.",
    },
    email: {
      type: String,
      required: "Please enter your email address.",
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: '"Please enter a password.',
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        style: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Mongoose model creation with type guard
const User = mongoose.models.User || model<IUser>("User", userSchema); // Explicitly define the model type

export default User;
