import { connect } from '../../../utils/db';

export default async function handler(req, res) {
  const { method, body } = req;

  const connection = await connect();

  if (method === 'POST') {
    try {
      const { subprojectName, description } = body;
      await connection.query(
        'INSERT INTO Subprojects (subprojectName, description) VALUES (?, ?)',
        [subprojectName, description]
      );
      res.status(201).end();
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  connection.end();
}
