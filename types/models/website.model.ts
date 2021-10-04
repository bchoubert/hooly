import PageModel from './page.model';

/**
 * Website enitty
 */
 interface WebsiteModel {
   // domain of the website
   domain: string;

  // name of the website
  name: string;

  // Populated when needed: list of page we have for this website
  pages?: PageModel[];
}

export default WebsiteModel;
