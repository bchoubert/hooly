import WebsiteModel from "../../types/models/website.model";

import Link from 'next/link';
import { memo } from "react";

interface WebsiteImplProps {
  website?: WebsiteModel;
}

const WebsiteImpl = ({
  website,
}: WebsiteImplProps) => {
  if (!website) {
    return null;
  }

  return (
    <div>
      {website?.name || 'Unknwon website'}
      <ul>
        {(website.pages || []).map(p => (
          <li key={p.url}>
            <Link href={`/admin/page/${encodeURIComponent(p.url)}`}>
              <a>{p.url}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(WebsiteImpl);
