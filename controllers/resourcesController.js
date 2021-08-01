const Resource = require('./../models/resourceModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllRes = factory.getAll(Resource);
exports.createRes = factory.createOne(Resource);
exports.getRes = factory.getOne(Resource);
exports.updateRes = factory.updateOne(Resource);
exports.deleteRes = factory.deleteOne(Resource);

//for public releases
exports.getPublicUserLists = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    next(new AppError('Please provide user Id'));
  }

  const links = await Resource.find({
    author: userId
  });

  //check for public lists
  const output = links.filter(list => {
    return list.public;
  });

  res.status(200).json({
    status: 'success',
    results: output.length,
    data: {
      data: output
    }
  });
});

exports.searchFor = catchAsync(async (req, res, next) => {
  const regex = new RegExp(req.params.keyword, 'i');

  const results = await Resource.find({
    name: { $regex: regex },
    public: true
  });

  res.status(200).json({
    status: 'success',
    length: results.length,
    results
  });
});

exports.getUserLinks = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const links = await Resource.find({
    author: userId
  });

  links.map(link => {
    if (link.author._id.toString() !== userId.toString()) {
      next(new AppError('This links lists not belonging to You'));
    }
  });

  res.status(200).json({
    status: 'success',
    results: links.length,
    data: {
      data: links
    }
  });
});

exports.author = (req, res, next) => {
  req.body.author = req.user._id;
  next();
};
