<template>
    <el-scrollbar ref="scrollbarRef" always>
        <g-gantt-chart :chart-start="chartStart" :width="widthComputed" :chart-end="chartEnd" :precision="dateType"
            :row-height="80" grid :current-time="showCurrent" current-time-label="今日" bar-start="beginDate"
            bar-end="endDate" :date-format="format" @click-bar="onClickBar($event.bar, $event.e, $event.datetime)"
            @mousedown-bar="onMousedownBar($event.bar, $event.e, $event.datetime)"
            @dblclick-bar="onMouseupBar($event.bar, $event.e, $event.datetime)"
            @mouseenter-bar="onMouseenterBar($event.bar, $event.e)"
            @mouseleave-bar="onMouseleaveBar($event.bar, $event.e)"
            @dragstart-bar="onDragstartBar($event.bar, $event.e)" @drag-bar="onDragBar($event.bar, $event.e)"
            @dragend-bar="onDragendBar($event.bar, $event.e, $event.movedBars)"
            @contextmenu-bar="onContextmenuBar($event.bar, $event.e, $event.datetime)">
            <g-gantt-row label="" :bars="bars1" highlight-on-hover />
            <g-gantt-row label="" highlight-on-hover :bars="bars2" />
            <g-gantt-row label="" highlight-on-hover :bars="bars3" />
            <g-gantt-row label="" highlight-on-hover :bars="bars4" />
        </g-gantt-chart>
        <div class="fixed">
            <div class="item" @click="handleScrollCurrent">今日</div>
            <div :class="item.key === dateType ? 'item act' : 'item'" @click="handleSetType(item.key)"
                v-for="item in dateTypeList" :key="item.key">
                {{ item.value }}
            </div>
        </div>
    </el-scrollbar>
    <button type="button" @click="addBar()">Add bar</button>
    <button type="button" @click="deleteBar()">Delete bar</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { GanttBarObject } from "./types"
import dayjs from "dayjs"
import { GGanttChart, GGanttRow } from './components'

const format = ref("YYYY-MM-DD")
const chartStart = ref(dayjs('2025-01-01').startOf("day").format(format.value))
const chartEnd = ref(
    dayjs(chartStart.value, format.value).add(180, "days").format(format.value)
)

type type = 'day' | 'month' | 'week'

const dateType = ref<type>("day")
const showCurrent = ref(true)
const scrollbarRef = ref<any>(null)

const dateTypeList = ref<AnyObj[]>([{ key: 'day', value: '日' }, { key: 'week', value: '周' }, { key: 'month', value: '月' }])
const widthComputed = computed(() => {
    const data: AnyObj = getDateDiffs(chartStart.value, chartEnd.value)
    return `${Math.ceil(data[dateType.value]) * 50}px`
})

const handleSetType = (val: type) => {
    dateType.value = val as any
}

function getDateDiffs(start: string | Date, end: string | Date) {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    return {
        day: endDate.diff(startDate, 'day', true),
        week: endDate.diff(startDate, 'week', true),
        month: endDate.diff(startDate, 'month', true)
    };
}

const handleScrollCurrent = () => {
    // showCurrent.value = !showCurrent.value
    if (showCurrent.value) {
        nextTick(() => {
            const target: any = document.querySelector('.g-grid-current-time')
            // console.log(target?.offsetLeft);
            const left = target?.offsetLeft ? target.offsetLeft - 600 : 0
            scrollbarRef.value && scrollbarRef.value!.setScrollLeft(left)
        })
    }
}

const bars1 = ref<GanttBarObject[]>([
    {
        beginDate: '2025-01-01',
        endDate: '2025-01-10',
        ganttBarConfig: {
            id: "8621987329",
            hasHandles: true,
            label: "I'm in a bundle",
            bundle: "bundle2",
            html: '<div>123</div>',
        }
    }
])

const bars2 = ref([
    {
        beginDate: dayjs().hour(13).startOf("hour").format(format.value),
        endDate: dayjs().hour(19).startOf("hour").format(format.value),
        ganttBarConfig: {
            id: "1592311887",
            label: "I'm in a bundle",
            bundle: "bundle2",
            style: {
                background: "magenta"
            }
        }
    },
    {
        beginDate: dayjs().add(2, "day").hour(0).startOf("hour").format(format.value),
        endDate: dayjs().add(2, "day").hour(19).startOf("hour").format(format.value),
        ganttBarConfig: {
            id: "7716981641",
            label: "Lorem ipsum dolor",
            hasHandles: true,
            style: {
                background: "#b74b52"
            }
        }
    },
    {
        beginDate: dayjs().add(1, "day").hour(4).startOf("hour").format(format.value),
        endDate: dayjs().add(1, "day").hour(16).startOf("hour").format(format.value),
        ganttBarConfig: {
            id: "9716981641",
            label: "Oh hey",
            style: {
                background: "#69e064",
                borderRadius: "15px",
                color: "blue",
                fontSize: "10px"
            }
        }
    }
])

const bars3 = [
    {
        beginDate: "15.01.2024 08:30",
        endDate: "20.02.2024 16:45",
        ganttBarConfig: {
            id: "9876543210",
            label: "Updated Bundle",
            bundle: "bundle3",
            style: {
                background: "cyan"
            }
        }
    },
    {
        beginDate: "20.02.2024 12:00",
        endDate: "10.03.2024 18:30",
        ganttBarConfig: {
            id: "1234567890",
            label: "New Task",
            hasHandles: true,
            style: {
                background: "#f79466"
            }
        }
    },
    {
        beginDate: "25.04.2024 09:15",
        endDate: "30.04.2024 21:00",
        ganttBarConfig: {
            id: "2468135790",
            label: "Greetings",
            style: {
                background: "#aabbcc",
                borderRadius: "8px",
                color: "white",
                fontSize: "12px"
            }
        }
    }
]

const bars4 = [
    {
        beginDate: "10.01.2024 08:00",
        endDate: "15.03.2024 16:30",
        ganttBarConfig: {
            id: "9876543210",
            label: "Novo Pacote",
            bundle: "pacote3",
            style: {
                background: "pink"
            }
        }
    },
    {
        beginDate: "05.03.2024 10:00",
        endDate: "15.04.2024 22:15",
        ganttBarConfig: {
            id: "2468135790",
            label: "hello folks",
            style: {
                background: "#ffd700",
                borderRadius: "10px",
                color: "black",
                fontSize: "14px"
            }
        }
    }
]

const addBar = () => {
    if (bars1.value.some((bar) => bar.ganttBarConfig.id === "test1")) {
        return
    }
    const bar = {
        beginDate: dayjs().add(1, "day").hour(4).startOf("hour").format(format.value),
        endDate: dayjs().add(2, "day").hour(4).startOf("hour").format(format.value),
        ganttBarConfig: {
            id: "test1",
            hasHandles: true,
            label: "Hello!",
            style: {
                background: "#5484b7",
                borderRadius: "20px"
            }
        }
    }
    bars1.value.push(bar)
}

const deleteBar = () => {
    const idx = bars1.value.findIndex((b) => b.ganttBarConfig.id === "test1")
    if (idx !== -1) {
        bars1.value.splice(idx, 1)
    }
}

const onClickBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
    console.log("click-bar", bar, e, datetime)
}

const onMousedownBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
    console.log("mousedown-bar", bar, e, datetime)
}

const onMouseupBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
    console.log("mouseup-bar", bar, e, datetime)
}

const onMouseenterBar = (bar: GanttBarObject, e: MouseEvent) => {
    console.log("mouseenter-bar", bar, e)
}

const onMouseleaveBar = (bar: GanttBarObject, e: MouseEvent) => {
    console.log("mouseleave-bar", bar, e)
}

const onDragstartBar = (bar: GanttBarObject, e: MouseEvent) => {
    console.log("dragstart-bar", bar, e)
}

const onDragBar = (bar: GanttBarObject, e: MouseEvent) => {
    console.log("drag-bar", bar, e)
}

const onDragendBar = (
    bar: GanttBarObject,
    e: MouseEvent,
    movedBars?: Map<GanttBarObject, { oldStart: string; oldEnd: string }>
) => {
    console.log("dragend-bar", bar, e, movedBars)
}

const onContextmenuBar = (bar: GanttBarObject, e: MouseEvent, datetime?: string) => {
    console.log("contextmenu-bar", bar, e, datetime)
}
</script>

<style lang="scss" scoped>
.fixed {
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 100px;
    z-index: 100;

    .item {
        margin-right: 10px;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #f0f0f0;
        cursor: pointer;
    }

    .act {
        background: bisque;
    }
}
</style>
