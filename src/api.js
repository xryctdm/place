export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(this.getUrl('/users/me'), {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  getInitialCards() {
    return fetch(this.getUrl('/cards'), {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  saveUserInfo(name, about) {
    return fetch(this.getUrl('/users/me'), {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  updateAvatar(avatar) {
    return fetch(this.getUrl('/users/me/avatar'), {
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
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  addCard(name, link) {
    return fetch(this.getUrl('/cards'), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  deleteCard(id) {
    return fetch(this.getUrl('/cards/')+id, {
      method: 'DELETE',
        headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  likeCard(id) {
    return fetch(this.getUrl('/cards/like/')+id, {
      method: 'PUT',
        headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  dislikeCard(id) {
    return fetch(this.getUrl('/cards/like/')+id, {
      method: 'DELETE',
        headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert('Что-то пошло не так. ' + err);
    });
  }

  getUrl(path) {
    return this.baseUrl + path;
  }
}