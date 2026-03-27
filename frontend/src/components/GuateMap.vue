<template>
  <div id="chartdiv123"></div>
</template>

<script setup>
import * as am5 from "@amcharts/amcharts5"
import * as am5map from "@amcharts/amcharts5/map"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import { onMounted, onBeforeUnmount } from "vue"

// 🗺️ Archivos GeoJSON
import guatemalaDepartamentos from "../helpers/Departamentos.json"
import guatemalaMunicipios from "../helpers/Municipios.json"

let root

onMounted(() => {
  root = am5.Root.new("chartdiv123")
  root._logo.dispose()
  root.setThemes([am5themes_Animated.new(root)])

  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "translateX",
      panY: "translateY",
      wheelX: "zoomX",
      wheelY: "zoomY",
      projection: am5map.geoMercator()
    })
  )

  // Serie principal: Departamentos
  const departamentosSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: guatemalaDepartamentos
    })
  )

  departamentosSeries.mapPolygons.template.setAll({
    tooltipText: "{NAME_1}",
    interactive: true,
    fill: am5.color(6788316)
  })

  departamentosSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(6797276)
  })

  // Serie secundaria: Municipios
  const municipiosSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, { visible: false })
  )

  municipiosSeries.mapPolygons.template.setAll({
    tooltipText: "{NAME_2}",
    interactive: true,
    fill: am5.color(6788316)
  })

  municipiosSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(6797276)
  })

  // Serie terciaria: Municipio seleccionado
  const municipioSeleccionadoSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, { visible: false })
  )

  municipioSeleccionadoSeries.mapPolygons.template.setAll({
    tooltipText: "{NAME_2}",
    interactive: true,
    fill: am5.color(6788316)
  })

  municipioSeleccionadoSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(6797276)
  })

  // Botón “Regresar”
  const backContainer = chart.children.push(
    am5.Container.new(root, {
      x: am5.p100,
      centerX: am5.p100,
      dx: -10,
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 5,
      y: 30,
      layout: root.horizontalLayout,
      cursorOverStyle: "pointer",
      background: am5.RoundedRectangle.new(root, {
        fill: am5.color(0xffffff),
        fillOpacity: 0.2
      }),
      visible: false
    })
  )

  backContainer.children.push(
    am5.Label.new(root, {
      text: "🔙 Regresar",
      centerY: am5.p50
    })
  )

  // Variables para recordar el contexto
  let lastDepartamentoName = null
  let lastDepartamentoDataItem = null

  // 📍 Click en departamento → mostrar municipios
  departamentosSeries.mapPolygons.template.events.on("click", (ev) => {
    const dataItem = ev.target.dataItem
    const name = dataItem.dataContext.NAME_1
    lastDepartamentoName = name
    lastDepartamentoDataItem = dataItem

    const filteredMunicipios = {
      type: "FeatureCollection",
      features: guatemalaMunicipios.features.filter(
        (f) => f.properties.NAME_1 === name
      )
    }

    const zoomAnimation = departamentosSeries.zoomToDataItem(dataItem)

    Promise.all([zoomAnimation.waitForStop()]).then(() => {
      municipiosSeries.set("geoJSON", filteredMunicipios)
      municipiosSeries.show()
      departamentosSeries.hide(100)
      backContainer.show()
    })
  })

  // 📍 Click en municipio → mostrar solo ese municipio
  municipiosSeries.mapPolygons.template.events.on("click", (ev) => {
    const dataItem = ev.target.dataItem
    const municipioName = dataItem.dataContext.NAME_2
    const municipioDepto = dataItem.dataContext.NAME_1
    lastDepartamentoName = municipioDepto

    const municipioUnico = {
      type: "FeatureCollection",
      features: guatemalaMunicipios.features.filter(
        (f) => f.properties.NAME_2 === municipioName
      )
    }

    const zoomAnimation = municipiosSeries.zoomToDataItem(dataItem)

    Promise.all([zoomAnimation.waitForStop()]).then(() => {
      municipioSeleccionadoSeries.set("geoJSON", municipioUnico)
      municipioSeleccionadoSeries.show()
      municipiosSeries.hide(100)
      backContainer.show()
    })
  })

  // 📍 Click en “Regresar”
  backContainer.events.on("click", () => {
    if (municipioSeleccionadoSeries.get("visible")) {
      // 🔁 Regresar al nivel de municipios del departamento
      municipioSeleccionadoSeries.hide()
      municipiosSeries.show()

      // 🔄 Zoom animado al departamento correspondiente
      if (lastDepartamentoDataItem) {
        const zoomBack = departamentosSeries.zoomToDataItem(lastDepartamentoDataItem)
        Promise.all([zoomBack.waitForStop()]).then(() => {
          // nada más, solo efecto visual
        })
      }
    } else {
      // 🔁 Regresar al nivel de departamentos
      chart.goHome()
      departamentosSeries.show()
      municipiosSeries.hide()
      backContainer.hide()
    }
  })
})

onBeforeUnmount(() => {
  if (root) root.dispose()
})
</script>

<style scoped>
#chartdiv123 {
  width: 100%;
  height: 400px;
  filter: drop-shadow(2px 12px 12px);
}
</style>