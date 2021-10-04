import PageModel from './page.model';

/**
 * PageInstance Model
 */
interface PageInstanceModel {

  // PK
  id?: number;

  // Generation date
  generationDate?: Date;

  // screenshot
  screenshot: string;

  // Content of the page
  content: string;

  // FK to Page Model
  pageUrl: string;

  // FK, populated on demand
  page?: PageModel;
}

export default PageInstanceModel;
