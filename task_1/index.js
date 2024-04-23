import { encoded, translations } from "./data.js";

// Функция для поиска уникальных значений (тех, что встречаются только единожды)

function getUniqueId(arr) {
  const uniqueIdObj = {};
  const uniqueValues = [];
  arr.forEach((item) => {
    Object.values(item).forEach((value) => {
      uniqueIdObj[value] = (uniqueIdObj[value] || 0) + 1;
    });
  });

  Object.keys(uniqueIdObj).forEach((key) => {
    if (uniqueIdObj[key] === 1) {
      uniqueValues.push(key);
    }
  });

  return uniqueValues;
}

// Функция для расшифровки массива объектов

function translate(encodedArr, translationsObj) {
  const translateKey = Object.keys(translationsObj);
  const decoded = encodedArr.map((item) => {
    const decodedObject = {};
    for (let key in item) {
      if (
        key.includes("Id") &&
        translateKey.includes(item[key]) &&
        key !== ("groupId" && "service" && "formatSize" && "ca")
      ) {
        const translated = translations[item[key]];
        decodedObject[key] = translated !== undefined ? translated : item[key];
      } else {
        decodedObject[key] = item[key];
      }
    }
    return decodedObject;
  });

  return { decoded, ...getUniqueId(encoded) };
}

console.log(translate(encoded, translations));

// В данном задании я создаю функцию с двумя параметрами. Первый это массив объектов, внутри которых находятся значения,
// св-ва которых нужно декодировать, а второй является объектом с парами ключ: значение, при помощи которого я буду декодировать поля в объектах.
// В начале я создаю переменную, значение которой является массив ключей из объекта translations. После я создаю переменную decoded, значением которой является результат обхода
// массива encoded методом map (встроенный в JS метод массивов). Метод map принимает в качестве аргумента коллбэк, в паметры которого мы записываем
// item(это будет текущий объект).Внутри коллбэк функции я сначала инициализирую пустой объект decodedObject (это нужно для того, чтобы не изменять наш исходный объект, таким образом мы работаем с иммутабельным объектом), в который буду записывать декодированные
// поля в формате ключ: значение.После чего, при помощи цикла for...in я прохожусь по полям текущего объекта (item) и внутри самого цикла проверяю
// при помощи условной конструкции, содержит ли в названии ключ объекта строку 'Id'(это я делаю при помощи встроенного в JS метода includes()) и не равен
// ли он исключениям, прописанным в задании. Если поле проходит проверку, то мы записываем его декодированную версию в созданный ранее пустой объект decodedObject
// Если же поле проверку не проходит, то я так же его добавляю в созданный объект, но не изменяю его значение.
// После этого я внутри map возвращаю декодированный объект.
// И в конце я возвращаю объект, первым полем которого являются декодированные объекты, а вторым - результат функции getUniqueId.
