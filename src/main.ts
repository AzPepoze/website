import { attach } from "lusiajs";
import App from "./App.lusia";
import { applyTheme } from "./theme.ts";

applyTheme();
attach(App, document.body);
