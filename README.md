# React MASTER

## Styling

- Styled Components
  - Organize div Boxes
  - Gives a random classname
  - Use props to send properties
  - Extend style with previous style
  - as="thing" change html tag wow
    - > `<Btn as="a"/>`
  - Give a selector in component other component
    - > `${component} {style}`

## TypeSciprt

- [Play Ground](https://www.typescriptlang.org/play)
- optional props ? set a default value in children node
  - ex) borderColor={borderColor ?? "white"}
- Can set default value on arguments sid
  - const blar = ({x="default x"})=>{}
- [SyntheticEvent](https://reactjs.org/docs/events.html)
  - Can find event

# Coin Tracker

### Rotuer Use for v6 Routes, and Route more intuitive

| Router      |  function   |
| ----------- | :---------: |
| /           |  All Coins  |
| /:id ->/btc | Coin Detail |

- Link state props can send any data check on index.d.ts
- Nesting router With outlet -[Check Here](https://reactrouter.com/docs/en/v6/getting-started/overviews)
- Get current url with match hooks return objects or null

### Reset Css

- Use createGlobalstyle from styled-components
- Use reset css

### Fetching Data

- Manually

  - await fetch("https://api.coinpaprika.com/v1/coins");
  - const json = await response.json();

- Do it One line
  - await (
    await fetch(`https://api.coinpaprika.com/v1/coins/${id}`)
    ).json();
