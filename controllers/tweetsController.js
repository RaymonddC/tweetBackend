const { User, Tweet, LikeTweet } = require('./../models');
const { Op } = require('sequelize');
// const Post = db.Post;

const sequelize = require('sequelize');

// const limitPage = 3;

// const generateTable = async (req, res) => {
//   Post.sync({ alter: true });
//   res.send();
// };

// const verifyActiveUser = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     let result = await User.findOne({
//       where: {
//         id: userId,
//       },
//     });
//     if (result.dataValues.activationCode != 0) {
//       return res.status(400).send({
//         success: false,
//         message: 'activate User first',
//         data: null,
//       });
//     }
//     next();
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: error.message,
//       data: null,
//     });
//   }
// };

const tweetCreate = async (req, res) => {
  try {
    const { caption, reply_id } = req.body;
    const file = req.file;
    console.log(caption);

    if (!caption && !file) throw { message: 'Tweet at least have caption or image', code: 400 };

    const userId = req.user?.id;
    const result = await Tweet.create({
      caption,
      media: file?.filename || null,
      user_id: userId,
      reply_id: reply_id,
    });

    if (result)
      res.status(200).send({
        success: true,
        message: 'Tweet Success',
        data: result,
      });
    else throw { message: 'Tweet Failed!', code: 400 };
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllTweet = async (req, res) => {
  try {
    let { searchCategory, ordered, orderedBy, search, page = 1, limitPage = 3 } = req.query;

    let whereQuery = {
      caption: { [Op.like]: `%${search || ''}%` },
      reply_id: { [Op.eq]: null },
    };

    // if (searchCategory) whereQuery['category_id'] = searchCategory;

    const { count, rows } = await Tweet.findAndCountAll({
      include: [
        {
          model: LikeTweet,
          attributes: ['user_id'],
        },
        {
          model: User,
          attributes: ['username', 'official', 'profilePicture', 'fullname'],
        },
      ],
      where: whereQuery,
      order: [['createdAt', 'DESC']],
      limit: Number(limitPage),
      offset: (Number(page) - 1) * limitPage,
    });
    console.log(count);

    return res.status(200).send({
      success: true,
      message: 'getAll Post',
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

// const deletePost = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     let result = await Post.findOne({
//       where: {
//         id: id,
//       },
//     });

//     if (!result)
//       return res.status(400).send({
//         success: false,
//         message: 'Post not found',
//         data: null,
//       });

//     if (result.dataValues.user_id !== userId)
//       return res.status(400).send({
//         success: false,
//         message: 'Not users Post',
//         data: null,
//       });

//     const deletePost = await Post.destroy({
//       where: {
//         id: id,
//       },
//     });

//     if (!deletePost)
//       return res.status(400).send({
//         success: false,
//         message: 'Post not found',
//         data: null,
//       });

//     return res.status(200).send({
//       success: true,
//       message: 'Post Deleted',
//       data: result,
//       token: null,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: true,
//       message: error.message,
//       data: null,
//     });
//   }
// };

// const updatePost = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     let result = await Post.findOne({
//       where: {
//         id: id,
//       },
//     });

//     if (!result)
//       return res.status(400).send({
//         success: false,
//         message: 'Post not found',
//         data: null,
//       });

//     if (result.dataValues.user_id !== userId)
//       return res.status(400).send({
//         success: false,
//         message: 'Not users Post',
//         data: null,
//       });

//     const { caption, imageUrl } = req.body;

//     const post = result.dataValues;

//     const resultUpdate = await Post.update(
//       {
//         caption: caption ? caption : post.caption,
//         imageUrl: imageUrl ? imageUrl : post.imageUrl,
//         user_id: post.user_id,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     result = await Post.findOne({
//       where: {
//         id: id,
//       },
//     });

//     return res.status(200).send({
//       success: true,
//       message: 'Post Updated',
//       data: result,
//       token: null,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: true,
//       message: error.message,
//       data: null,
//     });
//   }
// };

// const getUserPost = async (req, res) => {
//   try {
//     const { page } = req.query;
//     const { username } = req.params;

//     const user = await User.findOne({
//       where: { username: username },
//     });

//     const posts = await Post.findAll({
//       offset: (page - 1) * limitPage,
//       limit: limitPage,
//       where: {
//         user_id: user ? user.id : -1,
//       },
//     });

//     return res.status(200).send({
//       success: true,
//       message: 'getPostUser success',
//       data: posts,
//       token: null,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: true,
//       message: error.message,
//       data: null,
//     });
//   }
// };

// const getPostByContent = async (req, res) => {
//   try {
//     const { caption, page } = req.query;
//     const userId = req.user.id;
//     const posts = await Post.findAll({
//       offset: (page - 1) * limitPage,
//       limit: limitPage,
//       where: {
//         user_id: userId,
//         caption: {
//           [Op.like]: `%${caption}%`,
//         },
//       },
//     });

//     return res.status(200).send({
//       success: true,
//       message: 'getAll Post',
//       data: posts,
//       token: null,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: true,
//       message: error.message,
//       data: null,
//     });
//   }
// };

module.exports = {
  //   generateTable,
  //   verifyActiveUser,
  tweetCreate,
  getAllTweet,
  //   deletePost,
  //   updatePost,
  //   getUserPost,
  //   getAllPost,
  //   getPostByContent,
};
