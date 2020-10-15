import React/*, { useEffect } */from "react";
// import { connect } from "react-redux";
import { history } from "../../store"
import { Link } from "react-router-dom";
import { useSelector/*,  useDispatch */} from "react-redux";
import { generateLabels } from "../../helpers";



// const mapDispatchToProps = ({ studio }) => {
//     return {
//         ...studio
//     };
// };

// const mapStateToProps = ({ studio }) => {
//     return {
//         ...studio
//     };
// };

const prefixUrl = "/add-studio";

const stepsContent = [
    {
        title: "description",
        url: `${prefixUrl}`
    },
    {
        title: "features",
        url: `${prefixUrl}/features`
    },
    {
        title: "studio_rules",
        url: `${prefixUrl}/rules`
    },
    {
        title: "location",
        url: `${prefixUrl}/location`
    },
    {
        title: "pricing",
        url: `${prefixUrl}/pricing`
    },
    {
        title: "photos",
        url: `${prefixUrl}/photos`
    }
]

var redirect = (url, step, currentStep, studioId) => {
    console.log(step, currentStep)
    if (step >= currentStep && currentStep !== 5) {
        if (studioId !== null)
            history.push(url + "/" + studioId)
        else history.push(url)
    }
    else if (currentStep === 5)
        if (studioId !== null)
            history.push(url + "/" + studioId)
}

let StudioSteps = ({
    currentStep = 5,
    steps = stepsContent
}) => {
    var storeState = useSelector(state => (state))
    var studioId = null
    studioId = storeState.studio.studioDetails && storeState.studio.studioDetails.id ? storeState.studio.studioDetails.id : null
    // var propFn = useDispatch()

    // useEffect(() => {
    //     console.log("got herer at HOOK mount", storeState)
    //     // if (storeState.studio.studioDetails && storeState.studio.studioDetails.id) propFn.studio.getStudio(storeState.studio.studioDetails.id)
    //     // else propFn.studio.getOnGoingStudio(storeState.studio.studioDetails.id)

    // }, [])
    return (
        <div className="add-studio-steps">
            {steps.map((item, key) => (
                <Link /*to={item.url}*/ key={key} className={`step-item ${currentStep > key && "active"}`} onClick={() => redirect(item.url, storeState.studio.onGoingProcess.step, key, studioId)}>
                    {currentStep > (key + 1) && (<span className="icon-tick-round icon-block"></span>)}
                    {generateLabels(item.title)}
                </Link>
            ))}
        </div> 
    );
};

export default StudioSteps

// export default connect(mapStateToProps, mapDispatchToProps)(StudioSteps);

