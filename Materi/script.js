fetch('https://randomuser.me/api/?results=10')
  .then(response => response.json())
  .then(data => {
    const users = data.results;
    const userList = document.getElementById('user-list');
    users.forEach(user => {
      const name = user.name.first + ' ' + user.name.last;
      const image = user.picture.medium;
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = image;
      li.textContent = name;
      li.appendChild(img);
      userList.appendChild(li);
    });
  })
  .catch(error => console.log(error));
