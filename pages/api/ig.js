
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'URL tidak valid' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const html = response.data;
    const match = html.match(/"video_url":"([^"]+)"/);
    const imgMatch = html.match(/"display_url":"([^"]+)"/);

    if (match) {
      return res.json({ download_url: match[1].replace(/\\u0026/g, '&') });
    } else if (imgMatch) {
      return res.json({ download_url: imgMatch[1].replace(/\\u0026/g, '&') });
    } else {
      return res.status(404).json({ error: 'Media tidak ditemukan' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Gagal mengambil konten.' });
  }
}
