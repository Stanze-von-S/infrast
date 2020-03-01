import {urlConcat} from './functions';
// const configApi = {
//     baseUrl: 'https://praktikum.tk/cohort4',
//     headers: {
//         authorization: 'b79170d1-fa09-48c3-8dc3-1be954624527',
//         'Content-Type': 'application/json'
//     }
// };

class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

    }

    // запрос карточек и профиля
    getPage() {
      return Promise.all([this.getProfileApi(), this.fetchCardRenderApi()]);
    }

    fetchCardRenderApi() {
        const varCard = urlConcat(this.baseUrl, '/cards');
        return fetch(varCard, {
            method: 'GET',
            headers: this.headers
        })
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                return Promise.reject('Error');                
            })
    }

    getProfileApi() {
        // Мы получаем профиль
        const varUser = urlConcat(this.baseUrl, '/users/me');
        return fetch(varUser, {
          method: 'GET',
          headers: this.headers
        })
          .then(data => {
            if (data.ok) { 
              return data.json(); 
            }
            return Promise.reject('Error');
          })
          .catch((err) => {
            console.log(err)
          });
      }
       
      editProfileApi(user) {
        // Мы редактируем профиль
        const varUser = urlConcat(this.baseUrl, '/users/me');
        return fetch(varUser, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
            name: user.name,
            about: user.about
          })
        })
          .then(data => {
            if (data.ok) {
              return data.json();
            }
            return Promise.reject('Error');
          })
          .catch((err) => {
            console.log(err.status);
          });
      }

      addCardApi(card){        
        return fetch(`${this.baseUrl}/cards`, {
          method: 'POST',
          headers: this.headers,         
          body: JSON.stringify({
            name: card.name,
            link: card.link
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

      // удаление карточки
    deleteCard(cardElement) {
      return fetch(`${this.baseUrl}/cards/${cardElement.dataset.id}`, {
          method: 'DELETE',
          headers: this.headers,
          body: JSON.stringify({
              _id: cardElement.dataset.id,
          })
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Что-то пошло не так... ${res.status}`);
          });
  }

  // добавление/удаление лайка
  likeCard(cardElement, method) {
      return fetch(`${this.baseUrl}/cards/like/${cardElement.dataset.id}`, {
          method: `${method}`,
          headers: this.headers,
          body: JSON.stringify({
              likes: cardElement.likes,
          })
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Что-то пошло не так... ${res.status}`);
          });
  }

  // смена аватара
  changeAvatar(avatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
              avatar: avatar,
          })
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Что-то пошло не так... ${res.status}`);
          });
  }
}

export {Api};
