
import promisePool from '../database/index.js'

// @desc   Get all comments
// @route  GET /api/comments
export const  getCommnets = async  (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const [rows, fields] = await promisePool.query('SELECT * from comments');
  
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(rows.slice(0, limit));
  }

  res.status(200).json(rows);
};

// @desc    Get single comment
// @route   GET /api/comments/:id
export const getCommnet = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const [rows, fields] = await promisePool.query('SELECT * from users where id = ?', [id]);


  if (rows.length === 0) {
    const error = new Error(`A user with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json({data: rows});
};

// @desc    Create new comment
// @route   POST /api/comments
export const createCommnet =  async (req, res, next) => {
  const {user_id, post_id, content} = req.body
  const sql = 'insert into comments (user_id, post_id, content) values (?,?,?)';
  const [rows, fields] = await promisePool.query(sql, [user_id, post_id, content]);

  

  res.status(201).json({data: rows});
};

// @desc    Update comment
// @route   PUT /api/comments/:id
export const updateCommnet = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const {email,username,logo,password} = req.body
  const sql = 'update  users  set email = ? ,username = ? ,logo = ? ,password = ? where id= ?';
  const [rows, fields] = await promisePool.query(sql, [email,username,logo,password, id]);

  res.status(200).json({data: rows});
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
export const deleteCommnet = async(req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const sql = 'delete from users where id =?';
    const [rows, fields] = await promisePool.query(sql, [id]);
    res.status(200).json({data: rows});
  } catch (error) {
    console.log(error);
    res.json({
      status: 'error'
    })
    
  }
 
};
