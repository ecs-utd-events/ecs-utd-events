import { useParams } from "react-router-dom";


export default function OrgProfile() {
    let { orgName } = useParams();

    return (
        <div>
            <h1>This is the Org Profile for: {orgName}</h1>
        </div>
    )
}