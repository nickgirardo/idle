import { createElement } from "react";
import { render } from "react-dom";

import App from "./components/App";

import './styles/style.scss';

const wrapper = document.getElementById("container");
wrapper ? render(createElement(App), wrapper) : false;
