
export const sendScrapRequest = async (url: string) => fetch('/api/scrap', {
  method: 'POST',
  body: JSON.stringify({ url }),
});
