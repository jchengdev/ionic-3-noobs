import { Injectable } from '@angular/core';

const config_key_name = 'config';

@Injectable()
export class ConfigProvider {

  constructor() { }

  getConfigData(): any {
    return JSON.parse(localStorage.getItem(config_key_name));
  }

  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: '',
      username: ''
    };

    if (showSlide) config.showSlide = showSlide;
    if (name) config.name = name;
    if (username) config.username = username;

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

}
