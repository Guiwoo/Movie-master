# React MASTER

### React

- React Re-render if the key props is changed.!

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
- Index Signatures -[Index Signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

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

  - Droppablestate snapshot
  - isDraggingOver: boolean,

  - Droppable over Draggable ID
  - draggingOverWith: ?DraggableId,

  - Draggable ID out of Current Droppable Id
  - draggingFromThisWith: ?DraggableId,

  - placeholder : work or not
  - isUsingPlaceholder: boolean,

  - [Check Here](https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/droppable.md#2-snapshot-droppablestatesnapshot)

### React.memo

- Tell react do not rerender if it's not updating

### Framer Animation

- [Framer Motion](https://github.com/framer/motion)

- Allllways need motion.div, motion.span like this

- Variants

  - Take props out and put in Objects
  - using varinats={your figure} add something
  - Motion will spread out Inital and animate to children !!!
  - Can handle children such as staggerChildren,delayChildren,etc..
    - [Check here](https://www.framer.com/docs/transition/#orchestration)
  - [Motion Value](https://www.framer.com/docs/motionvalue/)
  - [DragConstrain](https://www.framer.com/docs/gestures/#drag)
  - [useTransForm](https://www.framer.com/docs/motionvalue/##usetransform)
    - Can change background and bgImg as well ?? Nope needs Number value
      - like rgb(255,255,255) this
  - [useViewPortScroll](https://www.framer.com/docs/motionvalue/##useviewportscroll)
    - Can Listen Y-Cordinate
  - [AnimatePresence](https://www.framer.com/docs/animate-presence/)
    - This will effects on When React Component Changed awesome !!!
    - ex) button click show and dissaper

- animate props, transition props, Inital Props, End Props !

- [Custom](https://www.framer.com/docs/component/###custom)

- exitBeforeEnter: Make wait finished previous item animations

-[Layout](https://www.framer.com/docs/animate-shared-layout/#syncing-layout-animations)

- When changed layout props ? automactically set a animation

- [Shared Layout](https://www.framer.com/docs/animate-shared-layout/#animate-between-components)

  - If components have a same layout id ? frammer connect those components

1.  ##### Animation dissapear and show up
    ```
    transition={{ type: "spring", bounce: 0.25, delay: 0.3 }}
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotateZ: 360 }}
    ```
2.  ##### Animation show circle as different time !
    ```
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      staggerChildren: 0.15,
    },
    ```
3.  ###### Gesture and Drag
    ```
    <Bigger ref={biggerBoxRef}>
        {/**Connect ref to dragConstraints  */}
        <Box
          drag
          dragElastic={0} // Following mouse
          dragSnapToOrigin // Mouse move to center
          dragConstraints={biggerBoxRef} // Limit Movement
          variants={BoxVar}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        />
    </Bigger>
    ```
4.  ##### Listen Scroll

    ```
    const x = useMotionValue(0); //Get X Value
    const scale = useTransform(x, [-300, 0, 300], [2.5, 1, 0.5]);// Interpolation value
    const { scrollYProgress } = useViewportScroll(); // Get Y value progess between 0 and 1
    ```

5.  ##### Svg

    - start from fill change color
    - Storke means outline
    - Duration Each animations

    ```
    transition={{
          default: {
            duration: 3,
          },
          fill: { duration: 2, delay: 2 },
        }}
    ```

6.  ##### Animate Presence Component

    - Variants -

    ```
    const BoxVar = {
    entry: (back: boolean) => ({
    x: back ? -300 : 300,
    opacity: 0,
    scale: 0,
    }),
    center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
    duration: 1,
    },
    },
    exit: (back: boolean) => ({
    x: back ? 300 : -300,
    opacity: 0,
    scale: 0,
    transition: {
    duration: 1,
    },
    }),
    };
    ```

    - Rendering -

    ```
    <AnimatePresence exitBeforeEnter custom={back}>
          <Box
            custom={back}
            variants={BoxVar}
            initial="entry"
            animate="center"
            exit="exit"
            key={visible}
          >
            {visible}
          </Box>
        </AnimatePresence>
    ```

7.  ##### Animate Presence Extra..
    ```
    <Gird>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setClickId(n)} key={n} layoutId={n} />
        ))}
      </Gird>
      <AnimatePresence>
        {clickId ? (
          <Overlay
            onClick={() => setClickId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <Box
              layoutId={clickId}
              style={{
                width: 200,
                height: 200,
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>s
    ```
