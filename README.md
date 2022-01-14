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
- Can set default value on arguments side
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

### React Query

- [React Query](https://react-query.tanstack.com/reference/useQuery#_top)
- No need refetching because after fetching datas will stored on cache
- Steps
  - Fetcher Fc
    - return json (ex) fetch(url).then(x=>x.json()))
  - Wrapped App component with queryProvider
  - call useQuery where you need
    - {isLoading,data,refetch}=useQuery("Coins",fetcherFC)
  - [Query Keys](https://react-query.tanstack.com/guides/query-keys)
    - ==It's common to pass an ID, index, or other primitive to uniquely identify the item==
    - Previous example query key is "Coins"
    - it will turning `["Coins"]` array!
    - put whatever things in array
    - ex) useQuery(['todo', 5, { preview: true }], ...)
  - [React Query Devtools](https://react-query.tanstack.com/devtools#_top)
    - 😭 Not surport Rn
  - refetchInterval: 5000, can give an option for interver refetching

### React ApexChart

- [ApexChart](https://apexcharts.com/docs/react-charts/)
- There are so many options , need to check on Demo pages

### Recoil

- [Recoil](https://recoiljs.org/ko)
- State Management
