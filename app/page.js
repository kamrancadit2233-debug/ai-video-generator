'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setVideoUrl(data.videoUrl);
    setLoading(false);
  };

  return (
    <main style={{padding: '40px', textAlign: 'center', fontFamily: 'Arial', background: '#0a0a0a', color: 'white', minHeight: '100vh'}}>
      <h1>🎬 AI Video Generator</h1>
      <p>Type a prompt and generate AI video</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cat dancing on moon..."
          style={{padding: '12px', width: '80%', maxWidth: '400px', borderRadius: '8px', border: 'none'}}
          required
        />
        <br/><br/>
        <button type="submit" disabled={loading} style={{padding: '12px 24px', borderRadius: '8px', background: '#7c3aed', color: 'white', border: 'none', cursor: 'pointer'}}>
          {loading ? 'Generating...' : 'Generate Video'}
        </button>
      </form>
      {videoUrl && (
        <div style={{marginTop: '30px'}}>
          <video src={videoUrl} controls width="100%" style={{maxWidth: '500px', borderRadius: '12px'}} />
        </div>
      )}
    </main>
  );
    }
