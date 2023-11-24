import styled from "styled-components";
import Router from "./Router";

import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { lightTheme, darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@200;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 600;
    font-family: 'Smooch Sans', sans-serif;
    background-color:${props => props.theme.bgColor};
    color:${props => props.theme.textColor};
    line-height: 1.2;
  }
  a {
    text-decoration:none;
    color: inherit;
  }
`;

const ToggleBtn = styled.div`
	position: absolute;
  right: 20px;
  top: 45px;
  cursor: pointer;

  .toggle-container {
    position: relative;
    width: 60px;
    height: 33px;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .container-dark {
    background-color: rgba(255, 255, 255, 0.3);
    transition: 0.5s;
  }

  .toggle-circle {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
  }

  .circle-dark {
    left: 30px;
    transition: 0.5s;
  }
`;

const CheckTheme = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 15px;
`;

const currentTheme = window.localStorage.getItem("theme") === "Light" ? lightTheme : darkTheme;

function App() {
  const [themeMode, setThemeMode] = useState(currentTheme);
  const [theme, setTheme] = useState("Light");

  const toggleHandler = () => {
    if (theme === "Light") {
      setTheme("Dark");
      window.localStorage.setItem("theme", "Dark");
      setThemeMode(darkTheme);
    } else {
      setTheme("Light");
      window.localStorage.setItem("theme", "Light");
      setThemeMode(lightTheme);
    }
  };

  return (
    <>
      <ToggleBtn onClick={toggleHandler}>
        <div className={`toggle-container ${theme === "Dark" ? "container-dark" : null}`} />
        <div className={`toggle-circle ${theme === "Dark" ? "circle-dark" : null}`} />
        <CheckTheme>
				  {theme === "Dark" ? "Light" : "Dark"}
			  </CheckTheme>
      </ToggleBtn>
      <ThemeProvider theme={ themeMode }>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;