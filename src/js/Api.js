import {urlConcat} from './functions';
const configApi = {
    baseUrl: 'https://praktikum.tk/cohort4',
    headers: {
        authorization: 'b79170d1-fa09-48c3-8dc3-1be954624527',
        'Content-Type': 'application/json'
    }
};

class Api {
    constructor(configApi) {
        this.container = configApi;
    }

    fetchCardRenderApi() {
        const varCard = urlConcat(this.container.baseUrl, '/cards');
        return fetch(varCard, {
            method: 'GET',
            headers: this.container.headers
        })
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                return Promise.reject('Error');                
            })
            .then(res => {
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getProfileApi() {
        // Мы получаем профиль
        const varUser = urlConcat(this.container.baseUrl, '/users/me');
        return fetch(varUser, {
          method: 'GET',
          headers: this.container.headers
        })
          .then(data => {
            if (data.ok) { return data.json(); }
            return Promise.reject('Error');
          })
          .catch((err) => {
            console.log(err)
          });
      }
       
      editProfileApi(nameUser, aboutUser) {
        // Мы редактируем профиль
        const varUser = urlConcat(this.container.baseUrl, '/users/me');
        return fetch(varUser, {
          method: 'PATCH',
          headers: this.container.headers,
          body: JSON.stringify({
            name: nameUser,
            about: aboutUser
          })
        })
          .catch((err) => {
            console.log(err.status);
          });
      }

      addCardApi(card){
        const varCard = urlConcat(this.container.baseUrl, '/cards');
        return fetch(varCard, {
          method: 'POST',
          headers: this.container.headers,         
          body: JSON.stringify({
            name: card.name,
            about: card.link
          })
        })
        .then(res => {
          if (res.ok){
            return res.json;
          }
          return Promise.reject(`Error. ${res.status}`);
        })
          .catch((err) => {
            console.log(err.status);
          });

      }
}

export {Api, configApi};
