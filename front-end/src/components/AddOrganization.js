import { enableCursor } from '@fullcalendar/react'
import React, { useState, useEffect, useContext } from 'react'

export default function AddOrganization() {
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [shortName, setShortName] = useState("")
    const [slug, setSlug] = useState("")
    const [social, setSocial] = useState("")
    const [contactName, setContactName] = useState("")
    const [contactEmail, setContactEmail] = useState("")
  
    const submitHandler = (e) => {
      e.preventDefault()
      alert("Form Submitted")
      setDescription("")
      setImage("")
      setName("")
      setShortName("")
      setSlug("")
      setSocial("")
      setContactName("")
      setContactEmail("")

      console.log("{\n\t\"description\": \"" + description + '\",\n' + 
      "\t\"image\": \"" + image + '\",\n' +
      "\t\"name\": \"" + name + '\",\n' +
      "\t\"shortName\": \"" + shortName + '\",\n' +
      "\t\"slug\": \"" + slug + '\",\n' +
      "\t\"socialMedia\": {" + 
        "\n\t\t\"discord\": \"" + social + "\"," +
        "\n\t\t\"facebook\": \"" + social + "\"," +
        "\n\t\t\"groupme\": \"" + social + "\"," +
        "\n\t\t\"instagram\": \"" + social + "\"," +
        "\n\t\t\"linkedin\": \"" + social + "\"\n\t}," +
      "\n\t\"pointOfContact\": {" + 
        "\n\t\t\"fullName\": \"" + contactName + "\"," +
        "\n\t\t\"email\": \"" + contactEmail + "\"\n\t}\n}" 
      )
    }



    return (
    <div id="contact-div">
      
      <h3>Submit Organization Information</h3>

      <form onSubmit={submitHandler}>
        <label>Organization Name:</label>
        <textarea value={name} onChange={e => setName(e.target.value)} required /><br />
        <label>Description:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required /><br />
        <label>Image Link:</label>
        <input type="text" value={image} onChange={e => setImage(e.target.value)} required /><br />
        <label>Short Name:</label>
        <textarea value={shortName} onChange={e => setShortName(e.target.value)} required /><br />
        <label>Slug:</label>
        <textarea value={slug} onChange={e => setSlug(e.target.value)} required /><br />
        <label>Social Media:</label>
        <textarea value={social} onChange={e => setSocial(e.target.value)} required /><br />
        <label>Full Name (Point of Contact):</label>
        <textarea value={contactName} onChange={e => setContactName(e.target.value)} required /><br />
        <label>Email (Point of Contact):</label>
        <textarea value={contactEmail} onChange={e => setContactEmail(e.target.value)} required /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
}