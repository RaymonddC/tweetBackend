const { LikeTweet } = require('./../models');

const likeCreate = async (req, res) => {
  try {
    const { tweetId } = req.params;
    // const file = req.file;

    if (!tweetId) throw { message: 'No Tweet To Like', code: 400 };

    const userId = req.user?.id;
    const result = await LikeTweet.create({
      tweet_id: tweetId,
      user_id: userId || 1,
    });

    if (result)
      res.status(200).send({
        success: true,
        message: 'Like Success',
        data: result,
      });
    else throw { message: 'Like Failed!', code: 400 };
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllLike = async (req, res) => {
  try {
    const { count, rows } = await LikeTweet.findAndCountAll({
      //   include: {
      //     model: LikeTweet,
      //     //     attributes: ['id'],
      //   },
      //   where: whereQuery,
      //   order: [[orderedBy || 'product_name', ordered || 'ASC']],
      //   limit: limitPage,
      //   offset: (Number(page) - 1) * limitPage,
    });

    return res.status(200).send({
      success: true,
      message: 'getAll Likes',
      data: rows,
      pageCount: count,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  likeCreate,
  getAllLike,
};
