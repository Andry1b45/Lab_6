const show = async () => {
  const data = await fetchData();
  const root = document.getElementById("root");
  //готовим массив строк для отрисовки таблицы
  const list = data.map(
    elem =>
      `<tr>
            <td>${elem.id}</td>
            <td>${elem.Name}</td>
            <td>${elem.Surname}</td>
            <td>${elem.Nick}</td>
        </tr>`
  );
  //рисуем таблицу
  root.innerHTML = `<table class="table table-striped table-sm"> 
    <thead>
      <tr>
        <th>№</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Nick</th>
      </tr>
    </thead>
    <tbody>
    ${
      list.join("") //объединяем массив в строку
    }
    </tbody>`;
};

const fetchData = async () => { 
  const fetched = await fetch("/api/") //промис, если мы зашли, и все нормас, мы возвращаем данные
    .then(response => { //дата с базы данных (апи)
      if (response.ok) {
        return response.json(); //превращаем в объект (потому что это было строкой)
      }
    })
    .then(data => { 
      return data;
    });
  return fetched;
};

document.getElementById("registerForm").onsubmit = async e => { //получили форму и сделали так, чтоб на онсабмите выполнялась ф-ция
  e.preventDefault(); //не даем перезагрузиться странице
  const { elements } = e.target; //получаем элементы
  const coll = Array.from(e.target.elements).slice(0,2); //не дает заполнить пустые
  if (!coll.every((elem) => elem.value !== '')
  ) {
    alert("Ви не заповнили всі поля реєстрації! Спробуйте ще раз!");
    return;
  }
  const data = {
    Name: elements[0].value, //разделяем наши инпуты
    Surname: elements[1].value,
    Nick: elements[2].value
  };
  console.log(data);
  await fetch("/api/", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //превращаем его в строку
  }); //отправляем на сервер данные
  Array.prototype.forEach.call(e.target.elements, elem => {
    //делает поля пустыми
    elem.value = "";
  });
  await show();
};
