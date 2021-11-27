import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { HACKEREARTH_SECRET_KEY } = process.env;

// Submission Schema - Lectures which are created as a part of course
const SubmissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hackerearthId: {
      type: String,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: Object,
    },
    grade: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// For AutoGrading Assignments
const autoGrade = async function (input, next) {
  try {
    var data = JSON.stringify({
      lang: this.language,
      memory_limit: 2463232,
      callback:
        "https://microsoft-engage-2021.herokuapp.com/hooks/hackerearth/",
      time_limit: 5,
      source: this.source,
      input: input,
      context: {
        submissionId: this._id,
      },
    });

    var config = {
      method: "post",
      url: "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",
      headers: {
        "cache-control": "no-cache",
        "client-secret": HACKEREARTH_SECRET_KEY,
        "content-type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  } catch (err) {
    next(err);
    return null;
  }
};

SubmissionSchema.methods.autoGrade = autoGrade;

export default mongoose.model("Submission", SubmissionSchema);
