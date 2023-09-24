import { useState, useEffect } from "react"
import {
    Box,
    Stepper,
    Step,
    StepButton,
    Typography,
    Button,
} from "@mui/material"

// props: steps => Array
function MyStepper({
    steps, activeStep, isNextButtonDisable, onStepButtonClickEvent,
    onResetButtonClickEvent, onNextButtonClickEvent, onBackButtonClickEvent,
}) {
    const [completed, setCompleted] = useState({})

    const isLastActiveStep = isLastStep.bind(this, activeStep, steps)

    const isAllStepsCompleted = allStepsCompleted.bind(this, completed, steps)

    const onStepButtonClickEventHandler = (step) => () => {
        onStepButtonClickEvent(step)
    }

    const onResetButtonClickEventHandler = () => {
        setCompleted({})
        onResetButtonClickEvent(0)
    }

    const onBackButtonClickEventHandler = () => {
        onBackButtonClickEvent(activeStep - 1)
    }

    const onNextButtonClickEventHandler = () => {
        const newActiveStep = isLastActiveStep() && !isAllStepsCompleted() ?
            steps.findIndex((step, i) => !(i in completed)) :
            activeStep + 1
        onNextButtonClickEvent(newActiveStep)
    }

    return (
        <Box sx={boxStyle}>
            <Stepper
                activeStep={activeStep}
                nonLinear={false}
                alternativeLabel={true}
            >
                {steps.map((label, i) => {
                    return (
                        <Step
                            key={label}
                            completed={completed[i]}
                        >
                            <StepButton
                                color="inherit"
                                onClick={onStepButtonClickEventHandler(i)}
                            >
                                {label}
                            </StepButton>
                        </Step>
                    )}
                )}
            </Stepper>
            {isAllStepsCompleted() ? (
                <Box>
                    <Typography sx={typographyStyle}>All steps completed - you&apos;re finished</Typography>
                    <Box sx={buttonBoxStyle}>
                        <Box sx={buttonStyle}>
                            <Button onClick={onResetButtonClickEventHandler}>Reset</Button>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Typography
                        variant="h6"
                        sx={typographyStyle}
                    >
                        {steps[activeStep]}
                    </Typography>
                    <Box sx={buttonBoxStyle}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={onBackButtonClickEventHandler}
                            sx={backNextButtonStyle}
                        >
                            Back
                        </Button>
                        <Box sx={buttonStyle} />
                        <Button
                            disabled={isNextButtonDisable || isLastActiveStep()}
                            onClick={onNextButtonClickEventHandler}
                            sx={backNextButtonStyle}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

function totalStepCount(steps) {
    return steps.length
}

function compledtedStep(completed) {
    return Object.keys(completed).length
}

function isLastStep(activeStep, steps) {
    return activeStep === (totalStepCount(steps) - 1)
}

function allStepsCompleted(completed, steps) {
    return compledtedStep(completed) === totalStepCount(steps)
}

const boxStyle = {
    margin: "0 auto",
    marginTop: "3rem",
    width: "100%",
}

const typographyStyle = {
    mt: 4,
    mb: 2,
}

const buttonBoxStyle = {
    width: "70%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    pt: 2,
}

const buttonStyle = {
    flex: "1 1 auto",
}

const backNextButtonStyle = {
    mr: 2,
}

export default MyStepper