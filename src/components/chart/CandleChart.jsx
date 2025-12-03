// src/components/CandleChart.jsx

import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import {
  data_1D,
  data_1W,
  data_1M,
  data_3M,
  data_6M,
  data_1Y,
  data_3Y,
  data_5Y,
  data_All,
} from "./chartData";

const timeframeMap = {
  "1D": data_1D,
  "1W": data_1W,
  "1M": data_1M,
  "3M": data_3M,
  "6M": data_6M,
  "1Y": data_1Y,
  "3Y": data_3Y,
  "5Y": data_5Y,
  All: data_All,
};

export default function CandleChart() {
  const containerRef = useRef(null);
  const chartInstance = useRef(null);

  const [currentTF, setCurrentTF] = useState("1D");
  const [showVolume, setShowVolume] = useState(false);
  const [showNifty, setShowNifty] = useState(true);
  const [ohlc, setOhlc] = useState(null);
  const [loading, setLoading] = useState(false);

  const sortByTime = (arr) =>
    [...arr].sort((a, b) => a.timestamp - b.timestamp);

  // Fake loading shimmer
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [currentTF]);

  useEffect(() => {
    if (!containerRef.current || loading) return;

    // Destroy previous chart
    if (chartInstance.current) {
      chartInstance.current.remove();
      chartInstance.current = null;
    }

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 420,
      layout: { background: { color: "#fff" }, textColor: "#000" },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      crosshair: { mode: 1 },
    });

    chartInstance.current = chart;

    // Candle Series
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00b26a",
      downColor: "#ff5349",
      wickUpColor: "#00b26a",
      wickDownColor: "#ff5349",
    });

    // Sort & remove duplicate timestamps
    const DATA = sortByTime(timeframeMap[currentTF]).filter(
      (d, i, arr) => i === 0 || d.timestamp !== arr[i - 1].timestamp
    );

    candleSeries.setData(
      DATA.map((d) => ({
        time: d.timestamp / 1000,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))
    );

    // Volume
    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        priceFormat: { type: "volume" },
        scaleMargins: { top: 0.8, bottom: 0 },
      });

      volumeSeries.setData(
        DATA.map((d) => ({
          time: d.timestamp / 1000,
          value: d.volume,
          color: d.close > d.open ? "#00b26a88" : "#ff534988",
        }))
      );
    }

    // NIFTY compare
    if (showNifty) {
      const niftySeries = chart.addLineSeries({
        color: "#2962ff",
        lineWidth: 2,
      });

      niftySeries.setData(
        DATA.map((d) => ({
          time: d.timestamp / 1000,
          value: d.close + 20, // offset
        }))
      );
    }

    // OHLC on hover
    chart.subscribeCrosshairMove((param) => {
      const c = param.seriesData.get(candleSeries);
      if (c) {
        setOhlc({
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
        });
      }
    });
  }, [currentTF, showVolume, showNifty, loading]);

  return (
    <div className="w-full">
      {/* Loading Shimmer */}
      {loading && (
        <div className="animate-pulse w-full h-[420px] bg-gray-100 rounded-md mb-4" />
      )}

      {/* OHLC Display */}
      {!loading && (
        <div className="flex gap-5 mb-3 text-[14px]">
          {ohlc ? (
            <>
              <span>O <b>{ohlc.open}</b></span>
              <span>H <b>{ohlc.high}</b></span>
              <span>L <b>{ohlc.low}</b></span>
              <span>C <b>{ohlc.close}</b></span>
            </>
          ) : (
            <span className="text-gray-400">Hover to see OHLC</span>
          )}
        </div>
      )}

      {/* Toggles */}
      <div className="flex gap-4 mb-3 items-center">
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showVolume}
            onChange={() => setShowVolume(!showVolume)}
          />
          <span>Volume</span>
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showNifty}
            onChange={() => setShowNifty(!showNifty)}
          />
          <span>NIFTY Compare</span>
        </label>
      </div>

      {/* Chart Container */}
      <div
        ref={containerRef}
        className="w-full"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      />

      {/* Timeframe Buttons */}
      <div className="flex gap-3 justify-center mt-4 flex-wrap">
        {Object.keys(timeframeMap).map((tf) => (
          <button
            key={tf}
            onClick={() => setCurrentTF(tf)}
            className={`px-4 py-1 rounded-full border text-sm transition 
              ${currentTF === tf ? "bg-black text-white" : "hover:bg-gray-100"}
            `}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
}
