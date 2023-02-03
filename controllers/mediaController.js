const JobPost = require("../modals/jobPostModal");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const path = require("path");
exports.create = catchAsync(async (req, res, next) => {
  const id = Date.now();

  let uploadedFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  uploadedFile = req.files.file;
  uploadPath = path.resolve(
    __dirname + "/../static/" + id + "-" + uploadedFile.name
  );

  uploadedFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.json({ url: "/" + id + "-" + uploadedFile.name });
  });
});
