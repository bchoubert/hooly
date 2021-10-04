import PageInstanceModel from "../../../types/models/pageInstance.model";
import PageInstanceService from "../../../services/pageInstance.service";

import PageInstanceImpl from "../../../components/implementations/PageInstanceImpl";
import { memo } from "react";

interface AdminPageInstanceProps {
  pageInstance: PageInstanceModel | null;
}

const AdminPageInstance = ({
  pageInstance,
}: AdminPageInstanceProps) => {

  return (
   <PageInstanceImpl pageInstance={pageInstance} />
  );
}

export async function getServerSideProps({ params }): Promise<{ props: AdminPageInstanceProps }> {
  const pageInstance = await PageInstanceService.getOne(params.id);

  return {
    props: {
      pageInstance: pageInstance ?? null,
    }
  }
}

export default memo(AdminPageInstance);
