export function shareToX(haiku: { firstLine: string; secondLine: string; thirdLine: string }, url: string) {
  const text = `${haiku.firstLine}\n${haiku.secondLine}\n${haiku.thirdLine}\n\n#詠んでみた`;
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
} 