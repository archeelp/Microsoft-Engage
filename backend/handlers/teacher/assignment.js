import db from "../../models/index.js";

const createAssignment = async (req, res) => {
  try {
    const { question, input, output, autoGrade, maxGrade, name } = req.body;
    const assignment = await db.Assignment.create({
      question,
      input,
      output,
      autoGrade,
      maxGrade,
      name,
      course: req.params.courseId,
    });
    res
      .status(200)
      .json({
        assignment: assignment,
        message: "Assignment Created Successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAssignment = async (req, res) => {
  try {
    const assignment = await db.Assignment.findOne({
      _id: req.params.assignmentId,
    }).populate({
      path: "submissions",
      populate: {
        path: "student",
      },
    });
    res
      .status(200)
      .json({
        assignment: assignment,
        message: "Assignment Fetched Successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    await db.Submission.findOneAndUpdate(
      { _id: req.params.submissionId, assignment: req.params.assignmentId },
      { $set: { grade: req.body.grade } }
    );
    res.status(200).json({ message: "Submission Graded Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  createAssignment,
  getAssignment,
  gradeSubmission,
};
