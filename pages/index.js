import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setUserInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
  
    <div >
      <Head>
        <title>Quick Quiz Generate</title>
      </Head>

      <main className={styles.main}>
        <h3>QUICK QUIZ</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Enter a subject"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <input type="submit" value="Generate Quiz" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
   
    </div>

         
  );
}
