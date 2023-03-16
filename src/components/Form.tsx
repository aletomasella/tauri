import React from "react";
import { addFolderToModal } from "../rustFunctions";

const Form = () => {
  const [input, setInput] = React.useState({
    directory: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addFolderToModal(input.directory);
    console.log(response);
    setInput({
      directory: "",
    });
  };

  return (
    <>
      <div className="form-control">
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="directory">
            <span className="label-text">Paste yout directory here : </span>
          </label>
          <input
            type="text"
            name="directory"
            value={input.directory}
            onChange={handleChange}
            className="input input-primary"
          />
          <button className="btn btn-primary">Send Request</button>
        </form>
      </div>
    </>
  );
};

export default Form;
