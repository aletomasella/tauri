import React from "react";
import { addFolderToModal } from "../rustFunctions";

const Form = () => {
  const [input, setInput] = React.useState({
    dirPath: "",
    query: "",
  });
  const [result, setResult] = React.useState<any[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = (await addFolderToModal(input)) as any[];
    if (response) {
      setResult(response.slice(0, 20));
    }
    setInput({
      dirPath: "",
      query: "",
    });
  };

  return (
    <>
      <div className="form-control">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="label" htmlFor="dirPath">
            <span className="label-text">Paste yout directory here : </span>
          </label>
          <input
            type="text"
            name="dirPath"
            value={input.dirPath}
            onChange={handleChange}
            className="input input-primary"
          />
          <span className="label-text">Put your query here : </span>
          <input
            type="text"
            name="query"
            value={input.query}
            onChange={handleChange}
            className="input input-primary"
          />
          <button className="btn btn-primary">Send Request</button>
        </form>
      </div>
      <div>
        {result &&
          result.map(([filePath, score], i) => (
            <>
              <div key={i}>FILEPATH : {filePath}</div>
              <div key={i}>SCORE : {Math.round(score * 100)}</div>
            </>
          ))}
      </div>
    </>
  );
};

export default Form;
