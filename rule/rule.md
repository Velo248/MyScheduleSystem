# Programming Rule

1. 변수
    - 이름
        * camelCase를 활용하도록 한다.
        * boolean의 경우: isOpen과 같이 사용하도록 한다.
        * 변수의 이름으로 해당 변수가 어떠한 역할을 하는지 파악할 수 있도록 명명한다.

    - var 사용 금지
        * var의 scope가 불안정 하므로 최대한 let과 const를 사용하도록 한다.
            eslint 참고.

    - 최대한 let의 사용을 자제하도록 한다.
        * 불변성 유지를 위해 let의 사용을 최소화 하고 최대한 const를 쓰도록 한다.
        ```
        ex) 1 ~ 10 까지의 값을 구해야 하는 경우.
            즉시실행함수(IIFE)를 활용하여 해결하도록 한다.
                const sum = (() => {
                    let sum = 0
                    for(let i = 1; i <= 10; i++) {
                        sum += i
                    }
                    return sum
                })()
        ```
    - 세미콜론
        * 사용하지 않음.
            eslint 참고.
    - String
        * Double quote 사용.
            eslint 참고.
2. 함수
    - 이름
        * React 내에서 관리하는 event 함수의 경우 onClickEventHandler와 같이 명명한다. (onNameEventHandler => on ~~~ EventHandler 와 같이 명명함.)
        * 해당 함수의 이름을 보고 동작을 파악할 수 있도록 작성한다.
        * 하위 컴포넌트에서 상위 컴포넌트로 값을 넘겨줄 때 사용하는 함수의 경우 Handler를 제외한다.
        ```
        ex) onClickEvent()
        ```
    - 컴포넌트 밖에서 관리되는 함수의 경우 call, bind를 활용하도록 한다.
    - map, forEach, filter, every, some, reduce을 최대한 활용한다.
        * 적절한 상황에 적절한 함수를 호출하여 사용하도록 한다.
        ```
            ex) Bad!
            const arr = [1, 2, 3, 4, 5]
            let sum = 0
            for(let i = 0; i < arr.length; i++) {
                sum += arr[i]
            }

            ex) Good!
            const arr = [1, 2, 3, 4, 5]
            const sum = arr.reduce((acc, cur, i) => { return acc += cur }, 0)

            or

            const arr = [1, 2, 3, 4, 5]
            let sum = 0
            arr.forEach(e => sum += e)
    - 상위 컴포넌트에서 하위 컴포넌트로 함수를 전달할 경우 useCallback을 사용하자.
        * 사용하지 않을 경우, 새로운 함수를 생성하고 받아들이는 과정을 반복하면서 렌더링이 계속해서 발생한다.
        * 이 때, 함수 안에 state, props가 있다면 deps 배열 안에 dependency를 추가한다.
        ```
3. state, props
    - 상위 컴포넌트에서 하위 컴포넌트로는 props로 전달한다.
    - 히위 컴포넌트에서 상위 컴포넌트로는 전달 받은 함수의 파라미터로 값을 전달한다.
    - 하위 컴포넌트에서 상위 컴포넌트의 state를 변경하지 않는다.
        * 즉 하위 컴포넌트에서 상위 컴포넌트로부터 전달받은 props를 변경하지 않는다.
    - state를 남용하지 않도록 한다.
        * 꼭 state로 사용해야 하는가? 다시 한 번 더 생각해 보도록 한다.
4. Git & README.md
    - 본인이 변경하지 않은 파일은 pull request(PR)에 포함시키지 않는다.
        * 굳이 띄어쓰기 들여쓰기 한 파일들을 PR에 포함될 이유가 없지 않을까?
    - 회고록은 돌아가면서 한 명 씩 작성하도록 한다.
    - 본인이 직면한 어려운 문제들은 README.md에 문제상황 및 해결방법을 기록하도록 한다.