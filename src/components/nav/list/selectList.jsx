import { ListItemText, ListItem, ListItemIcon, Checkbox } from "@mui/material"
import React from "react"
import { useDrag } from "react-dnd"

const SelectList = ({
    friend,
    index,
    type,
    checked,
    onMoveDragEvent,
    onClickToggleEvent,
}) => {
    const [{ isDraggbles }, dragRef] = useDrag(() => ({
        type: type,
        item: () => ({ ...friend, index }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()

            if (dropResult && item) {
                onMoveDragEvent(item)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    return (
        <React.Fragment>
            <ListItem
                role="listitem"
                ref={dragRef}
                button={true}
                onClick={onClickToggleEvent(friend)}
            >
                <ListItemIcon>
                    <Checkbox
                        checked={checked.indexOf(friend) !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={`${friend.username}`} />
            </ListItem>
        </React.Fragment>
    )
}

export default SelectList
