import { createContext, useState } from "react";

export const GraphPlotContext = createContext<any>(null);

export const GraphPlotProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any[]>(() => []);
  const [filename, setFilename] = useState<string>(() => "")
  const [description, setDescription] = useState<string>(() => "")
  return (
    <GraphPlotContext.Provider value={{ data, setData, filename, setFilename, description, setDescription }}>
      {children}
    </GraphPlotContext.Provider>
  )
}