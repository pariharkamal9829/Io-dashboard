"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function TemperatureChart({
  data,
  detailed = false,
}: {
  data: { time: string; value: number }[]
  detailed?: boolean
}) {
  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              return detailed ? value : value.split(" ")[0]
            }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°C`}
          />
          {detailed && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `${value}°C`} />} />
          {detailed && <Legend />}
          <Area
            type="monotone"
            dataKey="value"
            name="Temperature"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorTemperature)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
