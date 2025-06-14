import packageInfo from '../../package.json';

class Config {

  app_debug:boolean;
  app_env:string;
  app_version:string;

  constructor(){
    this.app_version = packageInfo.version;
    this.app_env = process.env.REACT_APP_MODE??'dev';
    this.app_debug = Boolean(process.env.REACT_APP_DEBUG)??false;
  }
}

const config = new Config();

export default config;