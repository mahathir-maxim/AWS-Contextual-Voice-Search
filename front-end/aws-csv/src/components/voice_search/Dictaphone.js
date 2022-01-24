import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { companyDictionary } from "../../utils/company_dictionary";
import companies from '../../utils/companyName_to_cik.json';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const saveTranscript = () => {
    let i = 1;  // To skip over "company"
    let companyName = "";
    let attribute = "";
    let year = "";
    const transArray = transcript.split(" ");
    const companyToCik = new Map(Object.entries(companies)); 

    // Get company name
    while ( i < transArray.length && transArray[i].toLowerCase() != "attribute") {
      companyName = companyName.concat(transArray[i], " ");
      i = i + 1;
    }

    // Capitalize each word inside Company Name for proper search
    companyName = companyName.trim();
    let splitComp = companyName.toLowerCase().split(" ");
    // Capitalize each word in attribute for proper search
    for (let j = 0; j < splitComp.length; j++) {
      splitComp[j] = splitComp[j].charAt(0).toUpperCase() + splitComp[j].substring(1);     
    }
    companyName = splitComp.join(" ");

    // Skip over "attribute"
    i = i + 1;

    // Get attribute
    while ( i < transArray.length && transArray[i].toLowerCase() != "year") {
      attribute = attribute.concat(transArray[i], " ");
      i = i + 1;
    }

    // Capitalize each word inside Attribute for proper search
    attribute = attribute.trim();
    let splitAttrb = attribute.toLowerCase().split(" ");
    // Capitalize each word in attribute for proper search
    for (let j = 0; j < splitAttrb.length; j++) {
      splitAttrb[j] = splitAttrb[j].charAt(0).toUpperCase() + splitAttrb[j].substring(1);     
    }
    attribute = splitAttrb.join(" ");

    // Skip over "year"
    i = i + 1;

    // Get Year
    while ( i < transArray.length) {
      year = year.concat(transArray[i], " ");
      i = i + 1;
    }

    // If name of company and corresponding CIK has to be updated from the dictionary
    if(companyDictionary.has(companyName)){
      sessionStorage.setItem('Company Name', 
      companyDictionary.get(companyName));
      if(companyToCik.has(sessionStorage.getItem('Company Name'))){
        sessionStorage.setItem('Company CIK', companyToCik.get(sessionStorage.getItem('Company Name')).toString());
      } else{
        sessionStorage.setItem('Company CIK', 'undefined');
      }
    } else {
      sessionStorage.setItem('Company Name', companyName);
      if(companyToCik.has(companyName)){
        sessionStorage.setItem('Company CIK', companyToCik.get(companyName).toString());
      } else{
        sessionStorage.setItem('Company CIK', 'undefined');
      }
    }

    // Set attribute and year too
    sessionStorage.setItem('Selected Attribute', attribute);
    sessionStorage.setItem('Selected Year', year);
    window.location.reload(false);
  }


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={saveTranscript}>Save</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;