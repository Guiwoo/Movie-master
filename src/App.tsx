import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minutesState } from "./atom";

function App() {
  const [mins, setMins] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinsChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMins(parseInt(event.currentTarget.value));
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(parseInt(event.currentTarget.value));
  };
  return (
    <div>
      <input
        value={mins}
        onChange={onMinsChange}
        type="number"
        placeholder="minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="hours"
      />
    </div>
  );
}

export default App;
