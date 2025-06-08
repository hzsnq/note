<script lang="ts" setup>
import { useEcharts } from '@/hooks/useEcharts';
const colorRef = ref<string>('#e8f5e7')
const echartsInstance = ref<NullType<HTMLDivElement>>(null);
const echartsInstance2 = ref<NullType<HTMLDivElement>>(null);
const { renderChart: chart1 } = useEcharts(echartsInstance);
const { renderChart: chart2 } = useEcharts(echartsInstance2);
onMounted(() => {
    chart1(returnOptions1())
    chart2(returnOptions2())
})

function returnOptions1() {
    const options = {
        title: {
            text: '价格趋势'//图表标题
        },
        color: ['#7fcb79', '#438df6', '#dd6eeb'],
        tooltip: {
            trigger: 'axis',
            className: 'echarts-tooltip',
            //自定义鼠标移入显示内容
            formatter: function (params: AnyObj) {
                console.log(params);
                let html = '<div>';
                // html += '<h3>' + params[0].name + '</h3>';
                params.forEach((param: AnyObj) => {
                    html += `<div>${param.seriesName}</div><div>${param?.axisValue || param?.axisValueLabel || ''} ${param.value}</div>`;
                });
                html += '</div>';
                return html;
            },
            textStyle: {
                fontSize: 12,
                color: '#444'
            },
            backgroundColor: colorRef.value
        },
        legend: {
            data: ['天猫', '京东', '抖音']
        },
        grid: {
            left: '5%',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        toolbox: {
            // feature: {
            //     saveAsImage: {}
            // }
        },
        xAxis: {
            name: '日期',//x轴名称
            type: 'category',
            boundaryGap: false,
            axisTick: {
                alignWithLabel: true
            },
            data: ['2024-11-19', '2024-11-22', '2024-11-25', ' 2024-11-28 ', ' 2024-12-01', '2024-12-04 ', '2024-12-07', '2024-12-10', '2024-12-13', '2024-12- 16']
        },
        yAxis: {
            name: '价格',//y轴名称
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
        },
        series: [
            {
                name: '天猫',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101]
            },
            {
                name: '京东',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101]
            },
            {
                name: '抖音',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410, 120, 132, 101]
            },
        ]
    };

    return options
}

function returnOptions2() {
    const options = {
        title: {
            text: '价格分析'//图表标题
        },
        color: ['#7fcb79', '#438df6', '#dd6eeb'],
        tooltip: {
            trigger: 'axis',
            //自定义鼠标移入显示内容
            formatter: function (params: AnyObj) {
                console.log(params);
                let html = '<div>';
                html += '<h3>' + params[0].name + '</h3>';
                html += '<ul>';
                params.forEach((param: AnyObj) => {
                    html += `<li><strong>${param?.seriesName || ''}:</strong> ${param.value}</li>`;
                });
                html += '</ul></div>';
                return html;
            },
            textStyle: {
                fontSize: 12,
                color: '#444'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        legend: {
            // data: ['天猫', '京东', '抖音']
        },
        grid: {
            left: '5%',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        toolbox: {
            // feature: {
            //     saveAsImage: {}
            // }
        },
        xAxis: {
            name: '',//x轴名称
            type: 'category',
            // boundaryGap: false,
            // axisTick: {
            //     alignWithLabel: true
            // },
            data: ['天猫', '京东', '抖音']
        },
        yAxis: {
            name: '价格',//y轴名称
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
        },
        series: [
            {
                type: 'bar',
                // stack: 'Total',
                data: [120, 132, 101]
            }
        ]
    };

    return options
}
</script>

<template>
    <div class="container">
        <div ref="echartsInstance" class="echarts-box"></div>
        <div ref="echartsInstance2" class="echarts-box"></div>
    </div>
</template>

<style lang="scss">
.container {
    width: 100vw;
    min-height: 100vh;
    background: #080808;
}

.echarts-box {
    min-width: 50vw;
    min-height: 500px;
    margin: 0 auto;
}

.echarts-box+.echarts-box {
    margin-top: 20px;
}

.echarts-tooltip {
    position: relative;
    /* 使伪元素相对于容器定位 */
    z-index: 1000;
    /* 确保箭头在最顶层 */

    li {
        list-style: none;
    }
}

.echarts-tooltip::before {
    content: "";
    position: absolute;
    left: -8px;
    /* 调整箭头与框的距离 */
    top: 50%;
    transform: translateY(-50%);
    /* 调整箭头位置 */
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    /* 左侧透明 */
    border-right: 8px solid v-bind(colorRef);
    /* 右侧透明 */
    border-bottom: 5px solid transparent;
    /* 箭头颜色和下边框 */
    border-radius: 0;
}
</style>