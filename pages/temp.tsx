import { useCallback, useState } from 'react';
import { sendScrapRequest } from '../http/scrap.http';

export default function Temp() {
  const [url, setUrl] = useState<string>('');

  const handleUrlChange = useCallback((event) =>  {
    setUrl(event.target.value);
  }, []);

  const handleSubmit = () => {
    if (url) {
      sendScrapRequest(url);
    }
  };

  return (
    <div>
      <h2>Index URL</h2>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="url"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="https://google.com"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
}
