import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/normalize.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./services";
import { setCards, setStats, setSnapshots, setStatsHistory } from "./services/slices/cards";
import { getDistanceBySolution, getDropsBySolution } from "./utils/checkSolution";
import { level1Cards, level2Cards, startCards } from "./constants/card";
import { checkReadyDeck, filterSolutions } from "./utils/cardStack";
import { setBasePath } from "./services/slices/user";
export class Solitaire {
  // Разработка задачи начинается с выбора идентификатора. Он должен состоять из маленьких букв, возможно, с подчеркиваниями.
  // В этой задаче идентификатор будет `collatz_js`. Каталог с задачей должен называться как id задачи. Основной файл с
  // исходным кодом должен называться как id задачи. Каталог с ресурсами должен называться как id-resources.
  // Класс с задачей должен называться как id задачи с большой буквы (Collatz_js).

  //
  //     /**
  //      * создаем класс Collatz, конструктор может быть пустым, инициализация происходит позже.
  //      * Конструктор может быть вызван не в браузере, поэтому из него нельзя обращаться к DOM.
  //      * Это необходимо для автоматической проверки решений на сервере.
  //      *
  //      * @param settings произвольный объект настроек "лаборатории".
  //      * Обычно settings содержит только информацию об уровне, например settings = {level : 2}
  //      * @constructor
  //      */
  constructor(settings) {
    this.settings = settings;
    this.isLoading22 = false;

    if ("level" in settings) {
      const level = +settings.level;
      switch (level) {
        case 0:
          store.dispatch(setCards(JSON.parse(startCards)));
          break;
        case 1:
          store.dispatch(setCards(JSON.parse(level1Cards)));
          break;
        case 2:
          store.dispatch(setCards(JSON.parse(level2Cards)));
          break;
      }
    } else {
      console.warn("Уровень не выбран");
      store.dispatch(setCards(JSON.parse(startCards)));
    }
    store.dispatch(setStats({ length: 0, steps: 0, drops: 0, isReady: false }));
    store.dispatch(setSnapshots([]));
    store.dispatch(setStatsHistory([]));
  }
  //
  // // Далее перечисляются функции, которые нужно реализовать
  //
  //     /**
  //      * Возвращается ключ для хранения данных о процессе решения в localstorage, формируется на основе id и данных из
  //      * настроек. В будущем этот метод будет удалён, ключ будет формироваться автоматически.
  //      */
  id = function () {
    return "solitaire";
  };
  //
  //     /**
  //      * Функция инициализации, в этой функции можно создавать интерфейс задачи и уже можно пользоваться KioApi
  //      * @param domNode dom-узел, который нужно наполнять содержимым задачи
  //      * @param kioapi ссылка на api для совершения всех действий с задачей
  //      * @param preferred_width ширина div, в котором нужно создать условие задачи. Рекомендуется не использовать это
  //      * значение, ширина окна браузера может меняться в процессе работы с лабораторией.
  //      */
  initialize = function (domNode, kioapi) {
    try {
      //сохраняем данные для будущего использования
      this.kioapi = kioapi;
      this.domNode = domNode;

      //settings могут иметь произвольные данные для инициализации, например, уровень
      // console.log('problem level is', this.settings.level);

      //инициализируем интерфейс
      //инициализируем содержимое задачи в элементе domNode,
      //initInterface - это наш собственный приватный метод
      //В коде, по историческим причинам, используется jquery. Сейчас рекомендуется разрабатывать без него.

      this.scene = React.createRef();

      if (!(this.domNode instanceof HTMLElement)) return;
      const root = ReactDOM.createRoot(this.domNode);

      store.subscribe(() => {
        const { length, steps, drops, progress } = store.getState().cards.stats;
        if (!(length || steps || drops || progress)) return;
        kioapi.submitResult(store.getState().cards.stats);
      });

      store.dispatch(setBasePath(kioapi.basePath));

      root.render(
        <React.StrictMode>
          <Provider store={store}>
            <App api={this.kioapi} />
          </Provider>
        </React.StrictMode>
      );
    } catch (e) {
      console.error(e);
    }
  };

  parameters = function () {
    return [
      {
        name: "isReady",
        title: "Собран ли пасьянс",
        ordering: "maximize",
        view: function (v) {
          if (+v > 0) return "Да";
          else return "Нет";
        },
      },
      {
        name: "length",
        title: "Длина перемещений",
        ordering: "minimize",
        view: "",
      },
      {
        name: "steps", //название параметра
        title: "Шаги", //отображение названия для пользователя
        ordering: "minimize", // 'maximize' - надо как можно больше, 'minimize' - как можно меньше
        view: "",
      },
      {
        name: "drops", //название параметра
        title: "Сбросы на пустые клетки", //отображение названия для пользователя
        ordering: "minimize", // 'maximize' - надо как можно больше, 'minimize' - как можно меньше
        view: "",
      },
    ];
  };
  //

  //      * Ресурсы (изображения, звуки) должны находиться в каталоге с именем `[id-задачи]-resources`.
  //      * Webpack настроен так, что он целиком копирует этот каталог в каталог dist с результатом.
  //      *
  //      * В общем случае, путь до ресурса считается от js-файла с задачей. Но т.к. все ресурсы находятся в каталоге
  //      * `[id-задачи]-resources`, надо указывать этот каталог в пути.
  //      * @returns [{id: String, src: String}]
  //      */
  //     static preloadManifest = function () {
  //         return [];
  //     };
  //
  //     /**
  //      * Возвращает текущее решение в виде объекта,
  //      * он будет сериализован с помощью JSON.stringify для хранения и передачи по сети, поэтому он должен содержать только
  //      * строки, числа, массивы, внутренние объекты.
  //      */
  solution = function () {
    try {
      console.log("saving solution ...");
      // var x = this.process == null ? 0 : this.process.x;
      const state = store.getState();

      // console.log("this1", state.cards.snapshots.length ? state.cards.snapshots : [state.cards.cards]);

      const sol = state.cards.snapshots.length
        ? filterSolutions([...state.cards.snapshots, state.cards.cards])
        : [state.cards.cards];
      const stats = state.cards.statsSnapshots.length
        ? filterSolutions([...state.cards.statsSnapshots, state.cards.stats])
        : [];

      return {
        solution: sol,
        stats: (stats || []).filter(({ length, steps, drops, progress }) => length || steps || drops || progress),
      };
    } catch (e) {
      console.error(e);
    }
    console.log("return nothing");
  };
  //
  //     /**
  //      * Загрузка решения в задачу. В качестве аргумента solution будет передан объект, который
  //      * до этого был сформирован в методе solution. При загрузке решения нужно обновить данные через kioapi.submitResult
  //      * @param solution решение для загрузки
  //      */
  loadSolution = function (taskSolution) {
    try {
      console.log("loading solution", taskSolution);
      console.trace();
      if (!taskSolution?.solution) return;
      const { solution, stats: statsHistory } = taskSolution;
      console.log(checkReadyDeck(solution[solution.length - 1]));
      const stats = {
        isReady: checkReadyDeck(solution[solution.length - 1]) || false,
        steps: solution.length - 1,
        length: statsHistory[statsHistory.length - 1]?.length || getDistanceBySolution(filterSolutions(solution)),
        drops: getDropsBySolution(filterSolutions(solution)),
      };

      store.dispatch(setCards(solution[solution.length - 1]));
      store.dispatch(setStats(stats));
      store.dispatch(setSnapshots(filterSolutions(solution)));
      store.dispatch(setStatsHistory(filterSolutions(statsHistory)));
      this.kioapi.submitResult(stats);
    } catch (e) {
      console.error(e);
    }

    // Надо вызвать kioapi.submitResult(), это уже делается в обработчике события 'change' поля ввода решения.
    // Поэтому вызываем обработчик этого события: вызываем в своём событии
  };
  //
}
