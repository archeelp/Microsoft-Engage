import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Student from "./Student.js";
import Teacher from "./Teacher.js";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: [validator.isEmail, "Please fill a valid email address"],
    },
    mobile: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: [
        (mobile) => validator.isMobilePhone(`+91${mobile}`),
        "Please fill a valid mobile number",
      ],
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
      required: true,
    },
    vaccinationStatus: {
      type: Number,
      required: true,
      min: 0,
      max: 2,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Encrypting the password before saving to database
UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Creating the account according to the role
UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("role")) {
      return next();
    }
    if (user.role === "student") {
      const student = new Student({
        user: user._id,
      });
      await student.save();
    } else if (user.role === "teacher") {
      const teacher = new Teacher({
        user: user._id,
      });
      await teacher.save();
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

// For comparing the encrypted password
const comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    next(err);
    return false;
  }
};

UserSchema.methods.comparePassword = comparePassword;

// Exporting the user model
export default mongoose.model("User", UserSchema);
