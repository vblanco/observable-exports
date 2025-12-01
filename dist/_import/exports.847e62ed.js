import * as Plot from "../_npm/@observablehq/plot@0.6.17/d761ef9b.js";
import * as d3 from "../_npm/d3@7.9.0/e780feca.js";
import {FileAttachment, Inputs, html} from "../_observablehq/stdlib.73a8ec5a.js";

// 1. Re-define the data loader
const insercion = FileAttachment({"name":"../data/insercion-laboral.json","mimeType":"application/json","path":"../_file/data/insercion-laboral.c79d52de.json","lastModified":1764594842812,"size":12685}, import.meta.url).json();

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
