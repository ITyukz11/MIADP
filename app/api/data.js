// pages/api/data.js
import sql from 'mssql';

const sqlConfig = {
  // Configuration object
};

export default async function handler(req, res) {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM dbo.Subprojects');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    sql.close();
  }
}
