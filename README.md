# FrontEnd

## MyScheduleSystem Project

`
Release:

    BackEnd: firebase

`

## Period

    Start: 2022.05.04
    End: ~ing

` Project start: npm start`

` Contributors: FoxMon, Leo, Velo248`

` FrontEnd: FoxMon, Leo, Velo248`

## Setting

    setup > SETUP.md 확인

    git hooks pre-commit setting

## Language

    JavaScript(ES6)

## OpenSource

    fortawesome

    Lodash

    firebase

    StyledComponent

    MaterialUi(MUI)

    Cloudinary API(https://cloudinary.com/documentation) => 사용 안함.
        -> Firebase storage로 옮김.

    OpenWeather API(https://openweathermap.org/)

    react-loader-spinner

    react-Dnd(https://react-dnd.github.io/react-dnd/about)

## CheckList

```
불변성 유지
    - state 중 배열이 있을 경우 spread 연산 사용할 것(2022.07.05)

불필요한 렌더링 자제

일관성 유지

로직이 반복되지는 않는가?

forEach, map, filter, every 등 이러한 함수들이 적절하게 사용되고 있는가?

useState(setState의) 동작 이해
```

## Function

    MyCalendar
        Date Picker
        Completed todo list or not
        Tab menu
        Quick move to today's todo
        Quick create todo list

    MyModal
        Create My Schedule
        Read My Schedule or Friend Schedule
        Update My Schedule
        Delete My Schedule
        Share My Schedule
        Show Todo card popup

    Card
        Show My Daily Schedule
        Update My Daily Schedule
        Delete My Daily Schedule
        Create My Daily Schedule

    Friend
        Add Friend
        Delete Friend

    User
        Create User
        Read User Info
        Update User
        Delete User Info
        Show User popup
        Profile image upload
        Profile state message
        Add Friend

    Chatroom
        Create chatroom
        Show charoom list
        React charoom's user list
        Delete chatroom
        Drag and Drop list

    Validation
        User validation
        Card validation

    Sidebar
        View friends profile
        Logout my acount

    Header
        View My Info
        View My Alarm
        View My Message
        Update My Alarm
        Update My Message

    UserContextProvider
        userReducer
        UserContext

    Spinner

## Issue

```
    setState의 비동기에 대한 이해 (해결)
        - useState를 사용할 경우 값이 계산되어 변경될 때 React는 하나의 컴포넌트 내에서 수많은 state가 존재하기 때문에
            state들의 값이 바뀔 때마다 re-rendering을 하는 것은 비효율적. 따라서 한꺼번에 모아서 rendering을 한다.
            React는 이러한 이유로 성능 향상을 위해 setState를 연속 호출하면 Batch 처리하여 한 번에 rendering 한다.

        - useState는 비동기로 동작하는 hook이다. 동기적으로 처리하고 싶다면 useState 안에 callback 함수를 이용하자.

        - What is Batch?
            React가 더 효율적인 성능을 위해 여러 개의 state의 update를 re-rendering으로 묶는 것. React는 16ms 동안 변경된 상태 값들을
            하나로 묶는다.

    CardItem이 여러 개 있을 경우, 2개 이상의 CardItem을 클릭 시 내용이 겹치는 오류 발생 (해결)
        - ex) Item A, Item B 이렇게 2개의 card가 존재할 때, B를 클릭 후, A 카드를 선택하면 A의 카드 내용과 B의 카드 내용이 겹쳐지는 오류 발생

        - 해결: setEditTodoItem(() => Object.assign(editTodoItem, obj)) 이 부분을 setEditTodoItem(() => Lodash.cloneDeep(obj)) 이렇게 수정했다.
            Object.assign의 Shallow copy가 이루어 지기 때문에 서로 다른 두 카드를 선택할 경우 같은 Memory를 참조하게 된다. 따라서 Lodash.cloneDeep 혹은
            순환하면서 깊은 복사를 진행한다면 오류를 해결할 수 있다.

    Input 태그의 onChange 이벤트 함수 전달 시 React가 버벅거리는 문제 (해결)
        - React는 state가 변경될 때마다 새로 renderin 된다. 즉 onChange 이벤트를 핸들링할 때 rendering이 여러번 이루어질 가능성이 매우 높다.
            ex) input: FoxMon => F o x M o n 총 6번 rendering 발생. (Bad)

        - 따라서 재사용 가능한 함수는 useCallback을 통해 다시 만들지 않고 재사용 가능하도록 다뤄보자.
            ex) onTitleChangeHandler = (e) => {} 이 부분을 onTitleChangeHandler = useCallback((e) => {}, []) 이렇게 변경했다. => 메모이제이션된 콜백을 반환한다.

        - 두 번째 전달되는 parameter는 의존성 값을 전달한다. 즉 이 부분이 변경된다면 callback의 의존성이 변경된다는 의미이다.

    Sidebar menu중 Friends List에 friend name 클릭시 제대로 된 index가 가져오질 않음 (해결)
        - index를 가지고 있는 state를 추가하여 클릭 시 해당 인덱스를 state에 저장하는 방식으로 해결했다.

    Logout 실행 후 새로고침 하면 signinForm이 나오지 않고 calendar가 나오는 오류 발생 (해결)
        - Token의 유효성 검사가 제대로 이루어지지 않았기 때문에 에러가 발생했다.
            이러한 오류를 해결하기 위해 userContextProvider 컴포넌트에서 useEffect를 활용하여 localStorage에 있는 object를 JSON으로 parse하여 state에 재할당 해주는 등
            여러가지 시도를 해봤다. 하지만 동작이 되더라도 새로고침을 하는 순간 내가 원하는 페이지가 제대로 보이지 않는 등 여러가지 에러가 존재했다.
            또한 토큰을 localStorage에 저장함으로서 발생하는 여러 보안 취약점이 존재하기 때문에 다시 작성할 필요가 있었다.

        - localStorage를 활용하여 Token을 관리하는 것에 대한 단점. 그리고 이를 해결하기 위한 In memory(Reducer의 활용).
            XSS, CSRF 보안 취약점으로 인해 localStorage에 있는 Token을 사용하거나 도용당할 위험성이 있다.
            따라서 우리의 project에서는 React의 In memory에 저장하도록 수정했다. 물론 In memory에 저장할 경우 새로운 탭을 열 경우 다시 로그인을 해야할 수도 있지만
            이러한 점들을 보완하며 새롭게 완성시켜 보기로 했다. 이러한 기능을 완성하기 위해 나는 Reducer를 사용하기로 했다.
                * In memory로 구현하는 경우, 외부 공격으로부터 안전하다.
            이러한 Reducer의 도입으로 Context의 object를 In memory를 활용해 쉽게 관리할 수 있었으며 accessToken을 Cookie에 저장함으로서 Token관리가 더욱 용이해졌다.
            전 보다 훨씬 더 부드럽고 정확한 동작을 하도록 작성할 수 있었다.

        - Cookie에 저장하는 방식
            Cookie는 CSRF 공격에 취약하지만 SameSite Cookie는 Cookie기반 접근 방식을 CSRF 공격으로부터 방지할 수 있다.
            인증 및 API server가 다른 domain에서 hosting되는 경우 solution이 아닐 수 있지만 그렇지 않은 경우 이러한 단점을 보완할 수 있다.
                * 우리의 프로젝트에서는 accessToken의 경우 cookie에 저장하고, refreshToken의 경우 In memory에 저장한다.
                * sameSite option은 'strict' => 같은 domain에서 해당 cookie에 접근이 가능하다.

        - What is Reducer?
            React에서는 상태를 관리하는데 있어 state뿐만 아니라 useReducer를 활용하는 방식이 있다.
            이러한 Hook 함수는 Component의 state update logic을 Component에서 분리할 수 있다. 이러한 state update logic은
            Component 바깥에 작성할 수도 있고 다른 file에서도 불러와 사용할 수 있다.
                * 즉 useState의 대체 함수라고도 볼 수 있다.
                * 이러한 상태변화 로직을 사용하기 위해선 dispatch를 사용해야함.

    TextField에서 label props에 의한 EventBubbling 문제 (해결)
        - 초기 코드
            <MenuItem>
                <TextField
                    inputRef={titleRef}
                    error={validObject.title}
                    label="Enter todo title"
                    variant="outlined"
                />
            </MenuItem>}

        - MUI Menu 컴포넌트의 Event bubbling
            이렇게 작성된 코드에서 첫 문자가 E로 시작하면 다른 메뉴 탭으로 이동하는 오류가 있었다. 원인을 알지 못했기 때문에 구글링을 통해 찾아봤다.
            Github issue에 비슷한 사례가 있었다. (https://github.com/mui/material-ui/issues/19116)
            Mui의 Menu는 MenuList의 Item들 모두에게 이벤트가 추가된다는 내용이었다. 따라서 MenuItem의 하위 컴포넌트로 작성된 TextField의 Event bubbling을 막아준다면
            해결이 가능한 문제였다.

        - 수정 후 코드
            const onKeyDownEventHandler = (e) => {
                e.stopPropagation()
            }

            ...

            <MenuItem>
                <TextField
                    inputRef={titleRef}
                    error={validObject.title}
                    label="Enter todo title"
                    variant="outlined"
                    onKeyDown={onKeyDownEventHandler}
                />
            </MenuItem>

    sendSignInLinkToEmail auth관련 오류(해결)
        - auth/operation-not-allowed
            코드에 문제가 있는 것으로 예상했으나, 파이어베이스 인증섹션에서 권한허용을 하는 부분이 있었다.
        - auth/invalid-continue-uri
            actionCodeSettings 인터페이스에서 URL부분의 값에 대한 오류였다. 파이어베이스에서 제공하는 도메인을 기본적으로 사용하였으나,
            email -> validation -> redirect에 관한 내용이라 브라우저에서 프로젝트가 동작하는 URL로 직접 초기화하여 사용해야한다.

    비동기를 실행하는 실행 컨텍스트가 완료 되기 전에 Component가 unmount된 후 setState가 실행될 때 발생하는 오류(해결)
        - Error message
            Warning: Can't perform a React state update on an unmounted component.
            This is a no-op, but it indicates a memory leak in your application.
            To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

        - unmount 되는 상태에서 상태를 변화할 때 발생하는 오류이다.
            useEffect에서 clean-up 형태로 작성한다면 해결이 가능하다.
                ex)
                useEffect(() => {
                    ...
                    return () => TODO...
                })

    React-Dnd 드래그시 모든 friend정보를 가져와서 한개씩 가져오지 못하는 오류가 있다(해결)
        - item 부분에서 모든 friend 정보를 가져옴 오류를 인지하여 해결중에 있다.
        ex) 초기코드
        const [{ isDraggble }, dragRef] = useDrag(() => ({
            type: "friend",
            item: () => ({ ...friend.map((item) => item) }),
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult()
                if (dropResult && item) {
                    onMoveCompletedEventHandler(item)
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }))

        - 새로운 컴포넌트를 만들어서 friend 정보를 map으로 한개씩 보내줌으로써 해결했다.
            {unCompletedList.map((friend, index) => {
                return(
                    <SelectList />
                )

        - 해결 후 동작은 하는데 콘솔에 Uncaught TypeError: this._drop is not a function 이란 에러가 생겼다
        찾아본 결과 내 크롬 확장 프로그램에 crxMouse Chrome 제스처란 확장 프로그램으로 인한 오류 였다.

```

## 개발 회고록

### 2022-06-11 (FoxMon)

```
BackEnd를 Node express에서 firebase로 바꾸기로 결정했다.
    - MyScheduleSystem은 우리가 지속적으로 사용할 서비스이기 때문에 추후 유지보수적인 면에 있어 firebase가 좋다고 판단했다.

firebase 공식문서와 구글링을 통해 사용법을 익혀가고 있다.

firebase로 바꿈으로서 수정돼야 할 코드들이 많이 존재했다.

프로젝트가 완성되는 날까지 화이팅..!
```

### 2022-06-14 (Leo)

```
header에 menu 아이콘을 통해 sidebar를 열었을때 동작이 부드럽게 열리지 않았다.
    - Sidebar에 Drawer를 바꿔서 동작이 부드럽게 만들었다.

Drawer를 바꾸고 보니 아직 UI를 손봐야 할 부분이 많이 있었다.

이제 캘린더 부분의 완성이 눈앞에 보인다.
```

### 2022-06-20 (FoxMon)

```
reduer를 도입했다. 처음 사용해보는 reducer였기 때문에 공부하고 적용시키기 까지 꽤 오랜 시간이 걸렸다.

action과 type이 뭔가 Redux와 비슷한 느낌..?

열심히 다듬어서 꼭 우리가 사용하는 날이 도래했으면 좋겠다!
```

### 2022-06-21 (Leo)

```
구현 중 Preset Name을 잘 못 가져와서 조금 헤매었지만 해결하여 기능구현에는 성공하였다.

다음으로는 Image를 Cloudinary에 User에 Uuid로 폴더를 구분하여 각각 맞는 폴더에 저장하는 것을 구현해보자!
```

### 2022-07-05 (FoxMon)

```
최근 MSS를 앞으로 어떻게 설계하고 이어나갈지에 대한 깊은 고민에 빠졌다. 현재 이 프로젝트가 어디로 향해 나아가고 있는지 종잡을 수 없는 느낌이었다.

현재 드는 생각은 여태까지 개발한 기능이라도 깔끔하게 다듬자는 생각 뿐이다.

TODO부분이 끝나는 듯 싶으면 하나씩 부족한 부분들이 발견된다.

작은 부분 하나하나 채워나가는 것도 벅찬 느낌이다.

그래도 완성될 MSS를 상상하며...! 화이팅~
```

### 2022-07-06 (velo)

```
사용자 인증에 관한 작업 중인데 생각보다 벅찬 느낌이다.

자체적으로 서버를 개발하여 구현하였을 때는 비교적 간편하게 조작할 수 있었지만,

파이어베이스와 연계하니 그들의 방식을 공부하는데 시간이 많이 투자된다.

중간에 들어와서 따라잡는데 고생했는데, 슬슬 가닥이 잡혀가는 느낌이다.
```

### 2022-07-10 (FoxMon)

```
- 우리가 만들어야 할 프로젝트는 무엇인가 -

Calendar, User 부분이 완성됨에 따라서 많은 테스트를 거듭하며 발생하는 오류를 찾고 프로젝트를 개선해 나가고 있다.
단순히 기능을 개발하는 것 보다 개선을 하는 것이 더 어려운 것 같다.
이러한 단계를 거듭할수록 나는 사용자에게 편리한 UI란 무엇일까? 라는 생각이 든다.

물론 이 MSS의 UI는 나의 고집으로 이루어진 부분들이 꽤 많다.
내가 생각하는 편리하고 강력한 UI는 사용자에게 최대한 많은 가능성을 열어주고 사용함에 있어서 불편함이 없는 것이다.
이러한 관점에서 본다면 우리 MSS의 Calendar는 기존에 우리가 사용하고 있는 휴대폰 다이어리 앱과 크게 차이가 나지 않는다고 생각한다.
수려하고 정결함을 갖춘 채 아름다움을 뽐내는 화려한 디자인을 갖춘 시스템은 아니지만 누구나 쉽게 우리 MSS를 사용할 수 있었으면 한다.
따라서 현재 우리는 다음 기능 개발보다 사용에 있어 발생할 가능성이 있는 오류 해결과 기능개선에 초점을 맞추고 있다.

나는 프로젝트 경험이랍시고 단순히 만들고 버리는 프로젝트를 원하지 않는다. 그런 프로젝트는 학부 시절 이미 많이 경험해 보았다.
이번 MSS는 과거의 경험에 비추어 봤을 때, 단순히 배운 것을 활용해 본 느낌의 프로젝트가 아닌 앞으로도 우리가 계속 애정을 갖고
지속 가능성을 갖춘 프로젝트이길 간절히 바란다.
사용자가 있든 없든 그것이 내게 무슨 큰 의미가 있을까. 나는 내가 할 수 있는 최선을 이 프로젝트에 담아내고 있는 중이다.

이것은 과연 나의 고집일까.

만약 이것이 나의 강한 고집이라면 이왕 믿고 따라와준 팀원들이 끝까지 함께 동행해 주기를 바란다.
MSS의 끝에 분명 모두에게 도움이 되리라 확신한다.
```

### 2022-07-12 (Leo)

```
현재 많은 기능이 만들어진 후 이제 얼마 남지 않은 기능들을 만들어 나가고 있다. 갈수록 어려운 기능들만 남은 거 같다.

생각보다 라이브러리를 사용하는 부분에서도 편리하게 사용하도록 만들어졌지만 잘 사용해야 편리한 것 같아 공부가 많이 필요하다.

이번 프로젝트를 통해 가장 많은 성장을 이루었지만 성장해야 할 것 같다. 나 스스로 부족한 부분이 많이 보인다.

다들 힘내서 끝을 향해 갔으면 좋겠다.

```

### 2022-08-11 (FoxMon)

```
90%

내가 느끼기에 MSS의 완성까지 진척도는 90%이다. 모처럼 애정을 가진 채 개발에 들어간 MSS Proejct이다. TODO같지만 TODO같지 않은 CRUD의 집합체인 My Schedule System.사실 중간에 개발을 진행하는 도중 많은 일들을 겪었다. 개발 진행이 생각되로 진척이 되지 않아 많은 고민에 접어들었다. 이러한 과정에서 프로젝트 진행에 대한 흥미도 잠깐 잃었었다.나와 팀원이 구현할 수 있는 범위 내에서 기능 기획을 했어야 했는데, 그러지 못했던 것들에 대해서 타협을 해야 했고, 이런 과정을 겪어본 사람이라면 누구나 좌절감을 느끼기 마련일 것이다. 하지만 애정이 들어가 있는 프로젝트이기 때문에 완성을 하고 싶었다. 디자인보다 우리가 표현할 수 있는 로직을 마음껏 표현하며 아쉬움이 남지 않는 프로젝트를 완성하고 싶었다. 비록 이 프로젝트가 외견상 아름답진 않지만 내가 알고 있는 지식들을 대부분 녹여낸 프로젝트이기 때문에 여태까지 진행한 프로젝트보다 애정이 더욱 가는 것은 사실이다.수 많은 리팩토링과 코드리뷰를 거치며 90% 라는 수치까지 도달했다.이러한 수치에 도달하기 까지 많은 것들은 배운 것 같다.



"나만의 규칙을 세우고, 나만의 방향으로 나아갈 것.""남들과 비교하지 말고 우리만의 작품을 완성할 것."



약간 오글거리는 멘트일 수도 있겠으나, 감동적인 문장이 아닐 수 없다.

이제 10%정도 남은 것 같다. 포기하지 않고 끝까지 나아가 보도록 하자.
```
# MyScheduleSystem
