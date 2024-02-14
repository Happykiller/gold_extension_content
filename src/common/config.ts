import packageInfo from '../../package.json';

class Config {

  app_env:string;
  app_version:string;

  constructor(){
    this.app_version = packageInfo.version;
    this.app_env = process.env.REACT_APP_MODE??'dev';
  }
}

const config = new Config();

export default config;