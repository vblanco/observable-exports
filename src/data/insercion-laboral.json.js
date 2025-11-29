

function flattenInsercion(data) {
  const result = [];

  data.forEach(item => {
    // Claves que NO son años
    const fixedKeys = [
      "cod_cen",
      "centro",
      "cod_tit",
      "titulacion",
      "cod_indicador",
      "indicador"
    ];

    // Recorremos todas las claves del objeto
    Object.keys(item).forEach(key => {
      // Detectamos las claves de años, tipo "2019_20", "2020_21", etc.
      const isYearKey = /^\d{4}_\d{2}$/.test(key);

      if (isYearKey) {
        result.push({
          cod_cen: item.cod_cen,
          centro: item.centro,
          cod_tit: item.cod_tit,
          titulacion: item.titulacion,
          cod_indicador: item.cod_indicador,
          indicador: item.indicador,
          year: key,
          valor: item[key]
        });
      }
    });
  });

  return result;
}

// Ejemplo de uso:
// Supón que el JSON de la URL ya lo has parseado en la variable "rawData"
//
// const rawData = JSON.parse(respuestaFetch);
// const plano = flattenInsercion(rawData);
// console.log(JSON.stringify(plano, null, 2));




async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

const rawData = await json(`https://www.ull.es/ull_json/dst_indicadores_titulaciones_web_json_files/G026_satisfaccion.json`);
const insercion = flattenInsercion(rawData);

process.stdout.write(JSON.stringify(insercion));

