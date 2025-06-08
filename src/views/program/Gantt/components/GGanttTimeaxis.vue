<template>
  <div class="g-timeaxis">
    <div class="g-timeunits-container">
      <div v-for="({ label, value, date, width }, index) in timeAxisUnits.upperUnits" :key="label"
        class="g-upper-timeunit" :style="{
          background: index % 2 === 0 ? colors.primary : colors.secondary,
          color: colors.text,
          width
        }">
        <slot name="upper-timeunit" :label="label" :value="value" :date="date">
          {{ label }}
        </slot>
      </div>
    </div>

    <div class="g-timeunits-container">
      <div v-for="({ label, value, date, width }, index) in timeAxisUnits.lowerUnits" :key="textFormant(label).key"
        class="g-timeunit" :style="{
          background: index % 2 === 0 ? colors.ternary : colors.quartenary,
          color: colors.text,
          flexDirection: precision === 'hour' ? 'column' : 'row',
          alignItems: precision === 'hour' ? '' : 'center',
          width
        }">
        <slot name="timeunit" :label="label" :value="value" :date="date">
          {{ textFormant(label).str }}
        </slot>
        <div v-if="precision === 'hour'" class="g-timeaxis-hour-pin" :style="{ background: colors.text }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import provideConfig from "../provider/provideConfig.js"
import { useTimeAxisUnits, generateRandomKey } from "../composables/useTimeAxisUnits.js"

const { precision, colors } = provideConfig()
const { timeAxisUnits } = useTimeAxisUnits()

const textFormant = computed(() => {
  return (str: string) => {
    return { str: `${str}`, key: generateRandomKey() }
  }
})
</script>

<style>
.g-timeaxis {
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  background: white;
  z-index: 4;
  display: flex;
  flex-direction: column;
}

.g-timeunits-container {
  display: flex;
  /* flex-wrap: nowrap;
  overflow-x: auto; */
  width: 100%;
  height: 50%;
}

.g-timeunit {
  height: 100%;
  font-size: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.g-upper-timeunit {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.g-timeaxis-hour-pin {
  width: 1px;
  height: 10px;
}
</style>
