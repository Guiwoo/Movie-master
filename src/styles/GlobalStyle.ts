import {createGlobalStyle} from "styled-components"
import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`

${reset}
*{
    box-sizing:border-box;
}
body{
    font-family: 'Oswald', sans-serif;
    background: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff);
    color:${props=>props.theme.textColor}
}
a{
    text-decoration: none;
    color: inherit;
}
`

export default GlobalStyle;