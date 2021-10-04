import WebsiteModel from '../../../types/models/website.model';
import WebsiteService from '../../../services/website.service';
import PageService from '../../../services/page.service';

import WebsiteImpl from '../../../components/implementations/WebsiteImpl';
import { memo } from 'react';

interface AdminWebsiteProps {
  website: WebsiteModel | null;
}

const AdminWebsite = ({
  website,
}: AdminWebsiteProps) => {
  return (
    <WebsiteImpl website={website} />
  );
}

export async function getServerSideProps({ params }): Promise<{ props: AdminWebsiteProps }> {
  const [website, pages] = await Promise.all([
    WebsiteService.getOne(params.domain),
    PageService.getForWebsite(params.domain),
  ]);

  return {
    props: {
      website: website ? ({
        ...website,
        pages,
      }) : null,
    },
  };
}

export default memo(AdminWebsite);
