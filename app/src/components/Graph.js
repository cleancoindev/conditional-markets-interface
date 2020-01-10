import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { formatDate, getMoment } from "utils/timeFormat";
import { formatScalarValue } from "utils/formatting";
import cn from "classnames/bind";

import styles from "./Graph.scss";

import { blueColor, redColor } from "scss/_variables.scss";

const scalarMarketColor = {
  0: "#8884d8"
};
const categoricalMarketColors = {
  0: blueColor,
  1: redColor
};

import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from "recharts";

const cx = cn.bind(styles);

const CursorWithLineConnection = props => {
  //console.log(props.width)
  const {
    points,
    currentPositionTooltipCoordinates,
    selectedPositionTooltipCoordinates,
    width,
    ...restProps
  } = props;

  return (
    <g>
      <line
        x1={points[0].x}
        x2={points[1].x}
        y1={points[0].y}
        y2={points[1].y}
        style={{
          stroke: "#02ae60",
          strokeWidth: 2
        }}
      />
      <line
        x1={points[0].x}
        x2={width + 5}
        y1={currentPositionTooltipCoordinates.y}
        y2={currentPositionTooltipCoordinates.y}
        style={{
          stroke: "#02ae60",
          strokeDasharray: "2,2"
        }}
      />
      <line
        x1={points[0].x}
        x2={width + 5}
        y1={selectedPositionTooltipCoordinates.y}
        y2={selectedPositionTooltipCoordinates.y}
        style={{
          stroke: "#02ae60",
          strokeDasharray: "1,1"
        }}
      />
      <circle
        cx={points[0].x}
        cy={currentPositionTooltipCoordinates.y}
        r={5}
        fill="#009cb4"
      />
    </g>
  );
};

const TooltipContent = ({ active, value, payload, unit, decimals }) => {
  if (active) {
    const number = value || payload[0].value;
    return (
      <div className={cx("tooltip-inner")}>
        {formatScalarValue(number, unit, decimals)}
      </div>
    );
  }

  return null;
};

const Graph = ({
  lowerBound,
  upperBound,
  decimals,
  unit,
  created,
  resolutionDate,
  marketType,
  entries,
  currentProbability
}) => {
  //const [decimals, setDecimals] = useState(parentDecimals || 2);

  const [data, setData] = useState(entries);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [lastTickPosition, setLastTickPosition] = useState(null);

  const lineRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // console.log("memo updates", entries, currentProbability)
    // TODO entries and currentProbability are constantly updating. As data
    // object is updated each render the graph is re-rendered continously.
    // Check how to cache entries and current probability to avoid components
    // extra work that includes currentProbabilityChanged and if array lengths are different
    const currentProbabilityChanged = () => {
      const dataProbability = data[data.length - 1].outcomesProbability;

      if (!dataProbability || !currentProbability) {
        return false;
      }

      return (
        dataProbability.length !== currentProbability.length ||
        dataProbability.some(
          (value, index) => value !== currentProbability[index]
        )
      );
    };

    // Get initial probability for market
    const getInitialProbability = () => {
      const midValue =
        (parseFloat(upperBound) - parseFloat(lowerBound)) / 2 +
        parseFloat(lowerBound);

      return currentProbability.map(() => {
        return midValue;
      });
    };

    // when new entries are added, or the probability of the selected outcome changes
    if (entries.length >= data.length || currentProbabilityChanged()) {
      const initialOutcomesProbability = getInitialProbability();
      const newData = [
        {
          outcomesProbability: initialOutcomesProbability,
          date: getMoment(created).valueOf(),
          // FIXME First entry in `entries` comes with index 0 and we add this one also
          // with the same index. Is not critical but it's a bug
          index: 0
        },
        ...entries
      ];

      if (getMoment(resolutionDate).isAfter(getMoment())) {
        // only add last entry (with currently probabilities) if the market is not already resolved
        newData.push({
          outcomesProbability: currentProbability,
          date: +new Date(),
          index: entries.length + 1 // +1 because we add the market creation as a datapoint
        });
      } else {
        // when market is resolved, duplicate latest trade but adjust to show on resolution date
        if (entries.length > 0) {
          // but only duplicate when there even was a trade
          newData.push({
            ...entries[entries.length - 1],
            date: getMoment(resolutionDate).valueOf(),
            index: entries.length + 1
          });
        } else {
          // empty and closed should show 50/50
          newData.push({
            outcomesProbability: initialOutcomesProbability,
            date: getMoment(created).valueOf(),
            // FIXME First entry in `entries` comes with index 0 and we add this one also
            // with the same index. Is not critical but it's a bug
            index: entries.length + 1
          });
        }
      }

      setData(newData);
    }
  }, [entries, currentProbability]);

  useEffect(() => {
    if (lineRef.current) {
      // position of selected tick
      const tickPosition =
        lineRef.current.props.points[lineRef.current.props.points.length - 1];
      setLastTickPosition({
        x: lineRef.current.props.width,
        y: tickPosition.y
      });
    }

    if (lineRef.current && lineChartRef.current) {
      // linechart sidebar (legend, padding, etc) calculation
      const lineChartSidebarWidth =
        lineChartRef.current.props.width -
        (lineRef.current.props.width + lineChartRef.current.props.margin.left);
      setSidebarWidth(lineChartSidebarWidth);
    }
  }, [lineRef.current, lineChartRef.current, data]);

  const mouseUpdate = useCallback(
    e => {
      if (lineRef.current && e && e.activeTooltipIndex != null) {
        const tickPosition = lineRef.current.props.points[e.activeTooltipIndex];

        setTooltipPosition({ x: tickPosition.x, y: tickPosition.y });
      }
    },
    [lineRef.current]
  );

  const formatDateTick = useCallback(tick => {
    return formatDate(tick, "MMM D");
  });

  const formatDateTickTooltip = useCallback(tick => {
    return formatDate(tick, "MMM D HH:mm");
  });

  /*
  if (data.length <= 2) {
    return (
      <div className={cx("graph-container", "empty")}>
        <span>No data yet.</span>
      </div>
    );
  }
  */

  const marketClass = marketType.toLowerCase() + "-graph";

  // Create date ticks manually. Use daily pattern (X Axis ticks)
  const getTicks = useCallback(() => {
    let range = [];
    if (data && data[0]) {
      const startDate = getMoment(data[0].date).startOf("day");
      const endDate = getMoment(data[data.length - 1].date).endOf("day");
      while (startDate < endDate) {
        range.push(getMoment(startDate));
        startDate.add(1, "days");
      }
      range.push(endDate);
    }
    return range;
  }, [data]);

  const ticks = getTicks();
  
  return (
    <div className={cx("graph-container", marketClass)}>
      <ResponsiveContainer minHeight={300}>
        <LineChart data={data} onMouseMove={mouseUpdate} ref={lineChartRef}>
          {marketType !== "SCALAR" && (
            <Tooltip
              labelFormatter={formatDateTickTooltip}
              formatter={value => {
                return [value.toFixed(2) + "%"];
              }}
            />
          )}
          {tooltipPosition && marketType === "SCALAR" && (
            <Tooltip
              cursor={
                <CursorWithLineConnection
                  currentPositionTooltipCoordinates={lastTickPosition}
                  selectedPositionTooltipCoordinates={tooltipPosition}
                />
              }
              coordinate={{ x: 0, y: 0 }}
              wrapperStyle={{ zIndex: 100, background: "white", top: "-10px" }}
              position={{ x: -sidebarWidth, y: tooltipPosition.y }}
              content={<TooltipContent unit={unit} decimals={decimals} />}
            />
          )}
          {data &&
            data[data.length - 1] &&
            data[data.length - 1].outcomesProbability.map((value, index) => {
              const fill =
                marketType === "CATEGORICAL"
                  ? categoricalMarketColors[index]
                  : scalarMarketColor[index];
              return (
                <ReferenceDot
                  key={index}
                  x={data[data.length - 1].date}
                  y={value}
                  r={5}
                  fill={fill}
                  stroke="none"
                />
              );
            })}
          <XAxis
            dataKey="date"
            minTickGap={20}
            type="number"
            scale="time"
            ticks={ticks}
            domain={[data && data[0] ? "dataMin" : 0, "dataMax"]}
            tickFormatter={formatDateTick}
            interval="preserveEnd"
          />
          <YAxis
            orientation="right"
            type="number"
            domain={[parseFloat(lowerBound), parseFloat(upperBound)]}
          />
          {data &&
            data[0] &&
            data[0].outcomesProbability.map((value, index) => {
              const dataKey = "outcomesProbability[" + index + "]";
              const stroke =
                marketType === "CATEGORICAL"
                  ? categoricalMarketColors[index]
                  : scalarMarketColor[index];
              return (
                <Line
                  key={index}
                  type="stepBefore"
                  dataKey={dataKey}
                  stroke={stroke}
                  ref={lineRef}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
      {lastTickPosition && marketType === "SCALAR" && (
        <div
          className={cx("tooltip-current-position")}
          style={{
            transform: `translate(${-sidebarWidth}px, calc(${
              lastTickPosition.y
            }px - 50%))`
          }}
        >
          {data &&
            data[data.length - 1] &&
            data[data.length - 1].outcomesProbability.map((value, index) => {
              return (
                <TooltipContent
                  key={index}
                  active
                  value={value}
                  unit={unit}
                  decimals={decimals}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

Graph.propTypes = {
  lowerBound: PropTypes.string.isRequired,
  upperBound: PropTypes.string.isRequired,
  entries: PropTypes.array,
  currentProbability: PropTypes.array,
  marketType: PropTypes.string.isRequired,
  resolutionDate: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  decimals: PropTypes.number.isRequired,
  unit: PropTypes.string
};

Graph.defaultProps = {
  unit: "Units"
};

export default Graph;
