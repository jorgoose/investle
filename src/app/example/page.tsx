
'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResponsiveLine } from "@nivo/line"
import { Card } from "@/components/ui/card"
import { useState } from "react"
// Import NextJS image component
import Image from "next/image"

export default function Component() {
  const [ticker, setTicker] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://us-central1-investle.cloudfunctions.net/fetch-stock-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker }),
      })

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 sm:py-12 space-y-4 md:space-y-8">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Investle</h1>
        <p className="mx-auto text-sm sm:text-base max-w-[600px] text-center text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          Guess the company of the day from the S&P 500. Enter the ticker symbol below to make your guess.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <Input
          className="w-full shadow"
          placeholder="Enter a ticker symbol or company name"
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <Button size="lg" onClick={handleSubmit} className="w-full sm:w-auto">
          Make a guess
        </Button>
      </div>
      <Card className="w-full max-w-3xl">
        <div className="p-4 grid gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Image
                alt="Company logo"
                className="rounded-lg aspect-[1/1] overflow-hidden object-cover object-center mr-2"
                height="40"
                src="/placeholder.svg"
                width="40"
              />
              <span>Microsoft Corporation</span>
              <span>(MSFT)</span>
            </div>
            <CurvedlineChart className="w-full aspect-[2/1]" />
          </div>
          <div className="flex flex-wrap justify-between w-full">
            <Card className="flex flex-col items-center gap-2 bg-green-100 px-4 py-2">
              <span className="text-xs font-bold">Market Cap</span>
              <div className="flex items-center gap-1">
                $2.5T <ArrowUp />
              </div>
            </Card>
            <Card className="flex flex-col items-center gap-2 bg-gray-100 px-4 py-2">
              <span className="text-xs font-bold">Sector</span>
              <div className="flex items-center gap-1">
                Technology <CheckIcon />
              </div>
            </Card>
            <Card className="flex flex-col items-center gap-2 bg-red-100 px-4 py-2">
              <span className="text-xs font-bold">Employees</span>
              <div className="flex items-center gap-1">
                181,000 <ArrowDown />
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}

// TypeScript type for the props
type ComponentProps = {
  className?: string
}

function CurvedlineChart(props: ComponentProps) {
  return (
    <div {...props}>
      <ResponsiveLine
      fill={
        [
          {
            match: {
              id: "Price",
            },
            // Not dots, solid fill
            id: "solid",
          },
        ]
      }
      defs={
        [
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 2,
            stagger: true,
          },
        ]
      }
      enableGridX={false}
      enableGridY={false}
      enablePoints={true}
      layers={
        [
          "grid",
          "markers",
          "axes",
          "areas",
          "crosshair",
          "lines",
          "points",
          "slices",
          "mesh",
          "legends",
        ]
      }
      crosshairType="bottom-right"
      enableCrosshair={true}
      debugSlices={false}
      enableSlices="x"
      debugMesh={false}
      isInteractive={true}
      legends={[]} // Remove legends
      lineWidth={2}
      areaBaselineValue={0}
      areaBlendMode="normal"
      areaOpacity={0.2}
      enableArea={false}
      sliceTooltip={
        ({ slice }) => {
          return (
            <div
              style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #f3f4f6",
                borderRadius: "6px",
              }}
            >
              <div style={{ color: "#000", fontSize: "12px", marginBottom: "6px" }}>
                {slice.points[0].data.xFormatted}
              </div>
              {slice.points.map((point) => (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    fontSize: "12px",
                    marginBottom: "3px",
                  }}
                >
                  <strong>{point.serieId}</strong>: {point.data.yFormatted}
                </div>
              ))}
            </div>
          )
        }
      }
        data={[
          {
            id: "Price",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
            color: "#2563eb",
          },
        ]}
        tooltip={({ point }) => {
          return (
            <div
              style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #f3f4f6",
                borderRadius: "6px",
              }}
            >
              <div style={{ color: "#000", fontSize: "12px", marginBottom: "6px" }}>
                {point.data.xFormatted}
              </div>
              <div style={{ color: point.serieColor, fontSize: "12px" }}>
                <strong>{point.serieId}</strong>: {point.data.yFormatted}
              </div>
            </div>
          )
        }}
        pointLabel={(point) => {
          return `${point.y}`
        }}
        enablePointLabel={false}
        pointBorderColor={{ from: "serieColor" }}
        pointBorderWidth={2}
        // Same bl
        pointColor={{ from: "serieColor" }}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}

function ArrowUp() {
  return (
    <svg className="text-green-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg className="text-red-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="text-green-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}