// components/MFChart.jsx
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function MFChart({ data, height = 320 }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy old chart
    if (chartRef.current) {
      try { chartRef.current.remove(); } catch {}
      chartRef.current = null;
    }

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#1e293b",
      },
      grid: {
        vertLines: { color: "#f3f4f6" },
        horzLines: { color: "#f3f4f6" },
      },
      crosshair: {
        mode: 1,
        vertLine: { width: 1, color: "#9ca3af", style: 2 },
        horzLine: { visible: false },
      },
      rightPriceScale: {
        borderVisible: true,          // show right/bottom border inside chart
        borderColor: "#00000011",
        scaleMargins: {
          top: 0.28,                  // more space above line
          bottom: 0.18,
        },
      },
      timeScale: {
        borderVisible: true,          // this is the bottom border inside
        borderColor: "#00000011",
        fixRightEdge: false,
        rightOffset: 0,
        minBarSpacing: 0.5,
      },
    });

    chartRef.current = chart;

    const lineSeries = chart.addLineSeries({
      color: "#00b26a",
      lineWidth: 2,
      lineType: 0,
      lastValueVisible: true,
      priceLineVisible: true,
    });

    const safeData = Array.isArray(data) ? data : [];

    lineSeries.setData(
      safeData.map((d) => ({
        time: d.timestamp,
        value: d.nav,
      }))
    );

    // fit whole range (30D–10Y) into width
    setTimeout(() => {
      chart.timeScale().fitContent();
    }, 0);

    // Groww-style top-left tooltip
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.top = "6px";
    tooltip.style.left = "10px";
    tooltip.style.background = "white";
    tooltip.style.padding = "4px 8px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "13px";
    tooltip.style.color = "#4b5563";
    tooltip.style.boxShadow = "0 2px 6px rgba(0,0,0,0.12)";
    tooltip.style.zIndex = "10";
    tooltip.style.display = "none";
    tooltip.style.pointerEvents = "none";
    containerRef.current.appendChild(tooltip);

    chart.subscribeCrosshairMove((param) => {
      const point = param.seriesData.get(lineSeries);
      if (!point || !param.time) {
        tooltip.style.display = "none";
        return;
      }

      const date = new Date(point.time * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      tooltip.innerHTML = `NAV: ₹${point.value} | ${date}`;
      tooltip.style.display = "block";
    });

    return () => {
      try { chart.remove(); } catch {}
    };
  }, [data, height]);

  return (
   <div
  className="w-full rounded-xl border border-slate-300 shadow-sm bg-white overflow-hidden !pb-0 !mb-0 !h-auto"
>
  <div
    ref={containerRef}
    style={{ height, position: "relative" }}
  />
</div>

  );
}
