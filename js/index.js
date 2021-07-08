function init() {
  function createMonsterPage(data) {
    let monstersContainer = document.getElementById("monster-container");
    for (let monster of data) {
      let monsterName = document.createElement("h2");
      let monsterAge = document.createElement("h4");
      let monsterBio = document.createElement("p");

      monsterName.innerText = monster.name;
      monsterAge.innerText = monster.age;
      monsterBio.innerText = monster.description;

      monstersContainer.appendChild(monsterName);
      monstersContainer.appendChild(monsterAge);
      monstersContainer.appendChild(monsterBio);
    }
  }
  let formInfo = document.getElementById("create-form");
  formInfo.addEventListener("submit", (e) => {
    e.preventDefault();
    let newName = e.target.name.value;
    let newAge = e.target.age.value;
    let newDescrip = e.target.desc.value;
    let newObj = {
      name: newName,
      age: newAge,
      description: newDescrip,
    };
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newObj),
    });
  });
  fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then((resp) => resp.json())
    .then((data) => {
      createMonsterPage(data);
      let nextBtn = document.getElementById("forward");
      nextBtn.addEventListener("click", () => {
        fetch("http://localhost:3000/monsters/?_limit=100&_page=1")
          .then((resp) => resp.json())
          .then((data) => {
            let newData = data.filter((item) => {
              return item.id > 50 && item.id <= 100;
            });
            createMonsterPage(newData);
          });
      });
    });
}

window.addEventListener("DOMContentLoaded", init);
