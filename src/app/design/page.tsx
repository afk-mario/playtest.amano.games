import Time from "components/time";
import Listbox from "components/listbox";
import Checkbox from "components/checkbox";

import "./styles.css";
import Spinner from "components/spinner";

const gameOptions = [
  { value: "1", children: "Virush" },
  { value: "2", children: "Pullfrog" },
  { value: "3", children: "The Lost Night" },
  { value: "4", children: "Don Salmon" },
  { value: "5", children: "Pullfrog Deluxe" },
  { value: "6", children: "Catchadiablos" },
  { value: "7", children: "Devils On the Moon Pinball" },
];

export default function DesignPage() {
  return (
    <div className="design-wrapper stack">
      <section className="stack">
        <header>
          <h2>Time</h2>
        </header>
        <div>
          <Time>{new Date().toISOString()}</Time>
        </div>
      </section>
      <section className="stack">
        <header>
          <h2>Spinner</h2>
        </header>
        <div>
          <Spinner />
        </div>
      </section>
      <section className="stack">
        <header>
          <h2>Form</h2>
        </header>
        <form>
          <label htmlFor="">
            <span>Games</span>
            <Listbox placeholder="Choose a game" options={gameOptions} />
          </label>
          <Checkbox label="Checkbox" />
          <div className="cluster">
            <label htmlFor="">
              <span>Text</span>
              <input placeholder="Input for text" />
            </label>
            <label htmlFor="">
              <span>Email</span>
              <input placeholder="Input for text" type="email" />
            </label>
          </div>
          <footer>
            <button className="c-button">Submit</button>
          </footer>
        </form>
      </section>
    </div>
  );
}
