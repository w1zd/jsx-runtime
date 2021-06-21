import logo from "./logo.svg";
import "./App.css";
// import jsx from "./parse"
import JsxParser from "react-jsx-parser";
import {useState} from "react";
function Test() {
  return <div>Test</div>;
}

function App() {
  const [jsxHtml, setJsxHtml] = useState(`<button onClick={btnClick}>MSG:{msg}</button>`);
  const [jsxData, setJsxData] = useState(`{msg: "Hello World"}`);
  const [jsxHandler, setJsxHandler] = useState(`{btnClick(){console.log("clicked")}}`);
  const getData = () => {
    let data;
    let handlers;
    try {
      data = eval(`(${jsxData})`);
      handlers = eval(`(${jsxHandler})`);
    } catch (e) {
      data = {};
      handlers = {};
    }
    return {...data, ...handlers};
  };
  return (
    <div className="App">
      <header className="App-header">
        <textarea
          className="text-html"
          cols={100}
          rows={30}
          value={jsxHtml}
          onChange={e => {
            setJsxHtml(e.target.value);
          }}
        ></textarea>
        <textarea
          className="text-data"
          cols={100}
          rows={30}
          value={jsxData}
          onChange={e => {
            setJsxData(e.target.value);
          }}
        ></textarea>
        <textarea
          className="text-handler"
          cols={100}
          rows={30}
          value={jsxHandler}
          onChange={e => {
            setJsxHandler(e.target.value);
          }}
        ></textarea>
      </header>
      <JsxParser blacklistedAttrs={[]} bindings={getData()} components={{Test}} jsx={jsxHtml} />
    </div>
  );
}

export default App;
