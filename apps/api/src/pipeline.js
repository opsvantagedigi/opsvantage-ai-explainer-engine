const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

function ensureOutputDir(jobId) {
  const out = path.join(process.cwd(), '..', '..', 'scripts', 'output', jobId);
  fs.mkdirSync(out, { recursive: true });
  return out;
}

async function runPromptToVideo(jobId, input) {
  const createdAt = new Date().toISOString();
  const job = {
    id: jobId,
    status: 'processing',
    prompt: input,
    createdAt,
  };

  const out = ensureOutputDir(jobId);

  const script = [
    { id: uuidv4(), start: 0, end: 5, text: `Hook: ${input.prompt}` },
    { id: uuidv4(), start: 5, end: 40, text: `Body: Expand on ${input.prompt}` },
    {
      id: uuidv4(),
      start: 40,
      end: 55,
      text: `Summary and CTA: ${input.callToAction || 'Subscribe'}`,
    },
  ];
  fs.writeFileSync(path.join(out, 'script.json'), JSON.stringify(script, null, 2));

  const audioSegments = script.map((s, i) => {
    const p = path.join(out, `audio-${i + 1}.txt`);
    fs.writeFileSync(p, `AUDIO MOCK for segment: ${s.text}`);
    return p;
  });

  const visuals = script.map((s, i) => `visual_${i + 1}`);
  fs.writeFileSync(path.join(out, 'visuals.json'), JSON.stringify(visuals, null, 2));

  const renderPath = path.join(out, 'rendered.mp4');
  fs.writeFileSync(renderPath, `MOCK_VIDEO for job ${jobId}`);

  job.script = script;
  job.audioSegments = audioSegments;
  job.visuals = visuals;
  job.renderPath = renderPath;
  job.status = 'rendered';

  fs.writeFileSync(path.join(out, 'job.json'), JSON.stringify(job, null, 2));

  return job;
}

module.exports = { runPromptToVideo };
