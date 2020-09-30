const pool = require('../utils/pool');

module.exports = class Gram {
    id;
    photoUrl;
    caption;
    tags;
    userId;
    
    constructor(row) {
      this.id = row.id;
      this.photoUrl = row.photo_url;
      this.caption = row.caption;
      this.tags = row.tags;
      this.userId = row.user_id;
    }

    static async insert(gram) {
      console.log(gram);
      const { rows } = await pool.query(
        'INSERT INTO grams (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
        [gram.user_id, gram.photoUrl, gram.caption, gram.tags]
      );
  
      return new Gram(rows[0]);
    }
};
