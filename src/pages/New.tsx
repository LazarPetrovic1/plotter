import { useState } from "react";
import Plot from "react-plotly.js";
import { Link } from "react-router-dom";
import { XData, YData } from "../utils";

function New() {
  const [xval, setXval] = useState<string>(() => "")
  const [yval, setYval] = useState<string>(() => "")
  const [x, setX] = useState<any[]>(() => []);
  const [y, setY] = useState<any[]>(() => []);
  const [xDataType, setXDataType] = useState<XData>(() => "string");
  const [yDataType, setYDataType] = useState<YData>(() => "number");
  const [xAxisTitle, setXAxisTitle] = useState<string>(() => "");
  const [yAxisTitle, setYAxisTitle] = useState<string>(() => "");
  const [desc, setDesc] = useState<string>(() => "")
  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (x.length === y.length) {
      let data = [];
      for (let i = 0; i < x.length; i++) data.push({ x: x[i], y: y[i] });
      const file = JSON.stringify({ description: desc, data })
      window.files.create(file);
    }
  }
  const addPlotPoint = () => {
    if (!xval || !yval) return;
    setX(prev => [...prev, xval]);
    setY(prev => [...prev, yval]);
    setXval(() => "");
    setYval(() => "");
    setXAxisTitle(() => "");
    setYAxisTitle(() => "");
  }
  return (
    <div className="new-page">
      <h1 style={{ textAlign: "center" }}>Create a new graph</h1>
      <div className="new-plot">
        <div style={{ display: "flex", flexFlow: "column wrap" }}>
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
              title: { text: desc, font: { color: 'white' }, },
              plot_bgcolor: 'rgb(33, 37, 41)',
              paper_bgcolor: 'rgb(33, 37, 41)',
              xaxis: {
                color: 'white',
                tickfont: { color: 'white' },
                title: { text: xAxisTitle, font: { color: 'white' } },
              },
              yaxis: {
                // range: [yMin, Math.max(...y) + 10],
                color: 'white',
                tickfont: { color: 'white' },
                title: { text: yAxisTitle, font: { color: 'white' } },
              },
            }}
          />
          <Link style={{ textAlign: "center", textDecoration: "none" }} className="btn btn-spawn" to="/">Go home</Link>
        </div>
        <form onSubmit={onSubmit}>
          <h3>Plot the chart data</h3>
          <div>
            <label htmlFor="desc">Description</label>
            <input id="desc" name="desc" value={desc} onChange={e => setDesc(() => e.target.value)} type="text" />
          </div>
          <div>
            <label htmlFor="x">X val <small>(#{x.length} + 1)</small></label>
            <input id="x" name="x" value={xval} onChange={e => setXval(() => e.target.value)} type={xDataType} />
            <select value={xDataType} onChange={e => setXDataType(() => e.target.value as XData)} name="xDataType" id="xDataType">
              <option value="string">str</option>
              <option value="number">num</option>
              <option value="date">date</option>
            </select>
          </div>
          <div>
            <label htmlFor="y">Y val <small>(#{x.length} + 1)</small></label>
            <input id="y" name="y" value={yval} onChange={e => setYval(() => e.target.value)} type={yDataType} />
            <select value={yDataType} onChange={e => setYDataType(() => e.target.value as YData)} name="yDataType" id="yDataType">
              <option value="number">num</option>
            </select>
          </div>
          <div>
            <label htmlFor="xAxisTitle">X Axis Title</label>
            <input id="xAxisTitle" name="xAxisTitle" value={xAxisTitle} onChange={e => setXAxisTitle(() => e.target.value)} type="text" />
          </div>
          <div>
            <label htmlFor="yAxisTitle">Y Axis Title</label>
            <input id="yAxisTitle" name="yAxisTitle" value={yAxisTitle} onChange={e => setYAxisTitle(() => e.target.value)} type="text" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <button onClick={addPlotPoint} type="button" className="btn btn-load">Add plot point</button>
            <button type="submit" className="btn btn-spawn">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default New;