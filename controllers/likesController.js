const { User, Tweet, LikeTweet } = require('./../models');
const { Op } = require('sequelize');
// const Post = db.Post;

const sequelize = require('sequelize');

const limitPage = 15;

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
    // let { searchCategory, ordered, orderedBy, searchQuery, page } = req.query;

    // let whereQuery = {
    //   caption: { [Op.like]: `%${searchQuery || ''}%` },
    // };

    // if (searchCategory) whereQuery['category_id'] = searchCategory;

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
    // const { page } = req.query;

    // let result = await Tweet.findAll({
    //   //   attributes: { exclude: ['category_image'] },
    // });

    // const posts = await Post.findAll({
    //   offset: (page - 1) * limitPage,
    //   limit: limitPage,
    //   include: {
    //     model: User,
    //     attributes: ['firstName', 'email', 'username'],
    //   },
    // });

    // const { count, rows } = await Post.findAndCountAll({
    //   offset: (page - 1) * limitPage,
    //   limit: limitPage,
    //   include: {
    //     model: User,
    //     attributes: ['firstName', 'email', 'username'],
    //   },
    // });

    // const rows = await PostRepo.findAll();

    // console.log(posts);

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
  likeCreate,
  getAllLike,
  //   deletePost,
  //   updatePost,
  //   getUserPost,
  //   getAllPost,
  //   getPostByContent,
};
