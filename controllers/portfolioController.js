const Portfolio = require("../modals/portfolioModal");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// @desc  Auth user & get token
// @route POST /api/users/login
// @access  public

exports.create = catchAsync(async (req, res, next) => {
  const data = req.body;

  const portfolio = await Portfolio.create({
    author: data.author,
    title: data.title,
    description: data.description,
    tags: data.tags,
    attachments: data.attachments,
    tools: data.tools,
    likes: [],
    views: 0,
    link: data.link,
    githubLink: data.githubLink,
    comments: [],
  });
  if (portfolio) {
    res.json({
      _id: portfolio._id.toString(),
    });
  } else {
    return next(new AppError("failed to create portfolio", 500));
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, data);

  if (updatedPortfolio) {
    res.json({
      _id: updatedPortfolio._id.toString(),
    });
  } else {
    return next(new AppError("failed to update portfolio", 500));
  }
});

exports.get = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const portfolio = await Portfolio.findById(id);
  if (portfolio) {
    res.json(portfolio);
  } else {
    return next(new AppError("portfolio with this id doesn't exists", 404));
  }
});

exports.getAll = catchAsync(async (req, res, next) => {
  const portfolios = await Portfolio.find();
  if (portfolios) {
    res.json({ portfolios: portfolios });
  } else {
    return next(new AppError("failed to fetch portfolios", 500));
  }
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const portfolio = await Portfolio.findById(id);
  await portfolio.remove();

  res.json({ _id: id });
});
