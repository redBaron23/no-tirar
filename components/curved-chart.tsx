"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ResponsiveLine, Serie } from "@nivo/line";

interface FilledTimeseriesChartProps {
  className?: string;
  data: Serie[];
  margin?: { top: number; right: number; bottom: number; left: number };
  xGridValues?: number[];
}

interface CurvedChartProps {
  orders: number;
  sales: number;
  data: Serie[];
}

export const CurvedChart = ({ orders, sales, data }: CurvedChartProps) => {
  const parsedSales = formatCurrency(sales);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex gap-6">
          <div>
            <div className="text-sm text-gray-500">Pedidos</div>
            <div className="text-2xl font-bold">{orders}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Ventas</div>
            <div className="text-2xl font-bold">{parsedSales}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FilledTimeseriesChart className="aspect-[16/9] w-full" data={data} />
      </CardContent>
    </Card>
  );
};

const FilledTimeseriesChart = ({
  className,
  data,
  margin = { top: 10, right: 40, bottom: 40, left: 40 },
  xGridValues = [1, 2, 3, 4, 5, 6, 7],
}: FilledTimeseriesChartProps) => {
  return (
    <div className={className}>
      <ResponsiveLine
        data={data}
        margin={margin}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          format: (value) => value,
        }}
        axisLeft={null}
        colors={["#22c55e"]}
        pointSize={6}
        useMesh={true}
        curve="monotoneX"
        enableArea={true}
        gridXValues={xGridValues}
        gridYValues={[]}
        defs={[
          {
            id: "line-chart-gradient",
            type: "linearGradient",
            colors: [
              { offset: 0, color: "#22c55e" },
              { offset: 100, color: "#22c55e", opacity: 0.3 },
            ],
          },
        ]}
        fill={[{ match: "*", id: "line-chart-gradient" }]}
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
        }}
        role="application"
      />
    </div>
  );
};
