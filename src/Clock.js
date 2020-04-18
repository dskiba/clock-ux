import React, { useState } from "react";
import * as s from "./styles";
import { useInterval } from "./useInterval";

const randomArr = maxLength => {
  let arr = [];
  while (arr.length < maxLength) {
    var r = Math.floor(Math.random() * maxLength) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

export const Ticks = ({ degs }) => {
  return (
    <div className={"clock_ticks"}>
      {degs.ticks.map((t, idx) => {
        const id = idx + 1;
        return (
          <s.clockTick d={id} key={t} className={"clock_tick"}>
            <s.Number
              d={id - 1}
              isHour={degs.degHrs === id}
              isMin={degs.degMins === id}
              isSec={degs.degSecs === id}
            >
              {t}
            </s.Number>
          </s.clockTick>
        );
      })}
    </div>
  );
};

const findTrueIdx = (arr, value) => {
  const trueIdx = arr.findIndex(v => {
    return v === value;
  });
  return trueIdx + 1;
};

export const Clock = () => {
  const [isRunning, setIsRunning] = useState(true);
  useInterval(
    () => {
      // Your custom logic here
      setDegsFunc();
    },
    isRunning ? 1000 : null
  );
  const ticks = randomArr(60);
  const now = new Date();
  const hrs = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const trueHrs = findTrueIdx(ticks, hrs);
  const trueMins = findTrueIdx(ticks, mins);
  const trueSecs = findTrueIdx(ticks, secs);

  const [degs, setDegs] = useState({
    ticks,
    degHrs: trueHrs,
    degMins: trueMins,
    degSecs: trueSecs
  });
  const setDegsFunc = () => {
    const newTicks = randomArr(60);
    const newNow = new Date();
    const newHrs = newNow.getHours();
    const newMins = newNow.getMinutes();
    const newSecs = newNow.getSeconds();
    const newTrueHrs = findTrueIdx(newTicks, newHrs);
    const newTrueMins = findTrueIdx(newTicks, newMins);
    const newTrueSecs = findTrueIdx(newTicks, newSecs);
    setDegs({
      start: false,
      ticks: newTicks,
      degHrs: newTrueHrs,
      degMins: newTrueMins,
      degSecs: newTrueSecs
    });
  };
  return (
    <>
      <s.ButtonsWrapper>
        <s.Button onClick={setDegsFunc}>Tick!</s.Button>
        <s.Button
          onClick={() => {
            if (!isRunning) {
              setDegsFunc();
            }
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </s.Button>
      </s.ButtonsWrapper>

      <s.Clock id="clock">
        <Ticks degs={degs} />
        <s.clockHour deg={degs.degHrs} />
        <s.clockMinute deg={degs.degMins} />
        <s.clockSecond
          deg={degs.degSecs}
          duration={degs.degSecs === 90 ? "0s" : "0.1s"}
        />
      </s.Clock>
    </>
  );
};
