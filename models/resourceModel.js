const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A list must have a name'],
      trim: true,
      maxlength: [20, 'A list name must have less or equal than 20 characters'],
      minlength: [4, 'A tour name must have more or equal than 10 characters'],
    },
    description: {
      type: String,
      required: [true, 'A list must have a description'],
      trim: true,
      maxLength: [140, 'A list must have less or equal than 160 characters.'],
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan sagittis tellus, ac molestie metus dignissim eu. Phasellus ac.',
    },
    cover: {
      type: String,
      default: '../assets/defaultCover.png',
      required: [true, 'A list must have cover'],
    },
    public: {
      type: Boolean,
      required: [true, 'A list must have specified public visibility'],
      default: false,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A list must have an owner.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true,
    },
    addedToBookmark: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    links: [
      {
        url: {
          type: String,
          required: [true, 'Element must to have url'],
        },
        image: {
          type: String,
          required: [true, 'Link must have an image.'],
          default: '../defaultCover',
        },
        title: {
          type: String,
          required: [true, 'A link must have an title'],
        },
        description: {
          type: String,
          required: [true, 'Link must have an description'],
        },
        type: {
          type: String,

          default: 'article',
        },
        video: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

resourceSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: '-__v -passwordChangedAt -role -savedLists',
  });

  next();
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
