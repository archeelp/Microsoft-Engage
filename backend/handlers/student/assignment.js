import db from "../../models/index.js";

const getAssignment = async (req, res) => {
  try {
    const assignment = await db.Assignment.findOne({
      _id: req.params.assignmentId,
    });
    const submission = await db.Submission.findOne({
      student: req.decodedToken.id,
      assignment: req.params.assignmentId,
    });
    res
      .status(200)
      .json({
        assignment,
        submission,
        message: "Assignment Fetched Successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { source, language } = req.body;
    const assignment = await db.Assignment.findOne({
      _id: req.params.assignmentId,
    }).populate("submissions");
    if (
      !assignment.submissions
        .map((submission) => String(submission.student))
        .includes(req.decodedToken.id)
    ) {
      const submission = await db.Submission.create({
        student: req.decodedToken.id,
        assignment: req.params.assignmentId,
        source,
        language,
      });
      if (assignment.autoGrade) {
        const response = await submission.autoGrade();
        if (!response) {
          return res
            .status(400)
            .json({ message: "Error in your submission request" });
        }
        submission.hackerearthId = response.he_id;
        await submission.save();
      }
      assignment.submissions.push(submission._id);
      await assignment.save();
      return res
        .status(200)
        .json({ message: "Assignment Submitted Successfully" });
    }
    return res.status(200).json({ message: "Assignment Already Submitted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAssignment,
  submitAssignment,
};
