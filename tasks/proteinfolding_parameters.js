function Proteinfolding(settings) {
}

Proteinfolding.prototype.parameters = function () {
  return [{
    name: "energy",
    title: "Энергия взаимодействия",
    ordering: "minimize",
    view: function (value) {
      return value.toFixed(3);
    }
  }];
};

var proteinfolding_parameters = {
  Proteinfolding: Proteinfolding
}
