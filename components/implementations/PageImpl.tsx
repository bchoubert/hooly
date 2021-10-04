import PageModel from "../../types/models/page.model";

import Link from 'next/link';
import { memo } from "react";

interface PageImplProps {
  page?: PageModel;
}

const PageImpl = ({
  page,
}: PageImplProps) => {
  if (!page) {
    return null;
  }

  return (
    <div>
      {page.url}
      <ul>
        {(page.instances || []).map(i => (
          <li key={i.id}>
            <Link href={`/admin/page_instance/${i.id}`}>
              <a>{i.generationDate}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(PageImpl);
