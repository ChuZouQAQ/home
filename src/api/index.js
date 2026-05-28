// import axios from "axios";

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

/**
 * 天气 - 基于 Open-Meteo（免费、无需 Key、全球覆盖）
 */

// 通过城市名查询经纬度（返回中文地名）
// https://open-meteo.com/en/docs/geocoding-api
export const getGeoLocation = async (city) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city,
    )}&count=1&language=zh&format=json`,
  );
  return await res.json();
};

// 通过经纬度查询当前天气
// https://open-meteo.com/en/docs
export const getWeather = async (latitude, longitude) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=kmh&timezone=auto`,
  );
  return await res.json();
};
