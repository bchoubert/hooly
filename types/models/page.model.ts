import PageInstanceModel from './pageInstance.model';
import WebsiteModel from './website.model';

/**
 * Page Model
 */
 interface PageModel {

  // Url that links to the page
  url: string;

  // Website that owns the page
  websiteDomain: string;

  // Populated on demand: website that owns the page
  website?: WebsiteModel;

  // Populated on demand: instances of this page
  instances?: PageInstanceModel[];
}

export default PageModel;
