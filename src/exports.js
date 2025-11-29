import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import {FileAttachment, Inputs, html} from "observablehq:stdlib";

// 1. Re-define the data loader
const insercion = FileAttachment("./data/insercion-laboral.json").json();

// 2. Re-define the sparkbar function
function sparkbar(max) {
  return (x) => html`<div style="
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

// 3. Export the Chart as a function that returns a DOM element
export async function getChart() {
  const data = await insercion;
  return Plot.plot({
    x: {axis: null},
    y: {tickFormat: "s", grid: true},
    color: {scheme: "rainbow", legend: true},
    marks: [
      Plot.barY(data, {
        x: "indicador",
        y: "valor",
        fill: "indicador",
        fx: "year",
        sort: {x: null, color: null, fx: {value: "y", reduce: "max"}}
      }),
      Plot.ruleY([0])
    ]
  });
}

// 4. Export the Table as a function that returns a DOM element
export async function getTable() {
    const data = await insercion;
    const max = d3.max(data, d => d.valor);
    const sbar = sparkbar(max);

    return Inputs.table(data, {
        columns: ["indicador", "year", "valor"],
        format: { valor: sbar },
        width: { indicador: 250, year: 40, valor: 140 },
        align: { indicador: "left", year: "center", valor: "left" },
        maxWidth: 840,
        multiple: false,
        layout: "fixed"
    });
}
