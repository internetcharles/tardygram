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
      const { rows } = await pool.query(
        'INSERT INTO grams (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
        [gram.userId, gram.photoUrl, gram.caption, gram.tags]
      );
  
      return new Gram(rows[0]);
    }

    static async findAll() {
      const { rows } = await pool.query(`
        SELECT * FROM grams
      `);

      return rows.map(row => new Gram(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
        SELECT * FROM grams WHERE id=$1
      `, [id]);
      return rows.map(row => new Gram(row));
    }
};
