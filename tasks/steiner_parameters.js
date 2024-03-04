function Steiner(settings) {
}

Steiner.prototype.parameters = function () {
  return [{
    name: "connected",
    title: "Соединены ли точки",
    ordering: "maximize",
    view: function (value) {
      return value ? "Да" : "Нет";
    },
  }, {
    name: "segmentsLength",
    title: "Сумма длин отрезков",
    ordering: "minimize",
    view: ""
  }, {
    name: "numPoints",
    title: "Число точек",
    ordering: "minimize",
    view: ""
  }];
};

var steiner_parameters = {
  Steiner: Steiner
}
