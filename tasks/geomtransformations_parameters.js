function Geomtransformations(settings) {
}

Geomtransformations.prototype.parameters = function () {
  return [{
    name: "similarity",
    title: "Собрана ли фигура",
    ordering: "maximize",
    view: function (value) {
      if (value.toFixed(1) === "100.0") {
        return "Да";
      }

      return "Нет";
    },
  }, {
    name: "cost",
    title: "Количество преобразований",
    ordering: "minimize",
    view: "",
  }, {
    name: "pathsLength",
    title: "Сумма длин путей",
    ordering: "minimize",
    view: ""
  }];
};

var geomtransformations_parameters = {
  Geomtransformations: Geomtransformations
}
