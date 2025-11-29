---
title: Inserción Laboral
---

```js
const insercion = FileAttachment("./data/insercion-laboral.json").json();
```

```js
Plot.plot({
  x: {axis: null},
  y: {tickFormat: "s", grid: true},
  color: {scheme: "rainbow", legend: true},
  marks: [
    Plot.barY(insercion, {
      x: "indicador",
      y: "valor",
      fill: "indicador",
      fx: "year",
      sort: {x: null, color: null, fx: {value: "y", reduce: "max"}
      }
    }),
    Plot.ruleY([0])
  ]
})
```

```js
function sparkbar(max) {
  return (x) => htl.html`<div style="
    background: var(--theme-green);
    color: black;
    font: 10px/1.6 var(--sans-serif);
    width: ${100 * x / max}%;
    float: left;
    padding-right: 3px;
    box-sizing: border-box;
    overflow: visible;
    display: flex;
    justify-content: end;">${x.toLocaleString("es-ES")}`
}
```

```js
viewof filtroIndicador = Inputs.select(
  [...new Set(insercion.map(d => d.indicador))],
  {
    label: "Indicador",
    // Si quieres poder volver a ver todos:
    // prompt: "Todos los indicadores"
  }
)
```

```js
datosFiltrados = insercion.filter(d =>
  !filtroIndicador || d.indicador === filtroIndicador
)
```

```js
Inputs.table(insercion, {
  columns: [
    "indicador",
    "year",
    "valor"
  ],
  format: {
    //valor: (x) => x.toFixed(2)
    valor: sparkbar(d3.max(insercion, d => d.valor))
  },
  width: {
    indicador: 250,
    year: 40,
    valor: 140
  },
  align: {
    indicador: "left",
    year: "center",
    valor: "left"
  },
  //rows: 18,
  maxWidth: 840,
  multiple: false,
  layout: "fixed"
}
)
```
