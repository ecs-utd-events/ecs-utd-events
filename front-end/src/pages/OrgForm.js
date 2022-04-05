import { useState } from "react";
import "../styles/OrgForm.css";

export default function OrgForm() {
    const [name, setName] = useState('Association for Computing Machinery');
    const [abbreviation, setAbbreviation] = useState('ACM');
    const [email, setEmail] = useState('firstname@gmail.com');
    const [username, setUsername] = useState('acm_utd');
    const [description, setDescription] = useState('Organization for students interested in CS');
    const [icon, setIcon] = useState('imgur.com/');
    const [insta, setInsta] = useState('instagram.com/');
    const [site, setSite] = useState('yoursite.com/');
    const [fb, setFb] = useState('facebook.com/');
    const [linkedin, setLinkedin] = useState('linkedin.com/');
    const [groupme, setGroupme] = useState('group.me/');
    const [discord, setDiscord] = useState('discord.gg/');


    return (
        <div className="details">
            <h1>Submit organization application</h1>
            <p>
            Want to show your events to our community? Don't hesitate to do so!! If you submit your organization information
            here , we will add you to our list of events and display you on our calendar. Collaborate more effectively and let
            your community members know to book your upcoming event dates in advance!
            </p>
            <h2>Organization Details</h2>
            <form>
                <label>Organization Name *</label>
                <input
                type = "text"
                required
                placeholder = {name}
                onChange = {(e) => setName(e.target.value)}
                />
                <label>Abbreviation</label>
                <input
                type = "text"
                required
                placeholder = {abbreviation}
                onChange = {(e) => setAbbreviation(e.target.value)}
                />
                <label>Email *</label>
                <input
                type = "text"
                required
                placeholder= {email}
                onChange = {(e) => setEmail(e.target.value)}
                />
                <label>Username *</label>
                <input
                type = "text"
                required
                placeholder = {username}
                onChange = {(e) => setUsername(e.target.value)}
                />
                <label>Description *</label>
                <input
                type = "text"
                required
                placeholder = {description}
                onChange = {(e) => setDescription(e.target.value)}
                />
                <label>Icon Link *</label>
                <input
                type = "text"
                required
                placeholder = {icon}
                onChange = {(e) => setIcon(e.target.value)}
                />
                <label>Instagram</label>
                <input
                type = "text"
                required
                placeholder = {insta}
                onChange = {(e) => setInsta(e.target.value)}
                />
                <label>Website</label>
                <input
                type = "text"
                required
                placeholder = {site}
                onChange = {(e) => setSite(e.target.value)}
                />
                <label>Facebook</label>
                <input
                type = "text"
                required
                placeholder = {fb}
                onChange = {(e) => setFb(e.target.value)}
                />
                <label>LinkedIn</label>
                <input
                type = "text"
                required
                placeholder = {linkedin}
                onChange = {(e) => setLinkedin(e.target.value)}
                />
                <label>GroupMe</label>
                <input
                type = "text"
                required
                placeholder = {groupme}
                onChange = {(e) => setGroupme(e.target.value)}
                />
                <label>Discord</label>
                <input
                type = "text"
                required
                placeholder = {discord}
                onChange = {(e) => setDiscord(e.target.value)}
                />
                <button>Submit your application -></button>
            </form>
        </div>
    );
}
    