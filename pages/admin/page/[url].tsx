import PageModel from "../../../types/models/page.model";
import PageService from "../../../services/page.service";
import PageInstanceService from "../../../services/pageInstance.service";

import PageImpl from "../../../components/implementations/PageImpl";
import { memo } from "react";

interface AdminPageProps {
  page: PageModel | null;
}

const AdminPage = ({
  page,
}: AdminPageProps) => {
  return (
    <PageImpl page={page} />
  );
}

export async function getServerSideProps({ params }): Promise<{ props: AdminPageProps }> {
  const parsedUrl = decodeURIComponent(params.url)

  const [page, instances] = await Promise.all([
    PageService.getOne(parsedUrl),
    PageInstanceService.getForPage(parsedUrl),
  ]);

  return {
    props: {
      page: page ? ({
        ...page,
        instances,
      }) : null,
    }
  };
}

export default memo(AdminPage);
