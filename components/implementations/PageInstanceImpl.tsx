import PageInstanceModel from "../../types/models/pageInstance.model";

import styles from '../../styles/Instance.module.css';

import Image from 'next/image'
import IFrame from "../utils/Iframe";
import { memo } from "react";

interface PageInstanceImplProps {
  pageInstance?: PageInstanceModel;
}

const PageInstanceImpl = ({
  pageInstance,
}: PageInstanceImplProps) => {
  if (!pageInstance) {
    return null;
  }

  return (
    <div>
      {pageInstance.generationDate}
      <Image
        src={`data:image/png;base64,${pageInstance.screenshot}`}
        alt={`Screenshot of the URL ${pageInstance.pageUrl}`}
        width="600"
        height="400"
      />
      <IFrame
        className={styles.instancePreview}
        html={pageInstance.content}
      />
      <IFrame
        className={styles.instancePreview}
      />
    </div>
  );
};

export default memo(PageInstanceImpl);
