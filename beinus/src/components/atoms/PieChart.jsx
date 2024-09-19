// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChart = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 20, right: 100, bottom: 20, left: 0 }}
        innerRadius={0.7}
        padAngle={2}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderWidth={2}
        borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
        }}
        leg
        defs={[
            {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
            },
        ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'ruby'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'c'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'go'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'python'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'scala'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'lisp'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'elixir'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'javascript'
        //         },
        //         id: 'lines'
        //     }
        // ]}
        legends={[
            {
                anchor: "center",
                direction: "column",
                justify: false,
                translateX: 180,
                translateY: 0,
                itemsSpacing: 0,
                itemWidth: 99,
                itemHeight: 39,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "square",
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemTextColor: "#000",
                        },
                    },
                ],
            },
        ]}
        theme={{
            text: { fontSize: 16, fontWeight: 600 },
            legends: { text: { fontSize: 16 } },
        }}
    />
);

export default PieChart;