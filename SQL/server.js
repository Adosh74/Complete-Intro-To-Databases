const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    'postgresql://postgres:mysecretpassword@localhost:5432/adoption'
})

const main = async () => {
  const app = express();
  const PORT = 3000;

  app.use(express.static('./static'));
  
  app.get('/get', async(req, res) => {
    const client = pool.connect();

    const [commentRes, boardRes] = await Promise.all([
      (await client).query(`SELECT * FROM comments 
                    NATURAL LEFT JOIN rich_content 
                    WHERE board_id = $1;
      `, [req.query.search]),

      (await client).query(`SELECT * FROM boards 
                    WHERE board_id = $1;
      `, [req.query.search])

    ])

    res.status(200).json({
      status: 'success',
      board: boardRes.rows[0] || {},
      comments: commentRes.rows || []
    })
  })
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🚀`);
  });

}

main()