import db from "../models/index.js";
import axios from "axios";

const submissionStatusUpdate = async (req, res) => {
  try {
    const requestStatus = req.body.request_status?.code;
    if (requestStatus === "REQUEST_COMPLETED") {
      const context = req.body.context
        ? JSON.parse(req.body.context.replace(/\u'|'/g, '"'))
        : {};
      const outputURL = req.body.result?.run_status?.output;
      const response = await axios.get(outputURL);
      const submission = await db.Submission.findById(
        context.submissionId
      ).populate("assignment");
      const evaluatedOutput = response.data.split("\n");
      console.log(submission);
      let match = 0,
        total = 0;
      submission.assignment.output.split("\n").forEach((line, index) => {
        if (line === evaluatedOutput[index]) match++;
        total++;
      });
      submission.grade = (match / total) * submission.assignment.maxGrade;
      await submission.save();
    }
    res.status(200).json({ message: "Submission Auto Graded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  submissionStatusUpdate,
};
