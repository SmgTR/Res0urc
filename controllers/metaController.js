const htmlToJson = require('html-to-json');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const fetchMeta = link =>
  htmlToJson.request(link, {
    meta: [
      'meta',
      function($meta) {
        return $meta['0'].attribs;
      }
    ]
  });

exports.sendMeta = catchAsync(async (req, res, next) => {
  const tags = await fetchMeta(req.url.substring(1));
  //if there's no meta tags throw error
  if (tags.meta.length === 0) {
    return next(
      new AppError(
        `Website has no og: tags, please check your data. ${req.url.substring(
          1
        )} `,
        404
      )
    );
  }

  const toSend = tags.meta
    .map(el => {
      //check if el has property, and includes og tag
      if (el.property !== undefined && el.property.includes('og')) {
        const linkEl = el.property.split(':');
        //remove 'og' from result
        linkEl.shift();
        const endPoint = linkEl.join(':');
        return { [endPoint]: el.content };
      }
    })
    .filter(function(element) {
      return element !== undefined;
    });

  res.status(200).json({
    status: 'success',
    url: req.url.substring(1),
    data: toSend
  });
});
