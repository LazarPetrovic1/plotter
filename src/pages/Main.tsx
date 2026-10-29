import { useContext, useRef } from "react";
import { GraphPlotContext } from "../contexts/GraphPlotContext";
import { Link, useNavigate } from "react-router-dom";

function MainPage() {
  const nav = useNavigate();
  const dataRef = useRef<null | HTMLInputElement>(null);
  const { setData, setFilename, setDescription } = useContext(GraphPlotContext);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0] || null;
    const fullPath = window.files.getPathForFile(file)
    const fileData = await window.files.getFile(fullPath)
    setFilename(() => file.name);
    setData(() => JSON.parse(fileData).data);
    setDescription(() => JSON.parse(fileData).description);
    nav("/graph");
    // const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    // setImagePreviews(() => previews);
  };
  return (
    <>
      <div>
        <Link to="/new" style={{ textDecoration: "none" }} className="btn btn-spawn">Create a graph</Link>
      </div>
      <div>
        <input
          ref={dataRef}
          accept="application/json"
          type="file"
          multiple={false}
          className="btn btn-load"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}

export default MainPage;