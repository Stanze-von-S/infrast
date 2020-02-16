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
        const arrCard = [this.container.baseUrl, '/cards'];
        const varCard = arrCard.join('');
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
        const arrUser = [this.container.baseUrl, '/users/me'];
        const varUser = arrUser.join('');
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
        const arrUser = [this.container.baseUrl, '/users/me'];
        const varUser = arrUser.join('');
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
}

export {Api, configApi};
