import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "./components/Button";
import { Carousel } from "./components/Carousel";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <>
      <div>Hello</div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={(e) => greet(e)} size="md" type="success">
        Greet
      </Button>
      <div>
        <h1>Probando</h1>
      </div>
      <Carousel />
      {greetMsg && <div>{greetMsg}</div>}
    </>
  );
}

export default App;
