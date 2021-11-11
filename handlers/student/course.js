import db from '../../models/index.js';

const getCourses = async (req, res) => {
  try {
    const student = await db.Student.findOne({user: req.decodedToken.id}).populate('enrolledCourses');
    res.status(200).json({ courses: student.enrolledCourses, message: 'Successfully retrieved courses' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    await db.Student.findOneAndUpdate({user: req.decodedToken.id}, {$addToSet: {enrolledCourses: req.params.courseId}});
    const course = await db.Course.findOneAndUpdate({_id: req.params.courseId}, {$addToSet: {enrolledStudents: req.decodedToken.id}});
    res.status(201).json({ course, message: 'Successfully enrolled'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const unenrollCourse = async (req, res) => {
  try {
    await db.Student.findOneAndUpdate({user: req.decodedToken.id}, {$pull: {enrolledCourses: req.params.courseId}});
    await db.Course.findOneAndUpdate({_id: req.params.courseId}, {$pull: {enrolledStudents: req.decodedToken.id}});
    res.status(201).json({message: 'Successfully unenrolled'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  getCourses,
  enrollCourse,
  unenrollCourse
};