import { extendTheme } from "@chakra-ui/react";

const fontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const fonts = {
  heading: "Raleway, system-ui, sans-serif",
  body: "Raleway, system-ui, sans-serif",
};

const colors = {
  brand: {
    500: "#FFD836",
  },
  white: "#f9f9f9",
};

export default extendTheme({ colors, fonts, fontWeights });
