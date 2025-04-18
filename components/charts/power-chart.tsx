"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function PowerChart({
  data,
  detailed = false,
}: {
  data: { time: string; value: number }[]
  detailed?: boolean
}) {
  return (
    <ChartContainer
      config={{
        power: {
          label: "Power",
          color: "hsl(var(--chart-3))",
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
            <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
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
            tickFormatter={(value) => `${value} kW`}
          />
          {detailed && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `${value} kW`} />} />
          {detailed && <Legend />}
          <Area
            type="monotone"
            dataKey="value"
            name="Power"
            stroke="hsl(var(--chart-3))"
            fillOpacity={1}
            fill="url(#colorPower)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
