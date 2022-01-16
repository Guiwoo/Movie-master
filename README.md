# React MASTER

### Styling

- Styled Components
  - Organize div Boxes
  - Gives a random classname
  - Use props to send properties
  - Extend style with previous style
  - as="thing" change html tag wow
    - > `<Btn as="a"/>`
  - Give a selector in component other component
    - > `${component} {style}`

### TypeSciprt

- [Play Ground](https://www.typescriptlang.org/play)
- optional props ? set a default value in children node
  - ex) borderColor={borderColor ?? "white"}
- Can set default value on arguments side
  - const blar = ({x="default x"})=>{}
- [SyntheticEvent](https://reactjs.org/docs/events.html)
  - Can find event
- Enums "Variables group"
  - [Enums Click](https://www.typescriptlang.org/ko/docs/handbook/enums.html)

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

---

- No need refetching because after fetching datas will stored on cache
- > Steps

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

- What if i don't use global state manager
  - send props to compononet to other components inside other components ...abs
- > Step

  1. RecoilRoot wrapping App component

  2. Make a atom with like const somehitng = atom({})

  3. Call it with useRecoilValue

  - Wanna set values ? => call useSetRecoilState and use it as setState()
  - ex) () => setterFn((prev) => !prev)

> useRcoilValue ? when i need a value !

> useSetRecoilState ? when i need a modifiy a value!

> useRecoilState ? Literally Do useSettate ! can unpack [value, modifire]

> Selector ? Transfor atom output [Check Here](https://recoiljs.org/docs/api-reference/core/selector/)

> > Selector for set function

- [Git hub Click](https://github.com/nomadcoders/react-masterclass/tree/64a5b4d00939b09c5ebf934ebaa74daedea34283)
- [ReCoil Click](https://recoiljs.org/docs/api-reference/core/selector#writeable-selectors)

### React-hook-form

- [React Hook Form](https://react-hook-form.com/)

- > Why needs it ?

  - Handle Form in react so hassle and dirty handling more than 3 inputs

    - Step

      1. setValue on useState

      2. connect to value on input

      3. make onChnage and onSubmit function

      4. It depends on number of input, need to make same quantity state,onChange

      5. Validation ? Have to set state

- > React Hook Step

  - Register Func

    1. Spread in input {...register("###")}

    2. use handleSubmit from useForm

    - ex) form onSubmit={handleSubmit(onvalid)}
    - onVlaid has a data as a prop => console.log(data)
      - data needs let typescript know what is that

    3. How to check Error ? "formState"

    - Send message as well, require:"message",minlenth:{num,"message"}
    - Email Check with Regex

      - pattern: /^[A-Za-z0-9._%+-]+@naver.com$/

    - Custom Validation

      - Handle on onValid with data !
      - setError from useForm
        - setError("field",{message:"######"},#1)
        - whole form error ? needs to add interface as well
        - #1 {shouldFoucs:true} will focus after error ouccer

    - validate on required

      - [Check here](https://react-hook-form.com/api/useform/register)
      - ex) validate : { (value) => !value.includes("nico") || "error message"}
      - can pass multiple validate
        - ex) validate:{noNico: (value)=> ###,noNick:(value)=>###}
      - register("#",{validate:(#2) => do something})
        - #2 can get a value of input

### Drag & Drop

> [Check on Here](https://github.com/LeeHyungGeun/react-beautiful-dnd-kr)** > [See Examples](https://codesandbox.io/s/k260nyxq9v)** > [Test](https://react-beautiful-dnd.netlify.app/iframe.html?id=board--simple)** > [Vanilla Way](https://codesandbox.io/s/immutable-violet-5gm4z?file=/src/index.js)**

- Can Draggable Items !!

- Steps

  1. DragDropContext ! Supposed to wrapped where you want user to drag items

  2. Needs a Props "Dragend" which is when dragend triiger

  3. Droppable ! Needs a droppableId and children Supoosed to be function

  4. Draggable ! Needs a draggbaleId,index as children Supposed to be function as well

  5. Droppalbe, Draggble has Props,droppableProps ,innerRef, draggableProps ,dragHandleProps

  6. give right props on right place !!
