const JobPost = require("../modals/jobPostModal");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  const data = req.body;

  const post = await JobPost.create({
    author: data.author,
    title: data.title,
    description: data.description,

    country: data.country,
    city: data.city,
    type: data.type,
    salaryCurrencyCode: data.salaryCurrencyCode,
    salaryPeriod: data.salaryPeriod,
    salaryFrom: data.salaryFrom,
    salaryTo: data.salaryTo,
    positionType: data.positionType,
    category: data.category,
    skills: data.skills,
    requiredExperience: data.requiredExperience,
    link: data.link,
  });
  if (post) {
    res.json({
      _id: post._id.toString(),
    });
  } else {
    return next(new AppError("failed to create job post", 500));
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const updatedPost = await JobPost.findByIdAndUpdate(id, data);

  if (updatedPost) {
    res.json({
      _id: updatedPost._id.toString(),
    });
  } else {
    return next(new AppError("failed to update job post", 500));
  }
});

exports.get = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const post = await JobPost.findById(id).populate("author");
  if (post) {
    res.json(post);
  } else {
    return next(new AppError("job post with this id doesn't exists", 404));
  }
});

exports.getAll = catchAsync(async (req, res, next) => {
  const jobs = await JobPost.find();
  if (jobs) {
    res.json({ jobPostings: jobs });
  } else {
    return next(new AppError("failed to fetch job postings", 500));
  }
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const post = await JobPost.findById(id);
  await post.remove();

  res.json({ _id: id });
});
