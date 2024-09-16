
import promisePool from '../database/index.js'

// @desc   Get all posts
// @route  GET /api/posts
export const getPosts  = async  (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const [rows] = await promisePool.query('SELECT * from posts');
  
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(rows.slice(0, limit));
  }

  res.status(200).json(rows);
};

// @desc    Get single post
// @route   GET /api/posts/:id
export const getPost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const [rows, fields] = await promisePool.query('SELECT * from users where id = ?', [id]);


  if (rows.length === 0) {
    const error = new Error(`A user with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json({data: rows});
};

// @desc    Create new post
// @route   POST /api/posts
export const createPost =  async (req, res, next) => {
  const {user_id,content,likes} = req.body
  const sql = 'INSERT INTO posts (user_id, content, likes) VALUES (?, ?, ?)';
  const [rows, fields] = await promisePool.query(sql, [user_id, content, likes || 0]);

 // Retrieve the newly created post using the insertId
 const sqlSelect = 'SELECT * FROM posts WHERE id = ?';
 const [post] = await promisePool.query(sqlSelect, [rows.insertId]);

 // Return the new post data
 res.status(201).json(post[0]);
};

// @desc    Update post
// @route   PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const {likes} = req.body
  const sql = 'UPDATE posts SET likes = ? WHERE id = ?';
  const [rows, fields] = await promisePool.query(sql, [likes, id]);

  res.status(200).json(rows);
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
export const deletePost = async(req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletePostSql = 'DELETE FROM posts WHERE id = ?';
    const deleteCommentsSql = 'DELETE FROM comments WHERE post_id = ?';
   await promisePool.query(deletePostSql, [id]);
     await promisePool.query(deleteCommentsSql, [id]);

    res.status(200).json('post deeted');
  } catch (error) {
    console.log(error);
    res.json({
      status: 'error'
    })
    
  }
 
};
