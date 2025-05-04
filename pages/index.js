
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ig?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Gagal mengambil data.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Instagram Reels Downloader</h1>
      <input
        className="w-full max-w-md p-3 mb-4 rounded text-black"
        type="text"
        placeholder="Masukkan URL Instagram..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload} className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition">
        {loading ? 'Memuat...' : 'Download'}
      </button>

      {result && (
        <div className="mt-6 max-w-md text-center">
          {result.download_url ? (
            <div>
              {result.download_url.includes('.mp4') ? (
                <video src={result.download_url} controls className="w-full rounded" />
              ) : (
                <img src={result.download_url} alt="Media" className="w-full rounded" />
              )}
              <a href={result.download_url} target="_blank" rel="noopener noreferrer" className="block mt-3 underline text-blue-400">
                Unduh Media
              </a>
            </div>
          ) : (
            <p className="text-red-400">{result.error || 'Tidak ada hasil.'}</p>
          )}
        </div>
      )}
    </div>
  );
}
