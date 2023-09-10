import { Url } from './url';
import { Web } from './web';

export interface RijksArtwork {
  title: string;
  webImage: Url;
  links: Web;
  permitDownload: boolean;
}
