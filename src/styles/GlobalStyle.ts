import {createGlobalStyle} from "styled-components"
import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`

${reset}
*{
    box-sizing:border-box;
}
body{
    font-family: 'Oswald', sans-serif;
    background-color: ${props=>props.theme.bgColor};
    color:${props=>props.theme.textColor}
}
a{
    text-decoration: none;
    color: inherit;
}
`

export default GlobalStyle;