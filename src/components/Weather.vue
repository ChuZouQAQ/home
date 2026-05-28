<template>
  <div class="weather" v-if="weatherData.location.city && weatherData.weather.weather">
    <span>{{ weatherData.location.city }}&nbsp;</span>
    <span>{{ weatherData.weather.weather }}&nbsp;</span>
    <span>{{ weatherData.weather.temperature }}℃</span>
    <span class="sm-hidden">
      &nbsp;{{ weatherData.weather.winddirection }}风&nbsp;
    </span>
    <span class="sm-hidden">{{ weatherData.weather.windpower }}&nbsp;级</span>
  </div>
  <div class="weather" v-else>
    <span>天气数据获取失败</span>
  </div>
</template>

<script setup>
import { getGeoLocation, getWeather } from "@/api";
import { Error } from "@icon-park/vue-next";

// 默认城市（可通过 .env 中 VITE_WEATHER_CITY 自定义）
const defaultCity = import.meta.env.VITE_WEATHER_CITY || "Tokyo";

// 天气数据
const weatherData = reactive({
  location: {
    city: null, // 城市名称
    latitude: null,
    longitude: null,
  },
  weather: {
    weather: null, // 天气现象
    temperature: null, // 实时气温
    winddirection: null, // 风向描述
    windpower: null, // 风力级别（蒲福风级）
  },
});

// WMO Weather interpretation codes -> 中文描述
// https://open-meteo.com/en/docs
const weatherCodeMap = {
  0: "晴",
  1: "晴间多云",
  2: "多云",
  3: "阴",
  45: "雾",
  48: "雾凇",
  51: "小毛毛雨",
  53: "毛毛雨",
  55: "大毛毛雨",
  56: "冻毛毛雨",
  57: "强冻毛毛雨",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  66: "冻雨",
  67: "强冻雨",
  71: "小雪",
  73: "中雪",
  75: "大雪",
  77: "雪粒",
  80: "小阵雨",
  81: "阵雨",
  82: "强阵雨",
  85: "小阵雪",
  86: "强阵雪",
  95: "雷阵雨",
  96: "雷阵雨伴小冰雹",
  99: "雷阵雨伴强冰雹",
};

// 风向角度 -> 中文八方位
const directionFromDegree = (deg) => {
  if (deg == null || isNaN(deg)) return "";
  const dirs = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];
  return dirs[Math.round(deg / 45) % 8];
};

// 风速（km/h） -> 蒲福风级
const beaufortFromKmh = (kmh) => {
  if (kmh == null || isNaN(kmh)) return 0;
  const thresholds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];
  for (let i = 0; i < thresholds.length; i++) {
    if (kmh < thresholds[i]) return i;
  }
  return 12;
};

// 获取天气数据
const getWeatherData = async () => {
  try {
    const geo = await getGeoLocation(defaultCity);
    if (!geo.results || !geo.results.length) {
      throw new Error(`未找到城市 "${defaultCity}"`);
    }
    const place = geo.results[0];
    weatherData.location = {
      city: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
    };
    const res = await getWeather(place.latitude, place.longitude);
    if (!res.current_weather) {
      throw new Error("天气接口返回数据异常");
    }
    const cw = res.current_weather;
    weatherData.weather = {
      weather: weatherCodeMap[cw.weathercode] ?? "未知",
      temperature: Math.round(cw.temperature),
      winddirection: directionFromDegree(cw.winddirection),
      windpower: beaufortFromKmh(cw.windspeed),
    };
  } catch (err) {
    console.error("天气信息获取失败:", err);
    onError("天气信息获取失败");
  }
};

// 报错信息
const onError = (message) => {
  ElMessage({
    message,
    icon: h(Error, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
};

onMounted(() => {
  // 调用获取天气
  getWeatherData();
});
</script>
