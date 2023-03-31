import React from "react";
import { useForm, useQueryData } from "../hooks";
import { addFolderToModal } from "../rustFunctions";

const Form = () => {
  const { form, update, clean } = useForm({
    dirPath: "",
    query: "",
  });
  const { data, setData } = useQueryData<[string, number][]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = (await addFolderToModal(form)) as [string, number][];
    response && setData(response);
    clean();
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
            value={form.dirPath}
            onChange={(e) => update(e.target.value, e.target.name as any)}
            className="input input-primary"
          />
          <span className="label-text">Put your query here : </span>
          <input
            type="text"
            name="query"
            value={form.query}
            onChange={(e) => update(e.target.value, e.target.name as any)}
            className="input input-primary"
          />
          <button className="btn btn-primary">Send Request</button>
        </form>
      </div>
      <div>
        {data &&
          data.map(([filePath, score], i) => (
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
