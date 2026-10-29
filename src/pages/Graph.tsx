import { useContext } from "react";
import { GraphPlotContext } from "../contexts/GraphPlotContext";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import { normalizeX, normalizeY } from "../utils";

function safeIsoToDate(str: string) {
  const date = new Date(str);
  return Number.isNaN(date.getTime()) ? null : date;
}

function Graph() {
  const nav = useNavigate()
  const { data, filename, description } = useContext(GraphPlotContext);
  const x = data.map((val: any) => normalizeX(val.x));
  const y = data.map((val: any) => normalizeY(parseFloat(val.y)));
  const minThreshold = 80;
  const dataMin = Math.min(...y);
  const yMin = Math.min(dataMin, minThreshold)
  return (
    <div className="graph-page">
      <h1 style={{ textAlign: "center" }}>Data from {filename}</h1>
      <div className="my-3 text-center">
        <Plot
          data={[
            {
              x, y,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: "lightblue" },
            },
          ]}
          layout={{
            width: 700,
            height: 450,
            title: { text: description, font: { color: 'white' }, },
            plot_bgcolor: 'rgb(33, 37, 41)',
            paper_bgcolor: 'rgb(33, 37, 41)',
            xaxis: {
              color: 'white',
              tickfont: { color: 'white' },
              title: { text: 'Date', font: { color: 'white' } },
            },
            yaxis: {
              range: [yMin, Math.max(...y) + 10],
              color: 'white',
              tickfont: { color: 'white' },
              title: { text: 'Value', font: { color: 'white' } },
            },
          }}
        />
      </div>
      <button className="btn btn-spawn" onClick={() => nav("/")}>Go home</button>
    </div>
  )
}

export default Graph;